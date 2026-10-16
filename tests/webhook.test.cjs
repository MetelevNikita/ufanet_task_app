// Run: node --test tests/webhook.test.cjs
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');

test('notify only when the Status sticker changes, regardless of sticker order', async () => {
  const messages = [];
  const updates = [];
  const stateRequests = [];
  const imports = {
    'next/server': { NextResponse: { json: (body) => body } },
    '@/../generated/prisma/client': { PrismaClient: class {
      task = {
        findFirst: async () => ({ id: 1 }),
        update: async (args) => { updates.push(args.data); return args.data; },
      };
    } },
    '@/telegramBot/telegramBot': { getBot: async () => ({ sendMessage: async (id, message) => messages.push(message) }) },
    '@/lib/logger': { logger: () => ({ info() {}, ok() {}, error() {} }) },
    '@/functions/getYGStickers': { getYGStickers: async () => ({ content: [{ id: 'status', name: 'Статус' }] }) },
  };
  const source = readFileSync(require.resolve('../src/app/api/webhook/[id]/route.ts'), 'utf8');
  const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } });
  const context = {
    exports: {}, require: (name) => { assert.ok(imports[name], name); return imports[name]; },
    process: { env: { YOGILE_KEY_INSTANCE: 'test-key' } },
    fetch: async (url) => {
      if (url.includes('/string-stickers/')) {
        stateRequests.push(url);
        return { ok: true, json: async () => ({ name: 'в работе' }) };
      }
      if (url.includes('/users/')) return { ok: true, json: async () => ({ realName: 'User', email: 'user@example.com' }) };
      return { ok: true, json: async () => ({ title: 'Отдел рекламы' }) };
    },
  };
  await vm.runInNewContext(`(async () => { ${outputText}\n })()`, context);
  const send = (stickers, previous, extra = {}) => context.exports.POST({ json: async () => ({
    event: 'task-updated',
    payload: { title: 'Бейджики', description: 'Телеграм id - 123', columnId: 'column', projectId: 'project', stickers, ...extra },
    prevData: { stickers: previous, assigned: [] },
  }) });

  // Another sticker changes while the status stays the same.
  await send({ status: 'new', priority: 'high' }, { status: 'new', priority: 'low' });
  // Reordering keys does not change the status either.
  await send({ priority: 'low', status: 'new' }, { status: 'new', priority: 'low' });
  await send({}, { status: 'new' });
  assert.equal(messages.length, 0);
  assert.equal(updates.length, 0);
  assert.equal(stateRequests.length, 0);

  // The changed status is not the first entry.
  await send({ priority: 'high', status: 'working' }, { priority: 'high', status: 'new' });
  assert.equal(messages.length, 1);
  assert.match(messages[0], /Состояние задачи изменено на "в работе"/);
  assert.ok(stateRequests[0].endsWith('/string-stickers/status/states/working'));
  assert.equal(updates[0].stage, 'в работе');

  // Unchanged status must not prevent an assignee notification.
  await send({ status: 'working' }, { status: 'working' }, { assigned: ['user'] });
  assert.equal(messages.length, 2);
  assert.match(messages[1], /Исполнители изменены/);
});
