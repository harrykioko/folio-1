
import { TooltipProvider } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import * as React from "react"
import { SidebarContext, SidebarProvider, useSidebar } from "./sidebar-context"
import { 
  Sidebar, 
  SidebarInset, 
  SidebarRail 
} from "./sidebar-main"
import {
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInput,
  SidebarSeparator,
  SidebarTrigger
} from "./sidebar-structure"
import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel
} from "./sidebar-group"
import {
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton
} from "./sidebar-menu"
import {
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem
} from "./sidebar-submenu"

// Update the SidebarProvider to include TooltipProvider
const EnhancedSidebarProvider = React.forwardRef<
  React.ElementRef<typeof SidebarProvider>,
  React.ComponentPropsWithoutRef<typeof SidebarProvider>
>((props, ref) => {
  return (
    <SidebarProvider
      className={cn(
        "group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar",
        props.className
      )}
      ref={ref}
      {...props}
    >
      <TooltipProvider delayDuration={0}>
        {props.children}
      </TooltipProvider>
    </SidebarProvider>
  )
})
EnhancedSidebarProvider.displayName = "EnhancedSidebarProvider"

export {
  EnhancedSidebarProvider as SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar
}
