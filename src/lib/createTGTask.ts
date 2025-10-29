import { getBot } from "@/telegramBot/telegramBot";

// 


export const createTGTask = async (department: string, data: any, descriptionTask: string, taskDB: any) => {
  const buildCB = (status: string, department: string, cardId: any) => `${status}|${department}|${cardId}`

  try {
    const id = taskDB.id as number
    const bot = await getBot();
    
    if (!process.env.TG_ID_BOSS) {
      return `Не задан TG_ID_BOSS в переменных окружения`
    }

    const sendTgBot = bot.sendMessage(
      process.env.TG_ID_BOSS as string,
      `Новое сообщение с доски - ${department}\n\n\n${descriptionTask}`,
      {
        reply_markup: {
          inline_keyboard: [
            [
              { text: 'Согласовать', callback_data: buildCB('approve', department, id.toString())},
              { text: 'Отклонить', callback_data: buildCB('reject', department, id.toString())},
              { text: 'Согласовать с замечаниями', callback_data: buildCB('comment', department, id.toString())}
            ]
          ]
        }
      }
    )

    return sendTgBot
    
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      console.log(error.message)
      throw new Error(error.message);
    }
  }
}