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
    row('Есть ли цели на год/квартал/месяц по данной услуге или продукту? Описаны ли OKR или KR?', data.goals) +
    row('Опишите клиентский путь после оставления заявки.', data.funnel) +
    row('Краткое описание продукта (2–3 предложения)', data.description) +
    row('Целевая аудитория', data.audience) +
    row('География продаж', data.geo) +
    row('Конкурентные преимущества', data.usp) +
    row('Откуда на данный момент приходят клиенты (источники)?', data.current_sources) +
    row('Сколько заявок вы готовы обрабатывать в день, без потери качества?', data.number_of_applications) +
    row('Ключевые запросы / поисковые фразы, по которым можно найти ваш продукт или услугу', data.keywords) +
    row('Кто является прямыми конкурентами?', data.competitors) +
    row('Что у конкурентов хорошо? Что хотелось бы сделать лучше?', data.best_among_competitors) +
    row('Где и как продвигаются конкуренты?', data.promotion_of_competitors) +
    row('Нужен ли сайт/лендинг', data.site_need) +
    row('Если сайт требует изменений, распишите подробнее, что нужно поменять.', data.site_changes) +
    row('Какие есть спецпредложения, акции, которые могут использоваться для продвижения?', data.best_price) +
    row('Есть ли уже существующие материалы, которые можно использовать для продвижения? Если да — укажите путь.', data.web_promotion) +
    row('Если вы знаете каналы, которые смотрит/читает ваша целевая аудитория, основные виды рекламы, на которые она обращает внимание, — расскажите про них.', data.audience_channels) +
    row('Есть ли какие-то существующие базы (база наших клиентов, холодная база и др.) для запуска рекламы по ним?', data.existing_databases) +
    row('Дополнительная информация', data.additional_information) +
    row('Срок реализации', data.deadline);

  const bodyTG =
    row('Название продукта / услуги:', data.title, '\n') +
    row('Есть ли цели на год/квартал/месяц по данной услуге или продукту? Описаны ли OKR или KR?', data.goals, '\n') +
    row('Опишите клиентский путь после оставления заявки.', data.funnel, '\n') +
    row('Краткое описание продукта (2–3 предложения)', data.description, '\n') +
    row('Целевая аудитория', data.audience, '\n') +
    row('География продаж', data.geo, '\n') +
    row('Конкурентные преимущества', data.usp, '\n') +
    row('Откуда на данный момент приходят клиенты (источники)?', data.current_sources, '\n') +
    row('Сколько заявок вы готовы обрабатывать в день, без потери качества?', data.number_of_applications, '\n') +
    row('Ключевые запросы / поисковые фразы, по которым можно найти ваш продукт или услугу', data.keywords, '\n') +
    row('Кто является прямыми конкурентами?', data.competitors, '\n') +
    row('Что у конкурентов хорошо? Что хотелось бы сделать лучше?', data.best_among_competitors, '\n') +
    row('Где и как продвигаются конкуренты?', data.promotion_of_competitors, '\n') +
    row('Нужен ли сайт/лендинг', data.site_need, '\n') +
    row('Если сайт требует изменений, распишите подробнее, что нужно поменять.', data.site_changes, '\n') +
    row('Какие есть спецпредложения, акции, которые могут использоваться для продвижения?', data.best_price, '\n') +
    row('Есть ли уже существующие материалы, которые можно использовать для продвижения? Если да — укажите путь.', data.web_promotion, '\n') +
    row('Если вы знаете каналы, которые смотрит/читает ваша целевая аудитория, основные виды рекламы, на которые она обращает внимание, — расскажите про них.', data.audience_channels, '\n') +
    row('Есть ли какие-то существующие базы (база наших клиентов, холодная база и др.) для запуска рекламы по ним?', data.existing_databases, '\n') +
    row('Дополнительная информация', data.additional_information, '\n') +
    row('Срок реализации', data.deadline, '\n');

  return { messageYG: headYG(bodyYG), messageTG: headTG(bodyTG) };
}

  /* 2) ТЗ на создание сайта/страницы */
if (type === 'ТЗ на создание сайта/страницы') {
  const bodyYG =
    row('Опишите задачу своими словами.', data.title) +
    row('Что необходимо сделать?', data.description) +
    row('Ранее эту услугу уже продвигали?', data.first_visit_selector) +
    row('Кто входит в рабочую группу по созданию?', data.team) +
    row('Какие задачи должен выполнять сайт / лендинг / страница?', data.tasks) +
    row('Какое целевое действие должно быть совершено после прочтения страницы?', data.cta) +
    row('Кто является целевой аудиторией продукта / услуги / предложения? На какие группы она подразделяется? Какова география проживания целевой аудитории?', data.cta_audience) +
    row('Какими способами целевая аудитория будет попадать на сайт / лендинг / страницу?', data.cta_audience_insert) +
    row('Перечислите конкурентов продукта / услуги / предложения, в том числе компании из других регионов или стран с аналогичным продуктом.', data.competitors) +
    row('Есть ли макеты, которые можно взять за основу дизайна', data.content) +
    row('Есть ли референсы (сайты / лендинги / страницы), на которые стоит ориентироваться по дизайну или содержанию?', data.refs) +
    row('В чём заключаются преимущества и выгоды продукта? (по сравнению с конкурентом, альтернативным решением или отсутствием продукта).', data.advantages) +
    row('Нужно ли объяснять, как работает продукт? Если да, опишите это подробно.', data.work) +
    row('Какие есть варианты приобретения продукта (разные тарифы, оборудование, скидки, акции, опции и т.п.)?', data.price) +
    row('Какая дополнительная информация должна присутствовать на сайте / лендинге / странице (отзывы, карты, схемы, ссылки, контакты, описания и т.д.)?', data.details) +
    row('Должны ли мобильная и десктопная версии совпадать по содержанию? Есть ли контент или функционал, который будет доступен только в одной из версий?', data.site_content) +
    row('Пожелания по дизайну сайта / лендинга / страницы.', data.wishes) +
    row('Кто будет обрабатывать заявки, приходящие с данного сайта?', data.processing) +
    row('Срок запуска', data.deadline);

  const bodyTG =
    row('Опишите задачу своими словами.', data.title, '\n') +
    row('Что необходимо сделать?', data.description, '\n') +
    row('Ранее эту услугу уже продвигали?', data.first_visit_selector, '\n') +
    row('Кто входит в рабочую группу по созданию?', data.team, '\n') +
    row('Какие задачи должен выполнять сайт / лендинг / страница?', data.tasks, '\n') +
    row('Какое целевое действие должно быть совершено после прочтения страницы?', data.cta, '\n') +
    row('Кто является целевой аудиторией продукта / услуги / предложения? На какие группы она подразделяется? Какова география проживания целевой аудитории?', data.cta_audience, '\n') +
    row('Какими способами целевая аудитория будет попадать на сайт / лендинг / страницу?', data.cta_audience_insert, '\n') +
    row('Перечислите конкурентов продукта / услуги / предложения, в том числе компании из других регионов или стран с аналогичным продуктом.', data.competitors, '\n') +
    row('Есть ли макеты, которые можно взять за основу дизайна', data.content, '\n') +
    row('Есть ли референсы (сайты / лендинги / страницы), на которые стоит ориентироваться по дизайну или содержанию?', data.refs, '\n') +
    row('В чём заключаются преимущества и выгоды продукта? (по сравнению с конкурентом, альтернативным решением или отсутствием продукта).', data.advantages, '\n') +
    row('Нужно ли объяснять, как работает продукт? Если да, опишите это подробно.', data.work, '\n') +
    row('Какие есть варианты приобретения продукта (разные тарифы, оборудование, скидки, акции, опции и т.п.)?', data.price, '\n') +
    row('Какая дополнительная информация должна присутствовать на сайте / лендинге / странице (отзывы, карты, схемы, ссылки, контакты, описания и т.д.)?', data.details, '\n') +
    row('Должны ли мобильная и десктопная версии совпадать по содержанию? Есть ли контент или функционал, который будет доступен только в одной из версий?', data.site_content, '\n') +
    row('Пожелания по дизайну сайта / лендинга / страницы.', data.wishes, '\n') +
    row('Кто будет обрабатывать заявки, приходящие с данного сайта?', data.processing, '\n') +
    row('Срок запуска', data.deadline, '\n');

  return { messageYG: headYG(bodyYG), messageTG: headTG(bodyTG) };
}


 /* 3) ТЗ на внесение изменений на сайты */
if (type === 'ТЗ на внесение изменений на сайты') {
  const bodyYG =
    row('Опишите задачу своими словами.', data.title) +
    row('Укажите тип изменения', data.type_change) +
    row('Прикрепите скриншот страницы, где необходимо внести изменения', data.screenshot_file) +
    row('Ссылка на страницу, где нужно внести изменения:', data.url) +
    row('Есть ли у вас готовый текст / изображение / документ для размещения?', data.content_file) +
    row('Нужно ли согласование перед публикацией?', data.approval) +
    row('Комментарий/пожелания к оформлению', data.comment) +
    row('Желаемая дата реализации', data.deadline);

  const bodyTG =
    row('Опишите задачу своими словами.', data.title, '\n') +
    row('Укажите тип изменения', data.type_change, '\n') +
    row('Прикрепите скриншот страницы, где необходимо внести изменения', data.screenshot_file, '\n') +
    row('Ссылка на страницу, где нужно внести изменения:', data.url, '\n') +
    row('Есть ли у вас готовый текст / изображение / документ для размещения?', data.content_file, '\n') +
    row('Нужно ли согласование перед публикацией?', data.approval, '\n') +
    row('Комментарий/пожелания к оформлению', data.comment, '\n') +
    row('Желаемая дата реализации', data.deadline, '\n');

  return { messageYG: headYG(bodyYG), messageTG: headTG(bodyTG) };
}


  /* 4) ТЗ на запуск рекламы */
if (type === 'ТЗ запуск рекламы') {
  const bodyYG =
    row('Опишите задачу своими словами.', data.title) +
    row('На какой площадке запустить рекламу?', data.platforms) +
    row('Цель рекламы (выберите одно или несколько)', data.ad_goals) +
    row('Ссылка, куда будет идти реклама', data.landing_url) +
    row('География размещения', data.geo) +
    row('Кто ваш клиент?', data.target_audience) +
    row('Какую боль / потребность закрывает ваш продукт?', data.pain_point) +
    row('УТП (уникальное предложение)', data.unique_offer) +
    row('Есть ли акции, скидки или подарки?', data.discounts) +
    row('Клиентский путь и обработка заявок. Как будет фиксироваться воронка продаж?', data.sales_path) +
    row('Какие ключевые слова / запросы хотите использовать в продвижении?', data.keywords) +
    row('Ссылки на материалы, если есть', data.banner_file) +
    row('Если необходима реклама по базе, загрузите базу данных', data.base_file) +
    row('Примеры конкурентов / объявлений', data.concurents_file) +
    row('Бюджет на рекламу в месяц', data.budget) +
    row('KPI (ожидаемые результаты)', data.kpi) +
    row('Период проведения кампании', data.campaign_period) +
    row('Срок запуска', data.deadline);

  const bodyTG =
    row('Опишите задачу своими словами.', data.title, '\n') +
    row('На какой площадке запустить рекламу?', data.platforms, '\n') +
    row('Цель рекламы (выберите одно или несколько)', data.ad_goals, '\n') +
    row('Ссылка, куда будет идти реклама', data.landing_url, '\n') +
    row('География размещения', data.geo, '\n') +
    row('Кто ваш клиент?', data.target_audience, '\n') +
    row('Какую боль / потребность закрывает ваш продукт?', data.pain_point, '\n') +
    row('УТП (уникальное предложение)', data.unique_offer, '\n') +
    row('Есть ли акции, скидки или подарки?', data.discounts, '\n') +
    row('Клиентский путь и обработка заявок. Как будет фиксироваться воронка продаж?', data.sales_path, '\n') +
    row('Какие ключевые слова / запросы хотите использовать в продвижении?', data.keywords, '\n') +
    row('Ссылки на материалы, если есть', data.banner_file, '\n') +
    row('Если необходима реклама по базе, загрузите базу данных', data.base_file, '\n') +
    row('Примеры конкурентов / объявлений', data.concurents_file, '\n') +
    row('Бюджет на рекламу в месяц', data.budget, '\n') +
    row('KPI (ожидаемые результаты)', data.kpi, '\n') +
    row('Период проведения кампании', data.campaign_period, '\n') +
    row('Срок запуска', data.deadline, '\n');

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
