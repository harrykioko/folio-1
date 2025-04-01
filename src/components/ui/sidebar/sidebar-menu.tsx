
import * as React from "react"
import { cn } from "@/lib/utils"
import { SidebarMenuItem } from "./sidebar-menu-item"
import { SidebarMenuButton } from "./sidebar-menu-button"
import { SidebarMenuAction } from "./sidebar-menu-action"
import { SidebarMenuBadge } from "./sidebar-menu-badge"
import { SidebarMenuSkeleton } from "./sidebar-menu-skeleton"
import { SidebarMenuTooltip } from "./sidebar-menu-tooltip"

export const SidebarMenu = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    data-sidebar="menu"
    className={cn("flex w-full min-w-0 flex-col gap-1", className)}
    {...props}
  />
))
SidebarMenu.displayName = "SidebarMenu"

export {
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuSkeleton,
  SidebarMenuTooltip
}
