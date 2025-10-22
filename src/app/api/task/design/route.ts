import { NextResponse } from "next/server";
import fs from "fs";
import fsPromice from "fs/promises";
import path from "path";

// directions db

import directions from "@/database/direction.json";

// types

import { MenuType } from "@/types/types";



const writeFileData = async (data: File | null) => {
  try {

    const arrayBuffer = await data?.arrayBuffer();
    console.log(arrayBuffer)

    if (!arrayBuffer) return

    const buffer = Buffer.from(arrayBuffer)
    console.log(buffer)


    // folder

    const currentFolder = path.join(process.cwd(), 'src',)

    
  } catch (error: Error | unknown) {

    if (error instanceof Error) {
      console.error(
        `Не удалось загрузить файл: ${error.message}`
      );
    }
    console.error(`Не удалось загрузить файл: ${error}`);
  }
}




export const POST = async (req: Request) => {
  try {


    const splitUrl = req.url.split('/')
    const endPoint = splitUrl[splitUrl.length - 1]

    const currentDepartment = directions.data.find((item: MenuType): Boolean => item.value === endPoint)
    console.log(currentDepartment)


    const formData = await req.formData()
    const file =  formData.get('file') as File

    if (file) {
      console.log(file)

      writeFileData(file)
    }



    return NextResponse.json({
      message: 'API работает',
    })
    
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message },
        { status: 500 }
      );
    }
  }
}