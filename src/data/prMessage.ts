export const prMessage = async (department: string, data: any): Promise<any> => {
  const headYG = (extra: string) =>
    `Отдел — ${department}<br><br>Имя — ${data.fio}<br><br>Город — ${data.branch}<br><br>Отдел автора — ${data.subdivision}<br><br>Телеграм id - ${data.tgId}<br><br>Тип заявки — ${data.type}<br><br>${extra}`;

  const headTG = (extra: string) =>
    `Отдел — ${department}\n\nИмя — ${data.fio}\n\nГород — ${data.branch}\n\nОтдел автора — ${data.subdivision}\n\nТелеграм id - ${data.tgId}\n\nТип заявки — ${data.type}\n\n${extra}`;

  const row = (label: string, v?: any, br = '<br>') =>
    v ? `${label} ${v}${br}` : '';

  const type = (data.type || '').trim();

  // 1) Проекты и продвижение услуг
  if (type === 'Проекты и продвижение услуг') {
    const bodyYG =
      row('Название проекта / услуги:', data.title) +
      row('Описание проекта / услуги:', data.description) +
      row('Цель:', data.goal) +
      row('Что необходимо сделать:', data.todo) +
      row('Какие сроки:', data.deadline);

    const bodyTG =
      row('Название проекта / услуги:', data.title, '\n') +
      row('Описание проекта / услуги:', data.description, '\n') +
      row('Цель:', data.goal, '\n') +
      row('Что необходимо сделать:', data.todo, '\n') +
      row('Какие сроки:', data.deadline, '\n');

    return { messageYG: headYG(bodyYG), messageTG: headTG(bodyTG) };
  }

  // 2) Мероприятие — внешнее
  if (type === 'Мероприятие — внешнее') {
    const bodyYG =
      row('Название мероприятия:', data.title) +
      row('Описание мероприятия:', data.description) +
      row('Цель проведения мероприятия:', data.goal) +
      row('Лидер мероприятия:', data.leader) +
      row('Что необходимо сделать:', data.todo) +
      row('Дата мероприятия:', data.date) +
      row('Место проведения мероприятия:', data.place);

    const bodyTG =
      row('Название мероприятия:', data.title, '\n') +
      row('Описание мероприятия:', data.description, '\n') +
      row('Цель проведения мероприятия:', data.goal, '\n') +
      row('Лидер мероприятия:', data.leader, '\n') +
      row('Что необходимо сделать:', data.todo, '\n') +
      row('Дата мероприятия:', data.date, '\n') +
      row('Место проведения мероприятия:', data.place, '\n');

    return { messageYG: headYG(bodyYG), messageTG: headTG(bodyTG) };
  }

  // 3) Мероприятие — внутреннее (для сотрудников)
  if (type === 'Мероприятие — внутреннее (для сотрудников)') {
    const bodyYG =
      row('Название мероприятия:', data.title) +
      row('Описание мероприятия:', data.description) +
      row('Цель проведения мероприятия:', data.goal) +
      row('Лидер мероприятия:', data.leader) +
      row('Что необходимо сделать:', data.todo) +
      row('Дата мероприятия:', data.date) +
      row('Место проведения мероприятия:', data.place);

    const bodyTG =
      row('Название мероприятия:', data.title, '\n') +
      row('Описание мероприятия:', data.description, '\n') +
      row('Цель проведения мероприятия:', data.goal, '\n') +
      row('Лидер мероприятия:', data.leader, '\n') +
      row('Что необходимо сделать:', data.todo, '\n') +
      row('Дата мероприятия:', data.date, '\n') +
      row('Место проведения мероприятия:', data.place, '\n');

    return { messageYG: headYG(bodyYG), messageTG: headTG(bodyTG) };
  }

  // 4) Выставки / выезды / конференции
  if (type === 'Выставки, выезды, конференции') {
    const bodyYG =
      row('Название мероприятия:', data.title) +
      row('Описание мероприятия:', data.description) +
      row('Сайт мероприятия:', data.site) +
      row('Дата мероприятия:', data.date) +
      row('Место проведения мероприятия:', data.place) +
      row('Цель участия:', data.goal) +
      row('Лидер выставки/поездки:', data.leader) +
      row('Список участников:', data.participants) +
      row('Что необходимо сделать:', data.todo);

    const bodyTG =
      row('Название мероприятия:', data.title, '\n') +
      row('Описание мероприятия:', data.description, '\n') +
      row('Сайт мероприятия:', data.site, '\n') +
      row('Дата мероприятия:', data.date, '\n') +
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
      row('Название мероприятия:', data.title) +
      row('Что необходимо сделать:', data.todo) +
      row('Цель — для чего это нужно:', data.goal) +
      row('Срок готовности:', data.deadline);

    const bodyTG =
      row('Название мероприятия:', data.title, '\n') +
      row('Что необходимо сделать:', data.todo, '\n') +
      row('Цель — для чего это нужно:', data.goal, '\n') +
      row('Срок готовности:', data.deadline, '\n');

    return { messageYG: headYG(bodyYG), messageTG: headTG(bodyTG) };
  }

  // fallback
  return {
    messageYG: headYG('Детали по типу заявки не распознаны или не заполнены.'),
    messageTG: headTG('Детали по типу заявки не распознаны или не заполнены.')
  };
};
