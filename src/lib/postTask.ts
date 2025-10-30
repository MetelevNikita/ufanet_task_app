

export const postTask = async (formData: FormData) => {
  try {

    const department = (typeof window !== "undefined") ? sessionStorage.getItem('department') : ''
    console.log(department)
  
    const responce = await fetch (`/api/task/${department}`, {
      method: 'POST',
      body: formData
    })

    if (!responce.ok) {
      if (responce.status === 400) {
        throw new Error(`Ошибка при добавлении задачи: ${responce.statusText} - ${responce.status}`);
      }
    }

    if (responce.status === 200) {
      const data = await responce.json();
      console.log(data)
      return {
        status: 'success',
        message: 'Задача успешно добавлена',
      }
    } else if (responce.status === 400) {
      return {
        status: 'abort',
        message: 'Задача не добавлена',
      }
    }


    
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      console.error(`Ошибка при добавлении задачи: ${error.message}`)

      throw new Error(
        JSON.stringify({
          status: 'error',
          message: `Ошибка при добавлении задачи: ${error.message}`
        })
      )
    }

      console.error(`Ошибка при добавлении задачи: ${error}`)
      throw new Error(`Ошибка при добавлении задачи: ${error}`);
    
  }
}