/**
 * 收件箱覆盖层:Issues / Pull requests / Actions 三分栏。点行交给工作台切仓。
 */
import type { ReactNode } from 'react';
import type { InboxItem, InboxSnapshot, InboxStore } from './inbox-store.ts';
export declare function useInboxSnapshot(store: InboxStore): InboxSnapshot;
export interface InboxOverlayProps {
    store: InboxStore;
    snapLabel: string | null;
    onReturn: () => void;
    onJump: (item: InboxItem) => void;
}
export declare function InboxOverlay(props: InboxOverlayProps): ReactNode;
export declare function InboxReturnBar(props: {
    label: string;
    onReturn: () => void;
}): ReactNode;
