import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import NotFound from "../Pages/NotFound";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import AddProduct from "../Pages/AddProduct";
import PrivateRoute from "./PrivateRoute";
import BrandDetails from "../Pages/BrandDetails";
import ProductDetails from "../Pages/ProductDetails";
import MyCart from "../Pages/MyChart";
import EditProduct from "../Pages/EditProduct";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <NotFound></NotFound>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/add",
        element: (
          <PrivateRoute>
            <AddProduct></AddProduct>
          </PrivateRoute>
        ),
      },
      {
        path: "/brands/:id",
        element: <BrandDetails></BrandDetails>,
        loader: ({ params }) =>
          fetch(
            `https://techno-city.vercel.app/products/${params.id}`
          ),
      },
      {
        path: "/brands/:brand/:id",
        element: (
          <PrivateRoute>
            <ProductDetails></ProductDetails>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://techno-city.vercel.app/products/:brand/${params.id}/`
          ),
      },
      {
        path: "/cart",
        element: (
          <PrivateRoute>
            <MyCart></MyCart>
          </PrivateRoute>
        ),
        loader: () =>
          fetch(
            "https://techno-city.vercel.app/cart"
          ),
      },
      {
        path: "/product/:id",
        element: (
          <PrivateRoute>
            <EditProduct></EditProduct>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://techno-city.vercel.app/products/:brand/${params.id}/`
          ),
      },
    ],
  },
]);

export default Router;
