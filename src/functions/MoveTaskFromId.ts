import { logger } from "@/lib/logger";

const log = logger('yougile')

export const MoveTaskFromId = async (key: string, id: string, columnId: string) => {
  try {

    const responce = await fetch(`https://ru.yougile.com/api-v2/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${key}`
      },

      body: JSON.stringify({
        "columnId": columnId,
      })
    })

    if (!responce.ok) {
      throw new Error(`Ошибка получения задачи из компании в YG ${responce.statusText} - ${responce.status}`);
    }

    const data = await responce.json();
    return data;
    
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      log.error('Ошибка перемещения задачи', error);
      return null;
    }
    log.error('Ошибка перемещения задачи', error);
  }
}