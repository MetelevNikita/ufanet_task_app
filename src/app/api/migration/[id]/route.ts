import { NextResponse } from "next/server";
import { PrismaClient } from "@/../generated/prisma";

// 


import { getYGProjects } from "@/functions/getYGProjects";
import { getBoardCompany } from "@/functions/getBoardCompany";
import { getYGColumns } from "@/functions/getYGColumns";

// 

import { MoveTaskFromId } from "@/functions/MoveTaskFromId";


//

import { getBot } from "@/telegramBot/telegramBot";
import { logger } from "@/lib/logger";

const log = logger('migration')

// 

const prisma = new PrismaClient();

// 


export const PATCH = async (req: Request, { params }: { params: { id: string } }) => {
  try {

    const { id } = await params;

  
    // 

    const {status, department} = await req.json();

    let getTask = await prisma.task.findUnique({
        where: {
          id: Number(id)
        }
    })


    if (!getTask) {
      return NextResponse.json({ message: `Задача с ID ${id} не найдена` }, { status: 404 });
    }


    if (!getTask.ygId) {
      log.error('У задачи нет ygId', undefined, { id });
      return NextResponse.json(
        { message: 'Задача не имеет YouGile ID' },
        { status: 400 }
      );
    }

    log.info('Смена статуса задачи', { id, status, title: getTask.title })

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



  // TG

  const bot = await getBot()
  if (!bot) {
    return NextResponse.json(
      { message: 'Ошибка создания бота' },
    )
  }


  if (status === 'approve') {

    const column = columns.content.find((column: {title: string}) => column.title === 'Согласовано')
    const correctColumns = column.id



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



      try {

        await bot.sendMessage(
          getTask.tgId,
          `Статус вашей задачи под именем "${getTask.title}" изменен на Согласовано`,
        ).catch(error => {
          if (error.code === 'ETELEGRAM' && error.message.includes('403')) {
            log.warn('Автор не подписан на бота — уведомление пропущено', { tgId: getTask.tgId });
            } else {
            log.error('Уведомление автору не отправлено', error, { tgId: getTask.tgId });
          }
        });


      } catch (telegramError) {

        log.error('Уведомление автору не отправлено', telegramError, { tgId: getTask.tgId });
        return NextResponse.json({
          message: 'Ошибка отправки сообщения в Telegram ' + telegramError
        })

      }


    if (!moveTask) {
      return NextResponse.json(
        { message: 'Ошибка перемещения задачи в YouGile ', moveTask },
      )
    }
    log.ok('Задача перемещена в «Согласовано»', { id, title: getTask.title })


    const changeTaskStatus = await prisma.task.update({
      where: {
        id: Number(id)
      },
      data: {
        status: 'Согласовано'
      }
    })


    if (!changeTaskStatus) {
      return NextResponse.json(
        { message: 'Ошибка изменения статуса задачи' },
      )
    }

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


      try {
        
        await bot.sendMessage(
          getTask.tgId,
          `Статус вашей задачи под именем "${getTask.title}" изменен на Отклонено`,
        ).catch(error => {
          if (error.code === 'ETELEGRAM' && error.message.includes('403')) {
            log.warn('Автор не подписан на бота — уведомление пропущено', { tgId: getTask.tgId });
            } else {
            log.error('Уведомление автору не отправлено', error, { tgId: getTask.tgId });
          }
        })


      } catch (telegramError) {

        log.error('Уведомление автору не отправлено', telegramError, { tgId: getTask.tgId });
        return NextResponse.json({
          message: 'Ошибка отправки сообщения в Telegram ' + telegramError
        })

      }

    log.ok('Задача перемещена в «Отклонено»', { id, title: getTask.title })



    const changeTaskStatus = await prisma.task.update({
      where: {
        id: Number(id)
      },
      data: {
        status: 'Отклонено'
      }
    })


    if (!changeTaskStatus) {
      return NextResponse.json(
        { message: 'Ошибка изменения статуса задачи' },
      )
    }

    return NextResponse.json({
      title: getTask.title,
      ygId: getTask.ygId,
      tgId: getTask.tgId
    })

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