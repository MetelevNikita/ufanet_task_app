export const registerBot = async () => {

  console.log('Registering telegram bot instrumentation');
  console.log('NEXT_RUNTIME', process.env.NEXT_RUNTIME);

  if (process.env.NEXT_RUNTIME !== 'nodejs') return;

  const { getBot } = await import('@/telegramBot/telegramBot')

  try {
    await getBot(); // запускаем polling при старте сервера
    console.log('[bot] started on server boot');
  } catch (e) {
    console.error('[bot] init error:', e);
  }
};




export const getYouGileWebHook = async () => {
  console.log('Registering yougile webhook instrumentation');
  console.log('NEXT_RUNTIME', process.env.NEXT_RUNTIME);

  if (process.env.NEXT_RUNTIME !== 'nodejs') return;

  const youGileKey = process.env.YOGILE_KEY_INSTANCE as string;
  console.log(youGileKey)

  const { createYGWebhook } = await import('@/functions/createYGWebhook')

  const webhook = await createYGWebhook(youGileKey)
  console.log(webhook)
}



export const getYGData = async () => {
  try {

    console.log('Registering yougile key');
    console.log('NEXT_RUNTIME', process.env.NEXT_RUNTIME);

    if (process.env.NEXT_RUNTIME !== 'nodejs') return;

    const { getYGCompany } = await import('@/functions/getYGCompany')
    const { getYGKeys } = await import('@/functions/getYGKeys')

    const companys = await getYGCompany();
    const currentCompany = companys.content.find((company: {id: string, name: string, isAdmin: string}) => company.name == 'UFANET')

    if (!currentCompany) {
      throw new Error(
        `Компания ${currentCompany.name} не найдена в YouGile`
      )
    }

    const companyKey = await getYGKeys(currentCompany.id);
    if (!companyKey) {
      throw new Error(
        `Ошибка получения ключей для компании ${currentCompany.name} в YouGile`
      )
    }

    const key = companyKey[0].key
    process.env.YOGILE_KEY_INSTANCE = key

    if (!key) {
      console.error(`Ключ для компании ${currentCompany.name} не найден в YouGile`)
    }

    console.log('Ключ получен')

  } catch (error) {
    console.error(error)
  }
}



// start FNs

export const register = async () => {
  try {
    await Promise.all([
      await registerBot(),
      await getYGData(),
      await getYouGileWebHook()
    ])
  } catch (error) {
    console.error(`Ошибка запуска функций при старте программы`)
  }
}