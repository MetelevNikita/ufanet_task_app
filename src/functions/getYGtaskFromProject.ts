
export const getYGtaskFromProject = async (key: string) => {
  try {

    const responce = await fetch('https://ru.yougile.com/api-v2/task-list', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`
      }
    })

    if (!responce.ok) {
       throw new Error(`Ошибка получения задач из YG ${responce.statusText} - ${responce.status}`);
    }

    const data = await responce.json()
    return data
    
  } catch (error: Error | unknown) {

    if (error instanceof Error) {
      console.error(`Ошибка получения задач из YG ${error.message}`)
      return `Ошибка получения задач из YG ${error.message}`
    }


    console.error(`Ошибка получения задач из YG ${error}`)
    return `Ошибка получения задач из YG ${error}`

    
  }
}