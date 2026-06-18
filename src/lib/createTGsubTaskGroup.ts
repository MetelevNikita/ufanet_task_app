import { getBot } from "@/telegramBot/telegramBot";

// 


export const createTGsubTaskGroup = async (department: string, descriptionTask: string, taskDB: any, tgIdGroup: string, resendTgId: string) => {
  const buildCB = (status: string, cardId: string, resendTgId: string ) => `${status}|${cardId}|${resendTgId}`

  console.log('WORK TG')
  console.log(tgIdGroup)

  try {

    const bot = await getBot();

    bot.sendMessage(resendTgId, descriptionTask, 
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


    return {
      success: true,
      message: `Сообщение отправлено`,
      data: null
    }
    
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      console.log(error.message)
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