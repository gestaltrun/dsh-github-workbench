/**
 * Pull requests 页签:列表(工具条 + 新建 PR)+ 详情抽屉
 * (diffstat / check-runs 摘要 / 合并三法强确认 / 关闭重开 / 评论区)。
 */
import type { ReactNode } from 'react';
import * as api from './api.ts';
import { type ListViewProps } from './issues-view.tsx';
export declare function PullsView({ ghRef, branches, visible, onCount, initialDetail, onConsumeDeep }: ListViewProps & {
    branches: api.BranchLite[];
}): ReactNode;
