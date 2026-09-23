// Единый формат логов: "23.09.2026, 14:05:12 ✅ [tg] Задача отправлена {"taskId":12}"
// Работает и на сервере, и в браузере — зависимостей нет.

type Meta = Record<string, unknown>

export const errorText = (error: unknown) =>
  error instanceof Error ? error.message : String(error)

const metaText = (meta?: Meta) => {
  if (!meta) return ''
  try {
    return ' ' + JSON.stringify(meta)
  } catch {
    return ' [meta не сериализуется]'
  }
}

const write = (out: (line: string) => void, icon: string, scope: string, message: string, meta?: Meta) =>
  out(`${new Date().toLocaleString('ru-RU')} ${icon} [${scope}] ${message}${metaText(meta)}`)

export const logger = (scope: string) => ({
  info: (message: string, meta?: Meta) => write(console.log, 'ℹ️ ', scope, message, meta),
  ok: (message: string, meta?: Meta) => write(console.log, '✅', scope, message, meta),
  warn: (message: string, meta?: Meta) => write(console.warn, '⚠️ ', scope, message, meta),
  // error принимает саму ошибку: в лог попадает её текст, а не [object Object]
  error: (message: string, error?: unknown, meta?: Meta) =>
    write(console.error, '❌', scope, error === undefined ? message : `${message}: ${errorText(error)}`, meta),
})
