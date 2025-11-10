export const typeSelectorArr = [
  { id: 1, label: 'Выберите тип заявки', value: 'select', field: [] },

  // 1) Первичное обращение по услуге
  {
    id: 2,
    label: 'Первичное обращение по услуге',
    value: 'im_brief_service',
    field: [
      { id: 1, title: 'Название продукта / услуги', placeholder: 'Например: «Умный шлагбаум»', typeField: 'text', type: 'text', name: 'title' },
      { id: 2, title: 'OKR/KPI и цели', placeholder: 'Опишите цели или дайте ссылку', typeField: 'area', type: 'area', name: 'goals' },
      { id: 3, title: 'Клиентский путь и обработка заявок', placeholder: 'Кто/как обрабатывает; воронка', typeField: 'area', type: 'area', name: 'funnel' },
      { id: 4, title: 'Краткое описание продукта', placeholder: '2–3 предложения, польза клиенту', typeField: 'area', type: 'area', name: 'description' },
      { id: 5, title: 'Целевая аудитория', placeholder: 'Кто и какая потребность', typeField: 'area', type: 'area', name: 'audience' },
      { id: 6, title: 'География продаж', placeholder: 'Города/регионы и почему', typeField: 'area', type: 'area', name: 'geo' },
      { id: 7, title: 'Преимущества и УТП', placeholder: 'Не менее 3 пунктов / формулировки УТП', typeField: 'area', type: 'area', name: 'usp' },
      { id: 8, title: 'Источники лидов сейчас', placeholder: 'Сколько заявок, конверсия', typeField: 'area', type: 'area', name: 'current_sources' },
      { id: 9, title: 'Ключевые запросы', placeholder: '5–10 поисковых фраз', typeField: 'area', type: 'area', name: 'keywords' },
      { id: 10, title: 'Конкуренты и ссылки', placeholder: '2–5 конкурентов и что у них хорошо/плохо', typeField: 'area', type: 'area', name: 'competitors' },
      { id: 11, title: 'Нужен ли сайт/лендинг', placeholder: 'Есть/нет/нужны правки (что именно)', typeField: 'area', type: 'area', name: 'site_need' },
      { id: 12, title: 'Срок реализации', placeholder: 'Желаемая дата', typeField: 'date', type: 'date', name: 'deadline' }
    ]
  },

  // 2) ТЗ на создание сайта/страницы
  {
    id: 3,
    label: 'ТЗ на создание сайта/страницы',
    value: 'im_site_create',
    field: [
      { id: 1, title: 'Название продукта / услуги', placeholder: 'Например: «Умный шлагбаум»', typeField: 'text', type: 'text', name: 'title' },
      { id: 2, title: 'Что необходимо сделать?', placeholder: 'Опишите задачу своими словами (так будет называться задача)', typeField: 'area', type: 'area', name: 'description' },
      { id: 3, title: 'Ранее эту услугу уже продвигали?', placeholder: 'Выберите вариант', typeField: 'selector', type: 'selector', name: 'first_visit_selector', options: [
          { id: 1, label: 'Да', value: 'yes', icon: '' },
          { id: 2, label: 'Нет', value: 'no', icon: '' }
        ]
      },
      { id: 4, title: 'Рабочая группа и поддержка', placeholder: 'Кто делает и кто поддерживает', typeField: 'area', type: 'area', name: 'team' },
      { id: 5, title: 'Задачи страницы', placeholder: 'Что должна решать', typeField: 'area', type: 'area', name: 'tasks' },
      { id: 6, title: 'Целевое действие', placeholder: 'Что должно случиться после чтения', typeField: 'text', type: 'text', name: 'cta' },
      { id: 7, title: 'Структура/контент', placeholder: 'Блоки, тексты, материалы', typeField: 'area', type: 'area', name: 'content' },
      { id: 8, title: 'Референсы', placeholder: 'Ссылки на примеры', typeField: 'area', type: 'area', name: 'refs' },
      { id: 9, title: 'Преимущества и выгоды продукта', placeholder: 'В сравнении с конкурентами/альтернативами', typeField: 'area', type: 'area', name: 'advantages' },
      { id: 10, title: 'Как работает продукт', placeholder: 'Нужно ли объяснять работу продукта? Опишите', typeField: 'area', type: 'area', name: 'work' },
      { id: 11, title: 'Варианты приобретения', placeholder: 'Тарифы, оборудование, скидки, акции, опции', typeField: 'area', type: 'area', name: 'price' },
      { id: 12, title: 'Детали исполнения', placeholder: 'Различия моб./десктоп версии и пр.', typeField: 'area', type: 'area', name: 'details' },
      { id: 13, title: 'Пожелания', placeholder: 'Пожелания по дизайну/странице', typeField: 'text', type: 'text', name: 'wishes' },
      { id: 14, title: 'Администрирование', placeholder: 'Кто обрабатывает заявки с сайта?', typeField: 'text', type: 'text', name: 'processing' },
      { id: 15, title: 'Срок запуска', placeholder: 'Желаемая дата', typeField: 'date', type: 'date', name: 'deadline' }
    ]
  },

  // 3) ТЗ на внесение изменений на сайты
  {
    id: 4,
    label: 'ТЗ на внесение изменений на сайты',
    value: 'im_site_change',
    field: [
      { id: 1, title: 'Название продукта / услуги', placeholder: 'Например: «Умный шлагбаум»', typeField: 'text', type: 'text', name: 'title' },
      { id: 2, title: 'Что необходимо сделать?', placeholder: 'Опишите задачу своими словами (так будет называться задача)', typeField: 'area', type: 'area', name: 'description' },
      {
        id: 3,
        title: 'Укажите тип изменения',
        placeholder: 'Можно выбрать несколько вариантов',
        typeField: 'selector_multi',
        type: 'selector',
        name: 'type_change',
        options: [
          { id: 1, label: 'Изменение тарифов / цен', value: 'price_change', icon: '' },
          { id: 2, label: 'Публикация новости / статьи', value: 'news_publication', icon: '' },
          { id: 3, label: 'Обновление или замена документов', value: 'docs_update', icon: '' },
          { id: 4, label: 'Добавление нового пункта обслуживания', value: 'new_office', icon: '' },
          { id: 5, label: 'Создание страницы для новой услуги', value: 'new_service_page', icon: '' },
          { id: 6, label: 'Изменение условий предоставления услуги (включая акции)', value: 'terms_update', icon: '' },
          { id: 7, label: 'Публикация баннера на главной странице', value: 'main_banner', icon: '' },
          { id: 8, label: 'Изменение графика работы офисов', value: 'schedule_change', icon: '' },
          { id: 9, label: 'Добавление нового функционала на сайте', value: 'new_function', icon: '' },
          { id: 10, label: 'Исправление ошибки / неточности на странице', value: 'bug_fix', icon: '' },
          { id: 11, label: 'Улучшение SEO (заголовки, мета-теги, тексты и т.д.)', value: 'seo_improve', icon: '' },
          { id: 12, label: 'Обновление изображений или медиаматериалов', value: 'media_update', icon: '' },
          { id: 13, label: 'Другое (уточните)', value: 'other', icon: '' }
        ]
      },
      { id: 4, title: 'Прикрепите скриншот страницы', placeholder: 'Загрузите файл', typeField: 'file', type: 'file', name: 'screenshot_file' },
      { id: 5, title: 'Ссылка на страницу, где нужно внести изменения', placeholder: 'Полный URL', typeField: 'text', type: 'text', name: 'url' },
      { id: 6, title: 'Готовый текст / изображение / документ для размещения', placeholder: 'Прикрепите файл или вставьте текст ниже', typeField: 'file', type: 'file', name: 'content_file' },
      {
        id: 7,
        title: 'Нужно ли согласование перед публикацией?',
        placeholder: 'Выберите вариант',
        typeField: 'selector',
        type: 'selector',
        name: 'approval',
        options: [
          { id: 1, label: 'Да, требуется согласование (укажите, с кем)', value: 'need_approval', icon: '' },
          { id: 2, label: 'Нет, можно публиковать сразу', value: 'no_approval', icon: '' }
        ]
      },
      { id: 8, title: 'Комментарий/пожелания к оформлению', placeholder: 'Опционально', typeField: 'area', type: 'area', name: 'comment' },
      { id: 9, title: 'Желаемая дата реализации', placeholder: 'Дата выполнения', typeField: 'date', type: 'date', name: 'deadline' }
    ]
  },

  // 4) ТЗ на запуск рекламы
  {
    id: 5,
    label: 'ТЗ запуск рекламы',
    value: 'ad_launch',
    field: [
      { id: 1, title: 'Название продукта / услуги', placeholder: 'Например: «Умный шлагбаум»', typeField: 'text', type: 'text', name: 'title' },
      { id: 2, title: 'Что необходимо сделать?', placeholder: 'Опишите задачу своими словами', typeField: 'area', type: 'area', name: 'description' },
      {
        id: 3,
        title: 'На какой площадке запустить рекламу?',
        placeholder: 'Можно выбрать несколько вариантов',
        typeField: 'selector_multi',
        type: 'selector',
        name: 'platforms',
        options: [
          { id: 1, label: 'Яндекс.Директ', value: 'yandex_direct', icon: '' },
          { id: 2, label: 'VK Реклама', value: 'vk_ads', icon: '' },
          { id: 3, label: 'МаркетПлатформа', value: 'market_platform', icon: '' },
          { id: 4, label: 'Telegram Ads', value: 'telegram_ads', icon: '' },
          { id: 5, label: 'Авито', value: 'avito', icon: '' },
          { id: 6, label: 'MyTarget / Одноклассники', value: 'mytarget_ok', icon: '' },
          { id: 7, label: 'YouTube', value: 'youtube', icon: '' },
          { id: 8, label: 'Google Ads', value: 'google_ads', icon: '' },
          { id: 9, label: 'Instagram* / Facebook* (Meta*)', value: 'meta_ads', icon: '' },
          { id: 10, label: 'Реклама в партнерских базах (email / sms / push)', value: 'partner_bases', icon: '' },
          { id: 11, label: 'Другое (уточните)', value: 'other', icon: '' }
        ]
      },
      {
        id: 4,
        title: 'Цель рекламы',
        placeholder: 'Выберите одно или несколько направлений',
        typeField: 'selector_multi',
        type: 'selector',
        name: 'ad_goals',
        options: [
          { id: 1, label: 'Увеличить количество заявок / продаж', value: 'increase_sales', icon: '' },
          { id: 2, label: 'Повысить узнаваемость продукта / бренда', value: 'brand_awareness', icon: '' },
          { id: 3, label: 'Привлечение трафика на мероприятие', value: 'event_traffic', icon: '' },
          { id: 4, label: 'Тестирование новой услуги / гипотезы', value: 'hypothesis_test', icon: '' },
          { id: 5, label: 'Набор аудитории в сообщество / канал', value: 'community_growth', icon: '' },
          { id: 6, label: 'Другое (уточните)', value: 'other', icon: '' }
        ]
      },
      { id: 5, title: 'Ссылка, куда будет идти реклама', placeholder: 'Сайт/лендинг/группа ВК (необязательно)', typeField: 'text', type: 'text', name: 'landing_url' },
      { id: 6, title: 'География размещения', placeholder: 'Город, район или регион кампании', typeField: 'text', type: 'text', name: 'geo' },
      { id: 7, title: 'Кто ваш клиент?', placeholder: 'Возраст, статус, интересы, поведение и т.д.', typeField: 'area', type: 'area', name: 'target_audience' },
      { id: 8, title: 'Боль / потребность клиента', placeholder: 'Комфорт, безопасность, контроль и пр.', typeField: 'area', type: 'area', name: 'pain_point' },
      { id: 9, title: 'УТП (уникальное предложение)', placeholder: 'Напр.: «Монтаж за 0 ₽», «5 дней теста бесплатно»', typeField: 'area', type: 'area', name: 'unique_offer' },
      { id: 10, title: 'Акции, скидки, подарки', placeholder: 'Напр.: «Скидка 15%…», «Бесплатное подключение»', typeField: 'area', type: 'area', name: 'discounts' },
      {
        id: 11,
        title: 'Клиентский путь и обработка заявок',
        placeholder: 'Кто фиксирует воронку и обрабатывает заявки',
        typeField: 'selector',
        type: 'selector',
        name: 'sales_path',
        options: [
          { id: 1, label: 'Отдел технического маркетинга (ОТМ)', value: 'otm', icon: '' },
          { id: 2, label: 'СПК', value: 'spk', icon: '' },
          { id: 3, label: 'Менеджер отдела продаж', value: 'sales_manager', icon: '' },
          { id: 4, label: 'Другое (уточните)', value: 'other', icon: '' }
        ]
      },
      { id: 12, title: 'Ключевые слова / запросы', placeholder: 'Напр.: «Обслуживание АТС», «Wi-Fi для кафе»', typeField: 'area', type: 'area', name: 'keywords' },
      { id: 13, title: 'Материалы для рекламы', placeholder: 'Баннеры, фото, тексты, видео (если есть)', typeField: 'file', type: 'file', name: 'banner_file' },
      { id: 14, title: 'База для рассылки (если нужна)', placeholder: 'Телефоны, email, ID пользователей', typeField: 'file', type: 'file', name: 'base_file' },
      { id: 15, title: 'Примеры конкурентов / объявлений', placeholder: 'Ссылки или скриншоты', typeField: 'file', type: 'file', name: 'concurents_file' },
      { id: 16, title: 'Бюджет на рекламу в месяц', placeholder: 'Например: 15 000 ₽', typeField: 'text', type: 'text', name: 'budget' },
      { id: 17, title: 'KPI (ожидаемые результаты)', placeholder: 'Напр.: 100 лидов, 5000 показов, CTR 2%…', typeField: 'text', type: 'text', name: 'kpi' },
      { id: 18, title: 'Период проведения кампании', placeholder: 'Например: с 1 по 30 ноября', typeField: 'text', type: 'text', name: 'campaign_period' },
      { id: 19, title: 'Срок запуска', placeholder: 'Желаемая дата', typeField: 'date', type: 'date', name: 'deadline' }
    ]
  },

  // 5) ТЗ на SMM
  {
    id: 6,
    label: 'ТЗ на SMM (посты, статьи, видео и т.д.)',
    value: 'smm_task',
    field: [
      { id: 1, title: 'Название продукта / услуги', placeholder: 'Например: «Умный шлагбаум»', typeField: 'text', type: 'text', name: 'title' },
      { id: 2, title: 'Что необходимо сделать?', placeholder: 'Опишите задачу своими словами', typeField: 'area', type: 'area', name: 'description' },
      {
        id: 3,
        title: 'Цель размещения',
        placeholder: 'Выберите вариант',
        typeField: 'selector',
        type: 'selector',
        name: 'placement_goal',
        options: [
          { id: 1, label: 'Продажа услуги / товара', value: 'sale', icon: '' },
          { id: 2, label: 'Продвижение (пиар)', value: 'pr', icon: '' }
        ]
      },
      { id: 4, title: 'Аудитория', placeholder: 'ФЛ / ЮЛ', typeField: 'text', type: 'text', name: 'audience' },
      { id: 5, title: 'Периодичность размещения', placeholder: 'Ежедневно, раз в неделю и т.д.', typeField: 'text', type: 'text', name: 'frequency' },
      { id: 6, title: 'Материалы (если есть)', placeholder: 'Тексты, изображения, презентации, ссылки', typeField: 'file', type: 'file', name: 'material_file' },
      { id: 7, title: 'Планируемая дата публикации', placeholder: 'Согласуется лично', typeField: 'date', type: 'date', name: 'publish_date' },
      { id: 8, title: 'Срок реализации', placeholder: 'Желаемая дата', typeField: 'date', type: 'date', name: 'deadline' }
    ]
  },

  // 6) ТЗ на написание статей
  {
    id: 7,
    label: 'ТЗ на написание статей (для СМИ и сайта ufanet.ru)',
    value: 'article_writing',
    field: [
      { id: 1, title: 'Название продукта / услуги', placeholder: 'Например: «Умный шлагбаум»', typeField: 'text', type: 'text', name: 'title' },
      { id: 2, title: 'Что необходимо сделать?', placeholder: 'Опишите задачу своими словами', typeField: 'area', type: 'area', name: 'description' },
      { id: 3, title: 'Где будет размещаться статья?', placeholder: 'Издание/газета/журнал/сайт (название или ссылка)', typeField: 'text', type: 'text', name: 'placement' },
      { id: 4, title: 'Регион / город размещения', placeholder: 'Один или несколько регионов/городов', typeField: 'text', type: 'text', name: 'region' },
      { id: 5, title: 'Цель публикации', placeholder: 'Узнаваемость, имидж, лиды и т.д.', typeField: 'area', type: 'area', name: 'goal' },
      { id: 6, title: 'Целевая аудитория', placeholder: 'Возраст, профессии, интересы, мотивация', typeField: 'area', type: 'area', name: 'target_audience' },
      { id: 7, title: 'Объём', placeholder: 'Количество символов с/без пробелов (или «—»)', typeField: 'text', type: 'text', name: 'volume' },
      { id: 8, title: 'Примерная структура текста', placeholder: 'Идеи и пункты, которые должны быть', typeField: 'area', type: 'area', name: 'structure' },
      { id: 9, title: 'Ссылки и материалы', placeholder: 'Docs/пресс-релизы/посты и т.п.', typeField: 'file', type: 'file', name: 'link_file' },
      { id: 10, title: 'Референсы', placeholder: 'Ссылки на удачные публикации/оформление', typeField: 'file', type: 'file', name: 'reference_file' },
      { id: 11, title: 'Желаемая дата реализации', placeholder: 'Дата выполнения', typeField: 'date', type: 'date', name: 'deadline' }
    ]
  },

  // 7) ТЗ на редактуру
  {
    id: 8,
    label: 'ТЗ на редактуру (тексты статей, каталогов и т.п.)',
    value: 'text_editing',
    field: [
      { id: 1, title: 'Название продукта / услуги', placeholder: 'Например: «Умный шлагбаум»', typeField: 'text', type: 'text', name: 'title' },
      { id: 2, title: 'Что необходимо сделать?', placeholder: 'Кратко о задаче (суть работы)', typeField: 'area', type: 'area', name: 'description' },
      {
        id: 3,
        title: 'Вид работы',
        placeholder: 'Выберите или добавьте свой вариант',
        typeField: 'selector',
        type: 'selector',
        name: 'work_type',
        options: [
          { id: 1, label: 'Проверка статьи', value: 'article_review', icon: '' },
          { id: 2, label: 'Вычитка текста каталога / буклета', value: 'booklet_proofread', icon: '' },
          { id: 3, label: 'Другое (уточните)', value: 'other', icon: '' }
        ]
      },
      { id: 4, title: 'Другое', placeholder: 'Если вашего вида работ нет в списке', typeField: 'text', type: 'text', name: 'other' },
      { id: 5, title: 'Где будет опубликован материал?', placeholder: 'Издание / сайт / соцсеть / буклет (название или ссылка)', typeField: 'text', type: 'text', name: 'placement' },
      { id: 6, title: 'Регион / город размещения', placeholder: 'Регион или город публикации', typeField: 'text', type: 'text', name: 'region' },
      { id: 7, title: 'Цель размещения', placeholder: 'Доверие, рассказ о продукте, SEO, читаемость и т.д.', typeField: 'area', type: 'area', name: 'goal' },
      { id: 8, title: 'Целевая аудитория', placeholder: 'Возраст, интересы, профессия, стиль общения', typeField: 'area', type: 'area', name: 'target_audience' },
      { id: 9, title: 'Пожелания', placeholder: 'Сохранить объём/стиль, SEO, проверка фактов, согласование', typeField: 'area', type: 'area', name: 'preferences' },
      { id: 10, title: 'Желаемая дата реализации', placeholder: 'Дата выполнения', typeField: 'date', type: 'date', name: 'deadline' }
    ]
  },

  // 8) ТЗ на пуши в приложении
  {
    id: 9,
    label: 'ТЗ на пуши в приложении Уфанет',
    value: 'push_ufanet',
    field: [
      { id: 1, title: 'Название продукта / услуги', placeholder: 'Например: «Умный шлагбаум»', typeField: 'text', type: 'text', name: 'title' },
      { id: 2, title: 'Что необходимо сделать?', placeholder: 'Кратко о задаче', typeField: 'area', type: 'area', name: 'description' },
      { id: 3, title: 'Цель рассылки', placeholder: 'Информирование, реклама, уведомление об акции и т.д.', typeField: 'area', type: 'area', name: 'goal' },
      { id: 4, title: 'Файл с выгрузкой абонентов', placeholder: 'Если нет — пропустите', typeField: 'file', type: 'file', name: 'abonents_file' },
      { id: 5, title: 'Кому рассылать пуши', placeholder: 'Населённый пункт, ФЛ/ЮЛ, тарифные опции, наличие услуг и др. параметры', typeField: 'area', type: 'area', name: 'recipients' },
      { id: 6, title: 'Срок отправки пушей', placeholder: 'Может варьироваться от нагрузки СПК/ОСК', typeField: 'text', type: 'text', name: 'send_deadline' },
      { id: 7, title: 'Как измерять результат?', placeholder: 'Переходы, отклики, открытия и т.д.', typeField: 'area', type: 'area', name: 'kpi' },
      { id: 8, title: 'Текст для рассылки (если есть)', placeholder: 'Прикрепите файл или вставьте текст', typeField: 'area', type: 'area', name: 'message_text' },
      { id: 9, title: 'Желаемая дата реализации', placeholder: 'Дата выполнения', typeField: 'date', type: 'date', name: 'deadline' }
    ]
  },

  // 9) Сторис в приложении Уфанет
  {
    id: 10,
    label: 'ТЗ на размещение сторис в приложении Уфанет',
    value: 'stories_ufanet',
    field: [
      { id: 1, title: 'Название продукта / услуги', placeholder: 'Например: «Умный шлагбаум»', typeField: 'text', type: 'text', name: 'title' },
      { id: 2, title: 'Что необходимо сделать?', placeholder: 'Кратко о задаче', typeField: 'area', type: 'area', name: 'description' },
      { id: 3, title: 'Кто отвечает за визуал', placeholder: 'ФИО, филиал, отдел', typeField: 'text', type: 'text', name: 'responsible_person' },
      { id: 4, title: 'Цель размещения сторис', placeholder: 'Информирование, акция, реклама и т.д.', typeField: 'area', type: 'area', name: 'goal' },
      { id: 5, title: 'Период размещения', placeholder: 'С какого по какое число', typeField: 'text', type: 'text', name: 'period' },
      { id: 6, title: 'Города и посёлки показа', placeholder: 'Перечислите населённые пункты', typeField: 'area', type: 'area', name: 'geo' },
      { id: 7, title: 'Ссылка для кнопки', placeholder: 'Если не нужна — пропустите', typeField: 'text', type: 'text', name: 'url' },
      { id: 8, title: 'Надпись на миниатюре', placeholder: 'До 12 символов в строку и до 35 всего', typeField: 'text', type: 'text', name: 'thumbnail_text' },
      { id: 9, title: 'Надпись на кнопке', placeholder: '1–2 слова, до 20 символов', typeField: 'text', type: 'text', name: 'button_text' },
      { id: 10, title: 'На какой картинке ставится кнопка', placeholder: 'Номер картинки, если нужна ссылка', typeField: 'text', type: 'text', name: 'button_image_ref' },
      { id: 11, title: 'Миниатюра-баннер', placeholder: '256×256 px, ≤1 МБ', typeField: 'file', type: 'file', name: 'miniature_file' },
      { id: 12, title: 'Изображения сторис', placeholder: '1080×1920 px, ≤2 МБ; фон контрастный оранжевому, если есть кнопка', typeField: 'file', type: 'file', name: 'storis_file' },
      { id: 13, title: 'Желаемая дата реализации', placeholder: 'Дата выполнения', typeField: 'date', type: 'date', name: 'deadline' }
    ]
  },

  // 10) ТЗ на опросы
  {
    id: 11,
    label: 'ТЗ на опросы',
    value: 'surveys',
    field: [
      { id: 1, title: 'Название продукта / услуги', placeholder: 'Например: «Умный шлагбаум»', typeField: 'text', type: 'text', name: 'title' },
      { id: 2, title: 'Что необходимо сделать?', placeholder: 'Кратко о задаче', typeField: 'area', type: 'area', name: 'description' },
      { id: 3, title: 'Цель опроса', placeholder: 'Исследование, обратная связь, потребности, NPS и т.д.', typeField: 'area', type: 'area', name: 'goal' },
      { id: 4, title: 'Целевая аудитория (чьи ответы нужны)', placeholder: 'Возраст, пол, город, интересы, профессии и т.п.', typeField: 'area', type: 'area', name: 'target_audience' },
      {
        id: 5,
        title: 'Есть ли база клиентов (ID контрагента)?',
        placeholder: 'Выберите вариант',
        typeField: 'selector',
        type: 'selector',
        name: 'has_client_base',
        options: [
          { id: 1, label: 'Да', value: 'yes', icon: '' },
          { id: 2, label: 'Нет', value: 'no', icon: '' }
        ]
      },
      { id: 6, title: 'Регионы показа', placeholder: 'Города, районы, страны', typeField: 'area', type: 'area', name: 'regions' },
      { id: 7, title: 'Схема опроса', placeholder: 'Прикрепите файл или перечислите вопросы', typeField: 'file', type: 'file', name: 'schema_file' },
      { id: 8, title: 'Желаемая дата реализации', placeholder: 'Дата выполнения', typeField: 'date', type: 'date', name: 'deadline' }
    ]
  }
]
