import { PrismaClient } from "../../generated/prisma";


const prisma = new PrismaClient();


export const createDBTask = async (ygId: string, department: string, data: any) => {
  try {


    const databaseCard = {
      ygId: ygId,
      department: department,
      ...data,
      status: 'Входящие'
    }

    console.log(databaseCard)

    if (department === 'PR отдел') {
      const task = await prisma.taskPr.create({
        data: databaseCard
      })

      if (!task) {
        throw new Error('Ошибка создания задачи в базе данных');
      }

      return task;
    } else if (department === 'Отдел дизайна') {

        const task = await prisma.taskDesign.create({
          data: databaseCard
        })

        console.log(task)
  
        if (!task) {
          throw new Error('Ошибка создания задачи в базе данных');
        }

        return task
    } else if (department === 'Интернет маркетинг') {
      return `Отдел маркетинга`
    } else if (department === 'Отдел рекламы') {
      return `Отдел рекламы`
    } else {
      return {message: 'Отдел не найден', status: 500}
    }



    
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Неизвестная ошибка');
  }
}
