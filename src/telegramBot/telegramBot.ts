import dotenv from 'dotenv'
import path from 'path'
import TelegramBot from 'node-telegram-bot-api'

dotenv.config({
  path: path.resolve(
    process.cwd(), '.env'
  )
})


// sendAnswerMessage

const sendAnswerMessage = async (message: string) => {
  try {

    const cardId = JSON.parse(message).cardId
    const status = JSON.parse(message).message

    console.log('cardId', cardId)
    console.log('status', status)

    if (!process.env.API_URL) {
      throw new Error('API_URL не задан в переменных окружения');
    }

    const responce = await fetch(`${process.env.API_URL}/${cardId}` as string, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    })

    if (!responce.ok) {
      throw new Error(`Ошибка отправки ответа от телеграмм в yougile: ${responce.statusText}`);
    }

    const data = await responce.json();
    console.log('data', data);
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
        bot.on('message', (msg) => {
        
          const chatId = msg.chat.id

            if (msg.text === '/start') {
              bot.sendMessage(chatId, 'Привет! Я бот для уведомлений из YouGile.', {
                reply_markup: {
                  keyboard: [
                    [{ text: 'Помощь', request_contact: false, request_location: false }],
                  ],
                }
              })
            } else if (msg.text === 'Помощь') {
              bot.sendMessage(chatId, 'Данный бот создан для утверждения заявок')
            } else {
              bot.sendMessage(chatId, 'Еще что то спросить хотите.....')
            }
        })


        bot.on('callback_query', async (query) => {

          const chatId = query.message?.chat.id as number;
          const messageId = query.message?.message_id as number;

          if (!query.data) return;

          const data = JSON.parse(query.data);
          console.log('data', data)

          if (data.message === 'approve') {

              console.log('query', query.data)


              await sendAnswerMessage(query.data)
              await bot.editMessageText(`Заявка #${query.id}: ✅ согласовано`, {
                chat_id: chatId,
                message_id: messageId
              });

          } else if (data.message === 'reject') {

              await sendAnswerMessage(query.data)
              await bot.editMessageText(`Заявка #${query.id}: ❌ отклонено`, {
                chat_id: chatId,
                message_id: messageId
              });

          } else if (data.message === 'comment') {
              await sendAnswerMessage(query.data)
              await bot.editMessageText(`Заявка #${query.id}: ❓ ЗАМЕЧАНИЯ!!!!`, {
                chat_id: chatId,
                message_id: messageId
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



