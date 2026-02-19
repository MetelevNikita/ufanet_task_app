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
  const row = (label: string, v?: any, br = '<br>') =>
    v ? `${label} ${v}${br}` : '';

  // Удобный нормализатор типа
  const type = (data.type || '').trim();

  /* 1) Первичное обращение по услуге */
  if (type === 'Первичное обращение по услуге') {
    const bodyYG =
      row('<strong>Назовите задачу так, чтобы сразу была понятна суть:</strong><br>', data.title, '<br><br>') +
      row('<strong>Опишите задачу своими словами. Что необходимо сделать?:</strong><br>', data.description, '<br><br>') +
      row('<strong>Есть ли цели на год/квартал/месяц по данной услуге или продукту? Описаны ли OKR или KR?:</strong><br>', data.goals, '<br><br>') +
      row('<strong>Опишите клиентский путь после оставления заявки:</strong><br>', data.funnel, '<br><br>') +
      row('<strong>Краткое описание продукта (2–3 предложения):</strong><br>', data.description, '<br><br>') +
      row('<strong>Целевая аудитория:</strong><br>', data.audience, '<br><br>') +
      row('<strong>География продаж:</strong><br>', data.geo, '<br><br>') +
      row('<strong>Конкурентные преимущества:</strong><br>', data.usp, '<br><br>') +
      row('<strong>Откуда на данный момент приходят клиенты (источники)?:</strong><br>', data.current_sources, '<br><br>') +
      row('<strong>Сколько заявок вы готовы обрабатывать в день, без потери качества?:</strong><br>', data.number_of_applications, '<br><br>') +
      row('<strong>Ключевые запросы / поисковые фразы, по которым можно найти ваш продукт или услугу:</strong><br>', data.keywords, '<br><br>') +
      row('<strong>Кто является прямыми конкурентами?:</strong><br>', data.competitors, '<br><br>') +
      row('<strong>Ссылка на таблицу окупаемости продукта с учётом расходов на рекламу, составляемую совместно с финансовым аналитиком:</strong><br>', 
          data.link_table ? `<a target="_blank" rel="noopener noreferrer" href=${data.link_table}>${data.link_table}</a>` : '', '<br><br>') +
      row('<strong>Что у конкурентов хорошо? Что хотелось бы сделать лучше?:</strong><br>', data.best_among_competitors, '<br><br>') +
      row('<strong>Где и как продвигаются конкуренты?:</strong><br>', data.promotion_of_competitors, '<br><br>') +
      row('<strong>Нужен ли сайт/лендинг:</strong><br>', data.first_visit_selector, '<br><br>') +
      row('<strong>Если сайт требует изменений, распишите подробнее, что нужно поменять:</strong><br>', data.site_changes, '<br><br>') +
      row('<strong>Какие есть спецпредложения, акции, которые могут использоваться для продвижения?:</strong><br>', data.best_price, '<br><br>') +
      row('<strong>Есть ли уже существующие материалы, которые можно использовать для продвижения? Если да — укажите путь:</strong><br>', data.web_promotion, '<br><br>') +
      row('<strong>Если вы знаете каналы, которые смотрит/читает ваша целевая аудитория, основные виды рекламы, на которые она обращает внимание, — расскажите про них:</strong><br>', data.audience_channels, '<br><br>') +
      row('<strong>Есть ли какие-то существующие базы (база наших клиентов, холодная база и др.) для запуска рекламы по ним?:</strong><br>', data.existing_databases, '<br><br>') +
      row('<strong>Дополнительная информация:</strong><br>', data.additional_information, '<br><br>') +
      row('<strong>Срок реализации:</strong><br>', data.deadline, '<br><br>');

    const bodyTG =
      row('Назовите задачу так, чтобы сразу была понятна суть:', data.title, '\n') +
      row('Опишите задачу своими словами. Что необходимо сделать?:', data.description, '\n') +
      row('Есть ли цели на год/квартал/месяц по данной услуге или продукту? Описаны ли OKR или KR?:', data.goals, '\n') +
      row('Опишите клиентский путь после оставления заявки:', data.funnel, '\n') +
      row('Краткое описание продукта (2–3 предложения):', data.description, '\n') +
      row('Целевая аудитория:', data.audience, '\n') +
      row('География продаж:', data.geo, '\n') +
      row('Конкурентные преимущества:', data.usp, '\n') +
      row('Откуда на данный момент приходят клиенты (источники)?:', data.current_sources, '\n') +
      row('Сколько заявок вы готовы обрабатывать в день, без потери качества?:', data.number_of_applications, '\n') +
      row('Ключевые запросы / поисковые фразы, по которым можно найти ваш продукт или услугу:', data.keywords, '\n') +
      row('Кто является прямыми конкурентами?:', data.competitors, '\n') +
      row('Ссылка на таблицу окупаемости продукта с учётом расходов на рекламу, составляемую совместно с финансовым аналитиком:', data.link_table, '\n') +
      row('Что у конкурентов хорошо? Что хотелось бы сделать лучше?:', data.best_among_competitors, '\n') +
      row('Где и как продвигаются конкуренты?:', data.promotion_of_competitors, '\n') +
      row('Нужен ли сайт/лендинг:', data.first_visit_selector, '\n') +
      row('Если сайт требует изменений, распишите подробнее, что нужно поменять:', data.site_changes, '\n') +
      row('Какие есть спецпредложения, акции, которые могут использоваться для продвижения?:', data.best_price, '\n') +
      row('Есть ли уже существующие материалы, которые можно использовать для продвижения? Если да — укажите путь:', data.web_promotion, '\n') +
      row('Если вы знаете каналы, которые смотрит/читает ваша целевая аудитория, основные виды рекламы, на которые она обращает внимание, — расскажите про них:', data.audience_channels, '\n') +
      row('Есть ли какие-то существующие базы (база наших клиентов, холодная база и др.) для запуска рекламы по ним?:', data.existing_databases, '\n') +
      row('Дополнительная информация:', data.additional_information, '\n') +
      row('Срок реализации:', data.deadline, '\n');

    return { messageYG: headYG(bodyYG), messageTG: headTG(bodyTG) };
  }

  /* 2) ТЗ на создание сайта/страницы */
  if (type === 'ТЗ на создание сайта/страницы') {
    const bodyYG =
      row('<strong>Назовите задачу так, чтобы сразу была понятна суть:</strong><br>', data.title, '<br><br>') +
      row('<strong>Опишите задачу своими словами. Что необходимо сделать?:</strong><br>', data.description, '<br><br>') +
      row('<strong>Ранее эту услугу уже продвигали?:</strong><br>', data.first_visit_selector, '<br><br>') +
      row('<strong>Кто входит в рабочую группу по созданию? Кто будет поддерживать актуальность сайта / лендинга / страницы?:</strong><br>', data.team, '<br><br>') +
      row('<strong>Какие задачи должен выполнять сайт / лендинг / страница?:</strong><br>', data.tasks, '<br><br>') +
      row('<strong>Какое целевое действие должно быть совершено после прочтения страницы?:</strong><br>', data.cta, '<br><br>') +
      row('<strong>Кто является целевой аудиторией продукта / услуги / предложения? На какие группы она подразделяется? Какова география проживания целевой аудитории?:</strong><br>', data.cta_audience, '<br><br>') +
      row('<strong>Какими способами целевая аудитория будет попадать на сайт / лендинг / страницу?:</strong><br>', data.cta_audience_insert, '<br><br>') +
      row('<strong>Перечислите конкурентов продукта / услуги / предложения, в том числе компании из других регионов или стран с аналогичным продуктом. Укажите ссылки на их сайты:</strong><br>', data.competitors, '<br><br>') +
      row('<strong>Пожелания по дизайну сайта / лендинга / страницы:</strong><br>', data.wishes, '<br><br>') +
      row('<strong>Есть ли макеты, которые можно взять за основу дизайна:</strong><br>', data.content, '<br><br>') +
      row('<strong>Есть ли референсы (сайты / лендинги / страницы), на которые стоит ориентироваться по дизайну или содержанию?:</strong><br>', data.refs, '<br><br>') +
      row('<strong>В чём заключаются преимущества и выгоды продукта? (по сравнению с конкурентом, альтернативным решением или отсутствием продукта):</strong><br>', data.advantages, '<br><br>') +
      row('<strong>Нужно ли объяснять, как работает продукт? Если да, опишите это подробно:</strong><br>', data.work, '<br><br>') +
      row('<strong>Какие есть варианты приобретения продукта (разные тарифы, оборудование, скидки, акции, опции и т.п.)?:</strong><br>', data.price, '<br><br>') +
      row('<strong>Какая дополнительная информация должна присутствовать на сайте / лендинге / странице (отзывы, карты, схемы, ссылки, контакты, описания и т.д.)?:</strong><br>', data.details, '<br><br>') +
      row('<strong>Должны ли мобильная и десктопная версии совпадать по содержанию? Есть ли контент или функционал, который будет доступен только в одной из версий?:</strong><br>', data.site_content, '<br><br>') +
      row('<strong>Кто будет обрабатывать заявки, приходящие с данного сайта?:</strong><br>', data.processing, '<br><br>') +
      row('<strong>Срок запуска:</strong><br>', data.deadline, '<br><br>');

    const bodyTG =
      row('Назовите задачу так, чтобы сразу была понятна суть:', data.title, '\n') +
      row('Опишите задачу своими словами. Что необходимо сделать?:', data.description, '\n') +
      row('Ранее эту услугу уже продвигали?:', data.first_visit_selector, '\n') +
      row('Кто входит в рабочую группу по созданию? Кто будет поддерживать актуальность сайта / лендинга / страницы?:', data.team, '\n') +
      row('Какие задачи должен выполнять сайт / лендинг / страница?:', data.tasks, '\n') +
      row('Какое целевое действие должно быть совершено после прочтения страницы?:', data.cta, '\n') +
      row('Кто является целевой аудиторией продукта / услуги / предложения? На какие группы она подразделяется? Какова география проживания целевой аудитории?:', data.cta_audience, '\n') +
      row('Какими способами целевая аудитория будет попадать на сайт / лендинг / страницу?:', data.cta_audience_insert, '\n') +
      row('Перечислите конкурентов продукта / услуги / предложения, в том числе компании из других регионов или стран с аналогичным продуктом. Укажите ссылки на их сайты:', data.competitors, '\n') +
      row('Пожелания по дизайну сайта / лендинга / страницы:', data.wishes, '\n') +
      row('Есть ли макеты, которые можно взять за основу дизайна:', data.content, '\n') +
      row('Есть ли референсы (сайты / лендинги / страницы), на которые стоит ориентироваться по дизайну или содержанию?:', data.refs, '\n') +
      row('В чём заключаются преимущества и выгоды продукта? (по сравнению с конкурентом, альтернативным решением или отсутствием продукта):', data.advantages, '\n') +
      row('Нужно ли объяснять, как работает продукт? Если да, опишите это подробно:', data.work, '\n') +
      row('Какие есть варианты приобретения продукта (разные тарифы, оборудование, скидки, акции, опции и т.п.)?:', data.price, '\n') +
      row('Какая дополнительная информация должна присутствовать на сайте / лендинге / странице (отзывы, карты, схемы, ссылки, контакты, описания и т.д.)?:', data.details, '\n') +
      row('Должны ли мобильная и десктопная версии совпадать по содержанию? Есть ли контент или функционал, который будет доступен только в одной из версий?:', data.site_content, '\n') +
      row('Кто будет обрабатывать заявки, приходящие с данного сайта?:', data.processing, '\n') +
      row('Срок запуска:', data.deadline, '\n');

    return { messageYG: headYG(bodyYG), messageTG: headTG(bodyTG) };
  }

  /* 3) ТЗ на внесение изменений на сайты */
  if (type === 'ТЗ на внесение изменений на сайты') {
    const bodyYG =
      row('<strong>Назовите задачу так, чтобы сразу была понятна суть:</strong><br>', data.title, '<br><br>') +
      row('<strong>Укажите тип изменения (Можно выбрать несколько вариантов):</strong><br>', 
          data.type_change && data.type_change.map.join(', '), '<br><br>') +
      row('<strong>Прикрепите скриншот страницы, где необходимо внести изменения (необязательно, но желательно):</strong><br>', 
          data.screenshot_file ? `<a target="_blank" rel="noopener noreferrer" href=${data.screenshot_file}>${data.screenshot_file}</a>` : '', '<br><br>') +
      row('<strong>Ссылка на страницу, где нужно внести изменения: (укажите полный URL):</strong><br>', 
          data.url ? `<a target="_blank" rel="noopener noreferrer" href=${data.url}>${data.url}</a>` : '', '<br><br>') +
      row('<strong>Есть ли у вас готовый текст / изображение / документ для размещения? (если да, приложите файл):</strong><br>', 
          data.content_file ? `<a target="_blank" rel="noopener noreferrer" href=${data.content_file}>${data.content_file}</a>` : '', '<br><br>') +
      row('<strong>Нужно ли согласование перед публикацией?:</strong><br>', data.approval, '<br><br>') +
      row('<strong>Комментарии или пожелания к оформлению / формулировке текста / размещению. (опционально):</strong><br>', data.comment, '<br><br>') +
      row('<strong>Желаемая дата реализации:</strong><br>', data.deadline, '<br><br>');

    const bodyTG =
      row('Назовите задачу так, чтобы сразу была понятна суть:', data.title, '\n') +
      row('Укажите тип изменения (Можно выбрать несколько вариантов):', 
          data.type_change.join(', '), '\n') +
      row('Прикрепите скриншот страницы, где необходимо внести изменения (необязательно, но желательно):', data.screenshot_file, '\n') +
      row('Ссылка на страницу, где нужно внести изменения: (укажите полный URL):', data.url, '\n') +
      row('Есть ли у вас готовый текст / изображение / документ для размещения? (если да, приложите файл):', data.content_file, '\n') +
      row('Нужно ли согласование перед публикацией?:', data.approval, '\n') +
      row('Комментарии или пожелания к оформлению / формулировке текста / размещению. (опционально):', data.comment, '\n') +
      row('Желаемая дата реализации:', data.deadline, '\n');

    return { messageYG: headYG(bodyYG), messageTG: headTG(bodyTG) };
  }

  /* 4) ТЗ на запуск рекламы */
  if (type === 'ТЗ на запуск рекламы') {
    const bodyYG =
      row('<strong>Назовите задачу так, чтобы сразу была понятна суть:</strong><br>', data.title, '<br><br>') +
      row('<strong>На какой площадке вы хотите запустить рекламу?(Можно выбрать несколько вариантов):</strong><br>', data.platforms && data.platforms.join(', '), '<br><br>') +
      row('<strong>Цель рекламы (выберите одно или несколько):</strong><br>', data.ad_goals && data.ad_goals.map.join(', '), '<br><br>') +
      row('<strong>Ссылка на сайт / лендинг / группу ВК, куда будет идти реклама (Необязательно):</strong><br>', data.landing_url ? `<a target="_blank" rel="noopener noreferrer" href=${data.landing_url}>${data.landing_url}</a>` : '', '<br><br>') +
      row('<strong>География размещения рекламы:</strong><br>', data.geo, '<br><br>') +
      row('<strong>Кто ваш клиент? Опишите целевую аудиторию максимально подробно: Возраст, пол, Социальный статус (работает, учится, пенсионер и т.д.) Род деятельности. Доход, интересы, поведение. Где чаще бывает онлайн:</strong><br>', data.target_audience, '<br><br>') +
      row('<strong>Какую боль / потребность закрывает ваш продукт?:</strong><br>', data.pain_point, '<br><br>') +
      row('<strong>УТП (уникальное предложение):</strong><br>', data.unique_offer, '<br><br>') +
      row('<strong>Есть ли акции, скидки или подарки?:</strong><br>', data.discounts, '<br><br>') +
      row('<strong>Опишите клиентский путь. Как будет фиксироваться воронка продаж? Кто обрабатывает заявки?:</strong><br>', 
          data.sales_path, '<br><br>') +
      row('<strong>Какие ключевые слова / запросы хотите использовать в продвижении?:</strong><br>', data.keywords, '<br><br>') +
      row('<strong>Ссылки на материалы, если есть (без них запуск рекламы будет позже):</strong><br>', 
          data.banner_file ? `<a target="_blank" rel="noopener noreferrer" href=${data.banner_file}>${data.banner_file}</a>` : '', '<br><br>') +
      row('<strong>Если необходима реклама по базе, загрузите базу данных:</strong><br>', 
          data.base_file ? `<a target="_blank" rel="noopener noreferrer" href=${data.base_file}>${data.base_file}</a>` : '', '<br><br>') +
      row('<strong>Примеры конкурентов или рекламных объявлений:</strong><br>', 
          data.concurents_file ? `<a target="_blank" rel="noopener noreferrer" href=${data.concurents_file}>${data.concurents_file}</a>` : '', '<br><br>') +
      row('<strong>Бюджет на рекламу в месяц:</strong><br>', data.budget, '<br><br>') +
      row('<strong>Есть ли KPI (ожидаемые результаты)?:</strong><br>', data.kpi, '<br><br>') +
      row('<strong>Период проведения кампании:</strong><br>', data.campaign_period, '<br><br>') +
      row('<strong>Дата запуска:</strong><br>', data.deadline, '<br><br>');

    const bodyTG =
      row('Назовите задачу так, чтобы сразу была понятна суть:', data.title, '\n') +
      row('На какой площадке вы хотите запустить рекламу?(Можно выбрать несколько вариантов):', 
          data.platforms && data.platforms.map.join(', '), '\n') +
      row('Цель рекламы (выберите одно или несколько):', 
          data.ad_goals && data.ad_goals.map.join(', '), '\n') +
      row('Ссылка на сайт / лендинг / группу ВК, куда будет идти реклама (Необязательно):', data.landing_url, '\n') +
      row('География размещения рекламы:', data.geo, '\n') +
      row('Кто ваш клиент? Опишите целевую аудиторию максимально подробно: Возраст, пол, Социальный статус (работает, учится, пенсионер и т.д.) Род деятельности. Доход, интересы, поведение. Где чаще бывает онлайн:', data.target_audience, '\n') +
      row('Какую боль / потребность закрывает ваш продукт?:', data.pain_point, '\n') +
      row('УТП (уникальное предложение):', data.unique_offer, '\n') +
      row('Есть ли акции, скидки или подарки?:', data.discounts, '\n') +
      row('Опишите клиентский путь. Как будет фиксироваться воронка продаж? Кто обрабатывает заявки?:', 
          data.sales_path, '\n') +
      row('Какие ключевые слова / запросы хотите использовать в продвижении?:', data.keywords, '\n') +
      row('Ссылки на материалы, если есть (без них запуск рекламы будет позже):', data.banner_file, '\n') +
      row('Если необходима реклама по базе, загрузите базу данных:', data.base_file, '\n') +
      row('Примеры конкурентов или рекламных объявлений:', data.concurents_file, '\n') +
      row('Бюджет на рекламу в месяц:', data.budget, '\n') +
      row('Есть ли KPI (ожидаемые результаты)?:', data.kpi, '\n') +
      row('Период проведения кампании:', data.campaign_period, '\n') +
      row('Дата запуска:', data.deadline, '\n');

    return { messageYG: headYG(bodyYG), messageTG: headTG(bodyTG) };
  }

  /* 5) ТЗ на SMM (размещения в соцсетях: посты, видео, конкурсы и т.д.)*/
  if (type === 'ТЗ на SMM (размещения в соцсетях: посты, видео, конкурсы и т.д.)') {
    const bodyYG =
      row('<strong>Назовите задачу так, чтобы сразу была понятна суть:</strong><br>', data.title, '<br><br>') +
      row('<strong>Что необходимо сделать?:</strong><br>', data.description, '<br><br>') +
      row('<strong>Цель размещения:</strong><br>', data.placement_goal, '<br><br>') +
      row('<strong>Аудитория:</strong><br>', data.audience, '<br><br>') +
      row('<strong>Периодичность размещения:</strong><br>', data.frequency, '<br><br>') +
      row('<strong>Прикрепи ссылку на материалы, если они есть Текст, изображения, презентации, ссылка на сайт:</strong><br>', 
          data.material_file ? `<a target="_blank" rel="noopener noreferrer" href=${data.material_file}>${data.material_file}</a>` : '', '<br><br>') +
      row('<strong>Когда планируется размещение? Окончательная дата публикации согласуется лично:</strong><br>', data.publish_date, '<br><br>') +
      row('<strong>Срок реализации:</strong><br>', data.deadline, '<br><br>');

    const bodyTG =
      row('Назовите задачу так, чтобы сразу была понятна суть:', data.title, '\n') +
      row('Что необходимо сделать?:', data.description, '\n') +
      row('Цель размещения:', data.placement_goal, '\n') +
      row('Аудитория:', data.audience, '\n') +
      row('Периодичность размещения:', data.frequency, '\n') +
      row('Прикрепи ссылку на материалы, если они есть Текст, изображения, презентации, ссылка на сайт:', data.material_file, '\n') +
      row('Когда планируется размещение? Окончательная дата публикации согласуется лично:', data.publish_date, '\n') +
      row('Срок реализации:', data.deadline, '\n');

    return { messageYG: headYG(bodyYG), messageTG: headTG(bodyTG) };
  }

  /* 6) ТЗ на написание статей */
  if (type === 'ТЗ на написание статей (для СМИ и сайта ufanet.ru)') {
    const bodyYG =
      row('<strong>Назовите задачу так, чтобы сразу была понятна суть:</strong><br>', data.title, '<br><br>') +
      row('<strong>Что необходимо сделать?:</strong><br>', data.description, '<br><br>') +
      row('<strong>Где будет размещаться статья?:</strong><br>', data.placement, '<br><br>') +
      row('<strong>Регион / город размещения:</strong><br>', data.region, '<br><br>') +
      row('<strong>Цель публикации:</strong><br>', data.goal, '<br><br>') +
      row('<strong>Целевая аудитория:</strong><br>', data.target_audience, '<br><br>') +
      row('<strong>Объём:</strong><br>', data.volume, '<br><br>') +
      row('<strong>Примерная структура текста:</strong><br>', data.structure, '<br><br>') +
      row('<strong>Ссылки и материалы:</strong><br>', data.link_text, '<br><br>') +
      row('<strong>Референсы:</strong><br>', data.reference_text, '<br><br>') +
      row('<strong>Желаемая дата реализации:</strong><br>', data.deadline, '<br><br>');

    const bodyTG =
      row('Назовите задачу так, чтобы сразу была понятна суть:', data.title, '\n') +
      row('Что необходимо сделать?:', data.description, '\n') +
      row('Где будет размещаться статья?:', data.placement, '\n') +
      row('Регион / город размещения:', data.region, '\n') +
      row('Цель публикации:', data.goal, '\n') +
      row('Целевая аудитория:', data.target_audience, '\n') +
      row('Объём:', data.volume, '\n') +
      row('Примерная структура текста:', data.structure, '\n') +
      row('Ссылки и материалы:', data.link_text, '\n') +
      row('Референсы:', data.reference_text, '\n') +
      row('Желаемая дата реализации:', data.deadline, '\n');

    return { messageYG: headYG(bodyYG), messageTG: headTG(bodyTG) };
  }

  /* 7) ТЗ на редактуру */
  if (type === 'ТЗ на редактуру (тексты статей, каталогов и т.п.)') {
    const bodyYG =
      row('<strong>Назовите задачу так, чтобы сразу была понятна суть:</strong><br>', data.title, '<br><br>') +
      row('<strong>Что необходимо сделать?:</strong><br>', data.description, '<br><br>') +
      row('<strong>Вид работы:</strong><br>', data.work_type, '<br><br>') +
      row('<strong>Другое:</strong><br>', data.other, '<br><br>') +
      row('<strong>Укажите, где именно будет опубликован материал:</strong><br>', data.placement, '<br><br>') +
      row('<strong>Регион / город размещения:</strong><br>', data.region, '<br><br>') +
      row('<strong>Цель размещения. Кто будет читать материал?:</strong><br>', data.goal, '<br><br>') +
      row('<strong>Целевая аудитория:</strong><br>', data.target_audience, '<br><br>') +
      row('<strong>Пожелания:</strong><br>', data.preferences, '<br><br>') +
      row('<strong>Ссылки:</strong><br>', data.links, '<br><br>') +
      row('<strong>Желаемая дата реализации:</strong><br>', data.deadline, '<br><br>');

    const bodyTG =
      row('Назовите задачу так, чтобы сразу была понятна суть:', data.title, '\n') +
      row('Что необходимо сделать?:', data.description, '\n') +
      row('Вид работы:', data.work_type, '\n') +
      row('Другое:', data.other, '\n') +
      row('Укажите, где именно будет опубликован материал:', data.placement, '\n') +
      row('Регион / город размещения:', data.region, '\n') +
      row('Цель размещения. Кто будет читать материал?:', data.goal, '\n') +
      row('Целевая аудитория:', data.target_audience, '\n') +
      row('Пожелания:', data.preferences, '\n') +
      row('Ссылки:', data.links, '\n') +
      row('Желаемая дата реализации:', data.deadline, '\n');

    return { messageYG: headYG(bodyYG), messageTG: headTG(bodyTG) };
  }

  /* 8) ТЗ на пуши в приложении Уфанет */
  if (type === 'ТЗ на отправку Push в приложении Уфанет/Уфанет Бизнес') {
    const bodyYG =
      row('<strong>Назовите задачу так, чтобы сразу была понятна суть:</strong><br>', data.title, '<br><br>') +
      row('<strong>Что необходимо сделать?:</strong><br>', data.description, '<br><br>') +
      row('<strong>Цель рассылки:</strong><br>', data.goal, '<br><br>') +
      row('<strong>Прикрепите файл с выгрузкой абонентов Если у вас нет готового файла - пропустите этот вопрос:</strong><br>', 
          data.abonents_file ? `<a target="_blank" rel="noopener noreferrer" href=${data.abonents_file}>${data.abonents_file}</a>` : '', '<br><br>') +
      row('<strong>Кому рассылать пуши. Если ранее вы прикрепили выгрузку - пропустите этот вопрос:</strong><br>', data.recipients, '<br><br>') +
      row('<strong>Срок отправки пушей:</strong><br>', data.send_deadline, '<br><br>') +
      row('<strong>Как будете измерять результат?:</strong><br>', data.kpi, '<br><br>') +
      row('<strong>Если есть примерный текст для рассылки, прикрепите его здесь:</strong><br>', data.message_text, '<br><br>') +
      row('<strong>Желаемая дата реализации:</strong><br>', data.deadline, '<br><br>');

    const bodyTG =
      row('Назовите задачу так, чтобы сразу была понятна суть:', data.title, '\n') +
      row('Что необходимо сделать?:', data.description, '\n') +
      row('Цель рассылки:', data.goal, '\n') +
      row('Прикрепите файл с выгрузкой абонентов Если у вас нет готового файла - пропустите этот вопрос:', data.abonents_file, '\n') +
      row('Кому рассылать пуши. Если ранее вы прикрепили выгрузку - пропустите этот вопрос:', data.recipients, '\n') +
      row('Срок отправки пушей:', data.send_deadline, '\n') +
      row('Как будете измерять результат?:', data.kpi, '\n') +
      row('Если есть примерный текст для рассылки, прикрепите его здесь:', data.message_text, '\n') +
      row('Желаемая дата реализации:', data.deadline, '\n');

    return { messageYG: headYG(bodyYG), messageTG: headTG(bodyTG) };
  }

  /* 9) ТЗ на размещение сторис в приложении Уфанет */
  if (type === 'ТЗ на размещение сторис в приложении “Уфанет/Уфанет для бизнеса”') {
    const bodyYG =
      row('<strong>Назовите задачу так, чтобы сразу была понятна суть:</strong><br>', data.title, '<br><br>') +
      row('<strong>Что необходимо сделать?:</strong><br>', data.description, '<br><br>') +
      row('<strong>Кто отвечает за создание визуала? (изображение для сторис и миниатюры):</strong><br>', data.responsible_person, '<br><br>') +
      row('<strong>Цель размещения сторис:</strong><br>', data.goal, '<br><br>') +
      row('<strong>Период размещения:</strong><br>', data.period, '<br><br>') +
      row('<strong>На какие города и поселки показываем сторис?:</strong><br>', data.geo, '<br><br>') +
      row('<strong>Ссылка, по которой можно будет перейти, нажав на кнопку:</strong><br>', 
          data.url ? `<a target="_blank" rel="noopener noreferrer" href=${data.url}>${data.url}</a>` : '', '<br><br>') +
      row('<strong>Надпись на миниатюре:</strong><br>', data.thumbnail_text, '<br><br>') +
      row('<strong>Надпись на кнопке:</strong><br>', data.button_text, '<br><br>') +
      row('<strong>На какой картинке ставится кнопка со ссылкой:</strong><br>', data.button_image_ref, '<br><br>') +
      row('<strong>Прикрепите изображения сторис. Если на сторис предполагается кнопка, фон должен быть контрастный оранжевому, так как кнопка оранжевого цвета:</strong><br>', 
          data.storis_file ? `<a target="_blank" rel="noopener noreferrer" href=${data.storis_file}>${data.storis_file}</a>` : '', '<br><br>') +
      row('<strong>Прикрепите миниатюру-баннер:</strong><br>', 
          data.miniature_file ? `<a target="_blank" rel="noopener noreferrer" href=${data.miniature_file}>${data.miniature_file}</a>` : '', '<br><br>') +
      row('<strong>Желаемая дата реализации:</strong><br>', data.deadline, '<br><br>');

    const bodyTG =
      row('Назовите задачу так, чтобы сразу была понятна суть:', data.title, '\n') +
      row('Что необходимо сделать?:', data.description, '\n') +
      row('Кто отвечает за создание визуала? (изображение для сторис и миниатюры):', data.responsible_person, '\n') +
      row('Цель размещения сторис:', data.goal, '\n') +
      row('Период размещения:', data.period, '\n') +
      row('На какие города и поселки показываем сторис?:', data.geo, '\n') +
      row('Ссылка, по которой можно будет перейти, нажав на кнопку:', data.url, '\n') +
      row('Надпись на миниатюре:', data.thumbnail_text, '\n') +
      row('Надпись на кнопке:', data.button_text, '\n') +
      row('На какой картинке ставится кнопка со ссылкой:', data.button_image_ref, '\n') +
      row('Прикрепите изображения сторис. Если на сторис предполагается кнопка, фон должен быть контрастный оранжевому, так как кнопка оранжевого цвета:', data.storis_file, '\n') +
      row('Прикрепите миниатюру-баннер:', data.miniature_file, '\n') +
      row('Желаемая дата реализации:', data.deadline, '\n');

    return { messageYG: headYG(bodyYG), messageTG: headTG(bodyTG) };
  }

  /* 10) ТЗ на опросы */
  if (type === 'ТЗ на опросы') {
    const bodyYG =
      row('<strong>Назовите задачу так, чтобы сразу была понятна суть:</strong><br>', data.title, '<br><br>') +
      row('<strong>Что необходимо сделать?:</strong><br>', data.description, '<br><br>') +
      row('<strong>Цель опроса:</strong><br>', data.goal, '<br><br>') +
      row('<strong>Целевая аудитория. Чьи ответы вы хотите видеть в результатах?:</strong><br>', data.target_audience, '<br><br>') +
      row('<strong>Есть ли база клиентов (ID контрагента)?:</strong><br>', data.has_client_base, '<br><br>') +
      row('<strong>Регионы показа:</strong><br>', data.regions, '<br><br>') +
      row('<strong>Схема опроса:</strong><br>', 
          data.schema_file ? `<a target="_blank" rel="noopener noreferrer" href=${data.schema_file}>${data.schema_file}</a>` : '', '<br><br>') +
      row('<strong>Желаемая дата реализации:</strong><br>', data.deadline, '<br><br>');

    const bodyTG =
      row('Назовите задачу так, чтобы сразу была понятна суть:', data.title, '\n') +
      row('Что необходимо сделать?:', data.description, '\n') +
      row('Цель опроса:', data.goal, '\n') +
      row('Целевая аудитория. Чьи ответы вы хотите видеть в результатах?:', data.target_audience, '\n') +
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