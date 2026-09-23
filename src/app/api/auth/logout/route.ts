import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server'
import { cookies } from "next/headers";
import { logger } from "@/lib/logger";

const log = logger('auth')



export const GET = async (): Promise<NextResponse<{success: boolean, message: string, data: any}>> => {
    try {

        const data = (await cookies()).delete('token')
        

        return NextResponse.json({
                success: true,
                message: `Пользователь вышел из системы`,
                data: null
        })

        
    } catch (error: Error | unknown) {

        if (error instanceof Error) {
            log.error('Ошибка выхода', error)
            return NextResponse.json({
                success: false,
                message: `Ошибка очистки данных ${error.message}`,
                data: null
            })
        }

        log.error('Ошибка выхода', error)
        return NextResponse.json({
            success: false,
            message: `Неизвестная оишбка ${error}`,
            data: null
        })
    }
}