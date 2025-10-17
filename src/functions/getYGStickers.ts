export const getYGStickers = async (key: string) => {
  try {

    const responce = await fetch('https://ru.yougile.com/api-v2/string-stickers', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`
      }
    })

    if (!responce.ok) {
      throw new Error(`Ошибка получения стикеров из YG ${responce.statusText} - ${responce.status}`);
    }

    const data = await responce.json()
    return data
    
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      console.error(`Ошибка получения стикеров из YG: ${error.message}`);
      return null;
    }
    return null
  }
}