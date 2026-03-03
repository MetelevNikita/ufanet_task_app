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
        success: false,
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
          success: false,
          message: `Ошибка при добавлении задачи: ${responce.statusText} - ${responce.status}`,
        }
    }

    const dataTask = await responce.json();
    console.log(dataTask)
    return dataTask

   

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
        success: false,
        message: 'Ошибка при добавлении задачи',
      }
    
  }
}