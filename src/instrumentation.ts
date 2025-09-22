export const register = async () => {

  console.log('Registering telegram bot instrumentation');
  console.log('NEXT_RUNTIME', process.env.NEXT_RUNTIME);

  if (process.env.NEXT_RUNTIME !== 'nodejs') return;

  const { getBot } = await import('@/telegramBot/telegramBot')

  try {
    await getBot(); // запускаем polling при старте сервера
    console.log('[bot] started on server boot');
  } catch (e) {
    console.error('[bot] init error:', e);
  }
};