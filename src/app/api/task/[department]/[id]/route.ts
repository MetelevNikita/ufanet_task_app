import { NextRequest, NextResponse } from "next/server";

// 

import { PrismaClient } from "@/../generated/prisma/client";
import { getBot } from "@/telegramBot/telegramBot";

// fn

import { getYGTaskFromId } from "@/functions/getYGTaskFromId";
import { editYGTaskFromId } from "@/functions/editYGTaskFromId";

// 

const prisma = new PrismaClient()

// 



async function updateYouGileTaskHandler(ygKey: string, taskId: string, findTask: any, comment: string, now: string) {

  try {

      const ygTask = await getYGTaskFromId(ygKey, taskId)
      const updateYouGileCard = await editYGTaskFromId(
        ygKey,
        taskId,
        findTask.title,
        ygTask.columnId,
        `${now}<br>Комментарий автора: ${comment}`
      )
      return

  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      console.error('Не удалось добавить комментарий в задачу YouGile от автора')
      return 
    } else {
      console.error('Неизвестная ошибка Yougile')
      return 
    }
    
  }
}




export const DELETE = async (req: NextRequest, context: {params: {id: string}}) => {
  try {

    const { id } = await context.params

    const findTask = await prisma.task.findFirst({
      where: {
        id: parseInt(id)
      }
    })

    if (!findTask) {
      return NextResponse.json({
        success: false,
        message: `Не найдена задача для удаления под номером - ${id}`
      })
    }


    const deleteTask = await prisma.task.delete({
      where: {
        id: parseInt(id)
      }
    })


    if (!deleteTask) {
      return NextResponse.json({
        success: false,
        message: `Не найдена задача для удаления под номером - ${id}`
      })
    }


    return NextResponse.json({
        success: true,
        message: `Карточка под номером - ${id} удалена`
    })
    
    
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message },
        { status: 500 }
      );
    }
  }
}


export const PATCH = async (req: NextRequest, context: {params: {id: string}}) => {

  try {

    const bot = await getBot()

    const body = await req.json()
    const { id } = await context.params


    const findTask = await prisma.task.findFirst({
      where: {
        id: parseInt(id)
      }
    })

    if (!findTask) {
      return NextResponse.json({
          success: false,
          message: `Не удалось найти задачу для отправки комментария`
      })
    }

      const taskId = findTask.ygId
      const authorTgId = findTask.tgId ?? null
      const tgGroupId = JSON.parse(findTask.message)?.reconciliator?.id ?? null

      // 

      const ygKey = process.env.YOGILE_KEY_INSTANCE


      if (!authorTgId || !tgGroupId || !taskId || !ygKey) {
        return NextResponse.json({
            success: false,
            message: `Не удалось получить необходимые данные из задачи`
        })
      }



    if (body.author_comment) {

      // author comment

      const { author_comment } = body

      const now = new Date().toLocaleString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })


      // telegram send


      try {

        const messageGroup =
          `<b>Новый комментарий от автора</b>\n\n` +
          `Автор: ${findTask.fio}\n` +
          `<b>Задача:</b> ${findTask.title}\n\n` +
          `💬 <b>Комментарий:</b>\n<i>${author_comment}</i>\n\n` +
          `<b>Дата:</b> ${now}`

        const messageAuthor =
          `✅ Комментарий к задаче <b>${findTask.title}</b> отправлен\n\n` +
          `Он направлен в группу согласования, ожидайте ответа\n\n` +
          `<b>Дата:</b> ${now}`

        // Сообщение в основную группу

        await bot.sendMessage(tgGroupId, messageGroup, {parse_mode: 'HTML'})
        
        // Сообщение автору

        await bot.sendMessage(authorTgId, messageAuthor, {parse_mode: 'HTML'})

      } catch (error: Error | unknown) {
        if (error instanceof Error) {
          console.error(`Ошибка отправки сообщения в Telegram ${error.message}`)
        }
      }



      // yougile send

      try {

        await updateYouGileTaskHandler(ygKey, taskId, findTask, author_comment, now)
        
      } catch (error: Error | unknown) {
        if (error instanceof Error) {
          console.error(`Ошибка отправки сообщения в YouGile ${error.message}`)
        }
      }


      // добавляем новый комментарий к уже сохранённым, а не затираем их
      const previousAuthorComment = findTask.author_comment
      const updatedAuthorComment = previousAuthorComment
        ? `${previousAuthorComment}  ${now} — ${author_comment}`
        : `${now} — ${author_comment}`

      const updateDB = await prisma.task.update({
        where: {
          id: parseInt(id)
        },
        data: {
          author_comment: updatedAuthorComment
        }
      })

      if (!updateDB) {
        return NextResponse.json({
            success: false,
            message: `Не удалось добавить комментарий от автора`
        })
      }


      return NextResponse.json({
          success: true,
          message: `Карточка под номером - ${id} изменена`
      })

    }



    return NextResponse.json({
          success: false,
          message: `Не распознан объект для изменения`
      })

    
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message },
        { status: 500 }
      );
    }
  }


}