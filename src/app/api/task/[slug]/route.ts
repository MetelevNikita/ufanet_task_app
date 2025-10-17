import { NextResponse } from "next/server";

// 

import { getYGProjects } from "@/functions/getYGProjects";
import { getBoardCompany } from "@/functions/getBoardCompany";
import { getYGColumns } from "@/functions/getYGColumns";
import { getYGStickers } from "@/functions/getYGStickers";

// TG

import { getBot } from "@/telegramBot/telegramBot";

// types

import { TaskType } from "@/types/types";
import { MenuType } from "@/types/types";

// db

import derections from '@/database/direction.json'

// 

import { PrismaClient } from "@/../generated/prisma/client";

const prisma = new PrismaClient();



const createDBdata = async (ygId: string, slug: string, data: any) => {
  try {


    const databaseCard = {
      ygId: ygId,
      department: slug,
      ...data,
      status: 'Входящие'
    }


    console.log(databaseCard)


    const task = await prisma.taskPr.create({
      data: databaseCard
 
    })
    

    if (!task) {
      throw new Error('Ошибка создания задачи в базе данных');
    }

    return task;
    
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Неизвестная ошибка');
  }
}


// creteYGTask

const createYGData = async (department: string, data: any, descriptionTask: string) => {
  try {


    console.log(descriptionTask)

    // key

    const yougileKey = process.env.YOGILE_KEY_INSTANCE as string

    //

    if (!yougileKey) {
      return NextResponse.json({ message: 'Yougile key not found' }, { status: 500 });
    }

    const projects = await getYGProjects(yougileKey);
    const currentProject = projects.content.find((project: {title: string}) => {
      return project.title === department
    })

    // 

    const board = await getBoardCompany(yougileKey, currentProject.id);
    const columns = await getYGColumns(yougileKey, board.content[0].id)
    const inboxColumn = columns.content.find((column: {title: string}) => {
      return column.title === 'Входящие'
    })

    // 

    if (!inboxColumn) {
      return NextResponse.json({ message: `Столбец Входящие не найден в доске ${department}` }, { status: 404 });
    }

    //

    const respoonceYouGile = await fetch(`https://ru.yougile.com/api-v2/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${yougileKey}`
      },
      body: JSON.stringify({
        title: (!data.title) ? 'Прочее' : data.title,
        columnId: inboxColumn.id,
        description: descriptionTask,
        deadline: {deadline: new Date(data.date).getTime()},
      })
    })

    if (!respoonceYouGile.ok) {
      if (respoonceYouGile.status === 400) {
        throw new Error(`Ошибка создания задачи в YG ${respoonceYouGile.statusText} - ${respoonceYouGile.status}`);
      }
    }

    const dataYougile = await respoonceYouGile.json()
    return dataYougile


    
  } catch (error) {
    console.log(error)
  }
}


const createTGData = async (department: string, data: any, descriptionTask: string, taskDB: any) => {
  try {


    const id = taskDB.id as number

    console.log(id)

    console.log(process.env.TG_ID_BOSS)

    const bot = await getBot();
    
    if (!process.env.TG_ID_BOSS) {
      return NextResponse.json({ message: `Не задан TG_ID_BOSS в переменных окружения` }, { status: 500 });
    }

    const sendTgBot = bot.sendMessage(
      process.env.TG_ID_BOSS as string,
      `Новое сообщение с доски - ${department}\n\n\n${descriptionTask}`,
      {
        reply_markup: {
          inline_keyboard: [
            [
              { text: 'Согласовать', callback_data: JSON.stringify({message: `approve`, cardId: id.toString()})},
              { text: 'Отклонить', callback_data: JSON.stringify({message: `reject`, cardId: id.toString()})},
              { text: 'Согласовать с замечаниями', callback_data: JSON.stringify({message: `comment`, cardId: id.toString})}
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



export const POST = async (req: Request, context: {params: {slug: string}}) => {
  try {

    const { slug } = await context.params;

    console.log(slug)

    const currentDepartment = derections.data.find((item: MenuType): Boolean => item.value === slug)

    console.log(currentDepartment)

    if (!currentDepartment) {
      return NextResponse.json({
        message: 'Отдел не найден',
      }, { status: 404 })
    }

    const department = currentDepartment.label



    const body = await req.formData();
    const data = Object.fromEntries(body);
    
    let messageYG: string = '';
    let messageTG: string = '';


    if (data.product === 'Проекты и продвижение услуг') {

      messageYG = `Отдел - ${department}<br><br>Имя - ${data.name}<br><br>Город - ${data.branch}<br><br>Отдел автора - ${data.subdivision}<br><br>Телеграм id  - ${data.tgId}<br><br>Тип услуги - ${data.product}<br><br>Название услуги - ${data.title}<br><br>Описание услуги - ${data.description}<br><br>Цель - ${data.target}<br><br>Что необходимо сделать - ${data.target}<br><br>Дата - ${data.date}`

      messageTG = `Отдел - ${department}\n\nИмя - ${data.name}\n\nГород - ${data.branch}\n\nОтдел автора - ${data.subdivision}\n\nТелеграм id  - ${data.tgId}\n\nТип услуги - ${data.product}\n\nНазвание услуги - ${data.title}\n\nОписание услуги - ${data.description}\n\nЦель - ${data.target}\n\nЧто необходимо сделать - ${data.target}\n\nДата - ${data.date}`
      

    } else if (data.product === 'Мероприятие') {
      console.log('Data for event:', data);

      if (data.event === 'Внешнее мероприятие (Сторонние мероприятия)' || data.event === 'Внутреннее мероприятие (Для сотрудников)') {

        messageYG = `Отдел - ${department}<br><br>Имя - ${data.name}<br><br>Город - ${data.branch}<br><br>Отдел автора - ${data.subdivision}<br><br>Телеграм id  - ${data.tgId}<br><br>Тип услуги - ${data.product}<br><br>Тип мероприятия - ${data.event}<br><br>Название услуги - ${data.title}<br><br>Описание услуги - ${data.description}<br><br>Место проведения - ${data.place}<br><br>Цель - ${data.target}<br><br>Лидер - ${data.leader}<br><br>Что необходимо сделать - ${data.target}<br><br>Дата - ${data.date}`

        messageYG = `Отдел - ${department}\n\nИмя - ${data.name}\n\nГород - ${data.branch}\n\nОтдел автора - ${data.subdivision}\n\nТелеграм id  - ${data.tgId}\n\nТип услуги - ${data.product}\n\nТип мероприятия - ${data.event}\n\nНазвание услуги - ${data.title}\n\nОписание услуги - ${data.description}\n\nМесто проведения - ${data.place}\n\nЦель - ${data.target}\n\nЛидер - ${data.leader}\n\nЧто необходимо сделать - ${data.target}\n\nДата - ${data.date}`

      } else if (data.event === 'Выставки, выезды, конференции') {

      messageYG = `Отдел - ${department}<br><br>Имя - ${data.name}<br><br>Город - ${data.branch}<br><br>Отдел автора - ${data.subdivision}<br><br>Телеграм id  - ${data.tgId}<br><br>Тип услуги - ${data.product}<br><br>Тип мероприятия - ${data.event}<br><br>Название услуги - ${data.title}<br><br>Описание услуги - ${data.description}<br><br>Сайт - ${data.site}<br><br>Место проведения - ${data.place}<br><br>Цель - ${data.target}<br><br>Лидер - ${data.leader}<br><br>Участники - ${data.participants}<br><br>Что необходимо сделать - ${data.target}<br><br>Дата - ${data.date}`

       messageTG = `Отдел - ${department}\n\nИмя - ${data.name}\n\nГород - ${data.branch}\n\nОтдел автора - ${data.subdivision}\n\nТелеграм id  - ${data.tgId}\n\nТип услуги - ${data.product}\n\nТип мероприятия - ${data.event}\n\nНазвание услуги - ${data.title}\n\nОписание услуги - ${data.description}\n\nСайт - ${data.site}<br><br>Место проведения - ${data.place}\n\nЦель - ${data.target}\n\nЛидер - ${data.leader}\n\nУчастники - ${data.participants}\n\nЧто необходимо сделать - ${data.target}\n\nДата - ${data.date}`

      } else {
        return ''
      }


    } else if (data.product === 'Прочее') {
      console.log('Data for other:', data);

      messageYG = `Отдел - ${department}<br><br>Имя - ${data.name}<br><br>Город - ${data.branch}<br><br>Отдел автора - ${data.subdivision}<br><br>Телеграм id  - ${data.tgId}<br><br>Тип услуги - ${data.product}<br><br>Цель - ${data.target}<br><br>Что необходимо сделать - ${data.target}<br><br>Дата - ${data.date}`

      messageTG = `Отдел - ${department}\n\nИмя - ${data.name}\n\nГород - ${data.branch}\n\nОтдел автора - ${data.subdivision}\n\nТелеграм id  - ${data.tgId}\n\nТип услуги - ${data.product}\n\nЦель - ${data.target}\n\nЧто необходимо сделать - ${data.target}\n\nДата - ${data.date}`

    } else {
      return NextResponse.json({ message: 'Некорректный продукт' }, { status: 400 });
    }


    const newTaskYougile = await createYGData(department, data, messageYG)
    console.log('newTaskYougile:', newTaskYougile)
    const ygId = newTaskYougile.id

    if (!newTaskYougile) {
      return NextResponse.json({ message: `Ошибка создания задачи в YouGile.ru` }, { status: 500 });
    }

    const newTaskDatabase = await createDBdata(ygId, department, data)

    if (!newTaskDatabase) {
      return NextResponse.json({ message: `Ошибка создания задачи в базе данных` }, { status: 500 });
    }

    console.log(newTaskDatabase)

    const TelegramRes = await createTGData(department, data, messageTG, newTaskDatabase)
    console.log('TelegramRes:', TelegramRes)

    if (!TelegramRes) {
      return NextResponse.json({ message: `Ошибка создания задачи в телеграмм` }, { status: 500 });
    }

    return NextResponse.json({message: `Сообщение в отдел ${slug} отправлено на согласование`}, { status: 200 });
    
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { message: 'Неизвестная ошибка' },
      { status: 500 }
    );
    
  }
}


// 


export const GET = async (req: Request) => {
  try {

    const url = req.url.split('/')
    const department = url.at(-1)

    if (!department) {
      return NextResponse.json(
        { message: 'Отдел не указан' },
        { status: 400 }
      );
    }

    const getTasks = await prisma.taskPr.findMany()

    if (!getTasks) {
      return NextResponse.json(
        { message: 'Ошибка получения задач из базы данных' },
        { status: 500 }
      );
    }

    return NextResponse.json(getTasks)

  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { message: 'Неизвестная ошибка' },
      { status: 500 }
    );
    
  }
}