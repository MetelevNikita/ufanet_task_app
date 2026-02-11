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
  if (type === 'Заявка на полиграфию/таблички/Стенд' || data.value === 'printing') {
    const bodyYG =
      row('Название:', data.title) +
      row('Изделие:', data.view) +
      row('Размер:', data.size) +
      row('Другое:', data.size_other) +
      row('Ориентация:', data.orientation) +
      row('Файл макета:', data.maket_file) +
      row('Дата сдачи:', data.deadline);
    const bodyTG =
      row('Название:', data.title, '\n') +
      row('Изделие:', data.view, '\n') +
      row('Размер:', data.size, '\n') +
      row('Другое:', data.size_other, '\n') +
      row('Ориентация:', data.orientation, '\n') +
      row('Файл макета:', data.maket_file, '\n') +
      row('Дата сдачи:', data.deadline, '\n');
    return { messageYG: headYG(bodyYG), messageTG: headTG(bodyTG) };
  }

  // 3) Мероприятие/Региональный день/Обучение/Выезд отдела (службы)
  if (type === 'Мероприятие/Региональный день/Обучение/Выезд отдела (службы)' || data.value === 'event') {
    const bodyYG =
      row('Название:', data.title) +
      row('Цель:', data.target) +
      row('Участники:', data.participants) +
      row('Даты и время:', data.dates) +
      row('Адрес/место проведения:', data.place) +
      row('Предварительная смета:', data.budget) +
      row('Файл сметы', data.smeta_file) +
      row('Дополнительные файлы', data.additionally_file) +
      row('Дата готовности ТЗ:', data.deadline);

    const bodyTG =
      row('Название:', data.title, '\n') +
      row('Цель:', data.target, '\n') +
      row('Участники:', data.participants, '\n') +
      row('Даты и время:', data.dates, '\n') +
      row('Адрес/место проведения:', data.place, '\n') +
      row('Предварительная смета:', data.budget, '\n') +
      row('Файл сметы', data.smeta_file, '\n') +
      row('Дополнительные файлы', data.additionally_file, '\n') +
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


  // 6) ТМЦ/реквизит
  if (type === 'Заявка на ТМЦ/реквизит' || data.value === 'props') {
    const bodyYG =
      row('Где будет использоваться:', data.title) +
      row('Что нужно и количество:', data.what) +
      row('Сроки:', data.deadline)


    const bodyTG =
      row('Где будет использоваться:', data.title, '\n') +
      row('Что нужно и количество:', data.what, '\n') +
      row('Сроки:', data.deadline, '\n')


    return { messageYG: headYG(bodyYG), messageTG: headTG(bodyTG) };
  }

  // 7) Заявка на сувениры с лого/подарки   
  if (type === 'Заявка на сувениры с лого/подарки' || data.value === 'souvenir') {
    const bodyYG =
      row('Название:', data.title) +
      row('Описание/повод:', data.description) +
      row('Индивидуальный заказ:', data.category) +

      row('Цвет:', data.color) +
      row('Макет', data.maket_file) +
      row('Список награждаемых:', data.awarded_file) +


      row('Количество:', data.qty) +
      row('Сроки:', data.deadline)

    const bodyTG =
      row('Название:', data.title, '\n') +
      row('Описание/повод:', data.description, '\n') +
      row('Индивидуальный заказ:', data.category, '\n') +

      row('Цвет:', data.color, '\n') +
      row('Маке:т', data.maket_file, '\n') +
      row('Список награждаемых:', data.awarded_file, '\n') +

      row('Количество:', data.qty, '\n') +
      row('Сроки:', data.deadline, '\n')

    return { messageYG: headYG(bodyYG), messageTG: headTG(bodyTG) };
  }

  // 8) Промо одежда
  if (type === 'Заявка на промо одежду' || data.value === 'promo') {
    const bodyYG =
      row('Название:', data.title) +
      row('Описание:', data.description) +
      row('Вид одежды:', data.clothes_type) +
      row('Размеры и количества:', data.sizes) +
      row('Примечание:', data.note) +
      row('Дата готовности:', data.deadline)

    const bodyTG =
      row('Название:', data.title, '\n') +
      row('Описание:', data.description, '\n') +
      row('Вид одежды:', data.clothes_type, '\n') +
      row('Размеры и количества:', data.sizes, '\n') +
      row('Примечание:', data.note, '\n') +
      row('Дата готовности:', data.deadline, '\n')

    return { messageYG: headYG(bodyYG), messageTG: headTG(bodyTG) };
  }

  // 9) Маркетплейс Ozon
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