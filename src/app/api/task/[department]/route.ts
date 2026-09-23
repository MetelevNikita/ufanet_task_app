import { NextResponse } from "next/server";
import fs, { writeFileSync } from "fs";
import  { fileTypeFromBuffer }  from  'file-type' ;
import path from "path";


// directions db

import directions from "@/database/direction.json";

// tg Bot

import { getBot } from "@/telegramBot/telegramBot";

// types

import { MenuType } from "@/types/types";

// prisma

import { PrismaClient } from "@/../generated/prisma/client";

// lib

import { createYGTask } from "@/lib/createYGTask";
import { createTGTask } from "@/lib/createTGTask";
import { createTGsubTaskGroup } from "@/lib/createTGsubTaskGroup";

import { createDBTask } from "@/lib/createDBTask";

// 

import { createMessageTgYG } from "@/lib/createMessageTgYG";
import { logger } from "@/lib/logger";

const log = logger('task')



const prisma = new PrismaClient();


//

const createUploadFolder = (folder: string) => {
  const folderId = `${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
  const departmentFolder = path.join(process.cwd(), 'src', 'app', 'uploads', folder);
  const currentFolder = path.join(departmentFolder, `Folder_${folderId}`);
  
  // Создаем папку отдела если её нет
  if (!fs.existsSync(departmentFolder)) {
    fs.mkdirSync(departmentFolder, { recursive: true });
  }
  
  // Создаем папку для текущей загрузки
  if (!fs.existsSync(currentFolder)) {
    fs.mkdirSync(currentFolder, { recursive: true });
  }
  
  return {
    folderPath: currentFolder,
    folderName: `Folder_${folderId}`,
    folderId: folderId,
    folderDepartment: folder
  };
};


const writeFileData = async (
  data: string | null, 
  url: string, 
  folderPath: string,  // Передаем полный путь к папке
  folderName: string,  // Имя папки для URL
  folderId: string,    // ID папки для имени файла
  fileIndex?: number,
  department?: string
) => {
  try {
    if (!data) return null;

    const buffer = Buffer.from(data, 'base64');
    const fileType = await fileTypeFromBuffer(buffer);
    if (!fileType) return null;

    // Формируем имя файла
    const fileName = fileIndex !== undefined 
      ? `${folderId}_${fileIndex}.${fileType.ext}`
      : `${folderId}.${fileType.ext}`;

    // Полный путь к файлу
    const filePath = path.join(folderPath, fileName);
    
    // Сохраняем файл
    writeFileSync(filePath, buffer);

    
    // Возвращаем URL
    return `${url}/api/uploads/${department}/${folderName}/${fileName}`;
    
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      log.error('Не удалось сохранить файл', error, { folderName });
    }
    return null; // Возвращаем null при ошибке
  }
};


const createTGPhoto = async (department: string, data: any, descriptionTask: string, taskDB: any) => {
  const buildCB = (status: string, department: string, cardId: any) => `${status}|${department}|${cardId}`

  try {


    const id = taskDB.id as number
    const bot = await getBot();
    
    if (!process.env.TG_ID_BOSS) {
      return NextResponse.json({ message: `Не задан TG_ID_BOSS в переменных окружения` }, { status: 500 });
    }

    const sendTgBot = bot.sendPhoto(
      process.env.TG_ID_BOSS as string,
      data.file,
      {
        caption: `Новое сообщение с доски - ${department}\n\n\n${descriptionTask}`,
        reply_markup: {
          inline_keyboard: [
            [
              { 
                text: 'Согласовать', 
                callback_data: buildCB('approve', department, id.toString())
              },
              { 
                text: 'Отклонить', 
                callback_data: buildCB('reject', department, id.toString())
              },
              { 
                text: 'Согласовать с замечаниями', 
                callback_data: buildCB('comment', department, id.toString())
              }
            ]
          ]
        }
      }
    )

    return sendTgBot
    
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      log.error('Не удалось отправить фото в Telegram', error, { department })
      throw new Error(error.message);
    }
  }
}


// 


async function resultTgMessage (tgId: string, message: string) {
  try {

    const bot = await getBot()

    await bot.sendMessage(tgId, message)
    return {
      success: true,
      message: `Проверочное сообщение отправлено`,
      data: null
    }
    
  } catch (error: Error | unknown) {

    if (error instanceof Error) {
      log.warn('Сообщение автору не доставлено — неверный Telegram id или нет подписки на бота', { tgId, error: error.message })
      return {
        success: false,
        message: `Проверочное сообщение не отпралено. Указан не верный Telegram Id или вы не подписались на бота`,
        data: null
      }
    }

    log.warn('Сообщение автору не доставлено — неверный Telegram id или нет подписки на бота', { tgId, error: String(error) })
    return {
      success: false,
      message: `Проверочное сообщение не отпралено. Указан не верный Telegram Id или вы не подписались на бота`,
      data: null
    }

  }
}




export const POST = async (req: Request, context: {params: {department: string}}) => {
  try {


    // 

    const contentLength = req.headers.get('content-length')
    const MAX_SIZE = 20 * 1024 * 1024

    if (contentLength && Number(contentLength) > MAX_SIZE) {
      return NextResponse.json({
        success: false,
        message: 'Размер отправляемых файлов превышает допустимый лимит (40MB)'
      }, { status: 413 })
    }

    // 


    const { department } = await context.params 
    const currentDepartment = directions.data.find((item: MenuType): Boolean => item.label.toLocaleLowerCase() == department.toLocaleLowerCase())

    if (!currentDepartment) {
      return NextResponse.json({
        message: 'Ошибка отправки сообщения. Отдел не найден',
        status: 500
      })
    }

    const departmentLabel = currentDepartment.label
    const formData = await req.json()

    log.info('Новая задача', { department: departmentLabel, tgId: formData.tgId })


    try {

    const examination = await resultTgMessage(formData.tgId, 'Проверяем подписаны ли вы на бота Pr-tz.ru')

    if (!examination.success) {
      return NextResponse.json({
        success: false,
        message: `Ошибка проверки Telegram (возможно вы ввели неправильный Telegram id или не подписались на бота)`
      });
    }

    } catch (error) {
      log.error('Проверка подписки на бота упала', error, { tgId: formData.tgId })
      return NextResponse.json({
        success: false,
        message: `Ошибка проверки Telegram (возможно вы ввели неправильный Telegram id или не подписались на бота)`
      });
    }
    

    // 


    let uploadFolderInfo: { folderPath: string; folderName: string; folderId: string } | null = null;


    const pairs = await Promise.all(
      Object.entries(formData).map(async ([key, value]: any) => {
        if (key.split('_')[1] === 'file') {

          if (!uploadFolderInfo) {
            uploadFolderInfo = createUploadFolder(currentDepartment.value);
          }

          const urls = await Promise.all(
            value.map((item: any, index: number) =>
              writeFileData(
                (item?.base64 ?? String(item)) as string,
                process.env.WEBHOOK_URL as string,
                uploadFolderInfo!.folderPath,  // Передаем полный путь
                uploadFolderInfo!.folderName,  // Передаем имя папки
                uploadFolderInfo!.folderId,    // Передаем ID папки
                index,
                currentDepartment.value
              )
            )
          );

          // Фильтруем null значения (ошибки загрузки)
          const validUrls = urls.filter(url => url !== null);
          
          log.info('Файлы сохранены', { field: key, saved: validUrls.length, total: value.length });
          
          return [key, validUrls] as const;

        } else {
          return [key, value]
        }
      })

    )

    const message = Object.fromEntries(pairs)
    let data: Object = {}


    // message

    if (departmentLabel === 'Отдел дизайна') {


      const taskDesign = await prisma.task.findMany({
        where: {
          department: department
        }
      })

      const designId = taskDesign.length + 54

      if (message?.typeApproval.label == 'Продвижение услуг компании') {
        data = {
          ...message,
          typeApproval: message?.typeApproval.value,
          title: `TЗ № ${designId} ${message.title}`,
          dateCreated: new Date().toLocaleDateString('RU-ru')
        }
      } else {
        data = {
          ...message,
          typeApproval: message?.typeApproval.label ?? '',
          dateCreated: new Date().toLocaleDateString('RU-ru')
        }
      }



    } else {

      data = {
        ...message,
        typeApproval: '',
        dateCreated: new Date().toLocaleDateString('RU-ru')
      }
    }

    const {messageYG, messageTG} = await createMessageTgYG(departmentLabel, data)

    const newTaskYougile = await createYGTask(departmentLabel, data, messageYG)

    if (!newTaskYougile.success) {
      return NextResponse.json({
        success: newTaskYougile.success,
        message: newTaskYougile.message
      })
    }

    const ygId = newTaskYougile.data.id
    log.ok('Задача создана в YouGile', { ygId })
        
    //

    const newDatabaseTask = await createDBTask(ygId, departmentLabel, data)
    if (!newDatabaseTask?.success) {
      return NextResponse.json({
        success: false,
        message: `Ошибка создания задачи в базе данных`
      }, { status: 500 });
    }

    log.ok('Задача создана в БД', { taskId: newDatabaseTask.data?.id })
    //

    let TelegramRes;

    if (departmentLabel === 'Отдел дизайна' && message.typeApproval.label === 'Продвижение услуг компании') {

      TelegramRes = await createTGsubTaskGroup(departmentLabel, messageTG, newDatabaseTask.data, formData.reconciliator.id, formData.typeApproval.idTg)

      if (!TelegramRes.success) {
        return NextResponse.json({
          success: false,
          message: `Ошибка создания задачи в телеграмм`
        }, { status: 500 });
      }


      const resultMessage = await resultTgMessage(formData.tgId, `Задача ${newDatabaseTask?.data?.title ?? ''} на сайте pr-tz.ru успешно создана и отправлена на предварительное согласование в отдела "Продвижение услуг компании"\n\n${messageTG}`)

    } else {

      TelegramRes = await createTGTask(departmentLabel, messageTG, newDatabaseTask.data, formData.reconciliator.id, '')


      const resultMessage = await resultTgMessage(formData.tgId, `Задача ${newDatabaseTask?.data?.title ?? ''} на сайте pr-tz.ru успешно создана\n\n${messageTG}`)

      if (!TelegramRes.success) {
        return NextResponse.json({
          success: false,
          message: `Ошибка создания задачи в телеграмм`
        }, { status: 500 });
      }
    }



    log.ok('Задача создана', { taskId: newDatabaseTask.data?.id, department: departmentLabel })

    return NextResponse.json({
      success: true,
      message: `Сообщение в отдел ${department} отправлено на согласование`
    }, { status: 200 });
    

    
  } catch (error: Error | unknown) {
    log.error('Задача не создана', error)
    if (error instanceof Error) {
      return NextResponse.json({
        success: false,
        message: `Ошибка создания задачи попробуйте позже ${error.message}`
      }, { status: 500 }
      );
    }
  }
}


export const GET = async (req: Request, context: {params: {department: string}}) => {
  try {

    const { department } = await context.params

    const getDepartmentTask = await prisma.task.findMany({
      where: {
        department: department
      }
    })

    if (!getDepartmentTask) {
      return NextResponse.json({
        message: 'Задачи не найдены'
      })
    }

    return NextResponse.json(getDepartmentTask)
    
  } catch (error) {
    
  }
}



