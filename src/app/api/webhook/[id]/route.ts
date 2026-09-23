import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@/../generated/prisma/client";

// tg bot

import { getBot } from '@/telegramBot/telegramBot'
import { logger } from "@/lib/logger";

const log = logger('webhook')

// 

const prisma = new PrismaClient()

// 

const bot = await getBot()

// 

const changeStatusTaskDB = async (department: string, title: string, key: string, value: any) => {
  try {


      const findTask: any = await prisma.task.findFirst({
        where: {
          title: title,
        }
      })

  
      if (!findTask) {
          return {
            success: true,
            message: `Задача с указанным название не найдена`,
            data: null
          }
      }

      if (key === 'status') {

          const changeTaskStatus = await prisma.task.update({
            where: { id: Number(findTask.id) },
            data: { status: value },
          })
          return {
            success: true,
            message: `БД обновилась`,
            data: changeTaskStatus
          }

      } else if (key === 'stage') {

          const changeTaskStage = await prisma.task.update({
            where: { id: Number(findTask.id) },
            data: { stage: value },
          })
          return {
            success: true,
            message: `БД обновилась`,
            data: changeTaskStage
          }
      }


      
    
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      return {
          success: false,
          message: `Ошибка ${error.message}`,
          data: null
        }
  
    }
    
      return {
          success: false,
          message: `Неизвестная ошибка ${error}`,
          data: null
        }
  }
}



// 



async function getYouGileColumn (id: string, key: string): Promise<{success: boolean, message: string, data: any}> {
  try {
    const response = await fetch(`https://ru.yougile.com/api-v2/columns/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`
      }
    })

    if (!response.ok) {
      log.error('YouGile не вернул колонку', undefined, { id, status: response.status })
      return {
        success: false,
        message: `Ошибка API Yougile ${response.statusText}`,
        data: null
      }

    }

    const data = await response.json()
    return {
      success: true,
      message: "Колонка Yougile найдена",
      data: data.title
    }


  } catch (error: Error | unknown) {

    if (error instanceof Error) {
      log.error('Ошибка получения колонки YouGile', error)
      return {
        success: false,
        message: `Ошибка получения колонки YouGile ${error.message}`,
        data: null
      }
    }

      log.error('Ошибка получения колонки YouGile', error)
      return {
        success: false,
        message: `Неизвестная ошибка ${error}`,
        data: null
      }

    
  }
}


async function getYouGileProject (id: string, key: string): Promise<{success: boolean, message: string, data: any}> {
  try {
    const response = await fetch(`https://ru.yougile.com/api-v2/projects/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`
      }
    })

    if (!response.ok) {
      log.error('YouGile не вернул проект', undefined, { status: response.status })
      return {
        success: false,
        message: `Ошибка API Yougile Projects ${response.statusText}`,
        data: null
      }
    }

    const data = await response.json()
    return {
      success: true,
      message: "Проект Yougile найден",
      data: data.title
    }


  } catch (error: Error | unknown) {

    if (error instanceof Error) {
      log.error('Ошибка получения проекта YouGile', error)
      return {
        success: false,
        message: `Ошибка получения пороекта YouGile ${error.message}`,
        data: null
      }
    }

      log.error('Ошибка получения проекта YouGile', error)
      return {
        success: false,
        message: `Неизвестная ошибка ${error}`,
        data: null
      }

    
  }
}

async function stateStickerYouGile (stickerId: string, stateId: string, key: string): Promise<{success: boolean, message: string, data: any}> {




  try {
    const response = await fetch(`https://ru.yougile.com/api-v2/string-stickers/${stickerId}/states/${stateId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`
      }
    })

    if (!response.ok) {
      log.error('YouGile не вернул стикер', undefined, { stickerId, stateId, status: response.status })
      return {
        success: false,
        message: `Ошибка API Yougile stickers ${response.statusText}`,
        data: null
      }
    }

    const data = await response.json()
    return {
      success: true,
      message: "Стикеры Yougile найдены",
      data: data.name
    }


  } catch (error: Error | unknown) {

    if (error instanceof Error) {
      log.error('Ошибка получения стикера YouGile', error)
      return {
        success: false,
        message: `Ошибка получения стикеров YouGile ${error.message}`,
        data: null
      }
    }

      log.error('Ошибка получения стикера YouGile', error)
      return {
        success: false,
        message: `Неизвестная ошибка ${error}`,
        data: null
      }

    
  }
}


async function getSingleUser (id: string, key: string): Promise<{success: boolean, name: string | null, email: string | null} | Error> {

  try {
    const response = await fetch(`https://ru.yougile.com/api-v2/users/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`
      }
    })

    if (!response.ok) {
      log.error('YouGile не вернул пользователя', undefined, { status: response.status })
      return {
        success: false,
        name: null,
        email: null
      }
    }

    const data = await response.json()
    return {
        success: true,
        name: data.realName,
        email: data.email
      }
    


  } catch (error: Error | unknown) {

    if (error instanceof Error) {
      log.error('Ошибка получения пользователя YouGile', error)
      return {
        success: false,
        name: null,
        email: null
      }
    }

      log.error('Ошибка получения пользователя YouGile', error)
       return {
        success: false,
        name: null,
        email: null
      }

    
  }
}





export const POST = async (req: NextRequest) => {


      try {
        
          // 


          // 

          const body = await req.json()

          const description = body.payload.description ?? ''
          const regExp = /Телеграм\s*id\s*-\s*(\d+)/i

          const matcher = description.match(regExp) ?? []
          const id = matcher?.[1] ?? null
            
          if (!id) {
            log.info('Задача создана не через pr-tz.ru — пропускаем', { event: body.event, title: body.payload?.title })
            return NextResponse.json({
              success: false,
              message: 'Сообщени не отправлено с сайта pr-tz.ru',
              data: null
            })
          }

          const yougileKey = process.env.YOGILE_KEY_INSTANCE as string
          const columnId = body.payload.columnId
          const projectId = body.payload.projectId
          const title = body.payload.title

          if (!yougileKey) {
            return NextResponse.json({
              success: false,
              message: 'Ошибка получения ключа yougile',
              data: null
            })
          }

          const columndYouGile = await getYouGileColumn(columnId, yougileKey)
          const projectYouGile = await getYouGileProject(projectId, yougileKey)


          // 

          let message;

          // 

          if (body.event === 'task-moved') {

            if (columndYouGile.data === 'Входящие' || columndYouGile.data === 'Согласовано' || columndYouGile.data === 'Отклонено') {
              log.info('Колонка в исключениях — уведомление не нужно', { title, column: columndYouGile.data })
              return NextResponse.json({
                  success: false,
                  message: `Колонка ${columnId.data} при создании попадает в исключение`,
                  data: null
              })
            }


            // change from DB

            const changeDbStatus = await changeStatusTaskDB(projectYouGile.data, title, 'status', columndYouGile.data)

            // 


            message = `Статус Задачи изменен\n\nЗадача - ${title}\nПроект - ${projectYouGile.data}\n\nПеремещенва в колонку: ${columndYouGile.data}\n\nДата перемещения ${new Date().toLocaleDateString('RU-ru')}`

            // send author 

            try {
              await bot.sendMessage(id, message)
              log.ok('Автор уведомлён: задача перемещена', { title, column: columndYouGile.data, tgId: id })
            } catch (error) {
              log.error('Уведомление автору не отправлено', error, { title, tgId: id })
            }


            return NextResponse.json({
                success: true,
                message: `Вебхук отработал ${title}`,
                data: 'webhook done'
              })





            // 

          }


          if (body.event === 'task-updated') {

            // Стикеры

            if (body.payload.stickers) {
                if (JSON.stringify(body.payload.stickers) !== JSON.stringify(body.prevData.stickers))  {

        
                  const sticker = Object.entries(body.payload.stickers)[0]
                  const newSticker = await stateStickerYouGile(sticker[0] as string, sticker[1] as string, yougileKey)

                  if (!newSticker.success) {
                    return NextResponse.json({
                      success: true,
                      message: `Стикер объявлен но без значений`,
                      data: 'webhook done'
                    })
                  }

                  // 

                  const changeStatusDB = await changeStatusTaskDB(projectYouGile.data, title, 'stage', newSticker.data)


                  // 



                  message = `Статус Задачи изменен\n\nЗадача - ${title}\nПроект - ${projectYouGile.data}\n\nСостояние задачи изменено на "${newSticker.data}"\n\nДата перемещения ${new Date().toLocaleDateString('RU-ru')}`

                  // 

                  try {
                    await bot.sendMessage(id, message)
                    log.ok('Автор уведомлён: изменено состояние', { title, stage: newSticker.data, tgId: id })
                  } catch (error) {
                    log.error('Уведомление автору не отправлено', error, { title, tgId: id })
                  }


                  return NextResponse.json({
                      success: true,
                      message: `Вебхук отработал ${title}`,
                      data: 'webhook done'
                    })


                }
            } 

            // Пользователи

            if (body.payload.assigned) {
              if (JSON.stringify(body.payload.assigned) !== JSON.stringify(body.prevData.assigned)) {

                if (body.payload.assigned.length >= 1) {
                  const users = await Promise.all(body.payload.assigned.map(async (item: string) => {
                    const users = await getSingleUser(item, yougileKey)
                    return users
                  }))


                  message = `Исполнители изменены\n\nЗадача - ${title}\nПроект - ${projectYouGile.data}\n\nИсполнители\n\n${users.map((item) => `${item.name} - ${item.email}\n`).join('')}\n\nДата перемещения ${new Date().toLocaleDateString('RU-ru')}`

                  //

                  try {
                    await bot.sendMessage(id, message)
                    log.ok('Автор уведомлён: изменены исполнители', { title, tgId: id })
                  } catch (error) {
                    log.error('Уведомление автору не отправлено', error, { title, tgId: id })
                  }

                  // 


                  return NextResponse.json({
                    success: true,
                    message: `Вебхук отработал ${title}`,
                    data: 'webhook done'
                  })
      

                }

              }
            }

          }

          // 

          return NextResponse.json({
            success: true,
            message: 'Вебхук отработал',
            data: 'webhook done'
          })


      } catch (error: Error | unknown) {
        
        if (error instanceof Error) {
                log.error('Вебхук упал', error)
                return NextResponse.json({
                  success: false,
                  message: `Вебхук завершен с ошибкой ${error.message}`,
                  data: 'webhook false'
                })
        }

              log.error('Вебхук упал', error)
              return NextResponse.json({
                success: false,
                message: `Неизвестная ошибка ${error}`,
                data: 'webhook false'
              })



      }

}