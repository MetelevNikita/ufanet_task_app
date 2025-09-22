import { NextResponse } from "next/server";
import { PrismaClient } from "../../../../generated/prisma";

// 

import { getYGCompany } from "@/functions/getYGCompany";
import { getYGKeys } from "@/functions/getYGKeys";
import { getYGProjects } from "@/functions/getYGProjects";
import { getBoardCompany } from "@/functions/getBoardCompany";
import { getYGColumns } from "@/functions/getYGColumns";

// 


import { createYGKey } from "@/functions/createYGKey";
import { createYGTask } from "@/functions/createYGTask";


// prisma

import { getTasks } from "@/functions/PRISMA/getTasks";
import { createTask } from "@/functions/PRISMA/createTask";

// TG

import { getBot } from "@/telegramBot/telegramBot";


// types

import { TaskType } from "@/types/types";

// 

export const GET = async (request: Request): Promise<NextResponse<TaskType[] | [] | {message: string}>> => {
  try {

    const tasks = await getTasks();

    return NextResponse.json(tasks, { status: 200 });
    
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






export const POST = async (request: Request): Promise<NextResponse<TaskType | {message: string}> | void> => {
  try {

    const formData = await request.formData();


    const department = formData.get('department') as string
    const tgId = formData.get('tgId') as string
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const deadline = formData.get('deadline') as string



    // 

    const date = new Date(deadline).getTime();

    // 



    const companys = await getYGCompany();
    const company = companys.content.find((company: {id: string, name: string, isAdmin: string}) => {
      return company.name == 'UFANET'
    })

    if (!company) {
      return NextResponse.json({ message: `Компания ${department} не найдена в YouGile` }, { status: 404 });
    }

    const companyKey = await getYGKeys(company.id);

    if (companyKey.length == 0) {
      console.log(`Нет ключей для компании ${department} в YouGile`)
      await createYGKey(company.id)
      console.log(`Создан ключ для компании ${department} в YouGile`)
    }


    if (!companyKey) {
      return NextResponse.json({ message: `Ошибка получения ключей для компании ${department} в YouGile` }, { status: 500 });
    }


    console.log(companyKey[0].key)

    const projects = await getYGProjects(companyKey[0].key);
    const currentProject = projects.content.find((project: {title: string}) => {
      return project.title === department
    })


    // 

    const board = await getBoardCompany(companyKey[0].key, currentProject.id);
    const columns = await getYGColumns(companyKey[0].key, board.content[0].id)
    const inboxColumn = columns.content.find((column: {title: string}) => {
      return column.title === 'Входящие'
    })


    // 

    if (!inboxColumn) {
      return NextResponse.json({ message: `Столбец Входящие не найден в доске ${department}` }, { status: 404 });
    }



    const createTaskYG = await createYGTask(
      companyKey[0].key,
      inboxColumn.id,
      title,
      description,
      tgId,
      date
    )


    if (!createTaskYG) {
      return NextResponse.json({ message: `Ошибка создания задачи в YouGile` }, { status: 500 });
    }


    const ygId = createTaskYG.id


    const databaseCard = {
      ygId,
      department,
      tgId,
      title,
      description,
      status: 'inbox',
      deadline: new Date(date).toISOString()
    }


    const newTaskDatabase = await createTask(databaseCard)

    if (!newTaskDatabase) {
      return NextResponse.json({ message: `Ошибка создания задачи в базе данных` }, { status: 500 });
    }

    console.log(newTaskDatabase)

    

    const bot = await getBot();
    
    if (!process.env.TG_ID_BOSS) {
      return NextResponse.json({ message: `Не задан TG_ID_BOSS в переменных окружения` }, { status: 500 });
    }

    bot.sendMessage(
      process.env.TG_ID_BOSS as string,
      `Новое сообщение с доски - ${department}\n\еtitle-${title}\n\nописание - ${description}\n\nДедлайн - ${deadline}`,
      {
        reply_markup: {
          inline_keyboard: [
            [
              { text: 'Согласовать', callback_data: JSON.stringify({message: `approve`, cardId: newTaskDatabase.id})},
              { text: 'Отклонить', callback_data: JSON.stringify({message: `reject`, cardId: newTaskDatabase.id})},
              { text: 'Согласовать с замечаниями', callback_data: JSON.stringify({message: `comment`, cardId: newTaskDatabase.id})}
            ]
          ]
        }
      }
    )

    return NextResponse.json({message: `Сообщение в отдел ${department} отправлено на согласование`}, { status: 200 });
    
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