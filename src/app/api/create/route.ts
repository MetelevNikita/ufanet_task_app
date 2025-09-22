import { NextResponse } from "next/server";

// 

import { getYGCompany } from "@/functions/getYGCompany";
import { getYGKeys } from "@/functions/getYGKeys";
import { getDeskCompany } from "@/functions/getDeskCompany";

// TG

import { getBot } from "@/telegramBot/telegramBot";







export const POST = async (request: Request) => {
  try {

    const {id, name, department} = await request.json();

    const companys = await getYGCompany();

    const company = companys.content.find((company: {id: string, name: string, isAdmin: string}) => {
      return company.name == department
    })


    if (!company) {
      return NextResponse.json({ message: `Компания ${department} не найдена в YouGile` }, { status: 404 });
    }

    const companyKey = await getYGKeys(company.id);

    if (!companyKey) {
      return NextResponse.json({ message: `Ошибка получения ключей для компании ${department} в YouGile` }, { status: 500 });
    }

    const desks = await getDeskCompany(companyKey[0].key);

    const inboxDesk = desks.content.find((desk: {title: string}) => {
      return desk.title == 'Общая доска'
    })

    if (!inboxDesk) {
      return NextResponse.json({ message: `Доска "Общая доска" не найдена в компании ${department} в YouGile` }, { status: 404 });
    }


    const bot = await getBot();
    
    if (!process.env.TG_ID_BOSS) {
      return NextResponse.json({ message: `Не задан TG_ID_BOSS в переменных окружения` }, { status: 500 });
    }

    bot.sendMessage(
      process.env.TG_ID_BOSS as string,
      `Новое сообщение с доски - ${department}\n\nid-${id}\n\n текст текст текст`,
      {
        reply_markup: {
          inline_keyboard: [
            [
              { text: 'Согласовать', callback_data: `approve`},
              { text: 'Отклонить', callback_data: `reject` },
              { text: 'Согласовать с замечаниями', callback_data: `comments` }
            ]
          ]
        }
      }
    )


    return NextResponse.json(inboxDesk, { status: 200 });
    
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Unknown error" },
      { status: 500 }
    );
    
  }
}