import { createBrowserRouter } from "react-router-dom";
import App from "../App";

export default  createBrowserRouter([
    {
        path: '/',
        element: <App/>
    },
    {
        path: '/edit/:id',
        element: <App/>
    },
    {
        path: '*',
        element: 'Not valid'
    }
])