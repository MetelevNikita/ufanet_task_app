import { logger } from "@/lib/logger";

const log = logger('yougile')

export const getYGStickers = async (key: string) => {
  try {

    const responce = await fetch('https://ru.yougile.com/api-v2/string-stickers', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`
      }
    })

    if (!responce.ok) {
      throw new Error(`Ошибка получения стикеров из YG ${responce.statusText} - ${responce.status}`);
    }

    const data = await responce.json()
    return data
    
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      log.error('Ошибка получения стикеров', error);
      return null;
    }
    return null
  }
}