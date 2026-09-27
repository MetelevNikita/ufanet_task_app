# ufanet_task_app

Внутреннее приложение для приёма заявок (ТЗ) в отделы **PR**, **дизайн**, **маркетинг** и **реклама**.
Заявка создаётся через веб-форму. Потом она уходит задачей в **YouGile** и сообщением в Telegram-группу отдела. Статусы и комментарии синхронизируются через вебхуки YouGile и Telegram-бота.

Стек: Next.js 15 (App Router), React 19, React Bootstrap, Prisma + PostgreSQL, node-telegram-bot-api, JWT (jose / jsonwebtoken).

## Быстрый старт

```bash
npm install
npx prisma generate          # клиент генерируется в generated/prisma
npx prisma migrate deploy    # применить миграции к БД из DATABASE_URL
npm run dev                  # http://localhost:3000
```

Прод:

```bash
npm run build
pm2 start ecosystem.config.js   # next start -p 4000, cluster mode, instances: max
```

## Переменные окружения

Файлы `.env*` в git не попадают, их нужно создать вручную.

| Переменная | Назначение |
|---|---|
| `DATABASE_URL` | строка подключения к PostgreSQL |
| `JWT_SECRET` | секрет для подписи токена в cookie `token` |
| `WEBHOOK_URL` | публичный URL приложения: на него YouGile шлёт вебхуки (`/api/webhook/:key`), от него строятся ссылки сброса пароля |
| `API_URL` | базовый URL API задач, бот делает `PATCH ${API_URL}/:id` при смене статуса |
| `COMPANY_NAME` | название компании в YouGile, по нему при старте берётся API-ключ |
| `YG_LOGIN`, `YG_PASSWORD` | учётка YouGile для получения ключа |
| `TG_TOKEN` | токен Telegram-бота |
| `ADMIN_GROUP` | chat id админ-группы (управление пользователями через бота) |
| `TG_ID_BOSS` | Telegram id руководителя |
| `NEXT_PUBLIC_TG_GROUP_PR` / `_DES` / `_MARKETING` / `_ADS` | chat id групп отделов |
| `NEXT_PUBLIC_TG_SUB_GROUP_DES` | подгруппа дизайна |
| `PROXY_SOCKS5_HOST`, `_PORT` (1080), `_USERNAME`, `_PASSWORD` | необязательный SOCKS5-прокси для Telegram |

`YOGILE_KEY_INSTANCE` и `NEXT_PUBLIC_YOGILE_KEY` задавать не нужно: они выставляются в рантайме при старте.

## Что происходит при старте ([src/instrumentation.ts](src/instrumentation.ts))

1. Регистрируются обработчики процесса ([registerProcessHandlers](src/lib/registerProcessHandlers.ts)).
2. Запускается polling Telegram-бота ([telegramBot.ts](src/telegramBot/telegramBot.ts)).
3. По `COMPANY_NAME` запрашивается API-ключ YouGile.
4. Старые вебхуки YouGile удаляются, регистрируется новый на `WEBHOOK_URL`.

В PM2 cluster бот и вебхуки поднимаются **только на instance 0** (`NODE_APP_INSTANCE`), иначе будут дубли polling.

## Структура

```
prisma/schema.prisma     модели User и Task
src/app/(auth)/auth      логин, регистрация, сброс и новый пароль
src/app/(main)           главная, /app (форма заявки), /tasks
src/app/api              auth, task/[department], webhook/[id], comment, users, stickers, uploads
src/middleware.ts        проверка JWT, без токена редирект на /auth (/api/* открыт)
src/telegramBot          бот: сообщения по заявкам, кнопки статусов, админ-команды
src/functions            обёртки над YouGile API
src/lib                  создание задач (БД / YouGile / Telegram), логгер, утилиты
src/data                 поля форм и шаблоны сообщений по отделам
```

Загруженные к заявкам файлы сохраняются на диск в `src/app/uploads/<отдел>/Folder_<id>/` и отдаются через `/api/uploads/...`.
