export const createYGTask = async (key: string, columnId: string, title: string, description: string, tgId: string ,deadline: number) => {


  

  try {

    const descriptionTask = `Описание${description}<br><br>Дедлайн - ${deadline}`

    const respoonce = await fetch(`https://ru.yougile.com/api-v2/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`
      },
      body: JSON.stringify({
        title: title,
        columnId: columnId,
        description: descriptionTask,
        deadline: {deadline: deadline}
      })
    })

    if (!respoonce.ok) {
      if (respoonce.status === 400) {
        throw new Error(`Ошибка создания задачи в YG ${respoonce.statusText} - ${respoonce.status}`);
      }
    }

    const data = await respoonce.json()
    return data
    
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      console.error('Ошибка создания задачи в YG: ', error.message);
      return null;
    }
    console.error('Ошибка создания задачи в YG: ', error);
  }
}