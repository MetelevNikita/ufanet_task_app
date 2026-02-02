import { getBot } from "@/telegramBot/telegramBot";

// 


export const createTGTask = async (department: string, data: any, descriptionTask: string, taskDB: any, tgId: any) => {
  const buildCB = (status: string, department: string, cardId: any) => `${status}|${department}|${cardId}`

  try {

    const bot = await getBot();
    const id = taskDB.id as number


    const sendTgBot = bot.sendMessage(
      tgId as string,
      `Новое сообщение с доски - ${department}\n\n\n${descriptionTask}`,
      {
        reply_markup: {
          inline_keyboard: [
            [
              { text: 'Согласовать', callback_data: buildCB('approve', department, id.toString())},
              { text: 'Отклонить', callback_data: buildCB('reject', department, id.toString())},
              { text: 'Согласовать с комментарием', callback_data: buildCB('comment', department, id.toString())},
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