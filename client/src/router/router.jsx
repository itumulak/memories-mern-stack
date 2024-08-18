import { createBrowserRouter } from "react-router-dom";
import Auth from "../Pages/Auth/Auth";
import Home from "../Pages/Home/Home";
import View from "../Pages/View/View";
import Edit from "../Pages/Edit/Edit";

export default  createBrowserRouter([
    {
        path: '/',
        element: <Home/>
    },
    {
        path: '/page/:page',
        element: <Home/>
    },
    {
        path: '/edit/:id',
        element: <Home/>
    },
    {
        path: '/:id',
        element: <View/>  
    },
    {
        path: '/:id/edit',
        element: <Edit/>  
    },
    {
        path: '/auth',
        element: <Auth/>
    },
    {
        path: '*',
        element: 'Not valid'
    }
])