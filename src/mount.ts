/** GitHub Workbench tab, owned by the Better Sidebar registration lifecycle. */
import { createElement, useEffect, useState } from 'react';
import type { ClientCtx, SidebarRegistry, TabDescriptorLike } from './types.ts';
import { iconFor } from './icons.ts';
import { WorkbenchApp } from './workbench.tsx';
import { ensureStyles } from './styles.ts';
import { getInboxStore } from './inbox-store.ts';

export const TAB_ID = 'github-workbench:repo';

/** Register one tab; the host adapts its session, visibility, and native sidebar placement. */
export function mountWorkbench(ctx: ClientCtx): () => void {
  ensureStyles();
  const disposeTab = mountAsTab(ctx.betterSidebar);
  const stopInbox = getInboxStore().start();
  return () => { stopInbox(); disposeTab(); };
}

function inboxTitle(): string {
  const n = getInboxStore().unreadCount();
  return n > 0 ? `GitHub 工作台 (${n})` : 'GitHub 工作台';
}

function WorkbenchTab(props: import('./types.ts').TabPropsLike) {
  const [title, setTitle] = useState(inboxTitle);
  useEffect(() => getInboxStore().subscribe(() => setTitle(inboxTitle())), []);
  useEffect(() => props.ctx.betterSidebar.updateTab(props.tab.id, { title }), [props.ctx, props.tab.id, title]);
  return createElement(WorkbenchApp, {
    sessionId: props.scope.sessionId,
    cwd: props.scope.cwd,
    visible: props.visible,
    seedUrl: props.tab.path,
  });
}

// ---------- 形态一:better-sidebar tab ----------

function mountAsTab(registry: SidebarRegistry): () => void {
  const descriptor: TabDescriptorLike = {
    id: TAB_ID,
    title: inboxTitle,
    icon: iconFor('octo'),
    order: 55,
    badge: () => {
      const n = getInboxStore().unreadCount();
      return n > 0 ? n : null;
    },
    // 认领聊天中的 github.com 链接(需宿主「接管外链」开关开启):
    // 每个链接铸造独立实例,URL 落在 tab.path,由 WorkbenchApp 解析深链
    urlTarget: (url) => /(^|\.)github\.com$/.test(url.hostname),
    createTab: (state) => ({
      tab: {
        id: `${TAB_ID}:link:${state.nextBrowser}`,
        type: TAB_ID,
        title: 'GitHub 工作台',
      },
      patch: { nextBrowser: (state.nextBrowser ?? 0) + 1 },
    }),
    // 原生齿轮设置:token 兜底来源与自动刷新周期(值经 absorbHostToken 合并进组件)
    settings: {
      toggles: [
        { key: 'browserInterceptLinks', title: '接管聊天中的 GitHub 链接到工作台' },
        { key: 'browserInterceptHttps', title: '接管 https:// 链接' },
      ],
      pluginToggles: [
        { key: 'autoRefreshSec', title: '自动刷新周期(秒)', type: 'number', min: 0, max: 120 },
      ],
    },
    component: (props) => createElement(WorkbenchTab, props),
  };
  const disposer = registry.registerTab(descriptor);
  return disposer;
}
