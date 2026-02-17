import dotenv from 'dotenv'
import path from 'path'
import TelegramBot from 'node-telegram-bot-api'

// YG

import { getYGTaskFromId } from '@/functions/getYGTaskFromId'
import { editYGTaskFromId } from '@/functions/editYGTaskFromId'



dotenv.config()





// sendAnswerMessage

const sendAnswerMessage = async (status: string, department: string, id: any) => {
  try {

    if (!process.env.API_URL) {
      throw new Error('API_URL не задан в переменных окружения');
    }

    const responce = await fetch(`${process.env.API_URL}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status, department }),
    })

    if (!responce.ok) {
      throw new Error(`Ошибка отправки ответа от телеграмм в yougile: ${responce.statusText}`);
    }

    const data = await responce.json();
    return data;
    
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      console.error('Ошибка отправки ответа от телеграмм в yougile: ', error.message);
      return
    }

    console.error('Неизвестная ошибка отправки ответа от телеграмм в yougile');
    return;

  }
}

// sendCommentMessageFromYG


const sendCommentMessage = async (text: string, ygTaskID: string) => {
  try {

    const YG_KEY = process.env.YOGILE_KEY_INSTANCE as string

    const data = await getYGTaskFromId(YG_KEY, ygTaskID)

    if (!data) {
      console.error(`Ошибка получения задачи из yougile по ID`)
      return {
              success: false,
              message: `Ошибка получения задачи из yougile по ID`,
              title: ``,
              comment: ''
            }
    }


    const taskTitle = `${new Date().toLocaleString('ru', { dateStyle: 'short', timeStyle: 'short' })} КОММЕНТАРИЙ К ЗАДАЧЕ - ${data.title}`
    const taskDescription = `${data.description}<br><br>${new Date().toLocaleString('ru', { dateStyle: 'short', timeStyle: 'short' })}<br><br><br><br>${text}`
    const taskColumnId = data.columnId

    const editYGTask = await editYGTaskFromId(YG_KEY, ygTaskID, taskTitle, taskColumnId, taskDescription)

    if (!editYGTask) {
      console.error(`Ошибка изменения задачи из yougile по ID`)
      return {
              success: false,
              message: `Ошибка изменения задачи из yougile по ID`,
              title: ``,
              comment: ''
            }
    }

    return {
      success: true,
      message: '',
      title: taskTitle,
      comment: text
    }
    
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      console.error('Ошибка отправки ответа от телеграмм в yougile: ', error.message);
      return {
              success: false,
              message: `Ошибка изменения задачи из yougile по ID`,
              title: ``,
              comment: ''
            }
    }

    console.error('Неизвестная ошибка отправки ответа от телеграмм в yougile');
    return {
              success: false,
              message: `Ошибка изменения задачи из yougile по ID`,
              title: ``,
              comment: ''
            }

  }
}



declare global {
  var _tgBot: TelegramBot | undefined;
  var _tgCreating: Promise<TelegramBot> | undefined;
}

export {};



const token = process.env.TG_TOKEN;
if (!token) throw new Error('TOKEN телеграмма не найден');

// проверяем, что бот уже создан

let creatingBotCashe: Promise<TelegramBot> | undefined;

export const getBot = async () => {

  // если бот уже создан, возвращаем его из кеша (глобальной переменной)

  if (globalThis._tgBot) return globalThis._tgBot;

  //  проверяем, что не создаем бота параллельно

  if (!creatingBotCashe) {
    creatingBotCashe = (async () => {

      const bot = new TelegramBot(token as string, { polling: false });


  // подписываемся на сообщения только один раз

      if (bot.listenerCount('message') === 0) {

        // Основа БОТА

        bot.on('message', async (msg) => {
        
          const chatId = msg.chat.id
          const text = msg.text
          const userId = msg.from?.id;
          const isReply = msg.reply_to_message;

          // ответ на комментарий

          if (isReply) {
            if (!msg.reply_to_message) return

            const titleText = msg.reply_to_message.text

            if (!titleText) return

            const splitText = titleText.split(' ')
            console.log(splitText)

            const ygId = splitText[2]
            const tgId = splitText[splitText.length - 1]

            const sendToYG = await sendCommentMessage(text as string, ygId)

            if (!sendToYG.success) {
              await bot.sendMessage(chatId, 'Ошибка! Комметарий не отправлен')
              return
            }


            const sendToTg = await bot.sendMessage(tgId, `\n\n${sendToYG.title}\n\n${text}`)

            if (!sendToYG.success) {
              await bot.sendMessage(chatId, 'Ошибка! Комметарий не отправлен')
              return
            }

            return await bot.sendMessage(chatId, 'ℹ️ Комментарий отмечен в задаче и направлен автору задачи')
          }

          // 

            if (msg.text === '/start') {
              await bot.sendMessage(chatId, 'Привет! Я бот для уведомлений из YouGile.', {
                reply_markup: {
                  keyboard: [
                      [{ text: 'Инфо', request_contact: false, request_location: false }, { text: 'Помощь', request_contact: false, request_location: false}],
                      [{ text: 'Ссылка на сайт если потеряли', request_contact: false, request_location: false}, { text: 'Найти мой Telegram ID', request_contact: false, request_location: false}], 
                  ],
                }
              })
            } else if (msg.text === 'Инфо') {
              await bot.sendMessage(chatId, 'Данный бот создан для утверждения и контроля над задачами созданными в PR Отдел')
            } else if (msg.text === 'Ссылка на сайт если потеряли') {
              await bot.sendMessage(chatId, 'https://pr-tz.ru не теряй')
            } else if (msg.text === 'Помощь') {
              await bot.sendMessage(chatId, 'В случае если бот не отправляет вам уведомления о состоянии вашей задачи, вам необходимо обратиться к руководителю отдела куда была заведена заявка для проверки вписанного вами TelegramID')
            } else if (msg.text === 'Найти мой Telegram ID') {
              await bot.sendMessage(chatId, 'Вы можете посмотреть свой Telegram ID на корпоративном сайте или воспользоватеься ботом @Getmyid_bot')
            } else {
              await bot.sendMessage(chatId, 'Еще что то спросить хотите.....')
            }
        })

        // ОТВЕТ НЕ КНОПКАХ

        bot.on('callback_query', async (query) => {

          // 

          const chatId = query.message?.chat.id as number;
          const messageId = query.message?.message_id as number;

          if (!query.data) return;

          const data = query.data.split('|')

          const status = data[0]
          const department = data[1]
          const cardId = data[2]
  


          if (status === 'approve') {

              console.log('approve')

              const YGCARD = await sendAnswerMessage(status, department, cardId)

              console.log(YGCARD)

              await bot.editMessageText(`Заявка # ${YGCARD.ygId} : ✅ согласована. Автор сообщения # ${YGCARD.tgId}`, {
                chat_id: chatId,
                message_id: messageId,
              });

          } else if (status === 'reject') {

              const YGCARD = await sendAnswerMessage(status, department, cardId)
              await bot.editMessageText(`Заявка # ${YGCARD.ygId} : ❌ отклонена. Автор сообщения # ${YGCARD.tgId}`, {
                chat_id: chatId,
                message_id: messageId,
              });


          }
        })
      }


      // если бот уже создается, ждем его создания и возвращаем тот же промис

      await bot.startPolling();

      // сохраняем бота в глобальную переменную, чтобы не создавать его заново

      globalThis._tgBot = bot;
      return bot;
    })();
  }

  return creatingBotCashe;
}