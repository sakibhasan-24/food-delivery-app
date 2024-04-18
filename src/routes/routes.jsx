import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/registration/Login";
import SignUp from "../pages/registration/SignUp";
import Dashboard from "../pages/dashboard/dashboard/Dashboard";
import Profile from "../pages/dashboard/profile/Profile";
import AddMenu from "../pages/menu/AddMenu/AddMenu";
import Items from "../pages/items/Items";
import ItemDetails from "../component/itemDetails/ItemDetails";
import ItemController from "../pages/allItems/ItemController";
import EditItems from "../pages/menu/editItems/EditItems";

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
        path: "/items",
        element: <Items />,
      },
      {
        path: "/item/details/:itemName/:itemId",
        element: <ItemDetails />,
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
          {
            path: "/dashboard/add-menu",
            element: <AddMenu />,
          },
          {
            path: "/dashboard/items",
            element: <ItemController />,
          },
          {
            path: "/dashboard/edit-item/:id",
            element: <EditItems />,
          },
        ],
      },
    ],
  },
]);

export default router;
