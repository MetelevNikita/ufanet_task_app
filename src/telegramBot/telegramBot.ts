import dotenv from 'dotenv'
import TelegramBot from 'node-telegram-bot-api'
import { SocksProxyAgent } from 'socks-proxy-agent'
import { PrismaClient } from "@/../generated/prisma/client";

// lib

import { createMessageTgYG } from '@/lib/createMessageTgYG';

// YG

import { getYGTaskFromId } from '@/functions/getYGTaskFromId'
import { editYGTaskFromId } from '@/functions/editYGTaskFromId'
import { logger } from "@/lib/logger";

const log = logger('tg')



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
      return {
        success: false,
        message: `Ошибка отправки ответа от телеграмм в yougile: ${responce.statusText}`,
        data: null
      }
    }

    const data = await responce.json();
    return {
        success: true,
        message: `Ответ от телеграмм в yougile: ${responce.statusText}`,
        data: data
      }
    
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      log.error('Ответ из Telegram не передан в YouGile', error);
      return {
        success: false,
        message: `Ошибка отправки ответа от телеграмм в yougile: ${error.message}`,
        data: null
      }
    }

    log.error('Ответ из Telegram не передан в YouGile', error);
    return {
        success: false,
        message: `Ошибка отправки ответа от телеграмм в yougile: ${error}`,
        data: null
    }

  }
}

// sendCommentMessageFromYG


const sendCommentMessageYG = async (text: string, ygTaskID: string) => {
  try {

    const YG_KEY = process.env.YOGILE_KEY_INSTANCE as string
    
    const data = await getYGTaskFromId(YG_KEY, ygTaskID)

    if (!data) {
      log.error('Задача YouGile не найдена', undefined, { ygTaskID })
      return {
              success: false,
              message: `Ошибка получения задачи из yougile по ID`,
              title: ``,
              comment: ''
            }
    }


    const now = new Date().toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })

    const taskTitle = `${now} ${data.title}`
    // editYGTaskFromId сам подтянет текущее описание и добавит к нему эту часть
    const taskDescription = `${now}<br>Комментарий из группы: ${text}`
    const taskColumnId = data.columnId

    const editYGTask = await editYGTaskFromId(YG_KEY, ygTaskID, data.title, taskColumnId, taskDescription)

    if (!editYGTask || typeof editYGTask === 'string') {
      log.error('Задача YouGile не изменена', undefined, { ygTaskID })
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
      comment: text,
      originalTitle: data.title
    }
    
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      log.error('Комментарий из группы не передан в YouGile', error);
      return {
              success: false,
              message: `Ошибка изменения задачи из yougile по ID`,
              title: ``,
              comment: ''
            }
    }

    log.error('Комментарий из группы не передан в YouGile', error);
    return {
            success: false,
            message: `Ошибка изменения задачи из yougile по ID`,
            title: ``,
            comment: ''
            }

  }
}


const sendCommentMessageDB = async (title: string | number, message: string) => {

  try {
      const responce = await fetch (`${process.env.WEBHOOK_URL as string}/api/comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
        comment: message
      })
    })

    const data = await responce.json()
    return data
    
  } catch (error: Error | unknown) {

    if (error instanceof Error) {
      log.error('Комментарий не сохранён в БД', error)
      return {
        success: false,
        message: `Ошибка создания комментария ${error.message}`
      }
    }


      log.error('Комментарий не сохранён в БД', error)
      return {
        success: false,
        message: `Ошибка создания комментарий ${error}`
      }

    
  }
}



// FN from ADMIN PANEL



  async function confimedUser (id: string, query: any, answer: string, chatId: number, bot: TelegramBot) {

    try {
      
      const currentUser = await prisma.user.findFirst({
        where: {
          id: parseInt(id)
        }
      })

      if (!currentUser) {
        log.error('Пользователь для подтверждения не найден', undefined, { id })
        return 'Не найден пользователь в базе данных'
      }

      const updateUser = await prisma.user.update({
        where: {
          id: parseInt(id)
        },
        data: {
          сonfirmed: true
        }
      })

      if (updateUser) {

        await bot.sendMessage(currentUser.telegramId as string, `Пользователь id:${currentUser.id}#${currentUser.name} добавлен в систему\n\nВход разрешен\n\nПерезагрузите страницу входа`, {parse_mode: 'HTML'})

        await bot.editMessageText(
            `Пользователь id: ${currentUser.id}#${currentUser.name as string} авторизован и добавлен в базу данных\n\nДата обработки\n${new Date().toLocaleDateString('RU-ru')} - ${new Date().toLocaleTimeString('RU-ru')}`,
            {
              parse_mode: 'HTML',
              chat_id: query.message?.chat.id,
              message_id: query.message?.message_id,
            }
        )

        log.ok('Пользователь подтверждён', { id })
        return 'Сообщение отправлено'

      } else {
        log.error('Пользователь не подтверждён в БД', undefined, { id })
      }

    } catch (error) {
      log.error('Ошибка подтверждения пользователя', error, { id })
      return `Ошбика смены статуса регистрации пользваотеля`
    }
  }

  async function deleteUser (id: string, query: any, answer: string, chatId: number, bot: TelegramBot) {


    try {
      
        const checkUser = await prisma.user.findFirst({
          where: {
            id: parseInt(id)
          }
        })

        if (!checkUser) {
          log.error('Пользователь для удаления не найден', undefined, { id })
          bot.sendMessage(chatId, 'Ошибка удаления пользователя')
          return `Ошбика удаления пользваотеля`
        }


        const deleteUser = await prisma.user.delete({
          where: {
            id: parseInt(id)
          }
        })

        bot.sendMessage(checkUser.telegramId, `Администрация сайта pr-tz.ru удалили пользователя ${checkUser.name}\n\nЗа дополнительной информацией обратитесь в службу PR\n\nДата удаления ${new Date().toLocaleDateString('RU-ru')}`, {parse_mode: 'HTML'})


        bot.editMessageText(
          `Пользователь ${id}#${answer} - Удален\nДата удаления - ${new Date().toLocaleDateString('RU-ru')}`,
          {
            chat_id: query.message?.chat.id,
            message_id: query.message?.message_id,
          }
        )

        log.ok('Пользователь удалён', { id })
        return 'Сообщение удалено'

    } catch (error) {
      log.error('Ошибка удаления пользователя', error, { id })
      return `Ошбика удаления пользваотеля`
    }



  }

  async function resetUser (id: string, query: any, answer: string, chatId: number, bot: TelegramBot) {

    try {
      
      const checkUser = await prisma.user.findFirst({
        where: {
          id: parseInt(id)
        }
      })

      if (!checkUser) {
        log.error('Пользователь для сброса не найден', undefined, { id })
        bot.sendMessage(chatId, 'Ошибка удаления пользователя')
        return
      }

      const changeStatus = await prisma.user.update({
        where: {
          id: parseInt(id)
        },
        data: {
          сonfirmed: false
        }
      })

      if (!changeStatus) {

        log.error('Статус пользователя не сброшен', undefined, { id })
        bot.sendMessage(query.message?.chat.id as number | string, `Ошибка смены статуса пользователя ${id}#${answer}, попробуйте позже`)
        return 'Сообщение изменено'
      }


      bot.sendMessage(checkUser.telegramId, `Администрация сайта pr-tz.ru изменили стату регистрации пользователя ${checkUser.name}\n\nДоступ на сайт запрещен\n\nЗа дополнительной информацией обратитесь в службу PR\n\nДата удаления ${new Date().toLocaleDateString('RU-ru')}`)

      bot.editMessageText(
        `Пользователь ${id}#${answer} - Изменен\n\nСтатус активации пользователя в системе - Ожидает подтверждения\nДата удаления - ${new Date().toLocaleDateString('RU-ru')}`,
        {
          chat_id: query.message?.chat.id,
          message_id: query.message?.message_id,
        }
      )

      return 'Сообщение изменено'


    } catch (error) {
      log.error('Ошибка сброса статуса пользователя', error, { id })
      return 'Ошибка из изменения'
    }

  }


  // 


  function chunkArray<T>(array: T[], chunkSize: number = 10): T[][] {
  const chunks: T[][] = []

  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize))
  }

  return chunks
}



  // 



declare global {
  var _tgBot: TelegramBot;
  var _tgCreating: Promise<TelegramBot> | undefined;
  var _tgPolling: boolean | undefined;
}

export {};


// proxy


const proxyHost = process.env.PROXY_SOCKS5_HOST
const proxyPort = process.env.PROXY_SOCKS5_PORT || '1080'
const proxyUser = process.env.PROXY_SOCKS5_USERNAME
const proxyPass = process.env.PROXY_SOCKS5_PASSWORD

const proxyAuth =
  proxyUser && proxyPass
    ? `${encodeURIComponent(proxyUser)}:${encodeURIComponent(proxyPass)}@`
    : ''

const telegramAgent = proxyHost
  ? new SocksProxyAgent(`socks5h://${proxyAuth}${proxyHost}:${proxyPort}`)
  : undefined

  // 


const prisma = new PrismaClient()


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

      const bot = new TelegramBot(token as string, {
        polling: false,
        // timeout: без него зависший прокси вешает sendMessage навсегда
        request: ({ agent: telegramAgent, timeout: 15000 } as any),
      });


      log.info('Бот инициализирован', { pid: process.pid });

      // Статус

      bot.getMe()
        .then((botInfo) => {
          log.ok(`Бот подключен: @${botInfo.username}`)
        })
        .catch((error) => {
          log.error('Бот не подключился', error)
        })

      bot.on('polling_error', (error) => {
        log.error('Ошибка polling', error)
      })

      bot.on('error', (error) => {
        log.error('Ошибка бота', error)
      })


      // подписываемся на сообщения только один раз

      if (bot.listenerCount('message') === 0) {

        // Основа БОТА
        

        bot.on('message', async (msg) => {

          try {
            

        
            const chatId = msg.chat.id
            const text = msg.text
            const userId = msg.from?.id;
            const isReply = msg.reply_to_message;

            // 

            if (msg.chat.id.toString() === process.env.ADMIN_GROUP) {

                  const allUsers = await prisma.user.findMany()

                  const resCommand = await bot.setMyCommands([
                    { command: 'start', description: 'Start bot' },
                    { command: 'help', description: 'Help' },
                  ])
              
              
                  if (text === '/start') {
                    bot.sendMessage(process.env.ADMIN_GROUP, 'Админ бот приложения PR-TZ.ru', {
                      reply_markup: {
                        keyboard: [
                          [{ text: 'Получить пользователей' }],
                          [{ text: 'Пользователи списком' }]
                        ],
                        resize_keyboard: true,
                        one_time_keyboard: true
                      }
                    })
                  }

                  // 
              
                  if (text === 'Получить пользователей') {
                
                    if (allUsers.length < 1) {
                    bot.sendMessage(process.env.ADMIN_GROUP as string, 'Список пуст', {parse_mode: 'HTML'})
                      return 'Данные получены'
                    } else {
                        allUsers.map((item: {id: number, name: string, lastName: string, email: string, сonfirmed: boolean, createAt: Date, }) => {
                        
                        const message = `${item.id}#${item.name} ${item.lastName ?? ''} - ${item.email} # Подтверждение ${(item.сonfirmed) ? 'Подтвержден' : 'Ожидает подтверждения'} - Дата создания ${new Date(item.createAt).toLocaleDateString('RU-ru')}`
              
                        bot.sendMessage(process.env.ADMIN_GROUP as string, message, {
                          reply_markup: {
                            inline_keyboard: [
                              [{text: 'Удалить', callback_data: `${item.id}|DELETE|${item.name}`}],
                            ]
                          }
                        })
                        return 'Данные получены'
                      })
                    }
              
              
                  }

                  if (text === 'Пользователи списком') {

                    const listUsers = allUsers.map((item) => {
                      return `${item.id} - Пользователь: ${item.name} ${item.lastName} # Статус: ${(item.сonfirmed == true) ? 'Подтвержден' : 'Одидает подтверждения'} - email: ${item.email} Дата создания: ${new Date(item.createAt).toLocaleDateString('RU-ru')}\n`
                    })

                    const userChunks = chunkArray(listUsers, 10)



                    for (let i = 0; i < userChunks.length; i++) {
                      const isLast = i === userChunks.length - 1
                      const text = userChunks[i].join('\n')

                      await bot.sendMessage(
                        process.env.ADMIN_GROUP as string,
                        `Список пользователей (${i + 1}/${userChunks.length})\n\n${text}`,
                        isLast
                          ? {
                              reply_markup: {
                                inline_keyboard: [
                                  [{ text: 'Удалить пользователя (Подсказка)', callback_data: 'delete_single_user' }]
                                ]
                              }
                            }
                          : undefined
                      )
                    }

                  }

                  if (text?.startsWith('Пользователь:')) {


                    const id = text.split(':')[1]

                    const findUser = allUsers.find((item: {id: number}) => item.id == Number(id))

                    if (!findUser) {
                      bot.sendMessage(process.env.ADMIN_GROUP as string, 'Пользователь с таким id не найден, попробуйте снова')
                      return
                    }

                    bot.sendMessage(process.env.ADMIN_GROUP as string, 'Выполняю поиск пользователя, ожидайте')

                    const message = `${findUser.id}#${findUser.name} ${findUser.lastName ?? ''} - ${findUser.email} # Подтверждение ${(findUser.сonfirmed) ? 'Подтвержден' : 'Ожидает подтверждения'} - Дата создания ${new Date(findUser.createAt).toLocaleDateString('RU-ru')}`
              
                    bot.sendMessage(process.env.ADMIN_GROUP as string, message, {
                      reply_markup: {
                        inline_keyboard: [
                          [{text: 'Удалить', callback_data: `${findUser.id}|DELETE|${findUser.name}`}],
                        ]
                      }
                    })
                  }

                  return
            }


            // ответ на комментарий

            if (isReply) {
              if (!msg.reply_to_message) return

              const titleText = msg.reply_to_message.text

              if (!titleText) return

              const matchYG = titleText.match(/Заявка\s*#\s*([^:\s]+)/i)
              const matchTG = titleText.match(/Автор\s+сообщения\s*#\s*(\d+)/i)
              const ygId = matchYG?.[1]
              const tgId = matchTG?.[1]

              if (!ygId || !tgId) {
                await bot.sendMessage(chatId, 'ОШИБКА! Не удалось получить данные о задаче')
                return
              }

              const allUsers = await prisma.task.findMany()
              const currentTask = allUsers.find((item: {ygId: string}) => item.ygId == ygId)
              
              if (!currentTask) {
                await bot.sendMessage(chatId, 'ОШИБКА! Не удалось получить данные о задаче из базы')
                return
              }

              // 

              const sendToDB = await sendCommentMessageDB(currentTask.title, text as string)
              log.ok('Комментарий из группы сохранён в БД', { ygId })

              // 


              try {

                await sendCommentMessageYG(text as string, ygId)
                log.ok('Комментарий из группы отправлен в YouGile', { ygId })
                
              } catch (error) {
                log.error('Комментарий из группы не отправлен в YouGile', error, { ygId })
                await bot.sendMessage(chatId, 'Ошибка! Комметарий не отправлен')
                return
              }


              const sendToTg = await bot.sendMessage(tgId, `КОММЕНТАРИЙ к Задаче - \n\n${currentTask.title}\n\n${text}`)
              return await bot.sendMessage(chatId, 'ℹ️ Комментарий отмечен в задаче и направлен автору задачи')
            }

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
              return
            }


          } catch (error) {
            log.error('Ошибка обработки сообщения', error)
          }

        })

      }



      bot.on('callback_query', async (query) => {

        bot.answerCallbackQuery(query.id).catch(() => {}) // ponytail: ответ косметический, протухший query.id игнорируем

        try {
          
          if (!query.message || !('text' in query.message) || !('chat' in query.message)) {
            return 'Сообщение не найдено'
          }

          const chatId = query.message?.chat.id

          if (chatId.toString() === process.env.ADMIN_GROUP) {

              if (query.data === 'delete_single_user') {

                const groupId = query.message.chat.id

                await bot.sendMessage(groupId, 'Что бы удалить пользователя необходимо:\n\n1)Напишите в группу сообщение\n2) ВНИМАНИЕ формат сообщения "Пользователь:НОМЕР ПОЛЬЗОВАТЕЛЯ (номер был узказан в выводе сообщения)"\n3)Следующим сообщение придет ответ с данными о пользователе и кнопкой удалить\n3)Удаляете пользователя')

                return
              }


              const data = query.data?.split('|') as any
              const text = query.message.text


              const answer = data[2]
              const method = data[1]
              const id = data[0]


              if (!text) {
                return 'Сообщение не найдено'
              }

              // 


              switch (method) {
                case 'CONFIRMED':
                  return await confimedUser(id, query, answer, chatId, bot)
                case 'DELETE':
                  return await deleteUser(id, query, answer, chatId, bot)
                case 'RESET':
                  return await resetUser(id, query, answer, chatId, bot)
                  
              }

              return

          } else {


            const messageId = query.message?.message_id as number;
            const reconciliatorUser = `@${query.from.username}`

            if (!query.data) return;

            const data = query.data.split('|')
            const status = data[0]
            const cardId = data[1]


            const currentCard = await prisma.task.findFirst({
              where: {
                id: parseInt(cardId)
              }
            })


            if (!currentCard) {
              throw new Error('Ошибка! Не удалось найти карточку с задачей')
            }

            function parseCurrentCard (currentCard: any) {
                  const res = {
                      ...currentCard,
                      ...JSON.parse(currentCard.message)
                  }

                  delete res.message
                  return res
            }

            const cardFromDB = parseCurrentCard(currentCard)

            const {messageYG, messageTG} = await createMessageTgYG(cardFromDB?.department, cardFromDB)


            if (status === 'approve') {

                log.info('Нажата кнопка approve', { cardId, by: reconciliatorUser })

                const YGCARD = await sendAnswerMessage(status, cardFromDB.department, cardId)

                if (YGCARD.success === false ) {

                  await bot.sendMessage(chatId, `Ошибка обработки карточки # Сервис YouGile не отвечает`)

                  return {
                    success: false,
                    message: 'ERROR'
                  }
                }

                await bot.editMessageText(`Заявка # ${YGCARD.data.ygId} : ✅ согласована. Автор сообщения # ${YGCARD.data.tgId} # \n\n Title: ${YGCARD.data.title}`, {
                  chat_id: chatId,
                  message_id: messageId,
                });

                return {
                    success: true,
                    message: 'MESSAGE APPROVE'
                }

            } 

            if (status === 'reject') {

                log.info('Нажата кнопка reject', { cardId, by: reconciliatorUser })

                const YGCARD = await sendAnswerMessage(status, cardFromDB.department, cardId)

                if (YGCARD.success === false ) {
                  await bot.sendMessage(chatId, `Ошибка обработки карточки # Сервис YouGile не отвечает`)
                  return {
                    success: false,
                    message: 'ERROR'
                  }
                }
                
                await bot.editMessageText(`Заявка # ${YGCARD.data.ygId} : ❌ отклонена. Автор сообщения # ${YGCARD.data.tgId} # \n\n Title: ${YGCARD.data.title}`, {
                  chat_id: chatId,
                  message_id: messageId,
                });

                return {
                    success: true,
                    message: 'MESSAGE REJECT'
                }
            }

            if (status === 'approve_resend') {
              log.info('Нажата кнопка approve_resend', { cardId, by: reconciliatorUser })

              const buildCB = (status: string, cardId: string, resendTgId: string ) => `${status}|${cardId}|${resendTgId}`
              const telegramResencId = cardFromDB.reconciliator.id

              await bot.sendMessage(
                telegramResencId,
                `№${cardFromDB.id} Задача поступила из группы (Продвижения услуг компании "✅ Согласовано")\n\n Согласовано пользователем -  ${reconciliatorUser}\n\nЗадача ${cardFromDB.title}\n\nОтдел ${cardFromDB.department}\n\n\n${messageTG}`,
                {
                  reply_markup: {
                    inline_keyboard: [
                      [
                        { text: 'Согласовать', callback_data: buildCB('approve', cardFromDB.id, '')},
                        { text: 'Отклонить', callback_data: buildCB('reject', cardFromDB.id, '')},
                      ]
                    ]
                  }
                }
              )

              await bot.editMessageText(`Заявка # ${cardFromDB.ygId} : ✅ получила предварительное согласование и отправлена на согласование в группу с Ольгой Николаевной Эделевой.\n\nАвтор сообщения # ${cardFromDB.tgId} # ${cardFromDB.fio} # \n\n Title: ${cardFromDB.title}\n\nСогласовано пользователем -  ${reconciliatorUser}`, {
                chat_id: chatId,
                message_id: messageId,
              });

              await bot.sendMessage(
                cardFromDB.tgId,
                `№${cardFromDB.id} - ${cardFromDB.title}\n\nСогласовано пользователем -  ${reconciliatorUser}\n\n\n${messageTG}\n\nСледите за изменениями в боте или на сайте pr-tz.ru`,
              )

                return {
                    success: true,
                    message: 'MESSAGE RESEND AGREED'
                }

            }

            if (status === 'reject_resend') {
              log.info('Нажата кнопка reject_resend', { cardId, by: reconciliatorUser })


              await bot.sendMessage(
                cardFromDB.tgId,
                `Заявка # ${cardFromDB.id} ❌ Отклонена\n\n За дополнительной информацией обратитесь\n\n${reconciliatorUser}\n\nДата изменения ${new Date().toLocaleDateString('RU-ru')}`
              )

              await bot.editMessageText(`Заявка # ${cardFromDB.id} : ❌ Отклонено - Отказ отправлен автору заявки.\n\nАвтор сообщения # ${cardFromDB.fio} # \n\nTitle: ${cardFromDB.title}\n\nОтклонено пользователем -  ${reconciliatorUser}`, {
                chat_id: chatId,
                message_id: messageId,
              });

                return {
                    success: true,
                    message: 'MESSAGE RESEND REJECT'
                }
            }

            if (status === 'wrong_group_resend') {
              log.info('Нажата кнопка wrong_group_resend', { cardId, by: reconciliatorUser })

              const buildCB = (status: string, cardId: string, resendTgId: string ) => `${status}|${cardId}|${resendTgId}`
              const telegramResencId = cardFromDB.reconciliator.id

              await bot.sendMessage(
                telegramResencId,
                `№${cardFromDB.id} Задача поступила из группы (Продвижения услуг компании "⚠️ Ошибочно отправленана предварительное согласование")\n\nЗадача ${cardFromDB.title}\n\nОтдел ${cardFromDB.department}\n\n\n${messageTG}\n\nПеремещена пользователем -  ${reconciliatorUser}`,
                {
                  reply_markup: {
                    inline_keyboard: [
                      [
                        { text: 'Согласовать', callback_data: buildCB('approve', cardFromDB.id, '')},
                        { text: 'Отклонить', callback_data: buildCB('reject', cardFromDB.id, '')},
                      ]
                    ]
                  }
                }
              )

              await bot.editMessageText(`Заявка # ${cardFromDB.id} : ⚠️ Ошибочно отправлена на согласование в данную группу - переносим в основную группу.\n\nАвтор сообщения # ${cardFromDB.fio} #\n\nTitle: ${cardFromDB.title}\n\nПеремещена пользователем -  ${reconciliatorUser}`, {
                chat_id: chatId,
                message_id: messageId,
              });

                return {
                    success: true,
                    message: 'MESSAGE WRONG GROUP'
                }
            }
          }

        } catch (error) {
          log.error('Ошибка обработки кнопки', error, { data: query.data })
          
          
        }

      })

      globalThis._tgBot = bot;
      return bot;
    })();
  }

  return creatingBotCashe;
}

export const startBotPolling = async () => {
  if (globalThis._tgPolling) return
  globalThis._tgPolling = true

  const bot = await getBot()

  // сбрасываем накопленный за простой бэклог: его callback_query уже протухли
  await (bot as any).deleteWebHook({ drop_pending_updates: true }).catch(() => {})

  await bot.startPolling()
  log.ok('Polling запущен', { pid: process.pid })
}
