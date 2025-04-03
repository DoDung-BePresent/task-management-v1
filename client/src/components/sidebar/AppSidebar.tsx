/**
 * Node modules
 */
import { Plus } from "lucide-react";

/**
 * Components
 */
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

import Logo from "@/components/Logo";
import NavMain from "@/components/sidebar/NavMain";
import NavUser from "@/components/sidebar/NavUser";
import NavProjects from "@/components/sidebar/NavProjects";
import WorkspaceSwitcher from "@/components/sidebar/WorkspaceSwitcher";
import { useWorkspaceDialog } from "@/components/workspace/dialog/WorkspaceDialog";

const AppSidebar = () => {
  const { onOpen } = useWorkspaceDialog();
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Logo />
              <span className="text-sidebar-accent-foreground font-medium">
                Team Sync.
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="gap-0">
        <SidebarGroup>
          <SidebarGroupLabel>Workspaces</SidebarGroupLabel>
          <SidebarGroupAction
            onClick={onOpen}
            title="Create workspace"
            className="mr-0.5"
          >
            <Plus className="ml-[1px]" />
          </SidebarGroupAction>
          <SidebarGroupContent className="space-y-2">
            <WorkspaceSwitcher />
            <Separator />
            <NavMain />
            <Separator className="!h-[0.5px]" />
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Projects</SidebarGroupLabel>
          <SidebarGroupAction title="Create projects" className="mr-0.5">
            <Plus className="ml-[1px]" />
          </SidebarGroupAction>
          <SidebarGroupContent>
            <NavProjects />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
