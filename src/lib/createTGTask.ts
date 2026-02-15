import { getBot } from "@/telegramBot/telegramBot";

// 


export const createTGTask = async (department: string, descriptionTask: string, taskDB: any, tgIdGroup: string) => {
  const buildCB = (status: string, department: string, cardId: any, ygId: string, tgid: string ) => `${status}|${department}|${taskDB.id}|${taskDB.ygId}|${taskDB.tgId}`

  console.log('WORK TG')
  console.log(taskDB)

  try {

    const bot = await getBot();
    const id = taskDB.id as number


    const sendTgBot = bot.sendMessage(
      tgIdGroup as string,
      `Новое сообщение с доски - ${department}\n\n\n${descriptionTask}`,
      {
        reply_markup: {
          inline_keyboard: [
            [
              { text: 'Согласовать', callback_data: buildCB('approve', department, taskDB.id, taskDB.ygId, taskDB.tgId)},
              { text: 'Отклонить', callback_data: buildCB('reject', department, taskDB.id, taskDB.ygId, taskDB.tgId)},
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