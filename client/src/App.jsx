import { Container } from "@mui/material";
import "./index.css";
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";

function App() {
    return (
        <Container maxWidth="lg" className="!flex flex-col gap-y-10">
            <NavBar/>
            <Home/>
        </Container>
    )
}

export default App
