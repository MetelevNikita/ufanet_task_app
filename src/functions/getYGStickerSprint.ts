export const getYGStickerSprint = async (key: string) => {
  try {

    const responce = await fetch("https://ru.yougile.com/api-v2/sprint-stickers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${key}`
      }
    })

    if (!responce.ok) {
      throw new Error(
        `Ошибка получения стикеров спринта из YG ${responce.statusText} - ${responce.status}`
      )
    }

    const data = await responce.json()
    return data

    
  } catch (error) {
    console.error(error)
  }
}