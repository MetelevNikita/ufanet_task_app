import { logger } from "@/lib/logger";

const log = logger('yougile')

export const getDeskCompany = async (key: string) => {
  try {

    const responce = await fetch('https://yougile.com/api-v2/boards', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`
      }
    })

    if (!responce.ok) {
      throw new Error(`Ошибка получения досок из компании в YG ${responce.statusText} - ${responce.status}`);
    }

    const data = await responce.json();
    return data;
    
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      log.error('Ошибка получения досок', error);
      return null;
    }
    log.error('Ошибка получения досок', error);
  }
}