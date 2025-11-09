
import { advertisingMessage } from '@/data/advertisingMessage'
import { prMessage } from '@/data/prMessage'
import { designMessage } from '@/data/designMessage'



export const createMessageTgYG = async (department: string, data: any) => {
  try {

    console.log(department)

    switch (department) {
      case 'Отдел рекламы':
        return await advertisingMessage(department, data)
      case 'Интернет маркетинг':
        return ''
      case 'PR отдел':
        return prMessage(department, data)
      case 'Отдел дизайна':
        return designMessage(department, data)
      default: 
        return {
          messageTG: 'НЕ ТАКОГО ТИПА ЗАДАЧ!',
          messageYG: 'НЕ ТАКОГО ТИПА ЗАДАЧ!'
        }
    }


  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      return {
          message: `Ошибка создания сообщения ${error.message}`,
          status: 500
      }
    }

    return {
      message: 'Неизвестная ошибка',
      status: 500
    }
  }
}