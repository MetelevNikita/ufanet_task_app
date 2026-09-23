import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import { PrismaClient } from "@/../generated/prisma/client";

// 


import { getBot } from "@/telegramBot/telegramBot";
import { escapeHtml } from "@/lib/escapeHtml";
import { logger } from "@/lib/logger";

const log = logger('auth')


const prisma = new PrismaClient()
const telegramBot = await getBot()


export const POST = async (req: NextRequest) => {
  try {

    const {name, lastName,  branch, department, email, telegramId, loginCorp, password} = await req.json()

    if (!name || !lastName || !branch || !department || !email || !telegramId || !loginCorp || !password) {
      return NextResponse.json({
        success: false,
        message: 'Поля не должны быть пустыми',
        data: 'Field Empty'
      }, {status: 404})
    }

    const emailExist = await prisma.user.findFirst(({
      where: {
        email: email
      }
    }))

    const tgIdExist = await prisma.user.findFirst({
      where: {
        telegramId: telegramId
      }
    })



    if (emailExist || tgIdExist) {
      return NextResponse.json({
        success: false,
        message: `Пользователь c почтой ${email} или Telegram ID ${telegramId} уже зарегестрирован`,
        data: 'done'
      }, {status: 200})

    }

    // hash password

    const hashPassword = await bcrypt.hash(password, 10)

    // 


    const userObject = {
      name: name,
      lastName: lastName,
      branch: branch,
      department: department,
      email: email,
      telegramId: telegramId,
      password: hashPassword,
      loginCorp: loginCorp,
      сonfirmed: false,
      admin: false
    }

    const newUser = await prisma.user.create({
      data: userObject
    })

    // send to user

    try {
      await telegramBot.sendMessage(telegramId, '<b>Вы успешно прошли регистрацию на сайте pr-tz.ru</b>\n\nУведомление о получения разрешения на вход в систему придет в телеграм боте', {parse_mode: 'HTML'})
    } catch (error) {
      log.warn('Приветствие не отправлено — пользователь не подписан на бота?', { telegramId, error: error instanceof Error ? error.message : String(error) })
    }

    

    // 

    try {
      await telegramBot.sendMessage(
        process.env.ADMIN_GROUP as string,
        `<b>Заявка на регистрацию</b>\n\nНовый пользователь\n\n<b>Имя пользователя</b>\n${escapeHtml(name)} ${escapeHtml(lastName)}\n\n<b>Город</b>\n${escapeHtml(branch)}\n\n<b>TelegramId</b>\n${telegramId}\n\n<b>Почта</b>\n${escapeHtml(email)}\n\n<b>Имя пользователя на корпортаивном сайте</b>\n${escapeHtml(loginCorp)}\n\n<b>Дата регистрации</b>\n${new Date().toLocaleDateString('ru-RU')}`,
        {
          parse_mode: 'HTML',
          reply_markup: {
            inline_keyboard: [
              [
                { text: 'Подтвердить', callback_data: `${newUser.id}|CONFIRMED|user_agreed` },
                { text: 'Отклонить', callback_data: `${newUser.id}|DELETE|user_disagreed` }
              ]
            ]
          }
        }
      )
    } catch (error) {
      log.error('Заявка на регистрацию не отправлена в админ-группу', error, { userId: newUser.id })
    }

    return NextResponse.json({
        success: true,
        message: 'Пользователь успешно зарегестрирован! Ваша заявка на регистрацию в системе на рассмотрении у администратора',
        data: 'done'
      }, {status: 200})



    
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      log.error('Ошибка регистрации', error)
      return NextResponse.json({
        success: false,
        message: 'Ошибка автризации пользователя',
        data: null
      }, {status: 500})
    }
  }
}