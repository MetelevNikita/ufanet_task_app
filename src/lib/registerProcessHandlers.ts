import { logger } from "@/lib/logger";

const log = logger('process')

// Node.js-only. Подключать всегда через динамический import(),
// чтобы Next.js не пытался включить process.on(...) в Edge-бандл.


declare global {
  var _processHandlersRegistered: boolean | undefined;
}

export const registerProcessHandlers = () => {
  if (globalThis._processHandlersRegistered) return

  process.on('unhandledRejection', (reason) => {
    log.error('Необработанный reject промиса', reason)
  })

  process.on('uncaughtException', (err) => {
    log.error('Необработанное исключение', err)
    console.error(err.stack)
  })

  globalThis._processHandlersRegistered = true
}
