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
      console.error('Ошибка получения задачи из комании в YG: ', error.message);
      return null;
    }
    console.error('Ошибка получения задачи из комании в YG: ', error);
  }
}