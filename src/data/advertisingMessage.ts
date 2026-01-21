export const advertisingMessage = async (department: string, data: any): Promise<any> => {
  const headYG = (extra: string) =>
    `Отдел - ${department}<br><br>Имя - ${data.fio}<br><br>Город - ${data.branch}<br><br>Отдел автора - ${data.subdivision}<br><br>Телеграм id - ${data.tgId}<br><br>Тип услуги - ${data.type}<br><br>${extra}`;


  const headTG = (extra: string) =>
    `Отдел - ${department}\n\nИмя - ${data.fio}\n\nГород - ${data.branch}\n\nОтдел автора - ${data.subdivision}\n\nТелеграм id  - ${data.tgId}\n\nТип услуги - ${data.type}\n\n${extra}`;

  // удобный хелпер: строка поля, если оно есть
  const row = (label: string, v?: any, br = '<br>') =>
    v ? `${label} ${v}${br}` : '';

  const type = (data.type || '').trim();

  // 1) Первичное обращение
  if (type === 'Первичное обращение по задаче (полное описание)' || data.value === 'primary') {
    const bodyYG =
      row('Название проекта:', data.title) +
      `Первичное описание проекта<br><br>${data.description || ''}` +
      row('<br>Желаемая дата сдачи:', data.deadline);
    const bodyTG =
      row('Название проекта:', data.title, '\n') +
      `Первичное описание проекта\n\n${data.description || ''}\n` +
      row('\nЖелаемая дата сдачи:', data.deadline, '\n');
    return { messageYG: headYG(bodyYG), messageTG: headTG(bodyTG) };
  }

  // 2) Полиграфия / баннеры / таблички
  if (type === 'Заявка на полиграфию, баннеры, таблички' || data.value === 'printing') {
    const bodyYG =
      row('Название:', data.title) +
      row('Изделие:', data.view) +
      row('Размер:', data.size) +
      row('Другое:', data.size_other) +
      row('Ориентация:', data.orientation) +
      row('Файл макета:', data.file) +
      row('Дата сдачи:', data.deadline);
    const bodyTG =
      row('Название:', data.title, '\n') +
      row('Изделие:', data.view, '\n') +
      row('Размер:', data.size, '\n') +
      row('Другое:', data.size_other, '\n') +
      row('Ориентация:', data.orientation, '\n') +
      row('Файл макета:', data.file, '\n') +
      row('Дата сдачи:', data.deadline, '\n');
    return { messageYG: headYG(bodyYG), messageTG: headTG(bodyTG) };
  }

  // 3) Мероприятие / выставка / ДОД
  if (type === 'Заявка на Мероприятие/выставку/ДОД' || data.value === 'event') {
    const bodyYG =
      row('Название:', data.title) +
      row('Цель:', data.target) +
      row('Участники:', data.participants) +
      row('Даты и время:', data.dates) +
      row('Адрес/место проведения:', data.place) +
      row('Что необходимо сделать:', data.todo) +
      row('Бюджет:', data.budget) +
      row('Файл сметы', data.smeta_file, '\n') +
      row('Дата готовности ТЗ:', data.deadline);

    const bodyTG =
      row('Название:', data.title, '\n') +
      row('Цель:', data.target, '\n') +
      row('Участники:', data.participants, '\n') +
      row('Даты и время:', data.dates, '\n') +
      row('Адрес/место проведения:', data.place, '\n') +
      row('Что необходимо сделать:', data.todo, '\n') +
      row('Бюджет:', data.budget, '\n') +
      row('Файл сметы', data.smeta_file, '\n');
      row('Дата готовности ТЗ:', data.deadline, '\n');

    return { messageYG: headYG(bodyYG), messageTG: headTG(bodyTG) };
  }

  // 4) Оплата счета
  if (type === 'Заявка на оплату счета' || data.value === 'payment') {
    const bodyYG =
      row('Название:', data.title) +
      row('Описание/назначение оплаты:', data.description) +
      row('Поставщик:', data.vendor) +
      row('Сумма и валюта:', data.amount) +
      row('Файл счета:', data.invoiceFile) +
      row('Ссылка на счет:', data.invoiceLink) +
      row('Комментарий:', data.comment) +
      row('Срок оплаты:', data.deadline)

    const bodyTG =
      row('Название:', data.title, '\n') +
      row('Описание/назначение оплаты:', data.description, '\n') +
      row('Поставщик:', data.vendor, '\n') +
      row('Сумма и валюта:', data.amount, '\n') +
      row('Файл счета:', data.invoiceFile, '\n') +
      row('Ссылка на счет:', data.invoiceLink, '\n') +
      row('Комментарий:', data.comment, '\n') +
      row('Срок оплаты:', data.deadline, '\n')

    return { messageYG: headYG(bodyYG), messageTG: headTG(bodyTG) };
  }

  // 5) Оформление договора
  if (type === 'Заявка на оформление договора' || data.value === 'agreement') {
    const bodyYG =
      row('Название:', data.title) +
      row('Предмет договора:', data.subject) +
      row('Цель/описание:', data.description) +
      row('Файл проекта договора:', data.draftFile) +
      row('Контакт контрагента:', data.counterparty) +
      row('Сроки:', data.deadline)

    const bodyTG =
      row('Название:', data.title, '\n') +
      row('Предмет договора:', data.subject, '\n') +
      row('Цель/описание:', data.description, '\n') +
      row('Файл проекта договора:', data.draftFile, '\n') +
      row('Контакт контрагента:', data.counterparty, '\n') +
      row('Сроки:', data.deadline)


    return { messageYG: headYG(bodyYG), messageTG: headTG(bodyTG) };
  }

  // 6) Трансфер
  if (type === 'Заявка на трансфер' || data.value === 'transfer') {
    const bodyYG =
      row('Название:', data.title) +
      row('Описание:', data.description) +
      row('Дата поездки:', data.deadline) +
      row('Маршрут (детально):', data.route) +
      row('Время отправления:', data.time_start) +
      row('Место отправления:', data.place_start) +
      row('Место прибытия:', data.place_finish) +
      row('Ориентир времени прибытия:', data.time_finish) +
      row('Количество человек:', data.people) +
      row('Пожелания к транспорту:', data.wishes) +
      row('Пассажиры (ФИО/документы):', data.passengers)


    const bodyTG =
      row('Название:', data.title, '\n') +
      row('Описание:', data.description, '\n') +
      row('Дата поездки:', data.deadline, '\n') +
      row('Маршрут (детально):', data.route, '\n') +
      row('Время отправления:', data.time_start, '\n') +
      row('Место отправления:', data.place_start, '\n') +
      row('Место прибытия:', data.place_finish, '\n') +
      row('Ориентир времени прибытия:', data.time_finish, '\n') +
      row('Количество человек:', data.people, '\n') +
      row('Пожелания к транспорту:', data.wishes, '\n') +
      row('Пассажиры (ФИО/документы):', data.passengers, '\n')

    return { messageYG: headYG(bodyYG), messageTG: headTG(bodyTG) };
  }

  // 7) ТМЦ/реквизит
  if (type === 'Заявка на ТМЦ/реквизит' || data.value === 'props') {
    const bodyYG =
      row('Название:', data.title) +
      row('Ссылка на товар:', data.link) +
      row('Что нужно и количество:', data.what) +
      row('Сроки:', data.deadline)


    const bodyTG =
      row('Название:', data.title, '\n') +
      row('Ссылка на товар:', data.link, '\n') +
      row('Что нужно и количество:', data.what, '\n') +
      row('Сроки:', data.deadline, '\n')


    return { messageYG: headYG(bodyYG), messageTG: headTG(bodyTG) };
  }

  // 8) Сувениры с лого/подарки
  if (type === 'Заявка на сувениры с лого/подарки' || data.value === 'souvenir') {
    const bodyYG =
      row('Название:', data.title) +
      row('Описание/повод:', data.description) +
      row('Категория:', data.category) +
      row('Количество:', data.qty) +
      row('Брендирование:', data.branding) +
      row('Сроки:', data.deadline)

    const bodyTG =
      row('Название:', data.title, '\n') +
      row('Описание/повод:', data.description, '\n') +
      row('Категория:', data.category, '\n') +
      row('Количество:', data.qty, '\n') +
      row('Брендирование:', data.branding, '\n') +
      row('Сроки:', data.deadline, '\n')

    return { messageYG: headYG(bodyYG), messageTG: headTG(bodyTG) };
  }

  // 9) Промо одежда
  if (type === 'Заявка на промо одежду' || data.value === 'promo') {
    const bodyYG =
      row('Название:', data.title) +
      row('Описание:', data.description) +
      row('Вид одежды:', data.clothes_type) +
      row('Логотип/брендинг:', data.branding) +
      row('Размеры и количества:', data.sizes) +
      row('Дата готовности:', data.deadline)

    const bodyTG =
      row('Название:', data.title, '\n') +
      row('Описание:', data.description, '\n') +
      row('Вид одежды:', data.clothes_type, '\n') +
      row('Логотип/брендинг:', data.branding, '\n') +
      row('Размеры и количества:', data.sizes, '\n') +
      row('Дата готовности:', data.deadline, '\n')

    return { messageYG: headYG(bodyYG), messageTG: headTG(bodyTG) };
  }

  // 10) Кофе-брейк
  if (type === 'Заявка на кофе брейк' || data.value === 'coffe') {
    const bodyYG =
      row('Название:', data.title) +
      row('Описание/формат:', data.description) +
      row('Место проведения:', data.place) +
      row('Дата и время:', data.deadline) +
      row('Длительность:', data.duration) +
      row('Меню/пожелания:', data.menu) +
      row('Количество человек:', data.people)

    const bodyTG =
      row('Название:', data.title, '\n') +
      row('Описание/формат:', data.description, '\n') +
      row('Место проведения:', data.place, '\n') +
      row('Дата и время:', data.deadline, '\n') +
      row('Длительность:', data.duration, '\n') +
      row('Меню/пожелания:', data.menu, '\n') +
      row('Количество человек:', data.people, '\n')

    return { messageYG: headYG(bodyYG), messageTG: headTG(bodyTG) };
  }

  // 11) Маркетплейс Ozon
  if (type === 'Заявка на закуп на маркетплейсе ОЗОН' || data.value === 'marketplace') {
    const bodyYG =
      row('Название:', data.title) +
      row('Цель покупки:', data.purpose) +
      row('Ссылка на товар:', data.link) +
      row('Количество:', data.qty) +
      row('Примечания:', data.notes) +
      row('Дата получения', data.deadline)

    const bodyTG =
      row('Название:', data.title, '\n') +
      row('Цель покупки:', data.purpose, '\n') +
      row('Ссылка на товар:', data.link, '\n') +
      row('Количество:', data.qty, '\n') +
      row('Примечания:', data.notes, '\n')
      row('Дата получения', data.deadline, '\n')

    return { messageYG: headYG(bodyYG), messageTG: headTG(bodyTG) };
  }

  // Fallback — возвращаем только шапку с типом
  return {
    messageYG: headYG('Детали по типу не распознаны или не заполнены.'),
    messageTG: headTG('Детали по типу не распознаны или не заполнены.')
  };
};