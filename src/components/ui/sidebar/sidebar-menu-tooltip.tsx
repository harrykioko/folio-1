
import * as React from "react"
import { useSidebar } from "./sidebar-context"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { SidebarMenuButton, SidebarMenuButtonProps } from "./sidebar-menu-button"

export interface SidebarMenuTooltipProps extends SidebarMenuButtonProps {}

export const SidebarMenuTooltip = React.forwardRef<
  HTMLButtonElement,
  SidebarMenuTooltipProps
>(({ tooltip, ...props }, ref) => {
  const { isMobile, state } = useSidebar()

  // If no tooltip is provided, just render the button
  if (!tooltip) {
    return <SidebarMenuButton ref={ref} {...props} />
  }

  // Convert string tooltip to object format
  const tooltipContent = typeof tooltip === "string"
    ? { children: tooltip }
    : tooltip

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <SidebarMenuButton ref={ref} {...props} />
      </TooltipTrigger>
      <TooltipContent
        side="right"
        align="center"
        hidden={state !== "collapsed" || isMobile}
        {...tooltipContent}
      />
    </Tooltip>
  )
})
SidebarMenuTooltip.displayName = "SidebarMenuTooltip"
