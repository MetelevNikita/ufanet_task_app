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
import { createDBTask } from "@/lib/createDBTask";

// 

import { createMessageTgYG } from "@/lib/createMessageTgYG";



const prisma = new PrismaClient();


// 


export const config = {
  api: {
    bodyParser: {
      sizeLimit: '150mb',
    },
  },
};



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
    console.log(`Создана папка для загрузки: Folder_${folderId}`);
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

    console.log(`Файл ${fileName} успешно загружен в папку ${folderName}`);
    
    // Возвращаем URL
    return `${url}/api/uploads/${department}/${folderName}/${fileName}`;
    
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      console.error(`Не удалось загрузить файл: ${error.message}`);
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
      console.log(error.message)
      throw new Error(error.message);
    }
  }
}



export const POST = async (req: Request, context: {params: {department: string}}) => {
  try {

    console.log('Начинаем обработку данных')

    const { department } = await context.params 
    const currentDepartment = directions.data.find((item: MenuType): Boolean => item.label.toLocaleLowerCase() == department.toLocaleLowerCase())

    if (!currentDepartment) {
      return NextResponse.json({
        message: 'Отдел не найден',
        status: 500
      })
    }

    const departmentLabel = currentDepartment.label
    const formData = await req.json()


    // 


    let uploadFolderInfo: { folderPath: string; folderName: string; folderId: string } | null = null;


    const pairs = await Promise.all(
      Object.entries(formData).map(async ([key, value]: any) => {
        if (key.split('_')[1] === 'file') {

          if (!uploadFolderInfo) {
            uploadFolderInfo = createUploadFolder(currentDepartment.value);
            console.log(`Папка создана: ${uploadFolderInfo.folderName}`);
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
          
          console.log(`Загружено файлов для ${key}: ${validUrls.length} из ${value.length}`);
          
          return [key, validUrls] as const;

        } else {
          return [key, value]
        }
      })

    )

    const data = Object.fromEntries(pairs)

    // message

    const {messageYG, messageTG} = await createMessageTgYG(departmentLabel, data)

    //

    const newTaskYougile = await createYGTask(departmentLabel, data, messageYG)
    const ygId = newTaskYougile.id

    console.log(newTaskYougile)

    if (!newTaskYougile) {
      return NextResponse.json({
        success: false,
        message: `Ошибка создания задачи в YouGile.ru`
      }, { status: 500 });
    }

    console.info(`Задача в YouGile Создана ${ygId}`)

    //

    const newDatabaseTask = await createDBTask(ygId, departmentLabel, data)


    if (!newDatabaseTask) {
      return NextResponse.json({
        success: false,
        message: `Ошибка создания задачи в базе данных`
      }, { status: 500 });
    }


    console.info(`Задача в БД Создана`)

    //


    const TelegramRes = await createTGTask(departmentLabel, messageTG, newDatabaseTask, formData.reconciliator.id)

    if (!TelegramRes) {
      return NextResponse.json({
        success: false,
        message: `Ошибка создания задачи в телеграмм`
      }, { status: 500 });
    }

    console.info(`Задача в ТГ отправлена ${TelegramRes.toString()}`)

    return NextResponse.json({
      success: true,
      message: `Сообщение в отдел ${department} отправлено на согласование`
    }, { status: 200 });
    
  } catch (error: Error | unknown) {
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



