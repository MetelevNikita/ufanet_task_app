import { NextResponse } from "next/server";
import { PrismaClient } from "../../../../../generated/prisma";

// 

const prisma = new PrismaClient();

// 

import { deleteTask } from "@/functions/PRISMA/deleteTask";

export const DELETE = async (req: Request, { params }: { params: { id: string } }) => {
  try {

    const id = await params.id;

    if (!id) {
      return NextResponse.json(
        { message: 'ID задачи не указан' },
        { status: 400 }
      );
    }


    const deleteCurrentTask = await deleteTask(id);

      if (!deleteCurrentTask) {
        return NextResponse.json(
          { message: 'Ошибка удаления задачи' },
          { status: 500 }
        );
      }

      return NextResponse.json(deleteCurrentTask, { status: 200 });


  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Неизвестная ошибка' },
      { status: 500 }
    );
    
  }
}




export const GET = async (req: Request, { params }: { params: { id: string } }) => {

  try {

    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { message: 'ID задачи не указан' },
        { status: 400 }
      );
    }

    const getTasks = await prisma.task.findMany({
      where: {
        department: id
      }
    })

    if (!getTasks) {
      return NextResponse.json(
        { message: 'Ошибка получения задач' },
        { status: 500 }
      );
    }

    return NextResponse.json(getTasks, { status: 200 });


    
    
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Неизвестная ошибка' },
      { status: 500 }
    );
    
  }
}