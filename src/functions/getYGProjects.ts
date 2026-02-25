export const getYGProjects = async (key: string) => {
  try {

    const responce = await fetch('https://ru.yougile.com/api-v2/projects', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`
      }
      
    })

    if (!responce.ok) {
      if (responce.status === 401) {
        console.error('Ошибка получения проектов из YG. Необходимо обновить ключи');
        return null;
      } else {
        throw new Error(`Ошибка получения проектов из YG ${responce.statusText} - ${responce.status}`);
      }
    }

    const data = await responce.json();
    return data
    
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      console.error(`Ошибка получения проектов из YG: ${error.message}`);
      return null;
    }
    return null
  }
}