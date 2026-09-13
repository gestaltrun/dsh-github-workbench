/** 视图层共享原语:加载 / 错误 / 空状态。 */
import type { ReactNode } from 'react';
export declare function Loading(props: {
    label?: string;
}): ReactNode;
export declare function ErrorBox(props: {
    msg: string;
    onRetry?: () => void;
}): ReactNode;
export declare function Empty(props: {
    children: ReactNode;
}): ReactNode;
