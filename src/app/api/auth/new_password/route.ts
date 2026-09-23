import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { PrismaClient } from "@/../generated/prisma/client";
import bcrypt from 'bcrypt'
import { getBot } from "@/telegramBot/telegramBot";
import { logger } from "@/lib/logger";

const log = logger('auth')


// 


const prisma = new PrismaClient()

// 


export const POST = async (req: NextRequest) => {
  try {

    const {id, password, repeat_password} = await req.json()



    const findUser = await prisma.user.findFirst({
      where: {
        id: parseInt(id)
      }
    })


    if (!findUser) {
      return NextResponse.json({
        success: false,
        message: 'Ошибка, пользователь с таким ID не найден',
        data: null
      }, {status: 404})
    }

    const hashPassword = await bcrypt.hash(password, 10)
    const changePassword = await prisma.user.update({
      where: {
        id: parseInt(id)
      },
      data: {
        password: hashPassword
      }
    })

    if (!changePassword) {
      return NextResponse.json({
        success: false,
        message: 'Не удалось обновить пароль, попробуйте позже',
        data: null
      }, {status: 404})
    }



    // пароль уже сменён — сбой уведомления не должен превращаться в 500
    try {
      const bot = await getBot()
      await bot.sendMessage(findUser.telegramId, `Пароль пользователя ${findUser.id} ${findUser.name} успешно обновлен`)
    } catch (error) {
      log.error('Уведомление о смене пароля не отправлено в Telegram', error, { userId: findUser.id })
    }

    return NextResponse.json({
      success: true,
      message: 'Пароль обновлен',
      data: `User Found`
    })
    
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      log.error('Ошибка смены пароля', error)
      return NextResponse.json({
        success: false,
        message: 'Ошибка сброса пороля',
        data: null
      }, {status: 500})
    }
  }
}