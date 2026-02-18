
import {createImageMessageList} from '@/lib/createImageMessageList'


export const designMessage = async (department: string, data: any): Promise<{messageYG:string;messageTG:string}> => {
  const headYG = (extra: string) =>
    `Отдел - ${department}<br><br>` +
    `Имя - ${data.fio}<br><br>` +
    `Город - ${data.branch}<br><br>` +
    `Отдел автора - ${data.subdivision}<br><br>` +
    `Телеграм id - ${data.tgId}<br><br>` +
    `Тип работы - ${data.type}<br><br>${extra}`;

  const headTG = (extra: string) =>
    `Отдел - ${department}\n\n` +
    `Имя - ${data.fio}\n\n` +
    `Город - ${data.branch}\n\n` +
    `Отдел автора - ${data.subdivision}\n\n` +
    `Телеграм id - ${data.tgId}\n\n` +
    `Тип работы - ${data.type}\n\n${extra}`;

  // Хелпер: вывести строку, если значение есть
  const row = (label: string, v?: any, br = '<br>') => (v ? `${label} ${v}${br}` : '');

  // Удобный нормализатор типа
  const type = (data.type || '').trim();


  /* 1) Разработка с нуля */
  if (type === 'Разработка с нуля') {
    const bodyYG =
      row('<strong>Название проекта / мероприятия / услуги:</strong><br>', data.title, '<br><br>') +
      row('<strong>Описание проекта / мероприятия / услуги:</strong><br>', data.project_description, '<br><br>') +
      row('<strong>Дата мероприятия:</strong><br>', data.event_date, '<br><br>') +
      row('<strong>Цель макета:</strong><br>', data.goal, '<br><br>') +
      row('<strong>Целевая аудитория макета:</strong><br>', data.audience, '<br><br>') +
      row('<strong>Что требуется разработать?:</strong><br>', data.what_to_make, '<br><br>') +
      row('<strong>Размер макета:</strong><br>', data.size, '<br><br>') +
      row('<strong>Ориентация:</strong><br>', data.orientation_direction, '<br><br>') +
      row('<strong>Форма:</strong><br>', data.orientation_shape, '<br><br>') +
      row('<strong>Каким ты видишь будущий макет?:</strong><br>', data.vision, '<br><br>') +
      row('<strong>Где будет размещаться макет?:</strong><br>', data.placement, '<br><br>') +
      row('<strong>Фотография места размещения:</strong><br>', `Список`, '<br><br>') +

      createImageMessageList('yg', data.place_file) +

      row('<strong>Телеграм заказчика макета:</strong><br>', (data.client_tg.startsWith('@')) ? `<a target="_blank" rel="noopener noreferrer" href=https://t.me/${data.client_tg.slice(1)}>${data.client_tg}</a>` : data.client_tg, '<br><br>') +
      row('<strong>Желаемая дата готовности макета:</strong><br>', data.deadline, '<br><br>') +
      row('<strong>Дополнительно:</strong><br>', data.extra);

    const bodyTG =
      row('Название проекта / мероприятия / услуги:', data.title, '\n') +
      row('Описание проекта / мероприятия / услуги:', data.project_description, '\n') +
      row('Дата мероприятия:', data.event_date, '\n') +
      row('Цель макета:', data.goal, '\n') +
      row('Целевая аудитория макета:', data.audience, '\n') +
      row('Что требуется разработать?:', data.what_to_make, '\n') +
      row('Размер макета:', data.size, '\n') +
      row('Ориентация:', data.orientation_direction, '\n') +
      row('Форма:', data.orientation_shape, '\n') +
      row('Каким ты видишь будущий макет?:', data.vision, '\n') +
      row('Где будет размещаться макет?:', data.placement, '\n') +
      row('Фотография места размещения:', 'Список', '\n') +

      createImageMessageList('tg', data.place_file) +

      row('Телеграм заказчика макета:', (data.client_tg.startsWith('@')) ? data.client_tg.slice(1) : data.client_tg, '\n') +
      row('Желаемая дата готовности макета:', data.deadline, '\n') +
      row('Дополнительно:', data.extra, '\n');

    return { messageYG: headYG(bodyYG), messageTG: headTG(bodyTG) };
  }

  /* 2) Адаптация и внесение изменений в макет */
  if (type === 'Адаптация и внесение изменений в макет') {
    const bodyYG =
      row('<strong>Название мероприятия / проекта / услуги:</strong><br>', data.title, '<br><br>') +
      row('<strong>Исходный файл: - </strong><br>', `Список`, '<br>') +

      createImageMessageList('yg', data.target_file) +

      row('<strong>Что нужно исправить?:</strong><br>', data.changes, '<br><br>') +
      row('<strong>Телеграм заказчика макета:</strong><br>', (data.client_tg.startsWith('@')) ? `<a target="_blank" rel="noopener noreferrer" href=https://t.me/${data.client_tg.slice(1)}>${data.client_tg}</a>` : data.client_tg, '<br><br>') +
      row('<strong>Желаемая дата готовности макета:</strong><br>', data.deadline, '<br><br>') +
      row('<strong>Дополнительно:</strong><br>', data.extra);

    const bodyTG =
      row('Название мероприятия / проекта / услуги:', data.title, '\n') +
      row('Исходный файл:', 'Cписок', '\n') +

      createImageMessageList('tg', data.target_file) +

      row('Что нужно исправить?:', data.changes, '\n') +
      row('Телеграм заказчика макета:', (data.client_tg.startsWith('@')) ? data.client_tg.slice(1) : data.client_tg, '\n') +
      row('Желаемая дата готовности макета:', data.deadline, '\n') +
      row('Дополнительно:', data.extra, '\n');

    return { messageYG: headYG(bodyYG), messageTG: headTG(bodyTG) };
  }

  /* 3) Другое */
  if (type === 'Другое') {
    const bodyYG =
      row('<strong>Что требуется разработать?:</strong><br>', data.what_to_make, '<br><br>') +
      row('<strong>Размер макета:</strong><br>', data.size, '<br><br>') +
      row('<strong>Ориентация:</strong><br>', data.orientation_direction, '<br><br>') +
      row('<strong>Форма:</strong><br>', data.orientation_shape, '<br><br>') +
      row('<strong>Каким ты видишь будущий макет?:</strong><br>', data.vision, '<br><br>') +
      row('<strong>Где будет размещаться макет?:</strong><br>', data.placement, '<br><br>') +
      row('<strong>Фотография места размещения:</strong><br>', `<a target="_blank" rel="noopener noreferrer" href=${data.place_file}>${data.place_file}</a>`) +
      row('<strong>Желаемая дата готовности макета:</strong><br>', data.deadline, '<br><br>') +
      row('<strong>Дополнительно:</strong>', data.extra);

    const bodyTG =
      row('Что требуется разработать?:', data.what_to_make, '\n') +
      row('Размер макета:', data.size, '\n') +
      row('Ориентация:', data.orientation_direction, '\n') +
      row('Форма:', data.orientation_shape, '\n') +
      row('Каким ты видишь будущий макет?:', data.vision, '\n') +
      row('Где будет размещаться макет?:', data.placement, '\n') +
      row('Фотография места размещения:', data.place_file, '\n') +
      row('Желаемая дата готовности макета:', data.deadline, '\n') +
      row('Дополнительно:', data.extra, '\n');

    return { messageYG: headYG(bodyYG), messageTG: headTG(bodyTG) };
  }

  // Fallback
  return {
    messageYG: headYG('Детали по типу не распознаны или не заполнены.'),
    messageTG: headTG('Детали по типу не распознаны или не заполнены.')
  };
};


