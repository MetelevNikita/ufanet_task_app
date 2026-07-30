import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/../generated/prisma/client";



const prisma = new PrismaClient()


export const POST = async (req: any, context: {params: {title: string}}) => {

  try {

    let arrComment = []

    const { title, comment } = await req.json()

    console.log('ДАНЫЕ С АПИ')
    console.log({title, comment})

    const dateComment = `${new Date().toLocaleString()} - ${comment}`
    console.log('DATA COMMENT ', dateComment)

    const findTask = await prisma.task.findFirst({
      where: {
        title: title
      }
    })

    console.log('TASK FROM API ', findTask)

    if (!findTask) {
      return NextResponse.json({
        success: false,
        message: 'Ошибка получения карточки для обновления комментария'
      })
    }

    console.log(findTask.comment)


    const updateComment = await prisma.task.update({
      where: {
        id: Number(findTask.id)
      },
      data: {
        comment: dateComment
      }
    })

    if (!updateComment) {
      return NextResponse.json({
        success: true,
        message: 'Ошибка добавления комментария к задаче'
      })
    }


    return NextResponse.json({
      succes: true,
      message: 'Комментарий присовен'
    })
    
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      return NextResponse.json({
        message: 'ERROR'
      })
    }
    
  }

}