import { NextResponse } from "next/server";
import fs from "fs";
import fsPromice from "fs/promises";
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


const prisma = new PrismaClient();



const writeFileData = async (data: File | null, url: string) => {
  try {

    const uuid = Date.now().toString()

    console.log(data)

    const arrayBuffer = await data?.arrayBuffer();


    if (!arrayBuffer) return

    const buffer = Buffer.from(arrayBuffer)



    // folder

    const currentFolder = path.join(process.cwd(), 'src', 'app', 'uploads', 'design', `Folder_${uuid}`)

    if (!fs.existsSync(currentFolder)) {
      fs.mkdirSync(currentFolder, { recursive: true })
    }

    fs.writeFileSync(
      path.join(currentFolder, `${uuid}_img.png`),
      buffer
    )

    console.log(`Файл ${uuid}_img.png успешно загружен`)
    return `${url}/api/uploads/design/Folder_${uuid}/${uuid}_img.png`

    
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




export const POST = async (req: Request) => {
  try {

    const splitUrl = req.url.split('/')
    const endPoint = splitUrl[splitUrl.length - 1]

    const currentDepartment = directions.data.find((item: MenuType): Boolean => item.value === endPoint)

    if (!currentDepartment) return

    const department = currentDepartment.label
    const formData = await req.formData()
    const file =  formData.get('file') as File

    let urlImage: string = "";

    if (file) {
      console.log(file)
      urlImage = await writeFileData(file, process.env.WEBHOOK_URL as string) as string

    }

    const data = Object.fromEntries(formData)
    console.log(data)
    
    data['file'] = urlImage


    let messageTG: string = '';
    let messageYG: string = '';


    if (data.type === 'Разработка с нуля') {

      messageYG = `Отдел - ${department}<br><br>Имя - ${data.name}<br><br>Город - ${data.branch}<br><br>Отдел автора - ${data.subdivision}<br><br>Телеграм id  - ${data.tgId}<br><br>Тип услуги - ${data.type}<br><br>Название услуги - ${data.title}<br><br>Описание услуги - ${data.description}<br><br>Цель - ${data.date}<br><br>Что необходимо сделать - ${data.target}<br><br>Целевая аудитория - ${data.audience}<br><br>Что необходимо изготовить - ${data.build}<br><br>Размер макета - ${data.size}<br><br>Ориентация макета - ${data.orientation}<br><br>Каким ты видишь будущий макет? - ${data.future}<br><br>Где будет размещаться макет? - ${data.place}<br><br>Ссылка на фото - ${data.file}<br><br>Дата сдачи - ${data.deadline}<br><br>${(data.other) ? `<br><br>Другие требования - ${data.other}` : ''}`

      messageTG = `Отдел - ${department}\n\nИмя - ${data.name}\n\nГород - ${data.branch}\n\nОтдел автора - ${data.subdivision}\n\nТелеграм id  - ${data.tgId}\n\nТип услуги - ${data.type}\n\nНазвание услуги - ${data.title}\n\nОписание услуги - ${data.description}\n\nЦель - ${data.date}\n\nЧто необходимо сделать - ${data.target}\n\nЦелевая аудитория - ${data.audience}\n\nЧто необходимо изготовить - ${data.build}\n\nРазмер макета - ${data.size}\n\nОриентация макета - ${data.orientation}\n\nКаким ты видишь будущий макет? - ${data.future}\n\nГде будет размещаться макет? - ${data.place}\n\nСсылка на фото - ${data.file}\n\nДата сдачи - ${data.deadline}\n\n${(data.other) ? `\n\nДругие требования - ${data.other}` : ''}`

    } else if (data.type === 'Адаптация и внесение изменений в макет') {

      messageYG = `Отдел - ${department}<br><br>Имя - ${data.fio}<br><br>Город - ${data.branch}<br><br>Отдел автора - ${data.subdivision}<br><br>Телеграм id  - ${data.tgId}<br><br>Тип услуги - ${data.type}<br><br>Название услуги - ${data.title}<br><br>Что необходиом изменить - ${data.change}<br><br>Цель - ${data.target}<br><br>Фото - ${data.file}<br><br>Дата сдачи - ${data.deadline}<br><br>${(data.other) ? `\n\nДругие требования - ${data.other}` : ''}`

      messageTG = `Отдел - ${department}\n\nИмя - ${data.fio}\n\nГород - ${data.branch}\n\nОтдел автора - ${data.subdivision}\n\nТелеграм id  - ${data.tgId}\n\nТип услуги - ${data.type}\n\nНазвание услуги - ${data.title}\n\nЧто необходиом изменить - ${data.change}\n\nЦель - ${data.target}\n\nФото - ${data.file}\n\nДата сдачи - ${data.deadline}\n\n${(data.other) ? `\n\nДругие требования - ${data.other}` : ''}`

    } else if (data.type === 'Другое') {

      messageYG = `Отдел - ${department}<br><br>Имя - ${data.fio}<br><br>Город - ${data.branch}<br><br>Отдел автора - ${data.subdivision}<br><br>Телеграм id  - ${data.tgId}<br><br>Тип услуги - ${data.type}<br><br>Название услуги - ${data.title}<br><br>Размер макета - ${data.size}<br><br>Ориентация макета - ${data.orientation}<br><br>Каким ты видишь будущий макет? - ${data.future}<br><br>Где будет размещаться макет? - ${data.place}<br><br>Ссылка на фото - ${data.file}<br><br>Дата сдачи - ${data.deadline}<br><br>${(data.other) ? `<br><br>Другие требования - ${data.other}` : ''}`

      messageTG = `Отдел - ${department}\n\nИмя - ${data.fio}\n\nГород - ${data.branch}\n\nОтдел автора - ${data.subdivision}\n\nТелеграм id  - ${data.tgId}\n\nТип услуги - ${data.type}\n\nНазвание услуги - ${data.title}\n\nРазмер макета - ${data.size}\n\nОриентация макета - ${data.orientation}\n\nКаким ты видишь будущий макет? - ${data.future}\n\nГде будет размещаться макет? - ${data.place}\n\nСсылка на фото - ${data.file}\n\nДата сдачи - ${data.deadline}\n\n${(data.other) ? `\n\nДругие требования - ${data.other}` : ''}`


    } else {
      return NextResponse.json({
        message: 'Неизвестный тип задачи',
        status: 400
      })
    }


    // 


    const newTaskYougile = await createYGTask(department, data, messageYG)
    const ygId = newTaskYougile.id

    console.log(newTaskYougile)

    if (!newTaskYougile) {
      return NextResponse.json({ message: `Ошибка создания задачи в YouGile.ru` }, { status: 500 });
    }

    // 

    const newDatabaseTask = await createDBTask(ygId, department, data)
    console.log(newDatabaseTask)

    if (!newDatabaseTask) {
      return NextResponse.json({ message: `Ошибка создания задачи в базе данных` }, { status: 500 });
    }


    //

    console.log('FILE ', file) 

    if (file.size !== 0) {

      const TelegramResPhoto = await createTGPhoto(department, data, messageTG, newDatabaseTask)
      console.log(TelegramResPhoto)

      if (!TelegramResPhoto) {
        return NextResponse.json({ message: `Ошибка создания задачи в телеграмм` }, { status: 500 });
      }

    } else {
      const TelegramRes = await createTGTask(department, data, messageTG, newDatabaseTask)
      console.log(TelegramRes)

      if (!TelegramRes) {
        return NextResponse.json({ message: `Ошибка создания задачи в телеграмм` }, { status: 500 });
      }

    }


    // const TelegramRes = await createTGTask(department, data, messageTG, newDatabaseTask)
    // console.log(TelegramRes)

    // if (!TelegramRes) {
    //   return NextResponse.json({ message: `Ошибка создания задачи в телеграмм` }, { status: 500 });
    // }

    return NextResponse.json({message: `Сообщение в отдел ${endPoint} отправлено на согласование`}, { status: 200 });
    
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message },
        { status: 500 }
      );
    }
  }
}



export const GET = async () => {
  try {

    const allTask = await prisma.taskDesign.findMany()

    if (!allTask) {
      return []
    }

    return NextResponse.json(allTask, {status: 200})
    
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message },
        { status: 500 }
      );
    }
  }
}