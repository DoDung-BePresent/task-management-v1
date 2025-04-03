/**
 * Node modules
 */
import { Link } from "react-router-dom";

/**
 * Components
 */
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const NavProjects = () => {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <Link to="#">
            <span className="flex size-4 items-center justify-center">😎</span>
            <span>Read book</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default NavProjects;
