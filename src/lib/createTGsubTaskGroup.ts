import { getBot } from "@/telegramBot/telegramBot";
import { logger } from "@/lib/logger";

const log = logger('tg')

// 


export const createTGsubTaskGroup = async (department: string, descriptionTask: string, taskDB: any, tgIdGroup: string, resendTgId: string) => {
  const buildCB = (status: string, cardId: string, resendTgId: string ) => `${status}|${cardId}|${resendTgId}`


  try {

    const bot = await getBot();

    await bot.sendMessage(resendTgId, descriptionTask,
      {
        reply_markup: {
          inline_keyboard: [
            [
              { text: 'Согласовать', callback_data: buildCB('approve_resend', taskDB.id, tgIdGroup)},
              { text: 'Отклонить', callback_data: buildCB('reject_resend', taskDB.id, tgIdGroup)},
              { text: 'Перенести в группу без пред. согласования', callback_data: buildCB('wrong_group_resend', taskDB.id, tgIdGroup)}
            ]
          ]
        }
      }
    )

    log.ok('Задача отправлена на предварительное согласование', { taskId: taskDB.id, chatId: resendTgId })

    return {
      success: true,
      message: `Сообщение отправлено`,
      data: null
    }
    
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      log.error('Не удалось отправить задачу на предварительное согласование', error, { taskId: taskDB.id, chatId: resendTgId })
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