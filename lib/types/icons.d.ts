/**
 * 全站唯一图标集:16px octicon 风格、单色、继承 currentColor(视觉稿审定版)。
 * 禁止在组件里再手写文本字形图标;语义色圆点用 CSS(.gw-dot)而非图标。
 */
import type { CSSProperties } from 'react';
export type IconName = 'octo' | 'chevron-down' | 'chevron-left' | 'chevron-right' | 'refresh' | 'gear' | 'inbox' | 'code' | 'issue' | 'pr' | 'play' | 'check-circle' | 'x-circle' | 'loader' | 'circle-idle' | 'external-link' | 'plus' | 'pencil' | 'trash' | 'comment' | 'merge' | 'lock' | 'file' | 'folder' | 'folder-open';
export interface GwIconProps {
    name: IconName;
    /** 像素尺寸,缺省 15。 */
    size?: number;
    className?: string;
    style?: CSSProperties;
    title?: string;
}
/** 统一图标组件:单 path、fill 继承 currentColor。 */
export declare function GwIcon(props: GwIconProps): React.ReactNode;
/** tab 注册用的图标工厂((size)=>ReactNode 形态)。 */
export declare function iconFor(name: IconName): (size: number) => React.ReactNode;
