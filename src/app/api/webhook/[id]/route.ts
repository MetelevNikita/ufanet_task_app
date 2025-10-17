import { NextResponse } from "next/server";
import { PrismaClient } from "../../../../../generated/prisma";

// yougile

import { getYGCompany } from "@/functions/getYGCompany";
import { getYGKeys } from "@/functions/getYGKeys";
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

    console.log(event)


    const tgId = description.split('<br /><br />').find((item: string) => {
      return item.includes('TgId')
    })



    const department = description.split('<br /><br />').find((item: string) => {
      if (item.includes('Отдел')) {
        return item
      }
    })


    // yougile

    const company = await getYGCompany()

    const currentCompany = company.content.find((company: { id: string, name: string, isAdmin: string }) => {
      if (company.name == 'UFANET') {
        return company
      }
    })

    const companyKey = await getYGKeys(currentCompany.id)

    if (!companyKey) {
      return NextResponse.json({
        message: `Ошибка получения ключей для компании ${currentCompany.name} в YouGile`,
      }, { status: 500 })
    }


    const departmentName = department.split(' ')[2] + ' ' + department.split(' ')[3]


    const projects = await getYGProjects(companyKey[0].key)
    const currentProjects = projects.content.find((project: any) => {
      if (project.title == departmentName) {
        return project
      }
    })


    const boards = await getBoardCompany(companyKey[0].key, currentProjects.id)
 
    const columns = await getYGColumns(companyKey[0].key, boards.content[0].id)
    if (!columns) {
      return NextResponse.json({
        message: `Ошибка получения колонок для компании ${currentCompany.name} в YouGile`,
      }, { status: 500 })
    }


    const findColumn = columns.content.find((column: any) => {
      if (column.id == columnId) {
        return column
      }
    })

    console.log(findColumn)


console.log(findColumn)

    const findTask = await prisma.task.findFirst({
      where: {
        title: title,
      }
    })

    console.log(findTask)

    if (!findTask) {
      return NextResponse.json({
        message: `Задача ${title} не найдена в базе данных`,
      }, { status: 500 })
    }


    const changeTaskStatus = await prisma.task.update({
      where: { id: Number(findTask.id) },
      data: { status: findColumn.title },
    })

    console.log(changeTaskStatus)




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
    console.log(tgId)
    bot.sendMessage(tgId.split(' ')[2], messageFromUser) 


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