export async function logoutUser () {
    try {

        const response = await fetch ('/api/auth/logout', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!response.ok) {
            console.log(`Ошибка API при выходе пользователя ${response.status} - ${response.statusText}`)
            throw new Error("Ошибка API при выходе пользователя");
        }

        const data = await response.json()
        console.log(data)
        return data
        
    } catch (error: Error | unknown) {
        if (error instanceof Error) {
            console.error('Ошибка при выходе из пользователя')
            return null
        }
    }
}