import { logger } from "@/lib/logger";

const log = logger('tasks')

export const getTask = async () => {
  try {


    const responce = await fetch(`/api/task/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!responce.ok) {
      throw new Error(
        JSON.stringify({
          status: 'error',
          message: `Ошибка получения задач: ${responce.statusText} - ${responce.status}`
        })
      )
    }

    const data = await responce.json()
    return data
    
  } catch (error: Error | unknown) {

    if (error instanceof Error) {
      log.error('Ошибка получения задач', error)

      throw new Error(
        JSON.stringify({
          status: 'error',
          message: `Ошибка получения задач: ${error.message}`
        })
      )
    }
    
  }
}