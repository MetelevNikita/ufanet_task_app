import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "../../../../../generated/prisma";

// tg bot

import { getBot } from '@/telegramBot/telegramBot'

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

      console.log(findTask) 

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
      console.error(`Ошибка API Yougile ${response.statusText}`)
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
      console.error(`Ошибка получения колонки YouGile ${error.message}`)
      return {
        success: false,
        message: `Ошибка получения колонки YouGile ${error.message}`,
        data: null
      }
    }

      console.error(`Неизвестная ошибка ${error}`)
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
      console.error(`Ошибка API Yougile Projects ${response.statusText}`)
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
      console.error(`Ошибка получения проекта YouGile ${error.message}`)
      return {
        success: false,
        message: `Ошибка получения пороекта YouGile ${error.message}`,
        data: null
      }
    }

      console.error(`Неизвестная ошибка ${error}`)
      return {
        success: false,
        message: `Неизвестная ошибка ${error}`,
        data: null
      }

    
  }
}

async function stateStickerYouGile (stickerId: string, stateId: string, key: string): Promise<{success: boolean, message: string, data: any}> {


  console.log(stickerId)
  console.log(stateId)


  try {
    const response = await fetch(`https://ru.yougile.com/api-v2/string-stickers/${stickerId}/states/${stateId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`
      }
    })

    if (!response.ok) {
      console.error(`Ошибка API Yougile stickers ${response.statusText}`)
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
      console.error(`Ошибка получения стикеров YouGile ${error.message}`)
      return {
        success: false,
        message: `Ошибка получения стикеров YouGile ${error.message}`,
        data: null
      }
    }

      console.error(`Неизвестная ошибка ${error}`)
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
      console.error(`Ошибка API Yougile user ${response.statusText}`)
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
      console.error(`Ошибка получения пользователя YouGile ${error.message}`)
      return {
        success: false,
        name: null,
        email: null
      }
    }

      console.error(`Неизвестная ошибка ${error}`)
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

          console.log('webhook work start')

          // 

          const body = await req.json()

          const description = body.payload.description ?? ''
          const regExp = /Телеграм\s*id\s*-\s*(\d+)/i

          const matcher = description.match(regExp) ?? []
          const id = matcher?.[1] ?? null
          console.log('ID ', id)
            
          if (!id) {
            console.log(`TASK NOT CREATE FROM PR-TZ-APP`)
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
              console.log(`Задача попала ${title} в исключение`)
              return NextResponse.json({
                  success: false,
                  message: `Колонка ${columnId.data} при создании попадает в исключение`,
                  data: null
              })
            }


            // change from DB

            const changeDbStatus = await changeStatusTaskDB(projectYouGile.data, title, 'status', columndYouGile.data)
            console.log('Статус колонки', changeDbStatus)

            // 

            console.log(`Задача ${title} перемещена в новую колонку ${columndYouGile.data}`)

            message = `Статус Задачи изменен\n\nЗадача - ${title}\nПроект - ${projectYouGile.data}\n\nПеремещенва в колонку: ${columndYouGile.data}\n\nДата перемещения ${new Date().toLocaleDateString('RU-ru')}`
            console.log("MESSAGE ", message)

            // send author 

            try {
              await bot.sendMessage(id, message)
              console.info(`WEBHOOK FROM TASK ${title} IS DONE`)
            } catch (error) {
              console.error('Ошибка отправки сообщения в телеграм')
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

                  console.log('Статус стикера ', changeStatusDB)

                  // 


                  console.log(`Задача ${title} получила новый стикер состояния - ${newSticker.data}`)

                  message = `Статус Задачи изменен\n\nЗадача - ${title}\nПроект - ${projectYouGile.data}\n\nСостояние задачи измененео на состояние "${newSticker.data}"\n\nДата перемещения ${new Date().toLocaleDateString('RU-ru')}`
                  console.log("MESSAGE ", message)

                  // 

                  try {
                    await bot.sendMessage(id, message)
                    console.info(`WEBHOOK FROM TASK ${title} IS DONE`)
                  } catch (error) {
                    console.error('Ошибка отправки сообщения в телеграм')
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

                  console.log(`Задача ${title} получила новых исполнителей - ${users.map((item) => `${item.name} - ${item.email}\n`).join('')}`)

                  message = `Исполнители изменены\n\nЗадача - ${title}\nПроект - ${projectYouGile.data}\n\nИсполнители\n\n${users.map((item) => `${item.name} - ${item.email}\n`).join('')}\n\nДата перемещения ${new Date().toLocaleDateString('RU-ru')}`
                  console.log("MESSAGE ", message)

                  //

                  try {
                    await bot.sendMessage(id, message)
                    console.info(`WEBHOOK FROM TASK ${title} IS DONE`)
                  } catch (error) {
                    console.error('Ошибка отправки сообщения в телеграм')
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
                console.log(error.message)
                return NextResponse.json({
                  success: false,
                  message: `Вебхук завершен с ошибкой ${error.message}`,
                  data: 'webhook false'
                })
        }

              console.log(error)
              return NextResponse.json({
                success: false,
                message: `Неизвестная ошибка ${error}`,
                data: 'webhook false'
              })



      }

}