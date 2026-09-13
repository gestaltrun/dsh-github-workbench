/**
 * GitHub REST v3 客户端:浏览器直连 api.github.com(CORS 开放),
 * Bearer PAT 鉴权、限流/错误归一为中文可操作提示,全部端点类型化。
 */
import { type GhRef } from './lib.ts';
export declare function getToken(): string;
export declare function setToken(token: string): void;
/** 最近一次响应的 core 限额剩余(页脚展示)。 */
export declare function rateRemaining(): number | null;
export declare class GhError extends Error {
    readonly status: number;
    constructor(message: string, status: number);
}
export interface GhUser {
    login: string;
}
export interface GhLabel {
    name: string;
    color: string;
}
export interface GhIssue {
    number: number;
    title: string;
    state: 'open' | 'closed';
    html_url: string;
    user: GhUser | null;
    created_at: string;
    updated_at: string;
    closed_at: string | null;
    comments: number;
    labels: GhLabel[];
    body: string | null;
    pull_url?: string;
    pull_request?: unknown;
}
export interface GhComment {
    id: number;
    user: GhUser | null;
    body: string;
    created_at: string;
    html_url: string;
}
export interface GhPull {
    number: number;
    title: string;
    state: 'open' | 'closed';
    html_url: string;
    draft: boolean;
    user: GhUser | null;
    created_at: string;
    updated_at: string;
    head: {
        ref: string;
        label: string;
        sha: string;
    };
    base: {
        ref: string;
        label: string;
    };
    body: string | null;
    merged_at?: string | null;
    additions?: number;
    deletions?: number;
    changed_files?: number;
    mergeable?: boolean | null;
    mergeable_state?: string;
}
export type ListSort = 'created' | 'updated';
export type IssueState = 'open' | 'closed';
export type PullFilter = 'open' | 'closed' | 'merged';
/** 一页列表:items 是本页,nextUrl 有值就能「加载更多」,totalCount 是仓库真实总数(Search 或并行计数)。 */
export interface ListPage<T> {
    items: T[];
    nextUrl: string | null;
    totalCount: number | null;
}
export interface GhCheckRun {
    id: number;
    name: string | null;
    status: string;
    conclusion: string | null;
    html_url: string;
}
export interface GhRun {
    id: number;
    name: string | null;
    display_title: string;
    status: string;
    conclusion: string | null;
    event: string;
    head_branch: string;
    html_url: string;
    created_at: string;
    updated_at: string;
    run_attempt: number;
    actor: GhUser | null;
}
export interface RepoMeta {
    fullName: string;
    description: string | null;
    defaultBranch: string;
    isPrivate: boolean;
    stars: number;
    htmlUrl: string;
}
export interface BranchLite {
    name: string;
}
export declare function getRepoMeta(ref: GhRef): Promise<RepoMeta>;
export declare function getBranches(ref: GhRef): Promise<BranchLite[]>;
export declare function getTree(ref: GhRef, branch: string): Promise<{
    items: {
        path: string;
        type: 'blob' | 'tree';
        size?: number;
    }[];
    truncated: boolean;
}>;
export interface ContentResult {
    kind: 'text' | 'binary' | 'too-big';
    text?: string;
    size: number;
    truncatedLines?: boolean;
    htmlUrl: string;
}
export declare function getFileContent(ref: GhRef, path: string, branch: string): Promise<ContentResult>;
/** Issues 列表:Search API `is:issue`,不被 PR 占坑;默认按创建时间(网页 Newest)。 */
export declare function listIssues(ref: GhRef, state?: IssueState, sort?: ListSort, pageUrl?: string): Promise<ListPage<GhIssue>>;
export declare function getIssue(ref: GhRef, n: number): Promise<GhIssue>;
export declare function listComments(ref: GhRef, n: number, pageUrl?: string): Promise<ListPage<GhComment>>;
/** PR 列表:Search `is:pr`(+ is:unmerged / is:merged),closed 与 merged 分开;默认 Newest。 */
export declare function listPulls(ref: GhRef, filter?: PullFilter, sort?: ListSort, pageUrl?: string): Promise<ListPage<GhPull>>;
export declare function getPull(ref: GhRef, n: number): Promise<GhPull>;
export declare function listCheckRuns(ref: GhRef, sha: string): Promise<GhCheckRun[]>;
export declare function listRuns(ref: GhRef): Promise<GhRun[]>;
export interface RepoLite {
    fullName: string;
    isPrivate: boolean;
    pushedAt: string;
    description: string | null;
    /** 仓库所有者登录名(判断"非本人的仓库"用)。 */
    ownerLogin: string;
}
/** 当前 Token 可见的全部仓库(owner + 协作 + 组织成员),按最近推送排序;5 分钟缓存。跟分页,硬顶 300。 */
export declare function getMyRepos(force?: boolean): Promise<RepoLite[]>;
/** 最近一次 getMyRepos 是否因 300 顶而截断。 */
export declare function myReposTruncated(): boolean;
export interface GhSearchRepo {
    fullName: string;
    stars: number;
    description: string | null;
}
/** 按名称搜索任意公开仓库(search API,限流 30 次/分;带 450ms 去抖由 UI 层负责)。 */
export declare function searchPublicRepos(q: string): Promise<GhSearchRepo[]>;
/** 清空仓库列表缓存(token 变更后调用)。 */
export declare function invalidateRepoCache(): void;
export type InboxHitKind = 'issue' | 'pr';
export interface InboxSearchHit {
    kind: InboxHitKind;
    owner: string;
    repo: string;
    number: number;
    title: string;
    htmlUrl: string;
    user: string;
    createdAt: string;
}
/**
 * 监视集里 created>=watermark 的公开 Issue 与新建 PR。
 * 优先 user:/org: 少打 Search,剩余 repo: OR 切批;每轮最多 6 次查询。
 */
export declare function searchInboxCreatedSince(repos: readonly string[], createdSinceIso: string, viewer: string | null): Promise<{
    hits: InboxSearchHit[];
    queryTruncated: boolean;
}>;
/** 某仓 created>=since 的 workflow runs(Actions 无跨仓 Search,调用方限制仓数)。 */
export declare function listRunsCreatedSince(ref: GhRef, sinceIso: string): Promise<GhRun[]>;
export declare function createIssue(ref: GhRef, title: string, body: string): Promise<GhIssue>;
export declare function patchIssue(ref: GhRef, n: number, patch: {
    title?: string;
    body?: string;
    state?: 'open' | 'closed';
}): Promise<void>;
export declare function addComment(ref: GhRef, n: number, body: string): Promise<void>;
export declare function editComment(ref: GhRef, commentId: number, body: string): Promise<void>;
export declare function deleteComment(ref: GhRef, commentId: number): Promise<void>;
export declare function createPull(ref: GhRef, p: {
    title: string;
    body: string;
    head: string;
    base: string;
}): Promise<GhPull>;
export declare function mergePull(ref: GhRef, n: number, method: 'merge' | 'squash' | 'rebase'): Promise<void>;
export declare function rerunRun(ref: GhRef, runId: number): Promise<void>;
export declare function cancelRun(ref: GhRef, runId: number): Promise<void>;
export declare function getViewerLogin(): Promise<string | null>;
