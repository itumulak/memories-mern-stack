import { createBrowserRouter } from "react-router-dom";
import Auth from "../Pages/Auth/Auth";
import Home from "../Pages/Home/Home";
import EditView from "../Pages/EditView/EditView";

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
        element: <EditView/>  
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