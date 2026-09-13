/**
 * 「GitHub 工作台」主应用:头部(仓库切换 / 分支 / 刷新 / 设置)+ 四子页签路由 +
 * 确认气泡与 toast 基础设施。双形态(tab / 独立面板)共享本组件;
 * 根节点 .gw-root 以 absolute inset 0 撑满承载容器(挂载填充契约)。
 */
import type { ReactNode } from 'react';
export interface ConfirmOptions {
    title: string;
    body?: string;
    confirmText?: string;
    danger?: boolean;
}
export interface UICapability {
    confirm(opts: ConfirmOptions): Promise<boolean>;
    toast(msg: string, kind?: 'ok' | 'err'): void;
}
export declare function useUI(): UICapability;
export declare function errText(e: unknown): string;
export interface WorkbenchAppProps {
    sessionId: string;
    cwd?: string;
    visible: boolean;
    /** tab.path:由聊天外链铸造实例时携带的 GitHub URL(深链入口)。 */
    seedUrl?: string;
}
export declare function WorkbenchApp({ sessionId, visible, seedUrl }: WorkbenchAppProps): ReactNode;
