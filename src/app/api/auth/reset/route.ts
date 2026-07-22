import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { PrismaClient } from "@/../generated/prisma/client";


// 


const prisma = new PrismaClient()

// 


export const POST = async (req: NextRequest) => {
  try {

    const {telegramId} = await req.json()


    const findUser = await prisma.user.findFirst({
      where: {
        telegramId: telegramId
      }
    })


    if (!findUser) {
      return NextResponse.json({
        success: false,
        message: 'Ошибка, пользователь с таким ID не найден',
        data: null
      }, {status: 404})
    }


    const url = new URL(req.url)
    const resetLink = new URL(`${url.origin}/auth/new_password`)
    resetLink.searchParams.set('id', findUser.id.toString())


    const bot = globalThis._tgBot
    bot.sendMessage(
      telegramId,
      `Ссылка для сброса пароля\n\n<a href="${resetLink}">${resetLink}</a>`,
      {
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }
    )

  
    return NextResponse.json({
      success: true,
      message: 'Сообщение с ссылкой на сброс пароля отправлена в телеграм',
      data: `User Found`
    })
    
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      console.error(`Ошибка сброса пороля ${error.message}`)
      return NextResponse.json({
        success: false,
        message: 'Ошибка сброса пороля',
        data: null
      }, {status: 500})
    }
  }
}