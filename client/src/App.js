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
import Search from './components/home/Search'
import LikedComponent from "./components/liked/LikedComponent";
import Login from "./components/userAuth/Login";
import SignUp from "./components/userAuth/SignUp";
import User from "./components/userAuth/User";
// import createProduct from "./admin/createProduct";
import CreateProducts from "./admin/CreateProducts";
import Admin from "./admin/Admin";
import UsersByAdmin from "./admin/UsersByAdmin";
import ProductCreation from "./admin/ProductCreation";
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
            path:'/user',
            element:<User/>
        },
        {
            path:"/product/new",
            element:<CreateProducts/>
        },
        {
            path:"/admin",
            element:<Admin/>
        },
        {
            path:'/admin/users',
            element:<UsersByAdmin/>
        },
        {
            path:'/admin/product/creation',
            element:<ProductCreation/>
        },
       
       
        
    ]

    }

])
// export default App;