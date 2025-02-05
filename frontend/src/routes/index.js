import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ForgotPassowrd from "../pages/ForgotPassowrd";
import SignUp from "../pages/SignUp";
import AdminPanel from "../pages/AdminPanel";
import AllUsers from "../pages/AllUsers";
import AllProducts from "../pages/AllProducts";
import CategoryProduct from "../pages/CategoryProduct";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import SearchProduct from "../pages/SearchProduct";
import Success from "../pages/Success";
import Cancel from "../pages/Cancel";
import OrderPage from "../pages/OrderPage";
import AllOrder from "../pages/AllOrder";
import AdminHome from "../pages/AdminHome";

import Profile from "../pages/Profile";
import Dashboard from "../layouts/Dashboard";
import PaystackDetails from "../pages/PaystackDetails";
import PaystackCheckout from "../pages/PaystackCheckout";
import OrderSuccess from "../pages/OrderSuccess";
import MyOrders from "../pages/MyOrder";
import OrderDetails from "../pages/OrderDetails";  // ✅ Import OrderDetails
import OrderDetail from "../pages/OrderDetail";
import ReviewProduct from "../pages/ReviewProduct";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <Home />,
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "forgot-password",
                element: <ForgotPassowrd />,
            },
            {
                path: "sign-up",
                element: <SignUp />,
            },
            {
                path: "product-category",
                element: <CategoryProduct />,
            },
            {
                path: "product/:id",
                element: <ProductDetails />,
            },
            {
                path: "review-product/:productId",
                element: <ReviewProduct />,
            },
            {
                path: "cart",
                element: <Cart />,
            },
            {
                path: "paystack-checkout",
                element: <PaystackCheckout />,
            },
            {
                path: "success",
                element: <Success />,
            },
            {
                path: "order-success/:orderId",
                element: <OrderSuccess />,
            },
            
            {
                path: "cancel",
                element: <Cancel />,
            },
            {
                path: "paystack-Details",
                element: <PaystackDetails />,
            },
            {
                path: "search",
                element: <SearchProduct />,
            },
            {
                path: "order",
                element: <OrderPage />,
            },
            {
                path: "order-detail/:orderId",  // ✅ Add Order Details Route
                element: <OrderDetail />,
            },
            {
                path: "admin-panel",
                element: <AdminPanel />,
                children: [
                    {
                        path: "all-users",
                        element: <AllUsers />,
                    },
                    {
                        path: "all-products",
                        element: <AllProducts />,
                    },
                    {
                        path: "all-orders",
                        element: <AllOrder />,
                    },
                    {
                        path: "admin-home",
                        element: <AdminHome />,
                    },
                    {
                        path: "order-details/:orderId",  // ✅ Add Order Details Route
                        element: <OrderDetails />,
                    },
                ],
            },

            {
                path: "dashboard",
                element: <Dashboard />,
                children: [
                    {
                        path: "profile",
                        element: <Profile />,
                    },
                    
                    {
                        path: "my-order",
                        element: <MyOrders />,
                    },
                ],
            },
        ],
    },
]);

export default router;
