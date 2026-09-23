import { getBot } from "@/telegramBot/telegramBot";
import { logger } from "@/lib/logger";

const log = logger('tg')

// 


export const createTGTask = async (department: string, descriptionTask: string, taskDB: any, tgIdGroup: string, resendTgId: string) => {
  const buildCB = (status: string, cardId: string, resendTgId: string ) => `${status}|${cardId}|${resendTgId}`


  try {

    const bot = await getBot();
    const id = taskDB.id as number


    const sendTgBot = await bot.sendMessage(
      tgIdGroup as string,
      `Новое сообщение с доски - ${department}\n\n\n${descriptionTask}`,
      {
        reply_markup: {
          inline_keyboard: [
            [
              { text: 'Согласовать', callback_data: buildCB('approve', taskDB.id, '')},
              { text: 'Отклонить', callback_data: buildCB('reject', taskDB.id, '')},
            ]
          ]
        }
      }
    )

    log.ok('Задача отправлена в группу согласования', { taskId: id, chatId: tgIdGroup })

    return {
      success: true,
      message: `Сообщение отправлено`,
      data: null
    }
    
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      log.error('Не удалось отправить задачу в группу согласования', error, { taskId: taskDB.id, chatId: tgIdGroup })
      return {
        success: false,
        message: `Ошибка отправки сообщения в телеграм - ${error.message}`,
        data: null
      }
    }

    return {
      success: false,
      message: `Ошибка отправки сообщения в телеграм - ${error}`,
      data: null
    }
  }
}