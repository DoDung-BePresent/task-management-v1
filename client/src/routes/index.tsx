/**
 * Node modules
 */
import { BrowserRouter, Route, Routes } from "react-router-dom";

/**
 * Routes
 */
import AuthRoute from "@/routes/AuthRoute";
import PrivateRoute from "@/routes/PrivateRoute";

/**
 * Layouts
 */
import BaseLayout from "@/layouts/BaseLayout";

/**
 * Pages
 */
import Home from "@/pages/Home";

import SignInPage from "@/pages/auth/SignInPage";
import SignUpPage from "@/pages/auth/SignUpPage";

import NotFound from "@/pages/error/NotFound";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthRoute />}>
          <Route element={<BaseLayout />}>
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
          </Route>
        </Route>
        <Route path="/" element={<PrivateRoute />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
