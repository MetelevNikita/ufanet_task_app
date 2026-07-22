export async function getUsers () {
  try {

    const responce = await fetch('/api/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!responce.ok) {
      throw new Error(`Сетвая ошибка ${responce.status} - ${responce.statusText}`)
    }

    const data = await responce.json()
    return data
    
  } catch (error: Error | unknown) {

    if (error instanceof Error) {
      console.error(`Ошибка получения пользователей: ${error.message}`)

      throw new Error(
        JSON.stringify({
          status: 'error',
          message: `Ошибка получения пользователей: ${error.message}`
        })
      )
    }
    
  }
}