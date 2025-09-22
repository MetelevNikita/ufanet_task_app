import { PrismaClient } from "../../../generated/prisma";

// 

const prisma = new PrismaClient();

export const deleteTask = async (id: string) => {
  try {

    if (!id) {
      throw new Error('ID задачи не указан');
    }

    const task = await prisma.task.delete({
      where: { id: Number(id) }
    })

    if (!task) {
      throw new Error('Ошибка удаления задачи из базы данных');
    }

    return task;
    
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Неизвестная ошибка');
  }
}