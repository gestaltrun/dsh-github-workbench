import type { ClientCtx } from './types.ts';
export declare const TAB_ID = "github-workbench:repo";
/** Register one tab; the host adapts its session, visibility, and native sidebar placement. */
export declare function mountWorkbench(ctx: ClientCtx): () => void;
