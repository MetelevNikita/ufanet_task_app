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
    v ? `${label}: ${v}${br}${br}` : '';

  // Удобный нормализатор типа
  const type = (data.type || '').trim();

  /* 1) Первичное обращение по услуге */
  if (type === 'Первичное обращение по услуге') {
    const bodyYG =
      row('Название продукта / услуги', data.title) +
      row('Опишите задачу своими словами. Что необходимо сделать?', data.description) +
      row('Есть ли цели на год/квартал/месяц по данной услуге или продукту? Описаны ли OKR или KR?', data.goals) +
      row('Опишите клиентский путь после оставления заявки', data.funnel) +
      row('Краткое описание продукта (2–3 предложения)', data.description) +
      row('Целевая аудитория', data.audience) +
      row('География продаж', data.geo) +
      row('Конкурентные преимущества', data.usp) +
      row('Откуда на данный момент приходят клиенты (источники)?', data.current_sources) +
      row('Сколько заявок вы готовы обрабатывать в день, без потери качества?', data.number_of_applications) +
      row('Ключевые запросы / поисковые фразы, по которым можно найти ваш продукт или услугу', data.keywords) +
      row('Кто является прямыми конкурентами?', data.competitors) +
      row('Ссылка на таблицу окупаемости продукта с учётом расходов на рекламу, составляемую совместно с финансовым аналитиком', data.link_table) +
      row('Что у конкурентов хорошо? Что хотелось бы сделать лучше?', data.best_among_competitors) +
      row('Где и как продвигаются конкуренты?', data.promotion_of_competitors) +
      row('Нужен ли сайт/лендинг', data.site_need || (data.first_visit_selector && data.first_visit_selector.label)) +
      row('Если сайт требует изменений, распишите подробнее, что нужно поменять', data.site_changes) +
      row('Какие есть спецпредложения, акции, которые могут использоваться для продвижения?', data.best_price) +
      row('Есть ли уже существующие материалы, которые можно использовать для продвижения? Если да — укажите путь', data.web_promotion) +
      row('Если вы знаете каналы, которые смотрит/читает ваша целевая аудитория, основные виды рекламы, на которые она обращает внимание, — расскажите про них', data.audience_channels) +
      row('Есть ли какие-то существующие базы (база наших клиентов, холодная база и др.) для запуска рекламы по ним?', data.existing_databases) +
      row('Дополнительная информация', data.additional_information) +
      row('Срок реализации', data.deadline);

    const bodyTG = bodyYG.replace(/<br><br>/g, '\n\n');

    return { messageYG: headYG(bodyYG), messageTG: headTG(bodyTG) };
  }

  /* 2) ТЗ на создание сайта/страницы */
  if (type === 'ТЗ на создание сайта/страницы') {
    const bodyYG =
      row('Название продукта / услуги', data.title) +
      row('Опишите задачу своими словами . Что необходимо сделать?', data.description) +
      row('Ранее эту услугу уже продвигали?', data.first_visit_selector && data.first_visit_selector.label) +
      row('Кто входит в рабочую группу по созданию? Кто будет поддерживать актуальность сайта / лендинга / страницы?', data.team) +
      row('Какие задачи должен выполнять сайт / лендинг / страница?', data.tasks) +
      row('Какое целевое действие должно быть совершено после прочтения страницы?', data.cta) +
      row('Кто является целевой аудиторией продукта / услуги / предложения? На какие группы она подразделяется? Какова география проживания целевой аудитории?', data.cta_audience) +
      row('Какими способами целевая аудитория будет попадать на сайт / лендинг / страницу?', data.cta_audience_insert) +
      row('Перечислите конкурентов продукта / услуги / предложения, в том числе компании из других регионов или стран с аналогичным продуктом. Укажите ссылки на их сайты', data.competitors) +
      row('Есть ли макеты, которые можно взять за основу дизайна', data.content) +
      row('Есть ли референсы (сайты / лендинги / страницы), на которые стоит ориентироваться по дизайну или содержанию?', data.refs) +
      row('В чём заключаются преимущества и выгоды продукта? (по сравнению с конкурентом, альтернативным решением или отсутствием продукта)', data.advantages) +
      row('Нужно ли объяснять, как работает продукт? Если да, опишите это подробно', data.work) +
      row('Какие есть варианты приобретения продукта (разные тарифы, оборудование, скидки, акции, опции и т.п.)?', data.price) +
      row('Какая дополнительная информация должна присутствовать на сайте / лендинге / странице (отзывы, карты, схемы, ссылки, контакты, описания и т.д.)?', data.details) +
      row('Должны ли мобильная и десктопная версии совпадать по содержанию? Есть ли контент или функционал, который будет доступен только в одной из версий?', data.site_content) +
      row('Пожелания по дизайну сайта / лендинга / страницы', data.wishes) +
      row('Кто будет обрабатывать заявки, приходящие с данного сайта?', data.processing) +
      row('Срок запуска', data.deadline);

    const bodyTG = bodyYG.replace(/<br><br>/g, '\n\n');

    return { messageYG: headYG(bodyYG), messageTG: headTG(bodyTG) };
  }

  /* 3) ТЗ на внесение изменений на сайты */
  if (type === 'ТЗ на внесение изменений на сайты') {
    const bodyYG =
      row('Опишите задачу своими словами', data.title) +
      row('Укажите тип изменения (Можно выбрать несколько вариантов)', 
          data.type_change && data.type_change.map ? data.type_change.map((t: any) => t.label).join(', ') : data.type_change) +
      row('Прикрепите скриншот страницы, где необходимо внести изменения (необязательно, но желательно)', data.screenshot_file) +
      row('Ссылка на страницу, где нужно внести изменения: (укажите полный URL)', data.url) +
      row('Есть ли у вас готовый текст / изображение / документ для размещения? (если да, приложите файл)', data.content_file) +
      row('Нужно ли согласование перед публикацией?', data.approval && data.approval.label) +
      row('Комментарии или пожелания к оформлению / формулировке текста / размещению. (опционально)', data.comment) +
      row('Желаемая дата реализации', data.deadline);

    const bodyTG = bodyYG.replace(/<br><br>/g, '\n\n');

    return { messageYG: headYG(bodyYG), messageTG: headTG(bodyTG) };
  }

  /* 4) ТЗ на запуск рекламы */
  if (type === 'ТЗ запуск рекламы') {
    const bodyYG =
      row('Опишите задачу своими словами', data.title) +
      row('На какой площадке вы хотите запустить рекламу?(Можно выбрать несколько вариантов)', 
          data.platforms && data.platforms.map ? data.platforms.map((p: any) => p.label).join(', ') : data.platforms) +
      row('Цель рекламы (выберите одно или несколько)', 
          data.ad_goals && data.ad_goals.map ? data.ad_goals.map((g: any) => g.label).join(', ') : data.ad_goals) +
      row('Ссылка на сайт / лендинг / группу ВК , куда будет идти реклама (Необязательно)', data.landing_url) +
      row('География размещения рекламы', data.geo) +
      row('Кто ваш клиент? Опишите целевую аудиторию максимально подробно: Возраст, пол, Социальный статус (работает, учится, пенсионер и т.д.) Род деятельности. Доход, интересы, поведение. Где чаще бывает онлайн', data.target_audience) +
      row('Какую боль / потребность закрывает ваш продукт?', data.pain_point) +
      row('УТП (уникальное предложение)', data.unique_offer) +
      row('Есть ли акции, скидки или подарки?', data.discounts) +
      row('Опишите клиентский путь. Как будет фиксироваться воронка продаж? Кто обрабатывает заявки?', 
          data.sales_path && data.sales_path.label ? data.sales_path.label : data.sales_path) +
      row('Какие ключевые слова / запросы хотите использовать в продвижении?', data.keywords) +
      row('Ссылки на материалы, если есть (без них запуск рекламы будет позже)', data.banner_file) +
      row('Если необходима реклама по базе, загрузите базу данных', data.base_file) +
      row('Примеры конкурентов или рекламных объявлений', data.concurents_file) +
      row('Бюджет на рекламу в месяц', data.budget) +
      row('Есть ли KPI (ожидаемые результаты)?', data.kpi) +
      row('Период проведения кампании', data.campaign_period) +
      row('Срок запуска', data.deadline);

    const bodyTG = bodyYG.replace(/<br><br>/g, '\n\n');

    return { messageYG: headYG(bodyYG), messageTG: headTG(bodyTG) };
  }

  /* 5) ТЗ на SMM */
  if (type === 'ТЗ на SMM (посты, статьи, видео и т.д.)') {
    const bodyYG =
      row('Опишите задачу своими словами', data.title) +
      row('Что необходимо сделать?', data.description) +
      row('Цель размещения', data.placement_goal && data.placement_goal.label) +
      row('Аудитория', data.audience) +
      row('Периодичность размещения', data.frequency) +
      row('Прикрепи ссылку на материалы, если они есть Текст, изображения, презентации, ссылка на сайт', data.material_file) +
      row('Когда планируется размещение? Окончательная дата публикации согласуется лично', data.publish_date) +
      row('Срок реализации', data.deadline);

    const bodyTG = bodyYG.replace(/<br><br>/g, '\n\n');

    return { messageYG: headYG(bodyYG), messageTG: headTG(bodyTG) };
  }

  /* 6) ТЗ на написание статей */
  if (type === 'ТЗ на написание статей (для СМИ и сайта ufanet.ru)') {
    const bodyYG =
      row('Опишите задачу своими словами', data.title) +
      row('Что необходимо сделать?', data.description) +
      row('Где будет размещаться статья?', data.placement) +
      row('Регион / город размещения', data.region) +
      row('Цель публикации', data.goal) +
      row('Целевая аудитория', data.target_audience) +
      row('Объём', data.volume) +
      row('Примерная структура текста', data.structure) +
      row('Ссылки и материалы', data.link_file) +
      row('Референсы', data.reference_file) +
      row('Желаемая дата реализации', data.deadline);

    const bodyTG = bodyYG.replace(/<br><br>/g, '\n\n');

    return { messageYG: headYG(bodyYG), messageTG: headTG(bodyTG) };
  }

  /* 7) ТЗ на редактуру */
  if (type === 'ТЗ на редактуру (тексты статей, каталогов и т.п.)') {
    const bodyYG =
      row('Опишите задачу своими словами', data.title) +
      row('Что необходимо сделать?', data.description) +
      row('Вид работы', data.work_type && data.work_type.label) +
      row('Другое', data.other) +
      row('Укажите, где именно будет опубликован материал', data.placement) +
      row('Регион / город размещения', data.region) +
      row('Цель размещения. Кто будет читать материал?', data.goal) +
      row('Целевая аудитория', data.target_audience) +
      row('Пожелания', data.preferences) +
      row('Желаемая дата реализации', data.deadline);

    const bodyTG = bodyYG.replace(/<br><br>/g, '\n\n');

    return { messageYG: headYG(bodyYG), messageTG: headTG(bodyTG) };
  }

  /* 8) ТЗ на пуши в приложении Уфанет */
  if (type === 'ТЗ на пуши в приложении Уфанет') {
    const bodyYG =
      row('Опишите задачу своими словами', data.title) +
      row('Что необходимо сделать?', data.description) +
      row('Цель рассылки', data.goal) +
      row('Прикрепите файл с выгрузкой абонентов Если у вас нет готового файла - пропустите этот вопрос', data.abonents_file) +
      row('Кому рассылать пуши. Если ранее вы прикрепили выгрузку - пропустите этот вопрос', data.recipients) +
      row('Срок отправки пушей', data.send_deadline) +
      row('Как будете измерять результат?', data.kpi) +
      row('Если есть примерный текст для рассылки, прикрепите его здесь', data.message_text) +
      row('Желаемая дата реализации', data.deadline);

    const bodyTG = bodyYG.replace(/<br><br>/g, '\n\n');

    return { messageYG: headYG(bodyYG), messageTG: headTG(bodyTG) };
  }

  /* 9) ТЗ на размещение сторис в приложении Уфанет */
  if (type === 'ТЗ на размещение сторис в приложении Уфанет') {
    const bodyYG =
      row('Опишите задачу своими словами', data.title) +
      row('Что необходимо сделать?', data.description) +
      row('Кто отвечает за создание визуала? (изображение для сторис и миниатюры)', data.responsible_person) +
      row('Цель размещения сторис', data.goal) +
      row('Период размещения', data.period) +
      row('На какие города и поселки показываем сторис?', data.geo) +
      row('Ссылка, по которой можно будет перейти, нажав на кнопку', data.url) +
      row('Надпись на миниатюре', data.thumbnail_text) +
      row('Надпись на кнопке', data.button_text) +
      row('На какой картинке ставится кнопка со ссылкой', data.button_image_ref) +
      row('Прикрепите миниатюру-баннер', data.miniature_file) +
      row('Прикрепите изображения сторис. Если на сторис предполагается кнопка, фон должен быть контрастный оранжевому, так как кнопка оранжевого цвета', data.storis_file) +
      row('Желаемая дата реализации', data.deadline);

    const bodyTG = bodyYG.replace(/<br><br>/g, '\n\n');

    return { messageYG: headYG(bodyYG), messageTG: headTG(bodyTG) };
  }

  /* 10) ТЗ на опросы */
  if (type === 'ТЗ на опросы') {
    const bodyYG =
      row('Опишите задачу своими словами', data.title) +
      row('Что необходимо сделать?', data.description) +
      row('Цель опроса', data.goal) +
      row('ЦА. Чьи ответы вы хотите видеть в результатах?', data.target_audience) +
      row('Есть ли база клиентов (ID контрагента)?', data.has_client_base && data.has_client_base.label) +
      row('Регионы показа', data.regions) +
      row('Схема опроса', data.schema_file) +
      row('Желаемая дата реализации', data.deadline);

    const bodyTG = bodyYG.replace(/<br><br>/g, '\n\n');

    return { messageYG: headYG(bodyYG), messageTG: headTG(bodyTG) };
  }

  // Fallback
  return {
    messageYG: headYG('Детали по типу не распознаны или не заполнены.'),
    messageTG: headTG('Детали по типу не распознаны или не заполнены.')
  };
};