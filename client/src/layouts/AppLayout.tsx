/**
 * Node modules
 */
import { Outlet } from "react-router-dom";

/**
 * Components
 */
import Header from "@/components/Header";
import AppSidebar from "@/components/sidebar/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { WorkspaceDialog } from "@/components/workspace/dialog/WorkspaceDialog";

const AppLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <Header />
        <Outlet />
      </main>
      <WorkspaceDialog />
    </SidebarProvider>
  );
};

export default AppLayout;
