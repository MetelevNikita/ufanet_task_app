import { getYGProjects } from "@/functions/getYGProjects";
import { getBoardCompany } from "@/functions/getBoardCompany";
import { getYGColumns } from "@/functions/getYGColumns";

// 

import { getYGStickers } from "@/functions/getYGStickers";


export const createYGTask = async (department: string, data: any, descriptionTask: string) => {
  try {

    const yougileKey = process.env.NEXT_PUBLIC_YOGILE_KEY as string
    //

    if (!yougileKey) {
      throw new Error('Yougile key not found');
    }

    const projects = await getYGProjects(yougileKey);


    if (!projects) {
      throw new Error('Projects not found');
    }


    const currentProject = projects.content.find((project: {title: string}) => {
      return project.title === department
    })


    console.log('CURRENT PROJECT YOUGILE ', currentProject)


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
      return `Столбец Входящие не найден в доске ${department}`
    }


    // stecker

    const stickers = await getYGStickers(yougileKey)

    const statusSticker = stickers.content.find((item: {name: string}) => item.name === 'Статус') ?? {}

    if (!statusSticker) {
      console.log(
        'Стикер Статус не найден'
      )
      return
    }


    const currentState = statusSticker.states.find((item: any) => item.name === 'В очереди') ?? {}

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
        throw new Error(`Ошибка создания задачи в YG ${respoonceYouGile.statusText} - ${respoonceYouGile.status}`);
      }
    }

    const dataYougile = await respoonceYouGile.json()
    return dataYougile

  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      console.log(error.message)
    }
    console.log(error)
  }
}