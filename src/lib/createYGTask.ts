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
      return 'ERROR'
    }

    const projects = await getYGProjects(yougileKey);
    const currentProject = projects.content.find((project: {title: string}) => {
      return project.title === department
    })

    console.log('department', currentProject)

    // 

    const board = await getBoardCompany(yougileKey, currentProject.id);
    const columns = await getYGColumns(yougileKey, board.content[0].id)
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
    console.log(statusSticker.id, 'statusSticker')


    if (!statusSticker) {
      console.log(
        'Стикер Статус не найден'
      )
      return
    }


    const currentState = statusSticker.states.find((item: any) => item.name === 'в очереди') ?? {}
    console.log(currentState.id)




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
        stickers: {[statusSticker.id]: [currentState.id], [process.env.YG_AUTHOR_STICKER_ID as string]: data.fio.toString(), [process.env.YG_TYPE_STICKER_ID as string]: (data.type) ? data.type.toString() : data.product.toString()},
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