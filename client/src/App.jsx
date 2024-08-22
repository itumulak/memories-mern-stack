import { Container } from "@mui/material";
import { RouterProvider } from 'react-router-dom';
import { useDispatch } from "react-redux";

import router from "./router/router";
import { validateLogin } from "./api";
import { useEffect } from "react";

function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        const token = localStorage.getItem('loginToken')  
        if (token) {
            dispatch(validateLogin({token}))
        }
    }, [dispatch])

    return (
        <Container maxWidth="lg" className="!flex flex-col gap-y-10 py-12">
            <RouterProvider router={router} />
        </Container>
    )
}

export default App
