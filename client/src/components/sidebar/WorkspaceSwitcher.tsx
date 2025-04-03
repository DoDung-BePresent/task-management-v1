/**
 * Node modules
 */
import { Check, ChevronDown, Plus } from "lucide-react";

/**
 * Components
 */
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useWorkspaceDialog } from "@/components/workspace/dialog/WorkspaceDialog";

const WorkspaceSwitcher = () => {
  const { onOpen } = useWorkspaceDialog();
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex items-center gap-2">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md">
                  M
                </div>
                <div className="flex flex-col">
                  <span className="leading-tight font-semibold">
                    My Workspace
                  </span>
                  <span className="text-xs">Free</span>
                </div>
              </div>
              <ChevronDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-56" side="right" align="start">
            <DropdownMenuLabel>Workspaces</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem className="cursor-pointer">
                <div className="flex size-6 items-center justify-center rounded-sm border">
                  M
                </div>
                <span className="flex-1">My Workspace</span>
                <Check className="size-4" />
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onOpen}>
              <div className="bg-background flex size-6 items-center justify-center rounded-sm border">
                <Plus className="size-4" />
              </div>
              <span className="text-muted-foreground font-medium">
                Add workspace
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default WorkspaceSwitcher;
