export const typeSelectorArr = [
  {
    id: 1,
    label: 'Выберите тип заявки',
    value: 'Выберите тип заявки',
    reconciliator: {},
    field: [],
  },

  /* 1) Первичное обращение */
  {
    id: 2,
    label: 'Первичное обращение по задаче (полное описание)',
    value: 'primary',
    reconciliator: {
      name: 'Реклама согласование',
      id: '-1003330661427'
    },
    field: [{id: 1, title: 'Название', placeholder: 'Напишите название проекта',typeField: 'text', type: 'text', name: 'title'},
      {
        id: 2,
        title: 'Что необходимо сделать?',
        placeholder: 'Опишите задачу своими словами',
        typeField: 'area',
        type: 'area',
        name: 'description'
      },
      {
        id: 3,
        title: 'Дата сдачи',
        placeholder: 'Укажите желаемую дату реализации задачи',
        typeField: 'date',
        type: 'date',
        name: 'deadline'
      }
    ]
  },

  /* 2) Полиграфия / баннеры / таблички */
  {
    id: 3,
    label: 'Заявка на полиграфию/таблички/Стенд',
    value: 'printing',
    reconciliator: {
      name: 'Реклама согласование',
      id: '-1003330661427'
    },
    field: [
      {
        id: 1,
        title: 'Название',
        placeholder: 'Напишите название задачи',
        typeField: 'text',
        type: 'text',
        name: 'title'
      },
      {
        id: 2,
        title: 'Вид',
        placeholder: 'Выберите вид изделия',
        typeField: 'selector_multi',
        type: 'selector',
        name: 'view',
        options: [
          { id: 1, label: 'Афиша/листовка', value: 'afisha', icon: '' },
          { id: 2, label: 'Буклет/брошюра', value: 'brochure', icon: '' },
          { id: 3, label: 'Табличка', value: 'plate', icon: '' },
          { id: 4, label: 'Баннер', value: 'banner', icon: '' },
          { id: 5, label: 'Стэнд', value: 'stand', icon: '' }
        ]
      },
      {
        id: 3,
        title: 'Размер',
        placeholder: 'Выберите размер изделия',
        typeField: 'selector_multi',
        type: 'selector',
        name: 'size',
        options: [
          { id: 1, label: 'А6 — (105×148 мм)', value: 'A6', icon: '' },
          { id: 2, label: 'А5 — (148×210 мм)', value: 'A5', icon: '' },
          { id: 3, label: 'А4 — (210×297 мм)', value: 'A4', icon: '' },
          { id: 4, label: 'А3 — (297×420 мм)', value: 'A3', icon: '' },
          { id: 5, label: 'А2 — (420×594 мм)', value: 'A2', icon: '' },
          { id: 6, label: 'А1 — (594×841 мм)', value: 'A1', icon: '' },
          { id: 7, label: 'А0 — (841×1189 мм)', value: 'A0', icon: '' },
          { id: 8, label: 'Другое', value: 'Другое', icon: '' }
        ]
      },


      {
        id: 4,
        title: 'Другое',
        placeholder: 'Укажите размер изделия',
        typeField: 'text',
        type: 'text',
        name: 'size_other'
      },


      {
        id: 5,
        title: 'Ориентация',
        placeholder: 'Горизонтальная/вертикальная',
        typeField: 'text',
        type: 'text',
        name: 'orientation'
      },
      {
        id: 6,
        title: 'Добавить файл',
        placeholder: 'Загрузить макет',
        typeField: 'file',
        type: 'file',
        name: 'maket_file'
      },
      {
        id: 7,
        title: 'Дата сдачи',
        placeholder: 'Желаемая дата готовности',
        typeField: 'date',
        type: 'date',
        name: 'deadline'
      }
    ]
  },

  /* 3) Мероприятие / выставка / ДОД */
  {
    id: 4,
    label: 'Заявка на Мероприятие/выставку/ДОД',
    value: 'event',
    reconciliator: {
      name: 'Реклама согласование',
      id: '-1003330661427'
    },
    field: [
      { id: 1, title: 'Название', placeholder: 'Название проекта', typeField: 'text', type: 'text', name: 'title' },
      { id: 3, title: 'Цель', placeholder: 'Ключевая цель', typeField: 'text', type: 'text', name: 'target' },
      { id: 4, title: 'Участники', placeholder: 'Кто участвует', typeField: 'area', type: 'area', name: 'participants' },
      { id: 5, title: 'Даты и время', placeholder: 'Укажите дату и время проведения', typeField: 'text', type: 'text', name: 'dates' },
      { id: 6, title: 'Адрес и место проведения', placeholder: 'Укажите место проведения(адрес)', typeField: 'text', type: 'text', name: 'place' },
      { id: 7, title: 'Что необходимо сделать', placeholder: 'Задачи и зоны ответственности', typeField: 'area', type: 'area', name: 'todo' },
      { id: 9, title: 'Бюджет', placeholder: 'Предварительная смета', typeField: 'text', type: 'text', name: 'budget' },
      { id: 10, title: 'Прикрепите файл сметы', placeholder: 'Файл сметы', typeField: 'file', type: 'file', name: 'smeta_file' },
      { id: 11, title: 'Дата готовности ТЗ', placeholder: 'К какому сроку нужно финальное ТЗ', typeField: 'date', type: 'date', name: 'deadline' }
    ]
  },

  /* 4) Оплата счета */
  {
    id: 5,
    label: 'Заявка на оплату счета',
    value: 'payment',
    reconciliator: {
      name: 'Реклама согласование',
      id: '-1003330661427'
    },
    field: [
      { id: 1, title: 'Название', placeholder: 'Название проекта', typeField: 'text', type: 'text', name: 'title' },
      { id: 2, title: 'Цель/Описание', placeholder: 'За что и зачем оплата', typeField: 'area', type: 'area', name: 'description' },
      { id: 3, title: 'Поставщик', placeholder: 'Название компании', typeField: 'text', type: 'text', name: 'vendor' },
      { id: 4, title: 'Сумма и валюта', placeholder: 'Напр.: 125 000 ₽', typeField: 'text', type: 'text', name: 'amount' },
      { id: 5, title: 'Срок оплаты', placeholder: 'Желаемая дата оплаты', typeField: 'date', type: 'date', name: 'deadline' },
      { id: 6, title: 'Файл счета', placeholder: 'Загрузите счет (PDF/JPG/PNG)', typeField: 'file', type: 'file', name: 'check_file' },
      { id: 7, title: 'Ссылка на счет', placeholder: 'URL (если есть)', typeField: 'text', type: 'text', name: 'invoiceLink' },
      { id: 9, title: 'Комментарий', placeholder: 'Договор, условия, сроки и т.п.', typeField: 'area', type: 'area', name: 'comment' }
    ]
  },

  /* 5) Оформление договора */
  {
    id: 6,
    label: 'Заявка на оформление договора',
    value: 'agreement',
    reconciliator: {
      name: 'Реклама согласование',
      id: '-1003330661427'
    },
    field: [
      { id: 1, title: 'Название', placeholder: 'Название проекта', typeField: 'text', type: 'text', name: 'title' },
      { id: 2, title: 'Предмет договора', placeholder: 'Что является предметом', typeField: 'area', type: 'area', name: 'subject' },
      { id: 3, title: 'Цель/Описание', placeholder: 'Кратко о сути и целях', typeField: 'area', type: 'area', name: 'description' },
      { id: 4, title: 'Файл проекта договора', placeholder: 'Загрузите файл (если есть)', typeField: 'file', type: 'file', name: 'document_file' },
      { id: 5, title: 'Контакт контрагента', placeholder: 'ФИО, организация, телефон/email', typeField: 'area', type: 'area', name: 'counterparty' },
      { id: 6, title: 'Сроки', placeholder: 'Сроки оплаты', typeField: 'text', type: 'date', name: 'deadline' },
    ]
  },

  /* 6) Трансфер */
  {
    id: 7,
    label: 'Заявка на трансфер',
    value: 'transfer',
    reconciliator: {
      name: 'Реклама согласование',
      id: '-1003330661427'
    },
    field: [
      { id: 1, title: 'Название', placeholder: 'Название проекта', typeField: 'text', type: 'text', name: 'title' },
      { id: 2, title: 'Цель/Описание', placeholder: 'Куда/зачем поездка', typeField: 'area', type: 'area', name: 'description' },
      { id: 3, title: 'Дата поездки', placeholder: 'Дата начала', typeField: 'text', type: 'date', name: 'deadline' },
      { id: 4, title: 'Маршрут (подробно)', placeholder: 'Откуда–куда, точки по пути', typeField: 'area', type: 'area', name: 'route' },
      { id: 5, title: 'Время отправления', placeholder: 'Часы/минуты', typeField: 'text', type: 'text', name: 'time_start' },
      { id: 6, title: 'Место отправления', placeholder: 'Адрес/локация', typeField: 'text', type: 'text', name: 'place_start' },
      { id: 7, title: 'Место прибытия', placeholder: 'Адрес/локация', typeField: 'text', type: 'text', name: 'place_finish' },
      { id: 8, title: 'Время прибытия', placeholder: 'Если известно', typeField: 'text', type: 'text', name: 'time_finish' },
      { id: 9, title: 'Количество человек', placeholder: 'Сколько пассажиров', typeField: 'number', type: 'number', name: 'people' },
      { id: 10, title: 'Пожелания к транспорту', placeholder: 'Класс авто, багаж, детское кресло и т.д.', typeField: 'area', type: 'area', name: 'wishes' },
      { id: 11, title: 'Пассажиры', placeholder: 'ФИО и паспортные данные (при необходимости)', typeField: 'area', type: 'area', name: 'passengers' },
    ]
  },

  /* 7) ТМЦ / реквизит */
  {
    id: 8,
    label: 'Заявка на ТМЦ/реквизит',
    value: 'props',
    reconciliator: {
      name: 'Реклама согласование',
      id: '-1003330661427'
    },
    field: [
      { id: 1, title: 'Название', placeholder: 'Название проекта', typeField: 'text', type: 'text', name: 'title' },
      { id: 2, title: 'Ссылка на товар', placeholder: 'URL на позицию/карточку', typeField: 'text', type: 'text', name: 'link' },
      { id: 3, title: 'Что нужно и количество', placeholder: 'Наименование, параметры, шт', typeField: 'area', type: 'area', name: 'what' },
      { id: 4, title: 'Сроки', placeholder: 'Когда нужно получить', typeField: 'date', type: 'date', name: 'deadline' },
    ]
  },

  /* 8) Сувениры с лого / подарки */
  {
    id: 9,
    label: 'Заявка на сувениры с лого/подарки',
    value: 'souvenir',
    reconciliator: {
      name: 'Реклама согласование',
      id: '-1003330661427'
    },
    field: [
      { id: 1, title: 'Название', placeholder: 'Название проекта', typeField: 'text', type: 'text', name: 'title' },
      { id: 2, title: 'Цель/Описание', placeholder: 'Повод, аудитория, задачи', typeField: 'area', type: 'area', name: 'description' },
      { id: 3, title: 'Категория/вид сувениров', placeholder: 'Что рассматриваем', typeField: 'area', type: 'area', name: 'category' },
      { id: 4, title: 'Количество', placeholder: 'Сколько единиц', typeField: 'number', type: 'number', name: 'qty' },
      { id: 5, title: 'Брендирование', placeholder: 'Нанесение логотипа/цвета', typeField: 'area', type: 'area', name: 'branding' },
      { id: 6, title: 'Сроки', placeholder: 'Дата готовности', typeField: 'date', type: 'date', name: 'deadline' },
    ]
  },

  /* 9) Промо одежда */
  {
    id: 10,
    label: 'Заявка на промо одежду',
    value: 'promo',
    reconciliator: {
      name: 'Реклама согласование',
      id: '-1003330661427'
    },
    field: [
      { id: 1, title: 'Название', placeholder: 'Название проекта', typeField: 'text', type: 'text', name: 'title' },
      { id: 2, title: 'Цель/Описание', placeholder: 'Для какого мероприятия/задачи', typeField: 'area', type: 'area', name: 'description' },
      {
        id: 3,
        title: 'Вид одежды',
        placeholder: 'Выберите тип',
        typeField: 'selector_multi',
        type: 'selector',
        name: 'clothes_type',
        options: [
          { id: 1, label: 'Футболка', value: 'tshirt', icon: '' },
          { id: 2, label: 'Футболка-поло', value: 'polo', icon: '' },
          { id: 3, label: 'Толстовка/худи', value: 'hoodie', icon: '' },
          { id: 4, label: 'Куртка/ветровка', value: 'jacket', icon: '' },
          { id: 5, label: 'Кепка/головной убор', value: 'cap', icon: '' }
        ]
      },
      { id: 4, title: 'Логотип/брендинг', placeholder: 'Где и как наносить', typeField: 'area', type: 'area', name: 'branding' },
      { id: 5, title: 'Размеры и количества', placeholder: 'Таблица размеров: S-.., M-.. и т.п.', typeField: 'area', type: 'area', name: 'sizes' },
      { id: 6, title: 'Дата готовности', placeholder: 'К какому сроку', typeField: 'date', type: 'date', name: 'deadline' },
    ]
  },

  /* 10) Кофе-брейк */
  {
    id: 11,
    label: 'Заявка на кофе брейк',
    value: 'coffe',
    reconciliator: {
      name: 'Реклама согласование',
      id: '-1003330661427'
    },
    field: [
      { id: 1, title: 'Название', placeholder: 'Название проекта', typeField: 'text', type: 'text', name: 'title' },
      { id: 2, title: 'Цель/Описание', placeholder: 'Формат и повод', typeField: 'area', type: 'area', name: 'description' },
      { id: 3, title: 'Место проведения', placeholder: 'Адрес/площадка', typeField: 'text', type: 'text', name: 'place' },
      { id: 4, title: 'Длительность', placeholder: 'Сколько по времени', typeField: 'text', type: 'text', name: 'duration' },
      { id: 5, title: 'Меню/пожелания', placeholder: 'Кофе, чай, выпечка и т.д.', typeField: 'area', type: 'area', name: 'menu' },
      { id: 6, title: 'Количество человек', placeholder: 'Оценка гостей', typeField: 'number', type: 'number', name: 'people' },
      { id: 7, title: 'Дата и время', placeholder: 'Когда требуется сервис', typeField: 'text', type: 'date', name: 'deadline' },

    ]
  },

  /* 11) Закуп на маркетплейсе ОЗОН */
  {
    id: 12,
    label: 'Заявка на закуп на маркетплейсе ОЗОН',
    value: 'marketplace',
    reconciliator: {
      name: 'Реклама согласование',
      id: '-1003330661427'
    },
    field: [
      { id: 1, title: 'Название', placeholder: 'Название проекта', typeField: 'text', type: 'text', name: 'title' },
      { id: 2, title: 'Цель покупки', placeholder: 'Для какого проекта/нужд', typeField: 'area', type: 'area', name: 'purpose' },
      { id: 3, title: 'Ссылка на товар', placeholder: 'URL товара на OZON', typeField: 'text', type: 'text', name: 'link' },
      { id: 4, title: 'Количество', placeholder: 'Сколько единиц', typeField: 'number', type: 'number', name: 'qty' },
      { id: 5, title: 'Примечания', placeholder: 'Размер/цвет/модели и т.п.', typeField: 'area', type: 'area', name: 'notes' },
      { id: 4, title: 'Дата получения', placeholder: 'Когда требуется сервис', typeField: 'text', type: 'date', name: 'deadline' },

    ]
  }
];