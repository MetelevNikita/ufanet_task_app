// PR: типы заявок по схеме с картинки
export const typeSelectorArr = [
  {
    id: 1,
    label: 'Выберите тип заявки',
    value: 'select',
    reconciliator: {},
    field: []
  },

  {
    id: 2,
    label: 'Проекты (продвижение услуг, сервиса)',
    value: 'project_promo',
    reconciliator: {
      name: 'PR согласование',
      id: '-1003306162120'
    },
    field: [
      { id: 1,  title: 'Название проекта / услуги', placeholder: 'Укажите название', typeField: 'text',  type: 'text',  name: 'title' },
      { id: 2,  title: 'Описание проекта / услуги', placeholder: 'Кратко опишите, что это', typeField: 'area',  type: 'area',  name: 'description' },
      { id: 3,  title: 'Цель', placeholder: 'Какая ключевая цель?', typeField: 'text',  type: 'text',  name: 'goal' },
      { id: 4,  title: 'Что необходимо сделать?', placeholder: 'Задачи и зона ответственности', typeField: 'area',  type: 'area',  name: 'todo' },
      { id: 5,  title: 'Какие сроки?', placeholder: 'Желаемая дата готовности', typeField: 'date',  type: 'date',  name: 'deadline' }
    ]
  },

  {
    id: 3,
    label: 'Мероприятие - внутреннее (для сотрудников)',
    value: 'event_internal',
    reconciliator: {
      name: 'PR согласование',
      id: '-1003306162120'
    },
    field: [
      { id: 1,  title: 'Название мероприятия', placeholder: 'Укажите название', typeField: 'text',  type: 'text',  name: 'title' },
      { id: 2,  title: 'Описание мероприятия', placeholder: 'Расскажите подробно про мероприятие: Какой формат? Программа мероприятия?Для кого оно (ЦА)? Какая наша цель/роль?', typeField: 'area',  type: 'area',  name: 'description' },
      { id: 3,  title: 'Цель проведения мероприятия', placeholder: 'Для чего проводится', typeField: 'text',  type: 'text',  name: 'goal' },
      { id: 4,  title: 'Лидер мероприятия', placeholder: 'Ответственный/лидер', typeField: 'text',  type: 'text',  name: 'leader' },
      { id: 5,  title: 'Что необходимо сделать?', placeholder: 'Список задач', typeField: 'area',  type: 'area',  name: 'todo' },
      { id: 6,  title: 'Дата мероприятия', placeholder: 'Дата проведения', typeField: 'date',  type: 'date',  name: 'deadline' },
      { id: 7,  title: 'Место проведения мероприятия', placeholder: 'Адрес/площадка', typeField: 'text',  type: 'text',  name: 'place' }
    ]
  },

  {
    id: 4,
    label: 'Мероприятие - внешнее (для партнеров, абонентов, жителей)',
    value: 'event_external',
    reconciliator: {
      name: 'PR согласование',
      id: '-1003306162120'
    },
    field: [
      { id: 1,  title: 'Название мероприятия', placeholder: 'Укажите название', typeField: 'text',  type: 'text',  name: 'title' },
      { id: 2,  title: 'Описание мероприятия', placeholder: 'Расскажите подробно про мероприятие: Какой формат? Программа мероприятия?Для кого оно (ЦА)? Какая наша цель/роль?', typeField: 'area',  type: 'area',  name: 'description' },
      { id: 3,  title: 'Цель проведения мероприятия', placeholder: 'Для чего проводится', typeField: 'text',  type: 'text',  name: 'goal' },
      { id: 4,  title: 'Лидер мероприятия', placeholder: 'Ответственный/лидер', typeField: 'text',  type: 'text',  name: 'leader' },
      { id: 5,  title: 'Что необходимо сделать?', placeholder: 'Список задач', typeField: 'area',  type: 'area',  name: 'todo' },
      { id: 6,  title: 'Дата мероприятия', placeholder: 'Дата проведения', typeField: 'date',  type: 'date',  name: 'deadline' },
      { id: 7,  title: 'Место проведения мероприятия', placeholder: 'Адрес/площадка', typeField: 'text',  type: 'text',  name: 'place' }
    ]
  },



  /* 4) Выставки / выезды / конференции */
  {
    id: 5,
    label: 'Выставки, выезды, конференции',
    value: 'event_expo',
    reconciliator: {
      name: 'PR согласование',
      id: '-1003306162120'
    },
    field: [
      { id: 1,  title: 'Название мероприятия', placeholder: 'Как называется',typeField: 'text',  type: 'text',  name: 'title' },
      { id: 2,  title: 'Описание мероприятия', placeholder: 'Расскажите подробно про мероприятие: Какой формат? Программа мероприятия?Для кого оно (ЦА)? Какая наша цель/роль?', typeField: 'area',  type: 'area',  name: 'description' },
      { id: 3,  title: 'Сайт мероприятия', placeholder: 'URL (если есть)', typeField: 'text',  type: 'text',  name: 'site' },
      { id: 4,  title: 'Дата мероприятия', placeholder: 'Дата проведения', typeField: 'date',  type: 'date',  name: 'deadline' },
      { id: 5,  title: 'Место проведения мероприятия', placeholder: 'Адрес/площадка', typeField: 'text',  type: 'text',  name: 'place' },
      { id: 6,  title: 'Цель участия в мероприятии', placeholder: 'Для чего участвуем', typeField: 'text',  type: 'text',  name: 'goal' },
      { id: 7,  title: 'Список участников', placeholder: 'ФИО/роли', typeField: 'area',  type: 'area',  name: 'participants' },
      { id: 8,  title: 'Что необходимо сделать?', placeholder: 'Задачи и подготовка', typeField: 'area',  type: 'area',  name: 'todo' }
    ]
  },

  /* 5) Прочее */
  {
    id: 6,
    label: 'Прочее',
    value: 'other',
    reconciliator: {
      name: 'PR согласование',
      id: '-1003306162120'
    },
    field: [
      { id: 1,  title: 'Название мероприятия', placeholder: 'Укажите название', typeField: 'text',  type: 'text',  name: 'title' },
      { id: 2,  title: 'Что необходимо сделать?', placeholder: 'Опишите задачу', typeField: 'area',  type: 'area',  name: 'todo' },
      { id: 3,  title: 'Цель — для чего это нужно?', placeholder: 'Опишите цель', typeField: 'text',  type: 'text',  name: 'goal' },
      { id: 4,  title: 'Дата мероприятия', placeholder: 'Желаемая дата', typeField: 'date',  type: 'date',  name: 'deadline' }
    ]
  }
];