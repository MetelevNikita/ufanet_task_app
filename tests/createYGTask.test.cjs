// Run: node --test tests/createYGTask.test.cjs
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');

test('YouGile task payload and failed responses', async () => {
  const department = 'Отдел дизайна';
  let stickers = { content: [{ id: 'status', name: 'Статус', states: [{ id: 'new', name: 'не принято' }] }] };
  const requests = [];
  const errors = [];
  let response = new Response('{"id":"task-id"}', { status: 201 });
  const imports = {
    '@/functions/getYGProjects': { getYGProjects: async () => ({ content: [{ id: 'project', title: department }] }) },
    '@/functions/getBoardCompany': { getBoardCompany: async () => ({ content: [{ id: 'board', title: department }] }) },
    '@/functions/getYGColumns': { getYGColumns: async () => ({ content: [{ id: 'inbox', title: 'Входящие' }] }) },
    '@/functions/getYGStickers': { getYGStickers: async () => stickers },
    '@/lib/logger': { logger: () => ({ error: (...args) => errors.push(args) }) },
  };
  const source = readFileSync(require.resolve('../src/lib/createYGTask.ts'), 'utf8');
  const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } });
  const context = {
    exports: {}, require: (name) => { assert.ok(imports[name], name); return imports[name]; },
    process: { env: { NEXT_PUBLIC_YOGILE_KEY: 'test-key' } },
    fetch: async (_url, options) => { requests.push(JSON.parse(options.body)); return response.clone(); },
  };
  vm.runInNewContext(outputText, context);
  const create = (deadline) => context.exports.createYGTask(department, { title: 'Макет', deadline }, 'Описание');

  for (const deadline of [undefined, '', null]) {
    assert.equal((await create(deadline)).success, true);
    const payload = requests.at(-1);
    assert.equal(Object.hasOwn(payload, 'deadline'), false);
    assert.deepEqual(payload.stickers, { status: 'new' });
    assert.equal(payload.columnId, 'inbox');
  }
  assert.equal((await create('2026-10-10')).success, true);
  assert.deepEqual(requests.at(-1).deadline, { deadline: Date.parse('2026-10-10') });
  assert.equal((await create('1970-01-01')).success, true);
  assert.deepEqual(requests.at(-1).deadline, { deadline: 0 });
  const count = requests.length;
  assert.equal((await create('invalid-date')).success, false);
  stickers.content[0].states = [];
  assert.equal((await create()).success, false);
  stickers = { content: [] };
  assert.equal((await create()).success, false);
  assert.equal(requests.length, count);

  stickers = { content: [{ id: 'status', name: 'Статус', states: [{ id: 'new', name: 'не принято' }] }] };
  for (const status of [400, 401, 403, 429, 500]) {
    response = new Response('validation error', { status });
    const result = await create();
    assert.equal(result.success, false);
    assert.equal(result.data, null);
    assert.equal(errors.at(-1)[2].status, status);
    assert.equal(errors.at(-1)[2].responseBody, 'validation error');
  }
});
