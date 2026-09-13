import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Context } from '@deepseek-ai/cordis';
import * as plugin from '../src/client.ts';
import type { SidebarRegistry, TabDescriptorLike, TabPropsLike } from '../src/types.ts';

test('real Cordis disposal removes only Workbench and preserves the host session props', async () => {
  const ctx = new Context();
  const tabs = new Map<string, TabDescriptorLike>();
  tabs.set('other-plugin', {} as TabDescriptorLike);
  const service = { registerTab(tab: TabDescriptorLike) {
    if (tabs.has(tab.id)) throw new Error('duplicate tab');
    tabs.set(tab.id, tab);
    return () => tabs.delete(tab.id);
  } } as unknown as SidebarRegistry;
  ctx.reflect.provide('betterSidebar', service);
  try {
    const fiber = ctx.plugin(plugin);
    await fiber;
    const tab = tabs.get('github-workbench:repo');
    assert.ok(tab);
    const a = { scope: { sessionId: 'a', cwd: '/a' }, visible: true, tab: { id: 'a-tab', path: 'https://github.com/a/repo' } } as TabPropsLike;
    const b = { scope: { sessionId: 'b', cwd: '/b' }, visible: false, tab: { id: 'b-tab' } } as TabPropsLike;
    const render = (props: TabPropsLike) => tab.component(props) as { props: TabPropsLike };
    assert.equal(render(a).props.scope.sessionId, 'a');
    assert.equal(render(b).props.scope.sessionId, 'b');
    assert.equal(render(b).props.visible, false);
    assert.equal(render(a).props.tab.path, 'https://github.com/a/repo');
    await fiber.dispose();
    assert.deepEqual([...tabs.keys()], ['other-plugin']);
  } finally { await ctx.fiber.dispose(); }
});
