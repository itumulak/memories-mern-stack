import { Container } from "@mui/material";
import { RouterProvider } from 'react-router-dom';

import router from "./router/router";

function App() {
    return (
        <Container maxWidth="lg" className="!flex flex-col gap-y-10">
            <RouterProvider router={router} />
        </Container>
    )
}

export default App
