import { PrismaClient } from "../../generated/prisma";


const prisma = new PrismaClient();


export const createDBTask = async (ygId: string, department: string, data: any) => {
  try {

    const messageData = Object.entries(data).slice(7)
    const currentMessageOBJ = Object.fromEntries(messageData)


    const databaseCard = {
      ygId: ygId,
      department: department,
      fio: data.fio,
      subdivision: data.subdivision,
      tgId: data.tgId,
      branch: data.branch,
      leader: data.leader,
      type: data.type,
      title: data.title,
      deadline: data.deadline,
      message: JSON.stringify(currentMessageOBJ, null, 3),
      status: 'Входящие',
      stage: 'Не принято'
    }

    const task = await prisma.task.create({
      data: databaseCard
    })
    

    if (!task) {
      console.error('Ошибка создания задачи в базе данных')
      return {
        success: false,
        message: `Ошибка создания задачи в базе данных`,
        data: null
      }
    }
    
    return {
      success: true,
      message: `Ошибка создания задачи в базе данных`,
      data: task
    }

  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      console.error(error.message)
      return {
        success: false,
        message: `Ошибка создания задачи в базе данных - ${error.message}`,
        data: null
      }
    }
    return {
      success: false,
      message: `Ошибка создания задачи в базе данных - ${error}`,
      data: null
    }
  }
}
