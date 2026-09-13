/**
 * Code 页签:左列远端目录树(git trees API 单次 recursive 拉取),
 * 右侧文件预览(contents API,<900KB 文本行号渲染;二进制/超大降级为外链卡片)。
 */
import type { ReactNode } from 'react';
import { type GhRef } from './lib.ts';
export interface CodeViewProps {
    ghRef: GhRef;
    branch: string;
}
export declare function CodeView({ ghRef, branch }: CodeViewProps): ReactNode;
