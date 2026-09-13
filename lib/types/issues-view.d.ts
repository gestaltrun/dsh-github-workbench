/**
 * Issues 页签:列表(工具条 + 新建)+ 详情抽屉(正文 / 评论 / 编辑 / 关闭重开)。
 * 写操作:新建、评论、编辑标题正文、编辑/删除评论、关闭/重开(关闭需确认)。
 */
import type { ReactNode } from 'react';
import { type IconName } from './icons.ts';
import { type GhRef } from './lib.ts';
export interface ListViewProps {
    ghRef: GhRef;
    visible: boolean;
    onCount: (n: number) => void;
    /** 外链深链:初始打开的 issue/PR 编号(消费一次)。 */
    initialDetail?: number | null;
    onConsumeDeep?: () => void;
}
export declare function IssuesView({ ghRef, onCount, initialDetail, onConsumeDeep }: ListViewProps): ReactNode;
export declare function StateIcon(props: {
    closed: boolean;
    merged?: boolean;
}): ReactNode;
export type { IconName };
