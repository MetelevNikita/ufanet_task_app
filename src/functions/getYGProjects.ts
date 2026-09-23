import { logger } from "@/lib/logger";

const log = logger('yougile')

export const getYGProjects = async (key: string) => {
  try {

    const responce = await fetch('https://ru.yougile.com/api-v2/projects', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`
      }
      
    })

    if (!responce.ok) {
      if (responce.status === 401) {
        log.error('Ключ YouGile недействителен (401) — нужно обновить ключи');
        return null;
      } else {
        throw new Error(`Ошибка получения проектов из YG ${responce.statusText} - ${responce.status}`);
      }
    }

    const data = await responce.json();
    return data
    
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      log.error('Ошибка получения проектов', error);
      return null;
    }
    return null
  }
}