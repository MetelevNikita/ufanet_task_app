export const editYGTaskFromId = async (key: string, id: string, title: string, columnId: any, description: string) => {
  try {

    const responce = await fetch(`https://ru.yougile.com/api-v2/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${key}`
      },
      body: JSON.stringify({
        deleted: false,
        title: title,
        columnId: columnId,
        description: description

      })
    })

    if (!responce.ok) {
      throw new Error(
        `Ошибка получения задачи из YG по ID ${responce.statusText} - ${responce.status}`
      )
    }

    const data = await responce.json()
    return data

    
  } catch (error: Error | unknown) {

    if (error instanceof Error) {
      console.error(`Ошибка изменения задачи по ID ${error.message}`)
      return `Ошибка изменения задачи по ID ${error.message}`
    }


    console.error(`Ошибка изменения задачи по ID ${error}`)
    return `Ошибка изменения задачи по ID ${error}`

    
  }
}