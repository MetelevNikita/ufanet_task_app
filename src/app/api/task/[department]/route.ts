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


const writeFileData = async (data: string | null, url: string, folder: string) => {
  try {

    const uuid = Date.now().toString()


    if (!data) return

    const buffer = Buffer.from(data, 'base64')

    const fileType = await fileTypeFromBuffer(buffer)
    console.log('РАСШИРЕНИЕ ФАЙЛА ', fileType)

    if (!fileType) return


    // folder


    const departmentFolder = path.join(process.cwd(), 'src', 'app', 'uploads', folder)
    if (!fs.existsSync(departmentFolder)) {
      fs.mkdirSync(departmentFolder, {
        recursive: true
      })
    }


    const currentFolder = path.join(process.cwd(), 'src', 'app', 'uploads', folder, `Folder_${uuid}`)

    if (!fs.existsSync(currentFolder)) {
      fs.mkdirSync(currentFolder, { recursive: true })
    }

    writeFileSync(path.join(currentFolder, `${uuid}_${fileType.ext}.${fileType.ext}`), buffer)

    console.log(`Файл ${uuid}_img.png успешно загружен`)
    return `${url}/api/uploads/${folder}/Folder_${uuid}/${uuid}_${fileType.ext}.${fileType.ext}`

    
  } catch (error: Error | unknown) {

    if (error instanceof Error) {
      console.error(
        `Не удалось загрузить файл: ${error.message}`
      );
    }
    console.error(`Не удалось загрузить файл: ${error}`);
  }
}


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

    console.log("ОТДЕЛ ", department)

    const currentDepartment = directions.data.find((item: MenuType): Boolean => item.label.toLocaleLowerCase() == department.toLocaleLowerCase())

    if (!currentDepartment) {
      return NextResponse.json({
        message: 'Отдел не найден',
        status: 500
      })
    }

    const departmentLabel = currentDepartment.label
    const formData = await req.json()


    const pairs = await Promise.all(
      Object.entries(formData).map(async ([key, value]: any) => {
        if (key.split('_')[1] === 'file') {

          const urls = await Promise.all(
            value.map((item: any) =>
              writeFileData(
                (item?.base64 ?? String(item)) as string,  // чистая base64
                process.env.WEBHOOK_URL as string,
                currentDepartment.value
              )
            )
          );

          return [key, urls] as const; // один ключ → массив URL'ов

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

    console.log('YOU GILE DATA ', newTaskYougile)

    if (!newTaskYougile) {
      return NextResponse.json({ message: `Ошибка создания задачи в YouGile.ru` }, { status: 500 });
    }

    console.info(`Задача в YouGile Создана ${ygId}`)


    //

    const newDatabaseTask = await createDBTask(ygId, departmentLabel, data)


    if (!newDatabaseTask) {
      return NextResponse.json({ message: `Ошибка создания задачи в базе данных` }, { status: 500 });
    }


    console.info(`Задача в БД Создана`)

    //


    const TelegramRes = await createTGTask(departmentLabel, data, messageTG, newDatabaseTask, formData.reconciliator.id)

    if (!TelegramRes) {
      return NextResponse.json({ message: `Ошибка создания задачи в телеграмм` }, { status: 500 });
    }

    console.info(`Задача в ТГ отправлена ${TelegramRes.toString()}`)

    return NextResponse.json({message: `Сообщение в отдел ${department} отправлено на согласование`}, { status: 200 });
    
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message},
        { status: 500 }
      );
    }
  }
}



