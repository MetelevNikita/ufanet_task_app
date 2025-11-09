
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
      row('Название проекта / мероприятия / услуги:', data.title) +
      row('Описание проекта / мероприятия / услуги:', data.project_description) +
      row('Дата мероприятия:', data.event_date) +
      row('Цель макета:', data.goal) +
      row('Целевая аудитория макета:', data.audience) +
      row('Что требуется разработать?:', data.what_to_make) +
      row('Размер макета:', data.size) +
      row('Ориентация:', '-' + ' ' + data.orientation_direction) +
      row('Форма:', '-' + ' ' + data.orientation_shape) +
      row('Каким ты видишь будущий макет?:', data.vision) +
      row('Где будет размещаться макет?:', data.placement) +
      row('Фотография места размещения:', '-' + ' ' + data.place_file) +
      row('Желаемая дата готовности макета:', data.deadline) +
      row('Имя фамилия заказчика макета:', data.client_name) +
      row('Номер телефона заказчика макета:', data.client_phone) +
      row('Телеграм заказчика макета:', data.client_tg) +
      row('Город:', data.city) +
      row('Дополнительно:', data.extra);

    const bodyTG =
      row('Название проекта / мероприятия / услуги:', data.title, '\n') +
      row('Описание проекта / мероприятия / услуги:', data.project_description, '\n') +
      row('Дата мероприятия:', data.event_date, '\n') +
      row('Цель макета:', data.goal, '\n') +
      row('Целевая аудитория макета:', data.audience, '\n') +
      row('Что требуется разработать?:', data.what_to_make, '\n') +
      row('Размер макета:', data.size, '\n') +
      row('Ориентация:', '-' + ' ' + data.orientation_direction, '\n') +
      row('Форма:', '-' + ' ' + data.orientation_shape, '\n') +
      row('Каким ты видишь будущий макет?:', data.vision, '\n') +
      row('Где будет размещаться макет?:', data.placement, '\n') +
      row('Фотография места размещения:', '-' + ' ' + data.place_file, '\n') +
      row('Желаемая дата готовности макета:', data.deadline, '\n') +
      row('Имя фамилия заказчика макета:', data.client_name, '\n') +
      row('Номер телефона заказчика макета:', data.client_phone, '\n') +
      row('Телеграм заказчика макета:', data.client_tg, '\n') +
      row('Город:', data.city, '\n') +
      row('Дополнительно:', data.extra, '\n');

    return { messageYG: headYG(bodyYG), messageTG: headTG(bodyTG) };
  }

  /* 2) Адаптация и внесение изменений в макет */
  if (type === 'Адаптация и внесение изменений в макет') {
    const bodyYG =
      row('Название мероприятия / проекта / услуги:', data.title) +
      row('Исходный файл:', '-' + ' ' + data.target_file) +
      row('Что нужно исправить?:', data.changes) +
      row('Желаемая дата готовности макета:', data.deadline) +
      row('Имя фамилия заказчика макета:', data.client_name) +
      row('Номер телефона заказчика макета:', data.client_phone) +
      row('Телеграм заказчика макета:', data.client_tg) +
      row('Город:', data.city) +
      row('Дополнительно:', data.extra);

    const bodyTG =
      row('Название мероприятия / проекта / услуги:', data.title, '\n') +
      row('Исходный файл:', '-' + ' ' + data.target_file, '\n') +
      row('Что нужно исправить?:', data.changes, '\n') +
      row('Желаемая дата готовности макета:', data.deadline, '\n') +
      row('Имя фамилия заказчика макета:', data.client_name, '\n') +
      row('Номер телефона заказчика макета:', data.client_phone, '\n') +
      row('Телеграм заказчика макета:', data.client_tg, '\n') +
      row('Город:', data.city, '\n') +
      row('Дополнительно:', data.extra, '\n');

    return { messageYG: headYG(bodyYG), messageTG: headTG(bodyTG) };
  }

  /* 3) Другое */
  if (type === 'Другое') {
    const bodyYG =
      row('Что требуется разработать?:', data.what_to_make) +
      row('Размер макета:', data.size) +
      row('Ориентация:', '-' + ' ' + data.orientation_direction) +
      row('Форма:', '-' + ' ' + data.orientation_shape) +
      row('Каким ты видишь будущий макет?:', data.vision) +
      row('Где будет размещаться макет?:', data.placement) +
      row('Фотография места размещения:', '-' + ' ' + data.place_file) +
      row('Желаемая дата готовности макета:', data.deadline) +
      row('Дополнительно:', data.extra);

    const bodyTG =
      row('Что требуется разработать?:', data.what_to_make, '\n') +
      row('Размер макета:', data.size, '\n') +
      row('Ориентация:', '-' + ' ' + data.orientation_direction, '\n') +
      row('Форма:', '-' + ' ' + data.orientation_shape, '\n') +
      row('Каким ты видишь будущий макет?:', data.vision, '\n') +
      row('Где будет размещаться макет?:', data.placement, '\n') +
      row('Фотография места размещения:', '-' + ' ' + data.place_file, '\n') +
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
