export const getYGCompany = async () => {
  try {

    const responce = await fetch('https://yougile.com/api-v2/auth/companies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
        body: JSON.stringify({
          login: process.env.YG_LOGIN,
          password: process.env.YG_PASSWORD
          
      })
    })

    if (!responce.ok) {
      throw new Error('Failed to fetch data from yougile');
    }

    const data = await responce.json();
    return data;
      
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      console.log(`Ошибка получения списка компаний из YouGile: ${error.message}`);
      return null;
    }
    console.log(`Ошибка получения списка компаний из YouGile: ${error}`);
  }
}