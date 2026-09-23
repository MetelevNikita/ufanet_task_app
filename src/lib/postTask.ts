import { logger } from "@/lib/logger";

const log = logger('task')

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





// время ожидания ответа сервера, после которого запрос отменяется автоматически
const REQUEST_TIMEOUT_MS = 20_000

export const postTask = async (data: any, department: string, signal?: AbortSignal, timeoutMs: number = REQUEST_TIMEOUT_MS) => {
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

    const timeoutSignal = AbortSignal.timeout(timeoutMs)
    const combinedSignal = signal ? AbortSignal.any([signal, timeoutSignal]) : timeoutSignal

    const responce = await fetch (`/api/task/${department}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fromEntries),
      signal: combinedSignal
    })

    if (!responce.ok) {
        return {
          success: false,
          message: `Ошибка при добавлении задачи: ${responce.statusText} - ${responce.status}`,
        }
    }

    const dataTask = await responce.json();
    return dataTask

   

  } catch (error: Error | unknown) {
    if (error instanceof DOMException && error.name === 'TimeoutError') {
      log.error(`Сервер не ответил за ${timeoutMs} мс`)
      return {
        success: false,
        aborted: true,
        timedOut: true,
        message: 'Превышено время ожидания ответа сервера. Попробуйте ещё раз',
      }
    }

    if (error instanceof DOMException && error.name === 'AbortError') {
      log.warn('Отправка задачи отменена')
      return {
        success: false,
        aborted: true,
        message: 'Запрос отменён',
      }
    }

    if (error instanceof Error) {
      log.error('Ошибка отправки задачи', error)

      return {
        success: false,
        message: 'Ошибка при добавлении задачи',
      }
    }

      log.error('Ошибка отправки задачи', error)
      return {
        success: false,
        message: 'Ошибка при добавлении задачи',
      }
    
  }
}