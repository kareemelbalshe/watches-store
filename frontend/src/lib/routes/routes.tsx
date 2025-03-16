import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import Layout from "../../Layout";
import ProtectedRoute from "../../pages/dashboard/ProtectedRoute";
import LazyWrapper from "../functions/LazyWrapper";

const NotFound = lazy(() => import("../../pages/not-found/NotFound"));
const Home = lazy(() => import("../../pages/home/Home"));
const LoginAdmin = lazy(() => import("../../pages/login/LoginAdmin"));
const DashboardCart = lazy(
  () => import("../../pages/dashboard/cart/DashboardCart")
);
const Checkout = lazy(() => import("../../pages/checkout/Checkout"));
const Product = lazy(() => import("../../pages/dashboard/product/Product"));
const Category = lazy(() => import("../../pages/dashboard/category/Category"));
const Review = lazy(() => import("../../pages/dashboard/review/Review"));
const Products = lazy(() => import("../../pages/products/Products"));
const ProductDetails = lazy(
  () => import("../../pages/productDetails/ProductDetails")
);
const Cart = lazy(() => import("../../pages/cart/Cart"));
const ViewCart = lazy(
  () => import("../../pages/dashboard/cart/sub_pages/view_cart/ViewCart")
);
const EditProduct = lazy(
  () =>
    import("../../pages/dashboard/product/sub_pages/edit_product/EditProduct")
);
const AddProduct = lazy(
  () => import("../../pages/dashboard/product/sub_pages/add_product/AddProduct")
);
const AddReview = lazy(
  () => import("../../pages/dashboard/review/sub_pages/add_Review/AddReview")
);
const EditCategory = lazy(
  () =>
    import(
      "../../pages/dashboard/category/sub_pages/edit_category/EditCategory"
    )
);
const AddCategory = lazy(
  () =>
    import("../../pages/dashboard/category/sub_pages/add_category/AddCategory")
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: LazyWrapper(Home) },
      { path: "/cart", element: LazyWrapper(Cart) },
      { path: "/checkout", element: LazyWrapper(Checkout) },
      { path: "/products", element: LazyWrapper(Products) },
      { path: "/products/:category", element: LazyWrapper(Products) },
      { path: "/product/:productId", element: LazyWrapper(ProductDetails) },
      { path: "/login-admin", element: LazyWrapper(LoginAdmin) },
      {
        path: "/dashboard",
        element: <ProtectedRoute />,
        children: [
          { index: true, element: LazyWrapper(DashboardCart) },
          { path: "cart/:cartId", element: LazyWrapper(ViewCart) },
          { path: "product", element: LazyWrapper(Product) },
          { path: "product/add", element: LazyWrapper(AddProduct) },
          {
            path: "product/edit/:productId",
            element: LazyWrapper(EditProduct),
          },
          { path: "category", element: LazyWrapper(Category) },
          { path: "category/add", element: LazyWrapper(AddCategory) },
          {
            path: "category/edit/:categoryId",
            element: LazyWrapper(EditCategory),
          },
          { path: "review", element: LazyWrapper(Review) },
          { path: "review/add", element: LazyWrapper(AddReview) },
        ],
      },
      { path: "*", element: LazyWrapper(NotFound) },
    ],
  },
]);
