/**
 * 纯函数助手:解析 / 树构建 / 时间与容量格式化(base64 解码)。
 * 独立成模块便于 node:test 单测(不触 DOM / fetch)。
 */
/** GitHub 仓库坐标。 */
export interface GhRef {
    owner: string;
    repo: string;
}
export declare function ghRefKey(ref: GhRef): string;
/** 从 .git/config 文本解析第一个 GitHub remote(origin 优先)。 */
export declare function parseGithubRemote(configText: string): GhRef | null;
/** 解析用户输入:owner/repo、https://github.com/o/r(.git)、git@github.com:o/r.git。 */
export declare function parseRepoInput(input: string): GhRef | null;
/** 查询串构造(跳过空值)。 */
export declare function qs(params: Record<string, string | number | undefined>): string;
/** 解析 GitHub `Link` 响应头里的 rel=next(没有下一页则 null)。 */
export declare function parseLinkNext(link: string | null | undefined): string | null;
export interface TreeItem {
    path: string;
    type: 'blob' | 'tree';
    size?: number;
}
export interface TreeNode {
    name: string;
    path: string;
    type: 'blob' | 'tree';
    size?: number;
    children?: TreeNode[];
}
/** 平铺 tree 列表 → 排序嵌套树(目录在前,同型按名排序)。 */
export declare function buildTree(items: readonly TreeItem[]): TreeNode[];
/** 收集某目录下所有直接子路径的展开集(懒展开用)。 */
export declare function collectDirPaths(nodes: readonly TreeNode[], out?: string[]): string[];
/** 从任意 GitHub URL 提取坐标与深链目标(非 github 域返回 null)。 */
export declare function parseGithubUrl(href: string): {
    ref: GhRef;
    kind?: 'issues' | 'pulls' | 'actions';
    number?: number;
} | null;
/** 中文相对时间(<1min → 刚刚;超一年 → 具体日期)。 */
export declare function timeAgo(iso: string, now?: number): string;
/** 运行时长(ms)。 */
export declare function fmtDuration(ms: number): string;
export declare function fmtSize(bytes?: number): string;
export declare function clamp(n: number, min: number, max: number): number;
/**
 * 把 repo:owner/name OR … 切成不超过 maxLen 的若干组(Search q 长度限制)。
 * 返回每组的 fullName 列表,空输入返回 [].
 */
export declare function chunkRepoQualifiers(fullNames: readonly string[], maxLen?: number): string[][];
export type InboxKind = 'issue' | 'pr' | 'actions';
/** 收件箱条目稳定键:kind:owner/repo#n */
export declare function inboxItemKey(kind: InboxKind, owner: string, repo: string, n: number): string;
/** GitHub contents API 的 base64(可能带换行)→ UTF-8 文本。 */
export declare function decodeBase64Utf8(b64: string): string;
/** label 色值(#rgb/#rrggbb)上的人眼对比文字色。 */
export declare function labelTextColor(hex: string): string;
