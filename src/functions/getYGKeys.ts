export const getYGKeys = async (id: string) => {
  try {

    const responce = await fetch('https://yougile.com/api-v2/auth/keys/get', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
        body: JSON.stringify({
          login: process.env.YG_LOGIN,
          password: process.env.YG_PASSWORD,
          companyId: id
    })
  })

  if (!responce.ok) {
    throw new Error(`Ошибка получения ключей из YG ${responce.statusText} - ${responce.status}`);
  }

  const data = await responce.json();
  return data;
    
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Ошибка получения ключей из YG: ${error.message}`);
      return null;
    }
    console.error(`Ошибка получения ключей из YG ${error}`);
  }
}