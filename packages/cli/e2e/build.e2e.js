const { resolve } = require('path');
const { tmp, execute, check } = require('./helpers/execute');

test('build', async () => {
  const dir = resolve(__dirname, `./fixtures/standard`);
  const { path: cwd, cleanup } = await tmp(dir);

  await execute(cwd, 'build');
  const result = await check(cwd);

  await cleanup();
  expect(result).toMatchSnapshot();
});
