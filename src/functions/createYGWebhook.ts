export const createYGWebhook = async (key: string) => {
  try {


    console.log(process.env.WEBHOOK_URL)

    const responce = await fetch('https://yougile.com/api-v2/webhooks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`
      },
      body: JSON.stringify({
        url: `${process.env.WEBHOOK_URL}/api/webhook/${key}`,
        event: 'task-*'
      })
      
    })

    if (!responce.ok) {
      throw new Error(
        `Ошибка создания вебхука в YG ${responce.statusText} - ${responce.status}`
      );
    }

    const data = await responce.json();
    return data
    
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      console.error(
        'Ошибка создания вебхука в YG: ',
        error.message
      );
    }

    console.error(error)
    
  }
}