import { NextResponse } from "next/server";
import { PrismaClient } from "../../../../../generated/prisma";

// 


import { getYGProjects } from "@/functions/getYGProjects";
import { getBoardCompany } from "@/functions/getBoardCompany";
import { getYGColumns } from "@/functions/getYGColumns";

// 

import { MoveTaskFromId } from "@/functions/MoveTaskFromId";


//

import { getBot } from "@/telegramBot/telegramBot";

// 

const prisma = new PrismaClient();

// 


export const PATCH = async (req: Request, { params }: { params: { id: string } }) => {
  try {

    console.log('Передача карточки')

    const { id } = await params;

    console.log('ID MIGRATION', id)
  
    // 

    const {status, department} = await req.json();

    let getTask = await prisma.task.findUnique({
        where: {
          id: Number(id)
        }
      })

      console.log('GET TASK FROM MIGRATION', getTask)


    if (!getTask) {
      return NextResponse.json({ message: `Задача с ID ${id} не найдена` }, { status: 404 });
    }


    if (!getTask.ygId) {
      console.error('Task is missing ygId:', getTask);
      return NextResponse.json(
        { message: 'Задача не имеет YouGile ID' },
        { status: 400 }
      );
    }

    const yougileKey = process.env.YOGILE_KEY_INSTANCE as string

    const projects = await getYGProjects(yougileKey);
    const currentProject = projects.content.find((project: {title: string}) => {
      return project.title === getTask.department
    })

    // 

    const board = await getBoardCompany(yougileKey, currentProject.id);
    const currentBoard = board.content.find((item: {title: string}) => {
      return item.title === currentProject.title
    })

    const columns = await getYGColumns(yougileKey, currentBoard.id)

    console.log('КОЛОНКИ ', columns)


  // TG

  const bot = await getBot()
  if (!bot) {
    return NextResponse.json(
      { message: 'Ошибка создания бота' },
    )
  }


    console.log('TASK ID', getTask.id)


  if (status === 'approve') {

    console.log('status')


    const column = columns.content.find((column: {title: string}) => column.title === 'Согласовано')
    const correctColumns = column.id


    console.log('correctColumns from APPROVE', correctColumns)

    if (!correctColumns) {
      return NextResponse.json(
        { message: 'Столбец согласовано не найден ', correctColumns},
      )
    }


    const moveTask = await MoveTaskFromId(yougileKey, getTask.ygId, correctColumns)

    if (!moveTask) {
      return NextResponse.json(
        { message: 'Ошибка перемещения задачи ', moveTask},
      )
    }


    console.log('CARD IS MOVE ', moveTask)

      try {



        await bot.sendMessage(
          getTask.tgId,
          `Статус вашей задачи под именем "${getTask.title}" изменен на Согласовано`,
        ).catch(error => {
          if (error.code === 'ETELEGRAM' && error.message.includes('403')) {
            console.log(`Пользователь ${getTask.tgId} не подписан на бота - пропускаем уведомление`);
            } else {
            console.error('Другая ошибка Telegram:', error);
          }
        });


      } catch (telegramError) {

        console.error('Ошибка отправки сообщения в Telegram:', telegramError);
        return NextResponse.json({
          message: 'Ошибка отправки сообщения в Telegram ' + telegramError
        })

      }


    if (!moveTask) {
      return NextResponse.json(
        { message: 'Ошибка перемещения задачи в YouGile ', moveTask },
      )
    }
    console.log(`Задача ${getTask.title} перемещена в столбец Согласовано`)

    return NextResponse.json({
      title: getTask.title,
      ygId: getTask.ygId,
      tgId: getTask.tgId
    })
    
    


  } else if (status === 'reject') {

    const column = columns.content.find((column: {title: string}) => column.title === 'Отклонено')
    const correctColumns = column.id


    if (!correctColumns) {
      NextResponse.json(
        { message: 'Столбец согласовано не найден' },
      )
    }


    const moveTask = await MoveTaskFromId(yougileKey, getTask.ygId, correctColumns)

    if (!moveTask) {
      return NextResponse.json(
        { message: 'Ошибка перемещения задачи ', moveTask},
      )
    }

    console.log('CARD IS MOVE ', moveTask)

      try {
        
        await bot.sendMessage(
          getTask.tgId,
          `Статус вашей задачи под именем "${getTask.title}" изменен на Согласовано`,
        ).catch(error => {
          if (error.code === 'ETELEGRAM' && error.message.includes('403')) {
            console.log(`Пользователь ${getTask.tgId} не подписан на бота - пропускаем уведомление`);
            } else {
            console.error('Другая ошибка Telegram:', error);
          }
        })


      } catch (telegramError) {

        console.error('Ошибка отправки сообщения в Telegram:', telegramError);
        return NextResponse.json({
          message: 'Ошибка отправки сообщения в Telegram ' + telegramError
        })

      }

    console.log(`Задача ${getTask.title} перемещена в столбец Отклонено`)

    return NextResponse.json({
      title: getTask.title,
      ygId: getTask.ygId,
      tgId: getTask.tgId
    })

  } 

  // chande TASK STATUS

  console.log('status', status)

  const changeTaskStatus = await prisma.task.update({
    where: {
      id: Number(id)
    },
    data: {
      status
    }
  })


  if (!changeTaskStatus) {
    return NextResponse.json(
      { message: 'Ошибка изменения статуса задачи' },
    )
  }


  return NextResponse.json({
    message: 'Статус задачи изменен',
  })


      
    
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