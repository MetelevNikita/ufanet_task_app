import { getBot } from "@/telegramBot/telegramBot";

// 


export const createTGTask = async (department: string, descriptionTask: string, taskDB: any, tgIdGroup: string) => {
  const buildCB = (status: string, department: string, cardId: string ) => `${status}|${department}|${taskDB.id}`

  console.log('WORK TG')
  console.log(tgIdGroup)


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
              { text: 'Согласовать', callback_data: buildCB('approve', department, taskDB.id)},
              { text: 'Отклонить', callback_data: buildCB('reject', department, taskDB.id)},
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