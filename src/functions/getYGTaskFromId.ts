import { logger } from "@/lib/logger";

const log = logger('yougile')

export const getYGTaskFromId = async (key: string, id: string) => {
  try {

    const responce = await fetch(`https://ru.yougile.com/api-v2/tasks/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${key}`
      }
    })

    if (!responce.ok) {
      throw new Error(
        `Ошибка получения задачи из YG по ID ${responce.statusText} - ${responce.status}`
      )
    }

    const data = await responce.json()
    return data

    
  } catch (error: Error | unknown) {

    if (error instanceof Error) {
      log.error('Ошибка получения задачи по ID', error)
      return `Ошибка получения задачи по ID ${error.message}`
    }


    log.error('Ошибка получения задачи по ID', error)
    return `Ошибка получения задачи по ID ${error}`

    
  }
}