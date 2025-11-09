import { NextResponse } from "next/server";
import { PrismaClient } from "../../../../../generated/prisma";

// type

import { TaskType } from "@/types/types";

// YG

import { getYGCompany } from "@/functions/getYGCompany";
import { getYGKeys } from "@/functions/getYGKeys";
import { getYGProjects } from "@/functions/getYGProjects";
import { getBoardCompany } from "@/functions/getBoardCompany";
import { getYGColumns } from "@/functions/getYGColumns";

// 

import { MoveTaskFromId } from "@/functions/MoveTaskFromId";


//

import { getBot } from "@/telegramBot/telegramBot";

const prisma = new PrismaClient();

// 


export const PATCH = async (req: Request, { params }: { params: { id: string } }) => {
  try {

    console.log('Передача карточки')

    const { id } = await params;
  
    // 

    const {status, department} = await req.json();

    let getTask = await prisma.task.findUnique({
        where: {
          id: Number(id)
        }
      })


      console.log('ЗАДАЧА ', getTask)


    if (!getTask) {
      return NextResponse.json({ message: `Задача с ID ${id} не найдена` }, { status: 404 });
    }

    const yougileKey = process.env.YOGILE_KEY_INSTANCE as string

    const projects = await getYGProjects(yougileKey);
    const currentProject = projects.content.find((project: {title: string}) => {
      return project.title === getTask.department
    })

    console.log('ПРОЕКТ ', currentProject)


    // 

    const board = await getBoardCompany(yougileKey, currentProject.id);
    const columns = await getYGColumns(yougileKey, board.content[0].id)


        // TG

        const bot = await getBot()
        if (!bot) {
          NextResponse.json(
            { message: 'Ошибка создания бота' },
          )
        }


        if (status === 'approve') {

          const correctColumns = columns.content.find((column: {title: string}) => column.title === 'Согласовано').id

          if (!correctColumns) {
            NextResponse.json(
              { message: 'Столбец согласовано не найден' },
            )
          }


          const moveTask = await MoveTaskFromId(yougileKey, getTask.ygId, correctColumns)
          const sendAnswerMessage = await bot.sendMessage(
            getTask.tgId,
            `Статус вашей задачи под именем \t ${getTask.title} \t изменен на Согласовано`,
          )

          if (!moveTask) {
            NextResponse.json(
              { message: 'Ошибка перемещения задачи в YouGile' },
            )
          }
          
          console.log(`Задача ${getTask.title} перемещена в столбец Согласовано`)


        } else if (status === 'reject') {

          const correctColumns = columns.content.find((column: {title: string}) => column.title === 'Отклонено').id


          if (!correctColumns) {
            NextResponse.json(
              { message: 'Столбец согласовано не найден' },
            )
          }


          const moveTask = await MoveTaskFromId(yougileKey, getTask.ygId, correctColumns)
          const sendAnswerMessage = await bot.sendMessage(
            335412211,
            `Статус вашей задачи под именем \t ${getTask.title} \t изменен на Отклонено`,
          )

          if (!moveTask || !sendAnswerMessage) {
            NextResponse.json(
              { message: 'Ошибка перемещения задачи' },
            )
          }
          
          console.log(`Задача ${getTask.title} перемещена в столбец Отклонено`)

        } else if (status === 'comment') {
          const correctColumns = columns.content.find((column: {title: string}) => column.title === 'Согласовано с замечаниями').id


          if (!correctColumns) {
            NextResponse.json(
              { message: 'Столбец согласовано не найден' },
            )
          }

          const moveTask = await MoveTaskFromId(yougileKey, getTask.ygId, correctColumns)
          const sendAnswerMessage = await bot.sendMessage(
            335412211,
            `Статус вашей задачи под именем \t ${getTask.title} \t изменен на Отклонено`,
          )

          if (!moveTask || !sendAnswerMessage) {
            NextResponse.json(
              { message: 'Ошибка перемещения задачи' },
            )
          }
          
          console.log(`Задача ${getTask.title} перемещена в столбец Согласовано с замечаниями`)
        } else {
          return NextResponse.json(
            { message: 'Статус задачи не указан' },
          )
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
          NextResponse.json(
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