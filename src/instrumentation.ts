import { logger } from "@/lib/logger";

const log = logger('boot')

export const registerBot = async () => {


  if (process.env.NEXT_RUNTIME !== 'nodejs') return;

  if (process.env.NODE_APP_INSTANCE && process.env.NODE_APP_INSTANCE !== '0') {
    log.info('Бот не запускаем — это не instance 0')
    return
  }

  const { startBotPolling } = await import('@/telegramBot/telegramBot')

  try {
    await startBotPolling(); // запускаем polling при старте сервера
  } catch (e) {
    log.error('Бот не запустился', e);
  }
};



export const getAllWebHooks = async () => {

  if (process.env.NEXT_RUNTIME !== 'nodejs') return;
  if (process.env.NODE_APP_INSTANCE && process.env.NODE_APP_INSTANCE !== '0') return;

  const youGileKey = process.env.YOGILE_KEY_INSTANCE as string;

  const { deleteAllYouGileWebhook } = await import('@/functions/deleteAllYouGileWebhook')
  const webhook = await deleteAllYouGileWebhook(youGileKey)
}




export const getYouGileWebHook = async () => {

  if (process.env.NEXT_RUNTIME !== 'nodejs') return;
  if (process.env.NODE_APP_INSTANCE && process.env.NODE_APP_INSTANCE !== '0') return;

  const youGileKey = process.env.YOGILE_KEY_INSTANCE as string;

  const { createYGWebhook } = await import('@/functions/createYGWebhook')

  const webhook = await createYGWebhook(youGileKey)
  log.ok('Вебхук YouGile зарегистрирован', { id: webhook?.id })

}


export const getYGData = async () => {
  try {


    if (process.env.NEXT_RUNTIME !== 'nodejs') return;
    const companyName = process.env.COMPANY_NAME as string


    const { getYGCompany } = await import('@/functions/getYGCompany')
    const { getYGKeys } = await import('@/functions/getYGKeys')

    const companys = await getYGCompany();
    const currentCompany = companys.content.find((company: {id: string, name: string, isAdmin: string}) => company.name == process.env.COMPANY_NAME)

    if (!currentCompany) {
      throw new Error(
        `Компания ${currentCompany.name} не найдена в YouGile`
      )
    }

    let companyKey = await getYGKeys(currentCompany.id);

    companyKey = await getYGKeys(currentCompany.id);
    const key = companyKey[0].key
    if (!key) {
      throw new Error(
        `Ключ для компании ${currentCompany.name} не найден в YouGile`
      )
    }


    process.env.YOGILE_KEY_INSTANCE = key
    process.env.NEXT_PUBLIC_YOGILE_KEY = key
    log.ok('Ключ YouGile получен')

  } catch (error) {
    log.error('Ключ YouGile не получен', error)
  }
}



// start FNs

export const register = async () => {

  if (process.env.NEXT_RUNTIME !== 'nodejs') return;

  const { registerProcessHandlers } = await import('@/lib/registerProcessHandlers')
  registerProcessHandlers()


  try {
    await Promise.all([
      await registerBot(),
      await getYGData(),
      await getAllWebHooks(),
      await getYouGileWebHook()
    ])


    log.ok('Приложение запущено')
  } catch (error: Error | unknown) {

    log.error('Ошибка запуска', error)
  }
}