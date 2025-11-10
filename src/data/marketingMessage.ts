export const marketingMessage = async (
  department: string,
  data: any
): Promise<{ messageYG: string; messageTG: string }> => {
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

  /* 1) Первичное обращение по услуге */
  if (type === 'Первичное обращение по услуге') {
    const bodyYG =
      row('Название продукта / услуги:', data.title) +
      row('OKR/KPI и цели:', data.goals) +
      row('Клиентский путь и обработка заявок:', data.funnel) +
      row('Краткое описание продукта:', data.description) +
      row('Целевая аудитория:', data.audience) +
      row('География продаж:', data.geo) +
      row('Преимущества и УТП:', data.usp) +
      row('Источники лидов сейчас:', data.current_sources) +
      row('Ключевые запросы:', data.keywords) +
      row('Конкуренты и ссылки:', data.competitors) +
      row('Нужен ли сайт/лендинг:', data.site_need) +
      row('Срок реализации:', data.deadline);

    const bodyTG =
      row('Название продукта / услуги:', data.title, '\n') +
      row('OKR/KPI и цели:', data.goals, '\n') +
      row('Клиентский путь и обработка заявок:', data.funnel, '\n') +
      row('Краткое описание продукта:', data.description, '\n') +
      row('Целевая аудитория:', data.audience, '\n') +
      row('География продаж:', data.geo, '\n') +
      row('Преимущества и УТП:', data.usp, '\n') +
      row('Источники лидов сейчас:', data.current_sources, '\n') +
      row('Ключевые запросы:', data.keywords, '\n') +
      row('Конкуренты и ссылки:', data.competitors, '\n') +
      row('Нужен ли сайт/лендинг:', data.site_need, '\n') +
      row('Срок реализации:', data.deadline, '\n');

    return { messageYG: headYG(bodyYG), messageTG: headTG(bodyTG) };
  }

  /* 2) ТЗ на создание сайта/страницы */
  if (type === 'ТЗ на создание сайта/страницы') {
    const bodyYG =
      row('Название продукта / услуги:', data.title) +
      row('Что необходимо сделать?:', data.description) +
      row('Ранее эту услугу уже продвигали?:', data.first_visit_selector && data.first_visit_selector.label) +
      row('Рабочая группа и поддержка:', data.team) +
      row('Задачи страницы:', data.tasks) +
      row('Целевое действие:', data.cta) +
      row('Структура/контент:', data.content) +
      row('Референсы:', data.refs) +
      row('Преимущества и выгоды продукта:', data.advantages) +
      row('Как работает продукт:', data.work) +
      row('Варианты приобретения:', data.price) +
      row('Детали исполнения:', data.details) +
      row('Пожелания:', data.wishes) +
      row('Администрирование:', data.processing) +
      row('Срок запуска:', data.deadline);

    const bodyTG =
      row('Название продукта / услуги:', data.title, '\n') +
      row('Что необходимо сделать?:', data.description, '\n') +
      row('Ранее эту услугу уже продвигали?:', data.first_visit_selector && data.first_visit_selector.label, '\n') +
      row('Рабочая группа и поддержка:', data.team, '\n') +
      row('Задачи страницы:', data.tasks, '\n') +
      row('Целевое действие:', data.cta, '\n') +
      row('Структура/контент:', data.content, '\n') +
      row('Референсы:', data.refs, '\n') +
      row('Преимущества и выгоды продукта:', data.advantages, '\n') +
      row('Как работает продукт:', data.work, '\n') +
      row('Варианты приобретения:', data.price, '\n') +
      row('Детали исполнения:', data.details, '\n') +
      row('Пожелания:', data.wishes, '\n') +
      row('Администрирование:', data.processing, '\n') +
      row('Срок запуска:', data.deadline, '\n');

    return { messageYG: headYG(bodyYG), messageTG: headTG(bodyTG) };
  }

  /* 3) ТЗ на внесение изменений на сайты */
  if (type === 'ТЗ на внесение изменений на сайты') {
    const bodyYG =
      row('Название продукта / услуги:', data.title) +
      row('Что необходимо сделать?:', data.description) +
      row('Тип изменения:', data.type_change) +
      row('Прикрепите скриншот страницы:', data.screenshot_file) +
      row('Ссылка на страницу:', data.url) +
      row('Готовый контент для размещения:', data.content_file) +
      row('Нужно ли согласование перед публикацией?:', data.approval && data.approval.label) +
      row('Комментарий/пожелания к оформлению:', data.comment) +
      row('Желаемая дата реализации:', data.deadline);

    const bodyTG =
      row('Название продукта / услуги:', data.title, '\n') +
      row('Что необходимо сделать?:', data.description, '\n') +
      row('Тип изменения:', data.type_change, '\n') +
      row('Прикрепите скриншот страницы:', data.screenshot_file, '\n') +
      row('Ссылка на страницу:', data.url, '\n') +
      row('Готовый контент для размещения:', data.content_file, '\n') +
      row('Нужно ли согласование перед публикацией?:', data.approval && data.approval.label, '\n') +
      row('Комментарий/пожелания к оформлению:', data.comment, '\n') +
      row('Желаемая дата реализации:', data.deadline, '\n');

    return { messageYG: headYG(bodyYG), messageTG: headTG(bodyTG) };
  }

  /* 4) ТЗ запуск рекламы */
  if (type === 'ТЗ запуск рекламы' || type === 'Запуск рекламы') {
    const bodyYG =
      row('Название продукта / услуги:', data.title) +
      row('Что необходимо сделать?:', data.description) +
      row('Площадки:', data.platforms) +
      row('Цель рекламы:', data.ad_goals) +
      row('Ссылка (куда ведёт реклама):', data.landing_url) +
      row('География размещения:', data.geo) +
      row('Кто ваш клиент?:', data.target_audience) +
      row('Боль / потребность клиента:', data.pain_point) +
      row('УТП:', data.unique_offer) +
      row('Акции, скидки, подарки:', data.discounts) +
      row('Клиентский путь и обработка заявок:', data.sales_path && data.sales_path.label) +
      row('Ключевые слова / запросы:', data.keywords) +
      row('Материалы для рекламы:', data.banner_file) +
      row('База для рассылки:', data.base_file) +
      row('Примеры конкурентов / объявлений:', data.concurents_file) +
      row('Бюджет на рекламу в месяц:', data.budget) +
      row('KPI (ожидаемые результаты):', data.kpi) +
      row('Период проведения кампании:', data.campaign_period) +
      row('Срок запуска:', data.deadline);

    const bodyTG =
      row('Название продукта / услуги:', data.title, '\n') +
      row('Что необходимо сделать?:', data.description, '\n') +
      row('Площадки:', data.platforms, '\n') +
      row('Цель рекламы:', data.ad_goals, '\n') +
      row('Ссылка (куда ведёт реклама):', data.landing_url, '\n') +
      row('География размещения:', data.geo, '\n') +
      row('Кто ваш клиент?:', data.target_audience, '\n') +
      row('Боль / потребность клиента:', data.pain_point, '\n') +
      row('УТП:', data.unique_offer, '\n') +
      row('Акции, скидки, подарки:', data.discounts, '\n') +
      row('Клиентский путь и обработка заявок:', data.sales_path && data.sales_path.label, '\n') +
      row('Ключевые слова / запросы:', data.keywords, '\n') +
      row('Материалы для рекламы:', data.banner_file, '\n') +
      row('База для рассылки:', data.base_file, '\n') +
      row('Примеры конкурентов / объявлений:', data.concurents_file, '\n') +
      row('Бюджет на рекламу в месяц:', data.budget, '\n') +
      row('KPI (ожидаемые результаты):', data.kpi, '\n') +
      row('Период проведения кампании:', data.campaign_period, '\n') +
      row('Срок запуска:', data.deadline, '\n');

    return { messageYG: headYG(bodyYG), messageTG: headTG(bodyTG) };
  }

  /* 5) ТЗ на SMM */
  if (type === 'ТЗ на SMM (посты, статьи, видео и т.д.)' || type === 'ТЗ на SMM') {
    const bodyYG =
      row('Название продукта / услуги:', data.title) +
      row('Что необходимо сделать?:', data.description) +
      row('Цель размещения:', data.placement_goal && data.placement_goal.label) +
      row('Аудитория:', data.audience) +
      row('Периодичность размещения:', data.frequency) +
      row('Материалы (если есть):', data.material_file) +
      row('Планируемая дата публикации:', data.publish_date) +
      row('Срок реализации:', data.deadline);

    const bodyTG =
      row('Название продукта / услуги:', data.title, '\n') +
      row('Что необходимо сделать?:', data.description, '\n') +
      row('Цель размещения:', data.placement_goal, '\n') +
      row('Аудитория:', data.audience, '\n') +
      row('Периодичность размещения:', data.frequency, '\n') +
      row('Материалы (если есть):', data.material_file, '\n') +
      row('Планируемая дата публикации:', data.publish_date, '\n') +
      row('Срок реализации:', data.deadline, '\n');

    return { messageYG: headYG(bodyYG), messageTG: headTG(bodyTG) };
  }

  /* 6) ТЗ на написание статей */
  if (type === 'ТЗ на написание статей (для СМИ и сайта ufanet.ru)' || type === 'ТЗ на написание статей') {
    const bodyYG =
      row('Название продукта / услуги:', data.title) +
      row('Что необходимо сделать?:', data.description) +
      row('Где будет размещаться статья?:', data.placement) +
      row('Регион / город размещения:', data.region) +
      row('Цель публикации:', data.goal) +
      row('Целевая аудитория:', data.target_audience) +
      row('Объём:', data.volume) +
      row('Примерная структура текста:', data.structure) +
      row('Ссылки и материалы:', data.link_file) +
      row('Референсы:', data.reference_file) +
      row('Желаемая дата реализации:', data.deadline);

    const bodyTG =
      row('Название продукта / услуги:', data.title, '\n') +
      row('Что необходимо сделать?:', data.description, '\n') +
      row('Где будет размещаться статья?:', data.placement, '\n') +
      row('Регион / город размещения:', data.region, '\n') +
      row('Цель публикации:', data.goal, '\n') +
      row('Целевая аудитория:', data.target_audience, '\n') +
      row('Объём:', data.volume, '\n') +
      row('Примерная структура текста:', data.structure, '\n') +
      row('Ссылки и материалы:', data.link_file, '\n') +
      row('Референсы:', data.reference_file, '\n') +
      row('Желаемая дата реализации:', data.deadline, '\n');

    return { messageYG: headYG(bodyYG), messageTG: headTG(bodyTG) };
  }

  /* 7) ТЗ на редактуру */
  if (type === 'ТЗ на редактуру (тексты статей, каталогов и т.п.)' || type === 'ТЗ на редактуру') {
    const bodyYG =
      row('Название продукта / услуги:', data.title) +
      row('Что необходимо сделать?:', data.description) +
      row('Вид работы:', data.work_type && data.work_type.label) +
      row('Другое (вид работы):', data.other) +
      row('Где будет опубликован материал?:', data.placement) +
      row('Регион / город размещения:', data.region) +
      row('Цель размещения:', data.goal) +
      row('Целевая аудитория:', data.target_audience) +
      row('Пожелания:', data.preferences) +
      row('Желаемая дата реализации:', data.deadline);

    const bodyTG =
      row('Название продукта / услуги:', data.title, '\n') +
      row('Что необходимо сделать?:', data.description, '\n') +
      row('Вид работы:', data.work_type && data.work_type.label, '\n') +
      row('Другое (вид работы):', data.other, '\n') +
      row('Где будет опубликован материал?:', data.placement, '\n') +
      row('Регион / город размещения:', data.region, '\n') +
      row('Цель размещения:', data.goal, '\n') +
      row('Целевая аудитория:', data.target_audience, '\n') +
      row('Пожелания:', data.preferences, '\n') +
      row('Желаемая дата реализации:', data.deadline, '\n');

    return { messageYG: headYG(bodyYG), messageTG: headTG(bodyTG) };
  }

  /* 8) ТЗ на пуши в приложении Уфанет */
  if (type === 'ТЗ на пуши в приложении Уфанет' || type === 'Пуши в приложении Уфанет') {
    const bodyYG =
      row('Название продукта / услуги:', data.title) +
      row('Что необходимо сделать?:', data.description) +
      row('Цель рассылки:', data.goal) +
      row('Файл с выгрузкой абонентов:', data.abonents_file) +
      row('Кому рассылать пуши:', data.recipients) +
      row('Срок отправки пушей:', data.send_deadline) +
      row('Как измерять результат?:', data.kpi) +
      row('Текст для рассылки (если есть):', data.message_text) +
      row('Желаемая дата реализации:', data.deadline);

    const bodyTG =
      row('Название продукта / услуги:', data.title, '\n') +
      row('Что необходимо сделать?:', data.description, '\n') +
      row('Цель рассылки:', data.goal, '\n') +
      row('Файл с выгрузкой абонентов:', data.abonents_file, '\n') +
      row('Кому рассылать пуши:', data.recipients, '\n') +
      row('Срок отправки пушей:', data.send_deadline, '\n') +
      row('Как измерять результат?:', data.kpi, '\n') +
      row('Текст для рассылки (если есть):', data.message_text, '\n') +
      row('Желаемая дата реализации:', data.deadline, '\n');

    return { messageYG: headYG(bodyYG), messageTG: headTG(bodyTG) };
  }

  /* 9) ТЗ на размещение сторис в приложении Уфанет */
  if (type === 'ТЗ на размещение сторис в приложении Уфанет' || type === 'Сторис в приложении Уфанет') {
    const bodyYG =
      row('Название продукта / услуги:', data.title) +
      row('Что необходимо сделать?:', data.description) +
      row('Кто отвечает за визуал:', data.responsible_person) +
      row('Цель размещения сторис:', data.goal) +
      row('Период размещения:', data.period) +
      row('Города и посёлки показа:', data.geo) +
      row('Ссылка для кнопки:', data.url) +
      row('Надпись на миниатюре:', data.thumbnail_text) +
      row('Надпись на кнопке:', data.button_text) +
      row('На какой картинке ставится кнопка:', data.button_image_ref) +
      row('Миниатюра-баннер:', data.miniature_file) +
      row('Изображения сторис:', data.storis_file) +
      row('Желаемая дата реализации:', data.deadline);

    const bodyTG =
      row('Название продукта / услуги:', data.title, '\n') +
      row('Что необходимо сделать?:', data.description, '\n') +
      row('Кто отвечает за визуал:', data.responsible_person, '\n') +
      row('Цель размещения сторис:', data.goal, '\n') +
      row('Период размещения:', data.period, '\n') +
      row('Города и посёлки показа:', data.geo, '\n') +
      row('Ссылка для кнопки:', data.url, '\n') +
      row('Надпись на миниатюре:', data.thumbnail_text, '\n') +
      row('Надпись на кнопке:', data.button_text, '\n') +
      row('На какой картинке ставится кнопка:', data.button_image_ref, '\n') +
      row('Миниатюра-баннер:', data.miniature_file, '\n') +
      row('Изображения сторис:', data.storis_file, '\n') +
      row('Желаемая дата реализации:', data.deadline, '\n');

    return { messageYG: headYG(bodyYG), messageTG: headTG(bodyTG) };
  }

  /* 10) ТЗ на опросы */
  if (type === 'ТЗ на опросы' || type === 'Опросы') {
    const bodyYG =
      row('Название продукта / услуги:', data.title) +
      row('Что необходимо сделать?:', data.description) +
      row('Цель опроса:', data.goal) +
      row('Целевая аудитория (чьи ответы нужны):', data.target_audience) +
      row('Есть ли база клиентов (ID контрагента)?:', data.has_client_base) +
      row('Регионы показа:', data.regions) +
      row('Схема опроса:', data.schema_file) +
      row('Желаемая дата реализации:', data.deadline);

    const bodyTG =
      row('Название продукта / услуги:', data.title, '\n') +
      row('Что необходимо сделать?:', data.description, '\n') +
      row('Цель опроса:', data.goal, '\n') +
      row('Целевая аудитория (чьи ответы нужны):', data.target_audience, '\n') +
      row('Есть ли база клиентов (ID контрагента)?:', data.has_client_base, '\n') +
      row('Регионы показа:', data.regions, '\n') +
      row('Схема опроса:', data.schema_file, '\n') +
      row('Желаемая дата реализации:', data.deadline, '\n');

    return { messageYG: headYG(bodyYG), messageTG: headTG(bodyTG) };
  }

  // Fallback
  return {
    messageYG: headYG('Детали по типу не распознаны или не заполнены.'),
    messageTG: headTG('Детали по типу не распознаны или не заполнены.')
  };
};
