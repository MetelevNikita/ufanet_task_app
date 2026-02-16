export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        const base64 = reader.result.split(',')[1] ?? '';
        resolve(base64);
      } else {
        reject(new Error('Ошибка при чтении файла'));
      }
    };
    reader.onerror = () => reject(new Error('Ошибка при чтении файла'));
  });
};





export const postTask = async (data: any, department: string) => {
  try {


    const entries = Object.entries(data)
    const newData = await Promise.all(entries.map(async ([key, val]) => {
        if (val instanceof FileList) {
          const files = await Promise.all(Array.from(val).map(async (file) => {
            return {
              name: file.name,
              size: file.size,
              base64: await fileToBase64(file)
            }
          }))

          return [key, files]
        } else {
          return [key, val]
        }
    }))


    const fromEntries = Object.fromEntries(newData) as any

    if (isNaN(parseInt(fromEntries.tgId))) {
      return {
        sucess: false,
        message: 'Telegram ID должен состоять из цифр (его можно посмотреть в боте)',
      }
    }

    const responce = await fetch (`/api/task/${department}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fromEntries)
    })

    if (!responce.ok) {
        return {
          sucess: false,
          message: `Ошибка при добавлении задачи: ${responce.statusText} - ${responce.status}`,
        }
    }

    if (responce.status === 200) {
      const data = await responce.json();
      console.log(data)
      return {
        sucess: true,
        message: 'Задача успешно добавлена',
      }
    } else if (responce.status === 400) {
      return {
        sucess: false,
        message: 'Задача не добавлена',
      }
    }


    
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      console.error(`Ошибка при добавлении задачи: ${error.message}`)

      return {
        success: false,
        message: 'Ошибка при добавлении задачи',
      }
    }

      console.error(`Ошибка при добавлении задачи: ${error}`)
      return {
        sucess: false,
        message: 'Ошибка при добавлении задачи',
      }
    
  }
}