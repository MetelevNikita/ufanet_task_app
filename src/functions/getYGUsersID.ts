import { logger } from "@/lib/logger";

const log = logger('yougile')

export const getYGUsersID = async (id: string, token: string) => {
  try {

    const responce = await fetch(`https://ru.yougile.com/api-v2/users/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })

    if (!responce.ok) {
      throw new Error(
        `Ошибка получения пользователя из YG ${responce.statusText} - ${responce.status}`
      )
    }

    const data = await responce.json()
    return data
    
  } catch (error: Error | unknown) {

    if (error instanceof Error) {
      log.error('Ошибка получения пользователя', error)
      return `Ошибка получения пользователя из YG ${error.message}`
    }


    log.error('Ошибка получения пользователя', error)
    return `Ошибка получения пользователя из YG ${error}`

    
  }
}