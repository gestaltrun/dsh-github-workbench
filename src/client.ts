/** Browser plugin. Better Sidebar owns the native tab adapter and saved visibility. */
import type { ClientCtx } from './types.ts';
import { mountWorkbench } from './mount.ts';
export const name = 'github-workbench';
export const inject = ['betterSidebar'];
/** Mount the Workbench for this plugin lifetime. */
export function apply(ctx: ClientCtx): void {
  ctx.effect(() => mountWorkbench(ctx), 'github-workbench: sidebar tab');
}
