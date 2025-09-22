export const getYGColumns = async (key: string, boardId: string) => {
  try {

    const responce = await fetch(`https://ru.yougile.com/api-v2/columns?boardId=${boardId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`
      }
    })

    if (!responce.ok) {
      throw new Error(`Ошибка получения колонок из компании в YG ${responce.statusText} - ${responce.status}`);
    }

    const data = await responce.json();
    return data
    
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      console.error('Ошибка получения колонок из комании в YG: ', error.message);
      return null;
    }
    console.error('Ошибка получения колонок из комании в YG: ', error);
  }
}