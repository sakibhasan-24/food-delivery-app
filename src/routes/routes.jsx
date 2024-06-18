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
import CategoryItems from "../pages/categoryItem/CategoryItems";
import SearchItems from "../pages/searchResult/SearchItems";
import Checkout from "../pages/checkout/Checkout";
import CheckoutProcedure from "../pages/checkoutProcedure/CheckoutProcedure";
import CreateCoupon from "../component/coupon/CreateCoupon";
import Payment from "../pages/payments/Payment";
import PurchaseHistory from "../pages/purchase/PurchaseHistory";
import AdminOrders from "../pages/adminorders/AdminOrders";
import PrivateRoutes from "./privateRoutes/PrivateRoutes";
// import Search from "../pages/search/Search";

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
        path: "/category/:category",
        element: <CategoryItems />,
      },
      {
        path: "/item/details/:itemName/:itemId",
        element: <ItemDetails />,
      },
      // {
      //   path: "/search",
      //   element: <Search />,
      // },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/searchItems/:searchText?",
        element: <SearchItems />,
      },
      {
        path: "/checkoutProcedure",
        element: (
          <PrivateRoutes>
            <CheckoutProcedure />
          </PrivateRoutes>
        ),
      },
      {
        path: "/order/purchase-history",
        element: <PurchaseHistory />,
      },

      {
        path: "/createCoupon",
        element: <CreateCoupon />,
      },
      {
        path: "/orderitems/payment",
        element: <Payment />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
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
            path: "/dashboard/orders",
            element: <AdminOrders />,
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
