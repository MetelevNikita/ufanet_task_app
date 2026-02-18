import {createImageMessageList} from '@/lib/createImageMessageList'

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
      row('<strong>Название проекта:</strong><br>', data.title, '<br><br>') +
      row(`<strong>Первичное описание проекта</strong><br>`, data.description || '', '<br><br>') +
      row('<strong>Желаемая дата сдачи:</strong><br>', data.deadline, '<br><br>');

    const bodyTG =
      row('Название проекта:', data.title, '\n') +
      row(`Первичное описание проекта`, data.description || '', '\n') +
      row('Желаемая дата сдачи:', data.deadline, '\n');
    return { messageYG: headYG(bodyYG), messageTG: headTG(bodyTG) };
  }

  // 2) Полиграфия / баннеры / таблички
  if (type === 'Заявка на полиграфию/таблички/Стенд' || data.value === 'printing') {
    const bodyYG =
      row('<strong>Название:</strong><br>', data.title, '<br><br>') +
      row('<strong>Изделие:</strong><br>', data.view, '<br><br>') +
      row('<strong>Размер:</strong><br>', data.size, '<br><br>') +
      row('<strong>Другое:</strong><br>', data.size_other, '<br><br>') +
      row('<strong>Ориентация:</strong><br>', data.orientation, '<br><br>') +

      row('<strong>Файл макета:</strong><br>', `Список`, '<br><br>') +
      createImageMessageList('yg', data.maket_file) +

      row('<strong>Дата сдачи:</strong><br>', data.deadline, '<br><br>');
    const bodyTG =
      row('Название:', data.title, '\n') +
      row('Изделие:', data.view, '\n') +
      row('Размер:', data.size, '\n') +
      row('Другое:', data.size_other, '\n') +
      row('Ориентация:', data.orientation, '\n') +

      row('Файл макета:', `Список`, '\n') +
      createImageMessageList('tg', data.maket_file) +

      row('Дата сдачи:', data.deadline, '\n');
    return { messageYG: headYG(bodyYG), messageTG: headTG(bodyTG) };
  }

  // 3) Мероприятие/Региональный день/Обучение/Выезд отдела (службы)
  if (type === 'Мероприятие/Региональный день/Обучение/Выезд отдела (службы)' || data.value === 'event') {
    const bodyYG =
      row('<strong>Название:</strong><br>', data.title, '<br><br>') +
      row('<strong>Цель:</strong><br>', data.target, '<br><br>') +
      row('<strong>Участники:</strong><br>', data.participants, '<br><br>') +
      row('<strong>Даты и время:</strong><br>', data.dates, '<br><br>') +
      row('<strong>Адрес/место проведения:</strong><br>', data.place, '<br><br>') +
      row('<strong>Предварительная смета:</strong><br>', data.budget, '<br><br>') +

      row('<strong>Файл сметы:</strong><br>', `Список`, '<br><br>') +
      createImageMessageList('yg', data.smeta_file) +

      row('<strong>Дополнительные файлы</strong><br>', `Список`, '<br><br>') +
      createImageMessageList('yg', data.additionally_file) +

      row('<strong>Дата готовности ТЗ:</strong><br>', data.deadline, '<br><br>');

    const bodyTG =
      row('Название:', data.title, '\n') +
      row('Цель:', data.target, '\n') +
      row('Участники:', data.participants, '\n') +
      row('Даты и время:', data.dates, '\n') +
      row('Адрес/место проведения:', data.place, '\n') +
      row('Предварительная смета:', data.budget, '\n') +

      row('Файл сметы:</strong>', `Список`, '\n') +
      createImageMessageList('tg', data.smeta_file) +

      row('Дополнительные файлы', `Список`, '\n') +
      createImageMessageList('tg', data.additionally_file) +

      row('Дата готовности ТЗ:', data.deadline, '\n');

    return { messageYG: headYG(bodyYG), messageTG: headTG(bodyTG) };
  }

  // 4) Оплата счета
  if (type === 'Заявка на оплату счета' || data.value === 'payment') {
    const bodyYG =
      row('<strong>Название:</strong><br>', data.title, '<br><br>') +
      row('<strong>Описание/назначение оплаты:</strong><br>', data.description, '<br><br>') +
      row('<strong>Поставщик:</strong><br>', data.vendor, '<br><br>') +
      row('<strong>Сумма и валюта:</strong><br>', data.amount, '<br><br>') +

      row('<strong>Файл счета:</strong><br>', `Список`, '<br><br>') +
      createImageMessageList('yg', data.check_file) +


      row('<strong>Ссылка на счет:</strong><br>', `<a target="_blank" rel="noopener noreferrer" href=${data.invoiceLink}>${data.invoiceLink}</a>`, '<br><br>') +
      row('<strong>Комментарий:</strong><br>', data.comment, '<br><br>') +
      row('<strong>Срок оплаты:</strong><br>', data.deadline, '<br><br>')

    const bodyTG =
      row('Название:', data.title, '\n') +
      row('Описание/назначение оплаты:', data.description, '\n') +
      row('Поставщик:', data.vendor, '\n') +
      row('Сумма и валюта:', data.amount, '\n') +

      row('Файл счета:', `Список`, '\n') +
      createImageMessageList('tg', data.check_file) +

      row('Ссылка на счет:', data.invoiceLink, '\n') +
      row('Комментарий:', data.comment, '\n') +
      row('Срок оплаты:', data.deadline, '\n')

    return { messageYG: headYG(bodyYG), messageTG: headTG(bodyTG) };
  }

  // 5) Оформление договора
  if (type === 'Заявка на оформление договора' || data.value === 'agreement') {
    const bodyYG =
      row('<strong>Название:</strong><br>', data.title, '<br><br>') +
      row('<strong>Предмет договора:</strong><br>', data.subject, '<br><br>') +
      row('<strong>Цель/описание:</strong><br>', data.description, '<br><br>') +

      row('<strong>Файл проекта договора:</strong><br>', `Список`, '<br><br>') +
      createImageMessageList('yg', data.document_file) +

      row('<strong>Контакт контрагента:</strong><br>', data.counterparty, '<br><br>') +
      row('<strong>Сроки:</strong><br>', data.deadline)

    const bodyTG =
      row('Название:', data.title, '\n') +
      row('Предмет договора:', data.subject, '\n') +
      row('Цель/описание:', data.description, '\n') +

      row('Файл проекта договора:', `Список`, '\n') +
      createImageMessageList('tg', data.document_file) +

      row('Контакт контрагента:', data.counterparty, '\n') +
      row('Сроки:', data.deadline)


    return { messageYG: headYG(bodyYG), messageTG: headTG(bodyTG) };
  }


  // 6) ТМЦ/реквизит
  if (type === 'Заявка на ТМЦ/реквизит' || data.value === 'props') {
    const bodyYG =
      row('<strong>Где будет использоваться:</strong><br>', data.title, '<br><br>') +
      row('<strong>Что нужно и количество:</strong><br>', data.what, '<br><br>') +
      row('<strong>Сроки:</strong><br>', data.deadline, '<br><br>')


    const bodyTG =
      row('Где будет использоваться:', data.title, '\n') +
      row('Что нужно и количество:', data.what, '\n') +
      row('Сроки:', data.deadline, '\n')


    return { messageYG: headYG(bodyYG), messageTG: headTG(bodyTG) };
  }

  // 7) Заявка на сувениры с лого/подарки   
  if (type === 'Заявка на сувениры с лого/подарки' || data.value === 'souvenir') {
    const bodyYG =
      row('<strong>Название:</strong><br>', data.title, '<br><br>') +
      row('<strong>Описание/повод:</strong><br>', data.description, '<br><br>') +
      row('<strong>Индивидуальный заказ:</strong><br>', data.category, '<br><br>') +
      row('<strong>Цвет:</strong><br>', data.color, '<br><br>') +

      row('<strong>Макет</strong><br>', `Список`, '<br><br>') +
      createImageMessageList('yg', data.maket_file) +

      row('<strong>Список награждаемых:</strong><br>', `<a target="_blank" rel="noopener noreferrer" href=${data.awarded_file}>${data.awarded_file}</a>`, '<br><br>') +
      row('<strong>Количество:</strong><br>', data.qty, '<br><br>') +
      row('<strong>Сроки:</strong><br>', data.deadline, '<br><br>')

    const bodyTG =
      row('Название:', data.title, '\n') +
      row('Описание/повод:', data.description, '\n') +
      row('Индивидуальный заказ:', data.category, '\n') +
      row('Цвет:', data.color, '\n') +

      row('Макет', `Список`, '\n') +
      createImageMessageList('tg', data.maket_file) +


      row('Список награждаемых:', data.awarded_file, '\n') +
      row('Количество:', data.qty, '\n') +
      row('Сроки:', data.deadline, '\n')

    return { messageYG: headYG(bodyYG), messageTG: headTG(bodyTG) };
  }

  // 8) Промо одежда
  if (type === 'Заявка на промо одежду' || data.value === 'promo') {
    const bodyYG =
      row('<strong>Название:</strong><br>', data.title, '<br><br>') +
      row('<strong>Описание:</strong><br>', data.description, '<br><br>') +
      row('<strong>Вид одежды:</strong><br>', data.clothes_type, '<br><br>') +
      row('<strong>Размеры и количества:</strong><br>', data.sizes, '<br><br>') +
      row('<strong>Примечание:</strong><br>', data.note, '<br><br>') +
      row('<strong>Дата готовности:</strong><br>', data.deadline, '<br><br>')

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
      row('<strong>Название:</strong><br>', data.title, '<br><br>') +
      row('<strong>Цель покупки:</strong><br>', data.purpose, '<br><br>') +
      row('<strong>Ссылка на товар:</strong><br>', `<a target="_blank" rel="noopener noreferrer" href=${data.link}>${data.link}</a>`,  '<br><br>') +
      row('<strong>Количество:</strong><br>', data.qty, '<br><br>') +
      row('<strong>Примечания:</strong><br>', data.notes, '<br><br>') +
      row('<strong>Дата получения</strong><br>', data.deadline, '<br><br>')

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