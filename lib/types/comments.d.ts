/**
 * 评论区共享块:评论列表 + 发表框(Issue 与 PR 详情抽屉复用)。
 * 删除仅对「当前鉴权用户本人的评论」显示且需确认;支持行内编辑。
 */
import type { ReactNode } from 'react';
import * as api from './api.ts';
import { type GhRef } from './lib.ts';
export declare function CommentsBlock(props: {
    ghRef: GhRef;
    number: number;
    comments: api.GhComment[];
    onChanged: () => void;
    nextUrl?: string | null;
    loadingMore?: boolean;
    onLoadMore?: () => void;
}): ReactNode;
/** 底部发表框(受控于父级刷新回调)。 */
export declare function CommentComposer(props: {
    ghRef: GhRef;
    number: number;
    onDone: () => void;
}): ReactNode;
