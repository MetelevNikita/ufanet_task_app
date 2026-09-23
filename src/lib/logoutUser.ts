import { logger } from "@/lib/logger";

const log = logger('auth')

export async function logoutUser () {
    try {

        const response = await fetch ('/api/auth/logout', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!response.ok) {
            throw new Error("Ошибка API при выходе пользователя");
        }

        const data = await response.json()
        return data
        
    } catch (error: Error | unknown) {
        if (error instanceof Error) {
            log.error('Ошибка выхода из аккаунта', error)
            return null
        }
    }
}