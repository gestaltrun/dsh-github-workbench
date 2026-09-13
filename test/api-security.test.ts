import { afterEach, it } from 'node:test';
import assert from 'node:assert/strict';
import { getMyRepos, setToken } from '../src/api.ts';
const originalFetch = globalThis.fetch;
const originalStorage = Object.getOwnPropertyDescriptor(globalThis, 'localStorage');
afterEach(() => {
  globalThis.fetch = originalFetch;
  if (originalStorage) Object.defineProperty(globalThis, 'localStorage', originalStorage);
  else Reflect.deleteProperty(globalThis, 'localStorage');
});
it('never sends the PAT to a foreign pagination destination', async () => {
  const data = new Map<string, string>();
  Object.defineProperty(globalThis, 'localStorage', { configurable: true, value: { getItem: (k: string) => data.get(k), setItem: (k: string, v: string) => data.set(k, v), removeItem: (k: string) => data.delete(k) } });
  setToken('test-only-token');
  const requests: string[] = [];
  globalThis.fetch = async (url) => {
    requests.push(String(url));
    return new Response('[]', { headers: { link: '<https://foreign.invalid/repos>; rel="next"' } });
  };
  await assert.rejects(getMyRepos(true), /GitHub API/);
  assert.equal(requests.length, 1);
});
