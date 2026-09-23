import { logger } from "@/lib/logger";

const log = logger('yougile')

export const deleteAllYouGileWebhook = async (key: string) => {
  try {

    const responceAllHooks = await fetch('https://ru.yougile.com/api-v2/webhooks', {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${key}`
      }
    })

    const data = await responceAllHooks.json()
    log.info('Найдены вебхуки YouGile', { count: data?.length })

    for (const hook of data) {

      const deleteWEbHook = await fetch(`https://ru.yougile.com/api-v2/webhooks/${hook.id}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${key}`
        },

        body: JSON.stringify({
          deleted: true,
          url: hook.url,
          event: hook.event,
          disabled: hook.disabled
        })
      })

      const data = await deleteWEbHook.json()
      return data

    }


    
  } catch (error) {
    log.error('Не удалось удалить вебхуки', error)
  }
}