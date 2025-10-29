import { NextResponse } from "next/server";

// types

import { MenuType } from "@/types/types";

// db

import derections from '@/database/direction.json'

// 

import { PrismaClient } from "@/../generated/prisma/client";

// lib

import { createYGTask } from "@/lib/createYGTask";
import { createTGTask } from "@/lib/createTGTask";
import { createDBTask } from "@/lib/createDBTask";


// 

const prisma = new PrismaClient()

// 


export const POST = async (req: Request, context: {params: {slug: string}}) => {
  try {

    const splitUrl = req.url.split('/')
    const endPoint = splitUrl[splitUrl.length - 1]
    console.log(endPoint)

    const currentDepartment = derections.data.find((item: MenuType): Boolean => item.value === endPoint)

    if (!currentDepartment) {
      return NextResponse.json({
        message: 'Отдел не найден',
      }, { status: 404 })
    }

    const department = currentDepartment.label
    console.log(department)

    const body = await req.formData();
    const data = Object.fromEntries(body);
    console.log(data)
    
    let messageYG: string = '';
    let messageTG: string = '';


    if (data.product === 'Проекты и продвижение услуг') {

      messageYG = `Отдел - ${department}<br><br>Имя - ${data.fio}<br><br>Город - ${data.branch}<br><br>Отдел автора - ${data.subdivision}<br><br>Телеграм id  - ${data.tgId}<br><br>Тип услуги - ${data.product}<br><br>Название услуги - ${data.title}<br><br>Описание услуги - ${data.description}<br><br>Цель - ${data.target}<br><br>Что необходимо сделать - ${data.target}<br><br>Дата - ${data.date}`

      messageTG = `Отдел - ${department}\n\nИмя - ${data.fio}\n\nГород - ${data.branch}\n\nОтдел автора - ${data.subdivision}\n\nТелеграм id  - ${data.tgId}\n\nТип услуги - ${data.product}\n\nНазвание услуги - ${data.title}\n\nОписание услуги - ${data.description}\n\nЦель - ${data.target}\n\nЧто необходимо сделать - ${data.target}\n\nДата - ${data.date}`
      

    } else if (data.product === 'Мероприятие') {

      if (data.event === 'Внешнее мероприятие (Сторонние мероприятия)' || data.event === 'Внутреннее мероприятие (Для сотрудников)') {

        messageYG = `Отдел - ${department}<br><br>Имя - ${data.fio}<br><br>Город - ${data.branch}<br><br>Отдел автора - ${data.subdivision}<br><br>Телеграм id  - ${data.tgId}<br><br>Тип услуги - ${data.product}<br><br>Тип мероприятия - ${data.event}<br><br>Название услуги - ${data.title}<br><br>Описание услуги - ${data.description}<br><br>Место проведения - ${data.place}<br><br>Цель - ${data.target}<br><br>Лидер - ${data.leader}<br><br>Что необходимо сделать - ${data.target}<br><br>Дата - ${data.date}`

        messageYG = `Отдел - ${department}\n\nИмя - ${data.fio}\n\nГород - ${data.branch}\n\nОтдел автора - ${data.subdivision}\n\nТелеграм id  - ${data.tgId}\n\nТип услуги - ${data.product}\n\nТип мероприятия - ${data.event}\n\nНазвание услуги - ${data.title}\n\nОписание услуги - ${data.description}\n\nМесто проведения - ${data.place}\n\nЦель - ${data.target}\n\nЛидер - ${data.leader}\n\nЧто необходимо сделать - ${data.target}\n\nДата - ${data.date}`

      } else if (data.event === 'Выставки, выезды, конференции') {

      messageYG = `Отдел - ${department}<br><br>Имя - ${data.fio}<br><br>Город - ${data.branch}<br><br>Отдел автора - ${data.subdivision}<br><br>Телеграм id  - ${data.tgId}<br><br>Тип услуги - ${data.product}<br><br>Тип мероприятия - ${data.event}<br><br>Название услуги - ${data.title}<br><br>Описание услуги - ${data.description}<br><br>Сайт - ${data.site}<br><br>Место проведения - ${data.place}<br><br>Цель - ${data.target}<br><br>Лидер - ${data.leader}<br><br>Участники - ${data.participants}<br><br>Что необходимо сделать - ${data.target}<br><br>Дата - ${data.date}`

       messageTG = `Отдел - ${department}\n\nИмя - ${data.fio}\n\nГород - ${data.branch}\n\nОтдел автора - ${data.subdivision}\n\nТелеграм id  - ${data.tgId}\n\nТип услуги - ${data.product}\n\nТип мероприятия - ${data.event}\n\nНазвание услуги - ${data.title}\n\nОписание услуги - ${data.description}\n\nСайт - ${data.site}<br><br>Место проведения - ${data.place}\n\nЦель - ${data.target}\n\nЛидер - ${data.leader}\n\nУчастники - ${data.participants}\n\nЧто необходимо сделать - ${data.target}\n\nДата - ${data.date}`

      } else {
        return ''
      }


    } else if (data.product === 'Прочее') {

      messageYG = `Отдел - ${department}<br><br>Имя - ${data.fio}<br><br>Город - ${data.branch}<br><br>Отдел автора - ${data.subdivision}<br><br>Телеграм id  - ${data.tgId}<br><br>Тип услуги - ${data.product}<br><br>Название услуги - ${data.title}<br><br>Цель - ${data.target}<br><br>Что необходимо сделать - ${data.target}<br><br>Дата - ${data.date}`

      messageTG = `Отдел - ${department}\n\nИмя - ${data.fio}\n\nГород - ${data.branch}\n\nОтдел автора - ${data.subdivision}\n\nТелеграм id  - ${data.tgId}\n\nТип услуги - ${data.product}\n\nНазвание услуги - ${data.title}\n\nЦель - ${data.target}\n\nЧто необходимо сделать - ${data.target}\n\nДата - ${data.date}`

    } else {
      return NextResponse.json({ message: 'Некорректный продукт' }, { status: 400 });
    }


    const newTaskYougile = await createYGTask(department, data, messageYG)
    console.log(newTaskYougile)
    const ygId = newTaskYougile.id

    if (!newTaskYougile) {
      return NextResponse.json({ message: `Ошибка создания задачи в YouGile.ru` }, { status: 500 });
    }

    const newTaskDatabase = await createDBTask(ygId, department, data)

    if (!newTaskDatabase) {
      return NextResponse.json({ message: `Ошибка создания задачи в базе данных` }, { status: 500 });
    }

    const TelegramRes = await createTGTask(department, data, messageTG, newTaskDatabase)

    if (!TelegramRes) {
      return NextResponse.json({ message: `Ошибка создания задачи в телеграмм` }, { status: 500 });
    }

    return NextResponse.json({message: `Сообщение в отдел ${endPoint} отправлено на согласование`}, { status: 200 });
    

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

    const prData = await prisma.taskPr.findMany()

    if (!prData) {
      return NextResponse.json(
        { message: 'Ошибка получения данных' },
        { status: 500 }
      );
    }

    return NextResponse.json(prData, { status: 200 });
    
    
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message },
        { status: 500 }
      );
    } else {
      return NextResponse.json(error)
    }
  }
}