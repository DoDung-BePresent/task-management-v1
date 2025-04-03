import { Outlet } from "react-router-dom";

const BaseLayout = () => {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <Outlet />
    </main>
  );
};

export default BaseLayout;
