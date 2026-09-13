/**
 * 运行态配置存储:localStorage 单一事实源(repo/branch/token 等,双形态共享);
 * tab 形态下宿主 pluginToggles 里的 token 作为兜底回退(better-sidebar 原生齿轮设置)。
 */
import { parseRepoInput, type GhRef } from './lib.ts';
export declare function loadToken(): string;
export declare function saveToken(t: string): void;
export declare function loadRepo(): string;
export declare function saveRepo(fullName: string): void;
export declare function loadBranch(): string;
export declare function saveBranch(b: string): void;
export declare function loadHiddenRepos(): string[];
export declare function hideRepo(fullName: string): void;
export declare function unhideRepo(fullName: string): void;
export type FontSizePref = 'dsh' | '13' | '14';
export declare function loadFontSize(): FontSizePref;
export declare function saveFontSize(v: FontSizePref): void;
export declare function loadSubtab(): string;
export declare function saveSubtab(s: string): void;
export declare function loadAutoRefreshSec(): number;
export declare function saveAutoRefreshSec(sec: number): void;
export declare function loadRecentRepos(): string[];
export declare function pushRecentRepo(fullName: string): string[];
export declare function removeRecentRepo(fullName: string): string[];
export declare function loadPanelWidth(): number;
export declare function savePanelWidth(w: number): void;
/** 从会话工作区自动识别仓库:读 .git/config 解析 GitHub origin。 */
export declare function detectWorkspaceRepo(sessionId: string): Promise<GhRef | null>;
export { parseRepoInput };
