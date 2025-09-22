import { PrismaClient } from "../../../generated/prisma";

//  types

import { TaskType } from "@/types/types";

// 

const prisma = new PrismaClient();



export const getTasks = async (): Promise<TaskType[] | []> => {
  try {

    const tasks = await prisma.task.findMany()

    if (!tasks) {
      throw new Error('Ошибка получения задач из базы данных');
    }

    return tasks;
    
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Неизвестная ошибка');
  }
}
