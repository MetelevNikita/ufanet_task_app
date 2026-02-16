
export const designMessage = async (department: string, data: any): Promise<{messageYG:string;messageTG:string}> => {
  const headYG = (extra: string) =>
    `<strong>Отдел - </strong>${department}<br><br>` +
    `<strong>Имя - </strong>${data.fio}<br><br>` +
    `<strong>Город - </strong>${data.branch}<br><br>` +
    `<strong>Отдел автора - </strong>${data.subdivision}<br><br>` +
    `<strong>Телеграм id - </strong>${data.tgId}<br><br>` +
    `<strong>Тип работы - </strong>${data.type}<br><br>${extra}`;

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
      row('<strong>Название проекта / мероприятия / услуги:</strong>', data.title) +
      row('<strong>Описание проекта / мероприятия / услуги:</strong>', data.project_description) +
      row('<strong>Дата мероприятия:</strong>', data.event_date) +
      row('<strong>Цель макета:</strong>', data.goal) +
      row('<strong>Целевая аудитория макета:</strong>', data.audience) +
      row('<strong>Что требуется разработать?:</strong>', data.what_to_make) +
      row('<strong>Размер макета:</strong>', data.size) +
      row('<strong>Ориентация:</strong>', data.orientation_direction) +
      row('<strong>Форма:</strong>', data.orientation_shape) +
      row('<strong>Каким ты видишь будущий макет?:</strong>', data.vision) +
      row('<strong>Где будет размещаться макет?:</trong>', data.placement) +
      row('<strong>Фотография места размещения:</strong>', `<a target="_blank" rel="noopener noreferrer" href=${data.place_file}>${data.place_file}</a>`) +
      row('<strong>Желаемая дата готовности макета:</strong>', data.deadline) +
      row('<strong>Имя фамилия заказчика макета:</strong>', data.client_name) +
      row('<strong>Номер телефона заказчика макета:</strong>', data.client_phone) +
      row('<strong>Телеграм заказчика макета:</strong>', (data.client_tg.startsWith('@')) ? `<a target="_blank" rel="noopener noreferrer" href=${data.client_tg}>${data.client_tg}</a>` : data.client_tg) +
      row('<strong>Город:<strong>', data.city) +
      row('<strong>Дополнительно:</strong>', data.extra);

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
      row('Фотография места размещения:', data.place_file, '\n') +
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
      row('<strong>Название мероприятия / проекта / услуги:</strong>', data.title) +
      row('<strong>Исходный файл: - </strong>', + `<a target="_blank" rel="noopener noreferrer" href=${data.target_file}>${data.target_file}</a>`) +
      row('<strong>Что нужно исправить?:</strong>', data.changes) +
      row('<strong>Желаемая дата готовности макета:</strong>', data.deadline) +
      row('<strong>Имя фамилия заказчика макета:</strong>', data.client_name) +
      row('<strong>Номер телефона заказчика макета:</strong>', data.client_phone) +
      row('<strong>Телеграм заказчика макета:</strong>', (data.client_tg.startsWith('@')) ? `<a target="_blank" rel="noopener noreferrer" href=${data.client_tg}>${data.client_tg}</a>` : data.client_tg) +
      row('<strong>Город:</strong>', data.city) +
      row('<strong>Дополнительно:</strong>', data.extra);

    const bodyTG =
      row('Название мероприятия / проекта / услуги:', data.title, '\n') +
      row('Исходный файл:', data.target_file, '\n') +
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
      row('<strong>Что требуется разработать?:</strong>', data.what_to_make) +
      row('<strong>Размер макета:</strong>', data.size) +
      row('<strong>Ориентация:</strong>', data.orientation_direction) +
      row('<strong>Форма:</strong>', data.orientation_shape) +
      row('<strong>Каким ты видишь будущий макет?:</strong>', data.vision) +
      row('<strong>Где будет размещаться макет?:</strong>', data.placement) +
      row('<strong>Фотография места размещения:</strong>', `<a target="_blank" rel="noopener noreferrer" href=${data.place_file}>${data.place_file}</a>`) +
      row('<strong>Желаемая дата готовности макета:</strong>', data.deadline) +
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


