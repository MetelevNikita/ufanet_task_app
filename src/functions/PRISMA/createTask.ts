import { PrismaClient } from "../../../generated/prisma";

const prisma = new PrismaClient();



export const createTask = async (ygId: string, slug: string, data: any) => {
  try {


    const databaseCard = {
      ygId: ygId,
      department: slug,
      ...data,
      status: 'Входящие'
    }


    console.log(databaseCard)


    const task = await prisma.taskPr.create({
      data: databaseCard
 
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