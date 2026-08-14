import { NextResponse } from "next/server";
import fs from 'fs/promises'
import path from 'path'



export const GET = async () => {
  try {

    const filePath = path.resolve(process.cwd(), 'public', 'instructions', 'instructions pr-tz.pdf')
    const fileBuffer = await fs.readFile(filePath)

    return new NextResponse(new Uint8Array(fileBuffer), {
        status: 200,
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'inline; filename="example.pdf"',
        },
      });
    
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      return NextResponse.json({
        message: `ERROR get instriktion ${error.message}`
      })
    }

    return NextResponse.json({
      message: `unknow ERROR ${error}`
    })
  }
}