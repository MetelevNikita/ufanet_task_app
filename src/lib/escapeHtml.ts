// Telegram parse_mode: 'HTML' падает на сырых < > & из пользовательского текста
export const escapeHtml = (value: unknown) =>
  String(value ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
