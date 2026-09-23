import { NextResponse, NextRequest } from "next/server"
import { PrismaClient } from "@/../generated/prisma/client";
import { logger } from "@/lib/logger";

const log = logger('users')


const prisma = new PrismaClient()


export const DELETE = async (req: NextRequest, { params }: {params: {id: string}}) => {
  try {


    const { id } = await params

    const findUser = await prisma.user.findFirst({
      where: {
        id: parseInt(id)
      }
    })

    if (!findUser) {
      return NextResponse.json({
        success: false,
        message: 'Пользователь не найден',
        data: 'User not find'
      })
    }

    const deleteUser = await prisma.user.delete({
      where: {
        id: parseInt(id)
      }
    })

    return NextResponse.json({
        success: true,
        message: `Пользователь ${findUser.id} - ${findUser.name} удален`,
        data: 'User was deleted'
      })
    
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      log.error('Ошибка удаления пользователя', error)
      return NextResponse.json({
        success: false,
        message: 'Ошибка удаления пользователя',
        data: null
      }, {status: 500})
    }
  }
}