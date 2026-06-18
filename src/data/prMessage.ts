export const prMessage = async (department: string, data: any): Promise<any> => {
  const headYG = (extra: string) =>
    `Дата создания - ${data.dateCreated}<br><br>Отдел - ${data.department}<br><br>Тип Задачи - ${data.type}<br><br>Имя — ${data.fio}<br><br>Город — ${data.branch}<br><br>Отдел автора — ${data.subdivision}<br><br>Телеграм id - ${data.tgId}<br><br>Тип заявки — ${data.type}<br><br>${extra}`;

  const headTG = (extra: string) =>
    `Дата создания - ${data.dateCreated}\n\nОтдел - ${data.department}\n\nТип Задачи - ${data.type}\n\nИмя — ${data.fio}\n\nГород — ${data.branch}\n\nОтдел автора — ${data.subdivision}\n\nТелеграм id - ${data.tgId}\n\nТип заявки — ${data.type}\n\n${extra}`;

  const row = (label: string, v?: any, br = '<br>') =>
    v ? `${label} ${v}${br}` : '';

  const type = (data.type || '').trim();

  // 1) Проекты и продвижение услуг
  if (type === 'Проекты (продвижение услуг, сервиса)') {
    const bodyYG =
      row('<strong>Название проекта / услуги:</strong><br>', data.title, '<br><br>') +
      row('<strong>Описание проекта / услуги:</strong><br>', data.description, '<br><br>') +
      row('<strong>Цель:</strong><br>', data.goal, '<br><br>') +
      row('<strong>Что необходимо сделать:</strong><br>', data.todo, '<br><br>') +
      row('<strong>Дата мероприятия:</strong><br>', new Date(data.deadline_project_servise).toLocaleDateString('RU-ru')) +
      row('<strong>Дополнительно:</strong><br>', data.extra, '<br><br>');

    const bodyTG =
      row('Название проекта / услуги:', data.title, '\n') +
      row('Описание проекта / услуги:', data.description, '\n') +
      row('Цель:', data.goal, '\n') +
      row('Что необходимо сделать:', data.todo, '\n') +
      row('Дата мероприятия:', new Date(data.deadline_project_servise).toLocaleDateString('RU-ru'), '\n') +
      row('Дополнительно:', data.extra, '\n');

    return { messageYG: headYG(bodyYG), messageTG: headTG(bodyTG) };
  }

  // 2) Мероприятие — внешнее
  if (type === 'Мероприятие - внешнее (для партнеров, абонентов, жителей)') {
    const bodyYG =
      row('<strong>Название мероприятия:</strong><br>', data.title, '<br><br>') +
      row('<strong>Описание мероприятия:</strong><br>', data.description, '<br><br>') +
      row('<strong>Цель проведения мероприятия:</strong><br>', data.goal, '<br><br>') +
      row('<strong>Что необходимо сделать:</strong><br>', data.todo, '<br><br>') +
      row('<strong>Дата мероприятия:</strong><br>', new Date(data.date_event_inside).toLocaleDateString('RU-ru'), '<br><br>') +
      row('<strong>Место проведения мероприятия:</strong><br>', data.place, '<br><br>');

    const bodyTG =
      row('Название мероприятия:', data.title, '\n') +
      row('Описание мероприятия:', data.description, '\n') +
      row('Цель проведения мероприятия:', data.goal, '\n') +
      row('Что необходимо сделать:', data.todo, '\n') +
      row('Дата мероприятия:', new Date(data.date_event_inside).toLocaleDateString('RU-ru'), '\n') +
      row('Место проведения мероприятия:', data.place, '\n');

    return { messageYG: headYG(bodyYG), messageTG: headTG(bodyTG) };
  }

  // 3) Мероприятие — внутреннее (для сотрудников)
  if (type === 'Мероприятие — внутреннее (для сотрудников)') {
    const bodyYG =
      row('<strong>Название мероприятия:</strong><br>', data.title, '<br><br>') +
      row('<strong>Описание мероприятия:</strong><br>', data.description, '<br><br>') +
      row('<strong>Цель проведения мероприятия:</strong><br>', data.goal, '<br><br>') +
      row('<strong>Лидер мероприятия:</strong><br>', data.leader, '<br><br>') +
      row('<strong>Что необходимо сделать:</strong><br>', data.todo, '<br><br>') +
      row('<strong>Дата мероприятия:</strong><br>', new Date(data.date_event_outside).toLocaleDateString('RU-ru'), '<br><br>') +
      row('<strong>Место проведения мероприятия:</strong><br>', data.place);

    const bodyTG =
      row('Название мероприятия:', data.title, '\n') +
      row('Описание мероприятия:', data.description, '\n') +
      row('Цель проведения мероприятия:', data.goal, '\n') +
      row('Лидер мероприятия:', data.leader, '\n') +
      row('Что необходимо сделать:', data.todo, '\n') +
      row('Дата мероприятия:', new Date(data.date_event_outside).toLocaleDateString('RU-ru'), '\n') +
      row('Место проведения мероприятия:', data.place, '\n');

    return { messageYG: headYG(bodyYG), messageTG: headTG(bodyTG) };
  }

  // 4) Выставки / выезды / конференции
  if (type === 'Выставки, выезды, конференции') {
    const bodyYG =
      row('<strong>Название мероприятия:</strong><br>', data.title, '<br><br>') +
      row('<strong>Описание мероприятия:</strong><br>', data.description, '<br><br>') +
      row('<strong>Сайт мероприятия:</strong><br>', data.site, '<br><br>') +
      row('<strong>Дата мероприятия:</strong><br>', new Date(data.date_expo).toLocaleDateString('RU-ru'), '<br><br>') +
      row('<strong>Место проведения мероприятия:</strong><br>', data.place, '<br><br>') +
      row('<strong>Цель участия:</strong><br>', data.goal, '<br><br>') +
      row('<strong>Лидер выставки/поездки:</strong><br>', data.leader, '<br><br>') +
      row('<strong>Список участников:</strong><br>', data.participants, '<br><br>') +
      row('<strong>Что необходимо сделать:</strong><br>', data.todo);

    const bodyTG =
      row('Название мероприятия:', data.title, '\n') +
      row('Описание мероприятия:', data.description, '\n') +
      row('Сайт мероприятия:', data.site, '\n') +
      row('Дата мероприятия:', new Date(data.date_expo).toLocaleDateString('RU-ru'), '\n') +
      row('Место проведения мероприятия:', data.place, '\n') +
      row('Цель участия:', data.goal, '\n') +
      row('Лидер выставки/поездки:', data.leader, '\n') +
      row('Список участников:', data.participants, '\n') +
      row('Что необходимо сделать:', data.todo, '\n');

    return { messageYG: headYG(bodyYG), messageTG: headTG(bodyTG) };
  }

  // 5) Прочее
  if (type === 'Прочее') {
    const bodyYG =
      row('<strong>Название мероприятия:</strong><br>', data.title, '<br><br>') +
      row('<strong>Что необходимо сделать:</strong><br>', data.todo, '<br><br>') +
      row('<strong>Цель — для чего это нужно:</strong><br>', data.goal, '<br><br>') +
      row('<strong>Дата мероприятия:</strong><br>', new Date(data.date_other_event).toLocaleDateString('RU-ru'), '<br><br>');

    const bodyTG =
      row('Название мероприятия:', data.title, '\n') +
      row('Что необходимо сделать:', data.todo, '\n') +
      row('Цель — для чего это нужно:', data.goal, '\n') +
      row('Дата мероприятия:', new Date(data.date_other_event).toLocaleDateString('RU-ru'), '\n');

    return { messageYG: headYG(bodyYG), messageTG: headTG(bodyTG) };
  }

  // fallback
  return {
    messageYG: headYG('Детали по типу заявки не распознаны или не заполнены.'),
    messageTG: headTG('Детали по типу заявки не распознаны или не заполнены.')
  };
};
