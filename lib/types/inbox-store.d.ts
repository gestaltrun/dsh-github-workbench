/**
 * 收件箱模块级 store:跨仓公开仓新建 Issue / PR,以及少量仓的新 Actions run。
 * 轮询不绑 Workbench visible(侧栏切走仍慢刷角标)。
 * 纯合并/切批可单测;fetch 经 deps 注入。
 */
import { type InboxKind } from './lib.ts';
import type { InboxSearchHit, RepoLite, GhRun } from './api.ts';
export type { InboxKind };
export interface InboxItem {
    key: string;
    kind: InboxKind;
    owner: string;
    repo: string;
    number: number;
    title: string;
    htmlUrl: string;
    user: string;
    createdAt: string;
    unread: boolean;
}
export interface InboxSnapshot {
    items: InboxItem[];
    unreadCount: number;
    unreadByKind: Record<InboxKind, number>;
    truncatedWatch: boolean;
    lastError: string | null;
    hasToken: boolean;
}
export interface InboxStorage {
    getItem(key: string): string | null;
    setItem(key: string, value: string): void;
}
export interface InboxDeps {
    getToken(): string;
    getMyRepos(force?: boolean): Promise<RepoLite[]>;
    myReposTruncated(): boolean;
    loadHiddenRepos(): string[];
    getViewerLogin(): Promise<string | null>;
    searchInboxCreatedSince(repos: readonly string[], createdSinceIso: string, viewer: string | null): Promise<{
        hits: InboxSearchHit[];
        queryTruncated: boolean;
    }>;
    listRunsCreatedSince(ref: {
        owner: string;
        repo: string;
    }, sinceIso: string): Promise<GhRun[]>;
    loadRecentRepos(): string[];
    now?(): number;
    storage?: InboxStorage;
}
export declare function hitToItem(hit: InboxSearchHit, unread: boolean): InboxItem;
export declare function runToItem(owner: string, repo: string, run: GhRun, unread: boolean): InboxItem;
export declare function unreadByKind(items: readonly InboxItem[]): Record<InboxKind, number>;
/** 合并新命中:已有 key 不改(保留已读);selfKeys 进箱但 unread=false。 */
export declare function mergeIncoming(prev: InboxItem[], incoming: InboxItem[], readKeys: ReadonlySet<string>, selfKeys: ReadonlySet<string>): {
    items: InboxItem[];
    fresh: InboxItem[];
};
export declare function unreadCountOf(items: readonly InboxItem[]): number;
export declare function createInboxStore(deps: InboxDeps): {
    getSnapshot: () => InboxSnapshot;
    subscribe: (fn: () => void) => () => void;
    start: () => () => void;
    pollOnce: () => Promise<InboxItem[]>;
    markRead: (key: string) => void;
    markAllRead: (kind?: InboxKind) => void;
    markSelfCreated: (key: string) => void;
    setExtraWatchRepo: (fullName: string | null) => void;
    setOnFresh(fn: ((fresh: InboxItem[]) => void) | null): void;
    unreadCount: () => number;
};
export type InboxStore = ReturnType<typeof createInboxStore>;
/** 浏览器运行时单例。测试请用 createInboxStore。 */
export declare function getInboxStore(factory?: () => InboxDeps): InboxStore;
export declare function resetInboxStoreForTest(): void;
export declare function liveInboxDeps(): InboxDeps;
