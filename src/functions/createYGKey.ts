import { logger } from "@/lib/logger";

const log = logger('yougile')

export const createYGKey = async (id: string) => {
  try {

    const responce = await fetch('https://ru.yougile.com/api-v2/auth/keys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        login: process.env.YG_LOGIN,
        password: process.env.YG_PASSWORD,
        companyId: id
      })

    })

    if (!responce.ok) {
      if (responce.status === 400) {
        throw new Error(`Ошибка создания ключа в YG ${responce.statusText} - ${responce.status}`);
      }
    }

    const data = await responce.json();
    return data
    
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      log.error('Ошибка создания ключа', error);
      return null;
    }
    log.error('Ошибка создания ключа', error);
    return null
  }
}