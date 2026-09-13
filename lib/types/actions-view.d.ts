/**
 * Actions 页签:workflow runs 列表(状态图标 / 行悬停 重跑·取消 / 点击跳原页)。
 * 自动刷新周期来自设置,受 visible 门控;取消需确认。
 */
import type { ReactNode } from 'react';
import { type GhRef } from './lib.ts';
export declare function ActionsView({ ghRef, visible, onCount }: {
    ghRef: GhRef;
    visible: boolean;
    onCount: (n: number) => void;
}): ReactNode;
