import { logger } from "@/lib/logger";

const log = logger('yougile')

// newDescription - это то, что нужно ДОБАВИТЬ к уже существующему описанию задачи,
// а не полная замена. Старое описание подтягивается GET-запросом и сохраняется.
export const editYGTaskFromId = async (key: string, id: string, title: string, columnId: any, newDescription: string) => {


  try {

    const currentTaskResponce = await fetch(`https://ru.yougile.com/api-v2/tasks/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${key}`
      }
    })

    if (!currentTaskResponce.ok) {
      const errorBody = await currentTaskResponce.text()
      throw new Error(
        `[GET] Ошибка получения задачи из YG по ID ${currentTaskResponce.statusText} - ${currentTaskResponce.status} - ${errorBody}`
      )
    }

    const currentTask = await currentTaskResponce.json()
    const previousDescription: string = currentTask?.description ?? ''

    const description = previousDescription
      ? `${previousDescription}<br><br>${newDescription}`
      : newDescription

    const responce = await fetch(`https://ru.yougile.com/api-v2/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${key}`
      },
      body: JSON.stringify({
        deleted: false,
        title: title,
        columnId: columnId,
        description: description,
        // stickers :{"c0e502fc-ad94-447c-8e9f-e0bc80bc0291": 'КОММЕНТАРИЙ'}

      })
    })

    if (!responce.ok) {
      const errorBody = await responce.text()
      throw new Error(
        `[PUT] Ошибка изменения задачи из YG по ID ${responce.statusText} - ${responce.status} - ${errorBody}`
      )
    }

    const data = await responce.json()
    return data

    
  } catch (error: Error | unknown) {

    if (error instanceof Error) {
      log.error('Ошибка изменения задачи', error, { id })
      return `Ошибка изменения задачи по ID ${error.message}`
    }


    log.error('Ошибка изменения задачи', error, { id })
    return `Ошибка изменения задачи по ID ${error}`

    
  }
}