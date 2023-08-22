import React from "react";
import {createBrowserRouter,Outlet} from 'react-router-dom'
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import ErrorElement from "./components/ErrorElement";
import Body from "./components/Body";
import Home from "./components/home/Home";
import CompleteShoppingList from "./components/home/CompleteShoppingList";
import Cart from "./components/cart/Cart";
import ProductDetails from "./components/home/ProductDetails";
// import Search from './components/home/Search'
import LikedComponent from "./components/liked/LikedComponent";
import Login from "./components/userAuth/Login";
import SignUp from "./components/userAuth/SignUp";
import User from "./components/userAuth/User";
// import createProduct from "./admin/createProduct";
import CreateProducts from "./admin/products/CreateProducts";
import Admin from "./admin/Admin";
import UsersByAdmin from "./admin/users/UsersByAdmin";
import ProductCreation from "./admin/products/ProductCreation";
// import UpdateProduct from "./admin/UpdateProduct";
import Order from "./components/Orders/Order";
import PaymentComponent from "./components/payments/RajorPay";
import PaymentSuccess from "./components/payments/PaymentSuccess";
import About from "./components/about/About";
import UserOrderPage from "./components/Orders/Order";
import AdminOrderManagement from "./admin/orders/AdminOrderManagement";
import Search from "./components/layout/search/Search";
import SearchPage from "./components/layout/search/SearchPage";
import UserList from "./admin/users/UsersList";
import Address from "./components/payments/Address";
import CheckoutPage from "./components/payments/CheckoutPage";
import RatingStars from "./components/home/RatingStars";
import ProductsShimmer from "./components/home/ProductsShimmer";
import CorouselUpload from "./admin/products/CorouselUpload";
import 'react-toastify/dist/ReactToastify.css';
import PaymentCallbackPage from "./components/payments/CallbackUrl";
const App = ()=>{
    return(
    <>
    <Header/>
    <Outlet/>
    <Footer/>
    </>)
}
export const AppRouter = createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        errorElement:<ErrorElement/>,
        children:[{
            path:"/",
            element:<Home/>
        },
        {
            path:"/products",
            element:<CompleteShoppingList/>
        },
        {
            path:"/cart",
            element:<Cart/>
        },
        {
            path:`/products/product/:id`,
            element:<ProductDetails/>
        },
        {
            path:`/product/:id`,
            element:<ProductDetails/>
        },
        {
            path:`/liked`,
            element:<LikedComponent/>
        },
        {
            path:`/login`,
            element:<Login/>
        },
        {
            path:`/signup`,
            element:<SignUp/>
        },
        
        {
            path:'/user',
            element:<User/>
        },
       
        {
            path:'/admin/product/creation',
            element:<ProductCreation/>
        },
        {
            path:'/user/orders',
            element:<UserOrderPage/>
        },
        {
            path:'/address',
            element:<Address/>
        },
        {
            path:'/payment/success',
            element:<PaymentSuccess/>
        },
        {
            path:'/about',
            element:<About/>
        },
        {
            path:'/search',
            element:<Search/>
        },
        {
            path:'/search/page',
            element:<SearchPage/>
        },
        {
            path:"/admin",
            element:<Admin/>
        },
        {
            path:"admin/product/new",
            element:<CreateProducts/>
        },
        {
            path:'/admin/orders',
            element:<AdminOrderManagement/>
        },
        {
            path:'/admin/users',
            element:<UsersByAdmin/>
        },
        {
            path:'/admin/users/List',
            element:<UserList/>
        },
        {
            path:'/payment',
            element:<CheckoutPage/>
        },
        {
            path:'/rate',
            element:<RatingStars/>
        },
        {
            path:'/shimmer',
            element:<ProductsShimmer/>
        },
        {
            path:'/corousel/upload',
            element:<CorouselUpload/>
            
        },
        
        {
            path:'/order/:orderId',
            element:<PaymentCallbackPage/>
            
        },
    
    ]

    }

])
// export default App;