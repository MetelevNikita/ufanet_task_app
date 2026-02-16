import { NextRequest, NextResponse } from "next/server";

// 

import { PrismaClient } from "@/../generated/prisma/client";

// 

const prisma = new PrismaClient()

// 


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