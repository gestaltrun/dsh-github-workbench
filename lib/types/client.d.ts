/** Browser plugin. Better Sidebar owns the native tab adapter and saved visibility. */
import type { ClientCtx } from './types.ts';
export declare const name = "github-workbench";
export declare const inject: string[];
/** Mount the Workbench for this plugin lifetime. */
export declare function apply(ctx: ClientCtx): void;
