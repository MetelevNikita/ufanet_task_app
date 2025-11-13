import { NextResponse } from "next/server";

// YG

import { getYGCompany } from "@/functions/getYGCompany";
import { getYGKeys } from "@/functions/getYGKeys";
import { getYGStickers } from "@/functions/getYGStickers";

export const GET = async () => {
  try {

    const yougileKey = process.env.YOGILE_KEY_INSTANCE as string

    const stickers = await getYGStickers(yougileKey);

    return NextResponse.json({
      message: 'stickers success',
      data: stickers.content

    })


    
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