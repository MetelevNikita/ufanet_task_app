import { NextResponse } from "next/server";

// prisma

import { PrismaClient } from "../../../../generated/prisma";

// 

const prisma = new PrismaClient()

// 

export const GET = async () => {
  try {

    const tasks = await prisma.task.findMany({})

    if (!tasks) {
      return NextResponse.json(
        { message: 'Задачи не найдены'},
        { status: 404 }
      );
    }

    return NextResponse.json(tasks, {status: 200})
    
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message },
        { status: 500 }
      );
    }
  }
}