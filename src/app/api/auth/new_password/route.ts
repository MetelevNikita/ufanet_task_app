import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { PrismaClient } from "@/../generated/prisma/client";
import bcrypt from 'bcrypt'


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



    const bot = globalThis._tgBot
    bot.sendMessage(findUser.telegramId, `Пароль пользователя ${findUser.id} ${findUser.name} успешно обновлен`)

    return NextResponse.json({
      success: true,
      message: 'Пароль обновлен',
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