
export const typeSelectorArr = [
  {
    id: 1,
    label: 'Выберите тип работы',
    value: 'select',
    field: []
  },

  /* 1) Разработка с нуля */
  {
    id: 2,
    label: 'Разработка с нуля',
    value: 'design_from_scratch',
    field: [
      // О проекте
      { id: 1, title: 'Название проекта / мероприятия / услуги', placeholder: 'Реклама, бренд-пакет, мероприятие…', typeField: 'text', type: 'text', name: 'title' },
      { id: 2, title: 'Описание проекта / мероприятия / услуги', placeholder: 'Краткое описание задачи/контекста', typeField: 'area', type: 'area', name: 'project_description' },
      { id: 3, title: 'Цель макета', placeholder: 'Увеличение охвата, информирование, навигация…', typeField: 'text', type: 'text', name: 'goal' },
      { id: 4, title: 'Целевая аудитория макета', placeholder: 'Кто увидит макет? (сотрудники, гости, клиенты и т.д.)', typeField: 'text', type: 'text', name: 'audience' },
      { id: 5, title: 'Что требуется разработать?', placeholder: 'Афиша, баннер, табличка, брендинг…', typeField: 'area', type: 'area', name: 'what_to_make' },
      { id: 6, title: 'Размер макета', placeholder: 'Напр.: A4, A3, 3×6 м и т.п.', typeField: 'text', type: 'text', name: 'size' },

      // Ориентация — селекторы с картинки
      {
        id: 7,
        title: 'Ориентация',
        placeholder: 'Выберите ориентацию',
        typeField: 'selector_multi',
        type: 'selector',
        name: 'orientation_direction',
        options: [
          { id: 1, label: 'горизонтальная', value: 'horizontal', icon: '' },
          { id: 2, label: 'вертикальная',   value: 'vertical',   icon: '' }
        ]
      },
      {
        id: 8,
        title: 'Форма',
        placeholder: 'Выберите форму',
        typeField: 'selector_multi',
        type: 'selector',
        name: 'orientation_shape',
        options: [
          { id: 1, label: 'квадрат', value: 'square', icon: '' },
          { id: 2, label: 'круглая', value: 'circle', icon: '' }
        ]
      },

      { id: 9, title: 'Каким ты видишь будущий макет?', placeholder: 'Прикрепите черновые наброски/референсы/описание', typeField: 'area', type: 'area', name: 'vision' },
      { id: 10, title: 'Где будет размещаться макет?', placeholder: 'В офисе, на инфостенде, лифте, баннер и т.п.', typeField: 'text', type: 'text', name: 'placement' },
      { id: 11, title: 'Прикрепите фотографию места размещения макета', placeholder: 'Фото/скриншот места', typeField: 'file', type: 'file', name: 'place_file' },
      { id: 12, title: 'Желаемая дата готовности макета', placeholder: 'К какому сроку нужен макет', typeField: 'date', type: 'date', name: 'deadline' },
    ]
  },

  /* 2) Адаптация и внесение изменений в макет */
  {
    id: 3,
    label: 'Адаптация и внесение изменений в макет',
    value: 'adapt_edit',
    field: [
      { id: 1, title: 'Название мероприятия / проекта / услуги', placeholder: 'Как называется задача', typeField: 'text', type: 'text', name: 'title' },
      { id: 2, title: 'Прикрепить файл в исходном виде', placeholder: 'Загрузите исходник (PSD/AI/PDF и т.п.)', typeField: 'file', type: 'file', name: 'target_file' },
      { id: 3, title: 'Что нужно исправить?', placeholder: 'Опишите изменения, правки, адаптации', typeField: 'area', type: 'area', name: 'changes' },
      { id: 4, title: 'Желаемая дата готовности макета', placeholder: 'К какому сроку', typeField: 'date', type: 'date', name: 'deadline' },
    ]
  },

  /* 3) Другое */
  {
    id: 4,
    label: 'Другое',
    value: 'other',
    field: [
      { id: 1, title: 'Название мероприятия / проекта / услуги', placeholder: 'Как называется задача', typeField: 'text', type: 'text', name: 'title' },
      { id: 2, title: 'Что требуется разработать?', placeholder: 'Опишите задачу', typeField: 'area', type: 'area', name: 'what_to_make' },
      { id: 3, title: 'Размер макета', placeholder: 'A4, A3, 3×6 м и т.п.', typeField: 'text', type: 'text', name: 'size' },

      {
        id: 4,
        title: 'Ориентация',
        placeholder: 'Выберите ориентацию',
        typeField: 'selector_multi',
        type: 'selector',
        name: 'orientation_direction',
        options: [
          { id: 1, label: 'горизонтальная', value: 'horizontal', icon: '' },
          { id: 2, label: 'вертикальная',   value: 'vertical',   icon: '' }
        ]
      },
      {
        id: 5,
        title: 'Форма',
        placeholder: 'Выберите форму',
        typeField: 'selector_multi',
        type: 'selector',
        name: 'orientation_shape',
        options: [
          { id: 1, label: 'квадрат', value: 'square', icon: '' },
          { id: 2, label: 'круглая', value: 'circle', icon: '' }
        ]
      },

      { id: 6, title: 'Каким ты видишь будущий макет?', placeholder: 'Референсы/описание/наброски', typeField: 'area', type: 'area', name: 'vision' },
      { id: 7, title: 'Где будет размещаться макет?', placeholder: 'Место размещения (офис, инфостенд, лифт, баннер…)', typeField: 'text', type: 'text', name: 'placement' },
      { id: 7, title: 'Прикрепите фотографию места размещения макета', placeholder: 'Фото места', typeField: 'file', type: 'file', name: 'place_file' },
      { id: 8, title: 'Желаемая дата готовности макета', placeholder: 'К какому сроку', typeField: 'date', type: 'date', name: 'deadline' },
    ]
  }
];