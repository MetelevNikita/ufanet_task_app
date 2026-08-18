// Node.js-only. Подключать всегда через динамический import(),
// чтобы Next.js не пытался включить process.on(...) в Edge-бандл.


declare global {
  var _processHandlersRegistered: boolean | undefined;
}

export const registerProcessHandlers = () => {
  if (globalThis._processHandlersRegistered) return

  process.on('unhandledRejection', (reason) => {
    console.error('Unhandled Rejection:', reason)
  })

  process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err)
  })

  globalThis._processHandlersRegistered = true
}
