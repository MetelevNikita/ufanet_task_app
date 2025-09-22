export const getDeskCompany = async (key: string) => {
  try {

    const responce = await fetch('https://yougile.com/api-v2/boards', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`
      }
    })

    if (!responce.ok) {
      throw new Error(`Ошибка получения досок из компании в YG ${responce.statusText} - ${responce.status}`);
    }

    const data = await responce.json();
    return data;
    
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      console.error('Ошибка получения досок из комании в YG: ', error.message);
      return null;
    }
    console.error('Ошибка получения досок из комании в YG: ', error);
  }
}