export const getTask = async (endpoint: string) => {
  try {


    const responce = await fetch(`/api/task/${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!responce.ok) {
      throw new Error(
        JSON.stringify({
          status: 'error',
          message: `Ошибка получения задач: ${responce.statusText} - ${responce.status}`
        })
      )
    }

    const data = await responce.json()
    return data
    
  } catch (error: Error | unknown) {

    if (error instanceof Error) {
      console.error(`Ошибка получения задач: ${error.message}`)

      throw new Error(
        JSON.stringify({
          status: 'error',
          message: `Ошибка получения задач: ${error.message}`
        })
      )
    }
    
  }
}