/**
 * Node modules
 */
import {
  CheckCircle,
  LayoutDashboard,
  LucideIcon,
  Settings,
  Users,
} from "lucide-react";

/**
 * Components
 */
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";

/**
 * Types
 */
type ItemType = {
  title: string;
  url: string;
  icon: LucideIcon;
};

const NavMain = () => {
  const items: ItemType[] = [
    {
      title: "Dashboard",
      url: `/workspace/123`,
      icon: LayoutDashboard,
    },
    {
      title: "Tasks",
      url: `/workspace/123/tasks`,
      icon: CheckCircle,
    },
    {
      title: "Members",
      url: `/workspace/123/members`,
      icon: Users,
    },
    {
      title: "Settings",
      url: `/workspace/123/settings`,
      icon: Settings,
    },
  ];

  return (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild>
            <Link to={item.url}>
              <item.icon />
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
};

export default NavMain;
