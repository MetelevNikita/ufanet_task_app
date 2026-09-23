import { logger } from "@/lib/logger";

const log = logger('files')

export function createImageMessageList (trigger: string, data: string[]) {




  try {

  // Хелпер: вывести строку, если значение есть
  const row = (label: string, v?: any, br = '<br>') => (v ? `${label} ${v}${br}` : '');

    let list: string[] = []

    data.forEach((item: string, index: number) => {
      if (trigger === 'yg') {
        list.push(row(`${index+1}`, `<a target="_blank" rel="noopener noreferrer" href=${item}>${item}</a>`, '<br><br>'))
      } else if (trigger === 'tg') {
        list.push(row(`${index+1}`, item, '\n'))
      } else {
        return list
      }
    })

    return list.join('')

  } catch (error) {
    log.error('Ошибка сборки списка файлов', error)
    return []
  }

}