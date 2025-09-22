import { PrismaClient } from "../../../generated/prisma";

const prisma = new PrismaClient();

interface FormData {
  ygId: string;
  department: string;
  tgId: string;
  title: string;
  description: string;
  status: string;
  deadline: Date | string;
}


export const createTask = async (formData: FormData) => {
  try {

    const task = await prisma.task.create({
      data: formData
    })
    

    if (!task) {
      throw new Error('Ошибка создания задачи в базе данных');
    }

    return task;
    
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Неизвестная ошибка');
  }
}