import { NextResponse } from "next/server";

// 

import path from 'path'
import fs from 'fs'

// 

export const GET = async (req: Request, {params}: {params: any}) => {
  try {

    const {department, folder, file} = await params


    const currentFolder = path.join(process.cwd(), 'src', 'app', 'uploads', department, folder)
    console.log(currentFolder)

    const fileImage = fs.readFileSync(path.join(currentFolder, file))

    const ext = path.extname(file).toLowerCase();
    console.log(ext)
    let contentType = "application/octet-stream";
    if (ext === ".png") contentType = "image/png";
    if (ext === ".jpg" || ext === ".jpeg") contentType = "image/jpeg";
    if (ext === ".gif") contentType = "image/gif";
    if (ext === ".webp") contentType = "image/webp";


    return new NextResponse(fileImage, {
          status: 200,
          headers: {
            "Content-Type": contentType,
          },
        });


    
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      return NextResponse.json({
        message: error.message,
        status: 500
      })
    }

    return NextResponse.json({
      message: 'Неизвестная ошибка',
      status: 500
    })
  }
}