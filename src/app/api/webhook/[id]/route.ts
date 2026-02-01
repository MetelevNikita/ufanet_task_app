import { NextResponse } from "next/server";
import { PrismaClient } from "../../../../../generated/prisma";
import NodeCache from 'node-cache'

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

async function getCurrentColumns (YouGileKey: string, boards: any, columnId: string): Promise<any> {
  try {
      let arrColumns: any[] = []

      for (const board of boards.content) {
        const columns = await getYGColumns(YouGileKey, board.id)
        for (const column of columns.content) {
          arrColumns.push(column)
        }
      }
      
      const findColumn = arrColumns.find((column: any) => {
        if (column.id == columnId) {
          return column
        }
      })

      return findColumn

    
  } catch (error) {
    console.log(error)
    return {}
  }
}

const changeStatusTaskDB = async (department: string, title: string, key: string, value: any) => {
  try {


      const findTask: any = await prisma.task.findFirst({
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

      if (key === 'status') {

          const changeTaskStatus = await prisma.task.update({
            where: { id: Number(findTask.id) },
            data: { status: value.title },
          })

          return changeTaskStatus

      } else if (key === 'stage') {

          const changeTaskStage = await prisma.task.update({
            where: { id: Number(findTask.id) },
            data: { stage: value },
          })

          return changeTaskStage
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


    console.log('=== НАЧАЛО ОБРАБОТКИ ВЕБХУКА ===')

    const event = await req.json()

    const title = event.payload.title ?? ''
    const description = event.payload.description ?? ''
    const columnId = event.payload.columnId ?? ''
    const assignedUsers = event.payload.assigned ?? []


    const tgId = description.split('<br /><br />').find((item: string) => {
      return item.includes('Телеграм id') ?? item
    })

    const department = description.split('<br /><br />').find((item: string) => {
      if (item.includes('Отдел')) {
        return item
      }
    })

    // yougile

    const YouGileKey = process.env.YOGILE_KEY_INSTANCE as string


    // comprassion assigned


    let compressionAssigned = null


    if (event.payload.assigned) {
      const currentAssignedUsers = event.payload.assigned ?? []
      const prevAssignedUsers = event.prevData.assigned ?? []

      compressionAssigned = (currentAssignedUsers.length > prevAssignedUsers.length) ? true : false

      if (!compressionAssigned) {
        console.log(
          `Пользователи не изменились. Пользователи - ${currentAssignedUsers.join(',')}`
        )
      } else {
        console.log(
          `Пользователи изменились. Пользователи - ${currentAssignedUsers.join(',')}`
        )
      }
    }


    const users = (event.payload.assigned) ? await getYGUsersID(event.payload.assigned[0], YouGileKey) : null
    console.log("ПОЛЬЗОВАТЕЛЬ!!!!! ИЗМЕНИЛСЯ", compressionAssigned)

    


    // comparison steacker

    let comprassionSteacker: boolean
    const allSticker = await getYGStickers(YouGileKey) ?? []



    if (!allSticker) {
      return NextResponse.json({
        message: `Ошибка при получении стикеров`,
        status: 500
      })
    }



    const statusSticker = allSticker.content.find((item: {name: string}) => item.name === 'Статус') ?? {}

    const statusName = statusSticker.id ?? ''
    const statusState = statusSticker.states ?? []


    const currentSteaker = findCurrentStiacker(event.payload?.stickers || {}, statusName, statusState)
    const prevSteaker = findCurrentStiacker(event.prevData?.stickers || {}, statusName, statusState)

    comprassionSteacker = (prevSteaker?.id == currentSteaker?.id) ? false : true
    
    if (!comprassionSteacker) {
      console.log(
        `Статус задачи не изменился. Статус задачи - ${currentSteaker?.name || 'не определен'}`
      )
    } else {
      console.log(
        `Статус задачи изменился. Статус задачи - ${currentSteaker?.name || 'не определен'}`
      )
    }

    //

    const departmentName = department.split(' ').slice(2).join(' ')

    const projects = await getYGProjects(YouGileKey)
    const currentProjects = projects.content.find((project: any) => {
      if (project.title == departmentName) {
        return project
      }
    })

    const boards = await getBoardCompany(YouGileKey, currentProjects.id)
    const findColumn = await getCurrentColumns(YouGileKey, boards, columnId) ?? null


    console.log('НАЙДЕННАЯ КОЛОНКА!!!! ', findColumn)
    
  

    // change status DB

    const changeStatusDB = await changeStatusTaskDB(departmentName, title, 'status', findColumn)

    

    let messageFromUser = '';


    if (findColumn.title === 'Согласовано') {
      messageFromUser = `Ваша задача «${title}» согласована.\n\nДальше задача будет назначена исполнителю.\n\nСледите за изменениями в БОТЕ`;
    } else if (findColumn.title === 'Не согласовано') {
      messageFromUser = `Ваша задача «${title}» отклонена. Свяжитесь с руководителем направления для получения информации об отказе.`;
    } else if (findColumn.title === 'Согласовано с замечаниями') {
      messageFromUser = `Ваша задача «${title}» согласована с замечаниями. Свяжитесь с руководителем направления.\n\nПосле этого задача поступит к исполнителю.\n\nСледите за изменениями в БОТЕ`;
    } else {
      if (comprassionSteacker && currentSteaker.name) {
      const changeStatusDB = await changeStatusTaskDB(departmentName, title, 'stage', currentSteaker.name)
      messageFromUser = `НОВЫЙ СТАТУС!\n\nЗадаче «${title}» в колонке «${findColumn.title}» присвоен статус «${currentSteaker.name}».\n\nСледите за изменениями в БОТЕ`;
      } else if (compressionAssigned) {
        messageFromUser = `НОВЫЙ ИСПОЛНИТЕЛЬ!\n\nЗадаче «${title}» в колонке «${findColumn.title}» присвоен исполнитель ${users.realName}».\n\nСледите за изменениями в БОТЕ`;
      } else {
        messageFromUser = `Ваша задача «${title}» перемещена в «${findColumn.title}».\n\nСледите за изменениями в БОТЕ`;
      }
    }
      
    const bot = await getBot()
    bot.sendMessage(tgId.split('-')[1].trim(), messageFromUser as string)

    console.log('ВЕБХУК ОТРАБОТАЛ')

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