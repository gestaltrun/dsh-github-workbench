/** Public Better Sidebar types; the runtime service remains owned by the host. */
import type { Context, BetterSidebarService, TabDescriptor, TabComponentProps } from '@gestaltrun/dsh-better-sidebar';
export type ClientCtx = Pick<Context, 'effect' | 'betterSidebar'>;
export type SidebarRegistry = BetterSidebarService;
export type TabDescriptorLike = TabDescriptor;
export type TabPropsLike = TabComponentProps;
export type SessionScopeLite = TabComponentProps['scope'];
export type SidebarTabLite = TabComponentProps['tab'];
