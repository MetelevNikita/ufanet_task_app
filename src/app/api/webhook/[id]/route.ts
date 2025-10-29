import { NextResponse } from "next/server";
import { PrismaClient } from "../../../../../generated/prisma";

// yougile

import { getYGProjects } from "@/functions/getYGProjects";
import { getBoardCompany } from "@/functions/getBoardCompany";
import { getYGColumns } from "@/functions/getYGColumns";
import { getYGUsersID } from "@/functions/getYGUsersID";
import { getYGStickers } from "@/functions/getYGStickers";


// tg bot

import { getBot } from '@/telegramBot/telegramBot'

// 

const prisma = new PrismaClient()

// 

const changeStatusTaskDB = async (department: string, title: string, findColumn: any) => {
  try {

    switch (department) {
      case 'PR отдел': {
        let findTaskPr: any = await prisma.taskPr.findFirst({
            where: {
              title: title,
            }
          })

          if (!findTaskPr) {
            return NextResponse.json({
              message: `Задача ${title} не найдена в базе данных`,
            }, { status: 500 })
          }

          const changeTaskStatus = await prisma.taskPr.update({
            where: { id: Number(findTaskPr.id) },
            data: { status: findColumn.title },
          })

          return changeTaskStatus
          
      }
      case 'Отдел дизайна': {
        let findTaskDesign: any = await prisma.taskDesign.findFirst({
            where: {
              title: title,
            }
          })

          if (!findTaskDesign) {
            return NextResponse.json({
              message: `Задача ${title} не найдена в базе данных`,
            }, { status: 500 })
          }

          const changeTaskStatus = await prisma.taskDesign.update({
            where: { id: Number(findTaskDesign.id) },
            data: { status: findColumn.title },
          })

          return changeTaskStatus
      }
      default: {
        NextResponse.json(
          { message: 'Отдел не найден' },
          { status: 404 }
        );
      }
    }
    
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      message: 'Неизвестная ошибка',
      status: 500
    })
  }
}

// 

const findCurrentStiacker = (findSteakers: any, status: any, state: any) => {
  try {


    let arrOfStiaker = []
  
    for (const sticker in findSteakers) {

      arrOfStiaker.push({
        id: sticker,
        name: findSteakers[sticker],
      })
    }

    const currentSteacker = arrOfStiaker.find((item: any) => item.id === status)
    if (!currentSteacker) {
      return
    }
    return state.find((item: any) => item.id === currentSteacker.name)
    
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      throw new Error(
        `Ошибка при поиске стикера ${error.message}`
      )
    }
    throw new Error(
      `Error ${error}`
    )

  }
}





export const POST = async (req: Request) => {
  try {



    const event = await req.json()

    const title = event.payload.title
    const description = event.payload.description
    const columnId = event.payload.columnId
    const assignedUsers = event.payload.assigned || []


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


    // comprassion assigned

    const currentAssignedUsers = event.payload.assigned || []
    const prevAssignedUsers = event.prevData.assigned || []


    console.log(currentAssignedUsers)
    console.log(prevAssignedUsers)

    const comprassionAssigned = (prevAssignedUsers.length === currentAssignedUsers.length && prevAssignedUsers.every((item: string, index: number) => item === currentAssignedUsers[index])) ? false : true

    console.log(comprassionAssigned)

    if (!comprassionAssigned) {
      console.log(
        `Пользователи не изменились. Пользователи - ${currentAssignedUsers.join(',')}`
      )
    } else {
      console.log(
        `Пользователи изменились. Пользователи - ${currentAssignedUsers.join(',')}`
      )
    }


    // comparison steacker


    const statusSticker = await getYGStickers(YouGileKey)

    const statusName = statusSticker.content[0].id
    const statusState = statusSticker.content[0].states


    const currentSteaker = findCurrentStiacker(event.payload.stickers, statusName, statusState)
    const prevSteaker = findCurrentStiacker(event.prevData.stickers, statusName, statusState)

    console.log(currentSteaker.name)
    console.log(prevSteaker.name)

    const comprassionSteacker = (prevSteaker.id == currentSteaker.id) ? false : true
    
    if (!comprassionSteacker) {
      console.log(
        `Статус задачи не изменился. Статус задачи - ${currentSteaker.name}`
      )
    } else {
      console.log(
        `Статус задачи изменился. Статус задачи - ${currentSteaker.name}`
      )
    }

    // 

    const departmentName = department.split(' ')[2] + ' ' + department.split(' ')[3]

    const projects = await getYGProjects(YouGileKey)
    const currentProjects = projects.content.find((project: any) => {
      if (project.title == departmentName) {
        return project
      }
    })


    const boards = await getBoardCompany(YouGileKey, currentProjects.id)

    let allColums = []

    for (const board of boards.content) {
      const columns = await getYGColumns(YouGileKey, board.id)
      for (const column of columns.content) {
        allColums.push(column)
      }
    }


    const findColumn = allColums.find((column: any) => {
      if (column.id == columnId) {
        return column
      }
    })


    // change status DB

    const changeStatusDB = await changeStatusTaskDB(departmentName, title, findColumn)

    // 

 
    let messageFromUser
    
    if (findColumn.title === 'Согласовано') {
      messageFromUser = `Ваша задача - ${title} - была Согласована.\n\nДальше ваша задача будет назначена исполнителю.\n\nСледите за изменениями в БОТЕ`
    } else if (findColumn.title === 'Не согласовано') {
      messageFromUser = `Ваша задача - ${title} - была отклонена. Просьба связаться с руководителем направления для получения информации об отказе`
    } else if (findColumn.title === 'Согласовано с замечаниями') {
      messageFromUser = `Ваша задача - ${title} - была согласовано с замечаниями. Для получения информации по задаче, пожалуйста, связаться с руководителем направления\n\nПосле задача поступит к исполнителю.\n\nСледите за изменениями в БОТЕ`
    } else {

      if (comprassionAssigned) {


        console.log('Внимание! КАРТОЧКА НАЗНАЧЕНО НА ПОЛЬЗОВАТЕЛЯ!!!!!')
        let usersArr: string[] = []

        for (const user of assignedUsers) {
          const users = await getYGUsersID(user, YouGileKey)
          console.log(users.realName)
          usersArr.push(users.realName)
        }

        messageFromUser = `НОВЫЙ ИСПОЛНИТЕЛЬ!!! \n\n Ваша задача - ${title} -  список исполнителей ${(usersArr.length < 1) ? 'ПУСТО' : usersArr.join(',')}.\n\nСледите за изменениями в БОТЕ`
          
      
      
      } else if (comprassionSteacker) {
          messageFromUser = `НОВЫЙ СТАТУС!!!!\n\nЗадаче - ${title} - в колонке ${findColumn.title} был присвоен новый статус ${currentSteaker.name}.\n\nСледите за изменениями в БОТЕ`
      } else {
          messageFromUser = `Ваша задача - ${title} - была перемещена в ${findColumn.title}.\n\nСледите за изменениями в БОТЕ`
      }

    }




    const bot = await getBot()
    bot.sendMessage(tgId.split('-')[1].trim(), messageFromUser) 

    console.log('Cообщение отправлено')

    return NextResponse.json({
      message: 'Cообщение отправлено',
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