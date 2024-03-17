import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/registration/Login";
import SignUp from "../pages/registration/SignUp";
import Dashboard from "../pages/dashboard/dashboard/Dashboard";
import Profile from "../pages/dashboard/profile/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <h1>404 NOT FOUND</h1>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
        children: [
          {
            path: "/dashboard/profile",
            element: <Profile />,
          },
        ],
      },
    ],
  },
]);

export default router;
