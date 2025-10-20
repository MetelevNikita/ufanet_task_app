import { NextResponse } from "next/server";
import { PrismaClient } from "../../../../../generated/prisma";

// yougile

import { getYGProjects } from "@/functions/getYGProjects";
import { getBoardCompany } from "@/functions/getBoardCompany";
import { getYGColumns } from "@/functions/getYGColumns";


// tg bot

import { getBot } from '@/telegramBot/telegramBot'

// 

 const prisma = new PrismaClient()


export const POST = async (req: Request) => {
  try {

    const event = await req.json()
    const title = event.payload.title
    const description = event.payload.description
    const columnId = event.payload.columnId


    const tgId = description.split('<br /><br />').find((item: string) => {
      return item.includes('Телеграм id')
    })

    const department = description.split('<br /><br />').find((item: string) => {
      if (item.includes('Отдел')) {
        return item
      }
    })

    // yougile

    const YouGileKey = process.env.YOGILE_KEY_INSTANCE as string


    const departmentName = department.split(' ')[2] + ' ' + department.split(' ')[3]


    const projects = await getYGProjects(YouGileKey)
    const currentProjects = projects.content.find((project: any) => {
      if (project.title == departmentName) {
        return project
      }
    })


    const boards = await getBoardCompany(YouGileKey, currentProjects.id)
 
    const columns = await getYGColumns(YouGileKey, boards.content[0].id)
    if (!columns) {
      return NextResponse.json({
        message: `Ошибка получения колонок для компании в YouGile`,
      }, { status: 500 })
    }


    const findColumn = columns.content.find((column: any) => {
      if (column.id == columnId) {
        return column
      }
    })

    console.log(findColumn)


      
      const findTask = await prisma.taskPr.findFirst({
      where: {
        title: title,
      }
    })


      if (!findTask) {
        return NextResponse.json({
          message: `Задача ${title} не найдена в базе данных`,
        }, { status: 500 })
      }


      const changeTaskStatus = await prisma.taskPr.update({
        where: { id: Number(findTask.id) },
        data: { status: findColumn.title },
      })


    let messageFromUser


    if (findColumn.title === 'Согласовано') {
      messageFromUser = `Ваша задача - ${title} - была Согласована.\n\nДальше ваша задача будет назначена исполнителю.\n\nСледите за изменениями в БОТЕ`
    } else if (findColumn.title === 'Не согласовано') {
      messageFromUser = `Ваша задача - ${title} - была отклонена. Просьба связаться с руководителем направления для получения информации об отказе`
    } else if (findColumn.title === 'Согласовано с замечаниями') {
      messageFromUser = `Ваша задача - ${title} - была согласовано с замечаниями. Для получения информации по задаче, пожалуйста, связаться с руководителем направления\n\nПосле задача поступит к исполнителю.\n\nСледите за изменениями в БОТЕ`
    } else {
      messageFromUser = `Ваша задача - ${title} - была перемещена в ${findColumn.title}.\n\nСледите за изменениями в БОТЕ`
    }


    const bot = await getBot()
    bot.sendMessage(tgId.split('-')[1].trim(), messageFromUser) 


    return NextResponse.json({
      message: 'API работает',
    })
    
  } catch (error: Error | unknown) {

    if (error instanceof Error) {
      console.log(error.message)
      return NextResponse.json({
        message: error.message,
      }, { status: 500 })
    }
    
  }
}