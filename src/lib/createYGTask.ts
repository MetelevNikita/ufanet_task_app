import { getYGProjects } from "@/functions/getYGProjects";
import { getBoardCompany } from "@/functions/getBoardCompany";
import { getYGColumns } from "@/functions/getYGColumns";

// 

import { getYGStickers } from "@/functions/getYGStickers";
import { logger } from "@/lib/logger";

const log = logger('yougile')


export const createYGTask = async (department: string, data: any, descriptionTask: string) => {
  try {

    const yougileKey = process.env.NEXT_PUBLIC_YOGILE_KEY as string
    //

    if (!yougileKey) {
      log.error('Не задан ключ YouGile')
      return {
        success: false,
        message: `Не найдены ключ yougile`,
        data: null
      }
    }

    const projects = await getYGProjects(yougileKey);

    if (!projects) {
      log.error('Не получены проекты YouGile')
      return {
        success: false,
        message: `Не найдены проекты в yougile`,
        data: null
      }
      
    }


    const currentProject = projects.content.find((project: {title: string}) => {
      return project.title === department
    })

    // 

    const board = await getBoardCompany(yougileKey, currentProject.id);

    const currentBoard = board.content.find((item: {title: string}) => {
      return item.title === currentProject.title
    })

    const columns = await getYGColumns(yougileKey, currentBoard.id)
    const inboxColumn = columns.content.find((column: {title: string}) => {
      return column.title === 'Входящие'
    })

    // 

    if (!inboxColumn) {
      log.error('Колонка «Входящие» не найдена', undefined, { department })
      return {
        success: false,
        message: `Столбец Входящие не найден в доске ${department}`,
        data: null
      }
    }


    // stecker

    const stickers = await getYGStickers(yougileKey)

    const statusSticker = stickers.content.find((item: {name: string}) => item.name === 'Статус') ?? {}

    if (!statusSticker) {
      log.error('Стикер «Статус» не найден')
      return {
        success: false,
        message: `Стикер Статус не найден`,
        data: null
      }
    }

    const currentState = statusSticker.states.find((item: any) => item.name === 'не принято') ?? {}

    // 

    const deadline = new Date(data.deadline).getTime()

    const respoonceYouGile = await fetch(`https://ru.yougile.com/api-v2/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${yougileKey}`
      },
      body: JSON.stringify({
        title: data.title,
        columnId: inboxColumn.id,
        description: descriptionTask,
        deadline: (deadline) && {deadline: new Date(data.deadline).getTime()},
        stickers: {[statusSticker.id]: [currentState.id]},
      })
    })

    if (!respoonceYouGile.ok) {
      if (respoonceYouGile.status === 400) {
        log.error('YouGile отклонил создание задачи', undefined, { department, status: respoonceYouGile.status, statusText: respoonceYouGile.statusText })
        return {
          success: false,
          message: `Сообщение в Yougile не создано`,
          data: null
        }
      }
    }

    const dataYougile = await respoonceYouGile.json()
    return {
      success: true,
      message: 'Сообщение в Yougile создано',
      data: dataYougile
    }

  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      log.error('Задача не создана в YouGile', error, { department })
      return {
        success: false,
        message: `Сообщение в Yougile не создано - ${error.message}`,
        data: null
      }
    }
    log.error('Задача не создана в YouGile', error, { department })
    return {
      success: false,
      message: `Сообщение в Yougile не создано - ${error}`,
      data: null
    }
  }
}