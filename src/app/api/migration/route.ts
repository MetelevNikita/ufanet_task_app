import { NextResponse } from "next/server";

// YOUGILE

import { getYGKeys } from "@/functions/getYGKeys";
import { getYGCompany } from "@/functions/getYGCompany";
import { getBoardCompany } from "@/functions/getBoardCompany";


export const POST = async (req: Request) => {
  try {

    const body = await req.json();
    console.log('body', body);


    return NextResponse.json(
      { message: 'API migration работает' },
      { status: 200 }
    );



    
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        { message: 'Неизвестная ошибка' },
        { status: 500 }
      );
    }
    
  }
}