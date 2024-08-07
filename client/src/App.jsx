import { useEffect } from "react";
import { Container, AppBar, Typography, Grow, Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { fetchPostsApi } from "./api";
import "./index.css";
import memoriesImg from "./assets/images/memories.png"
import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPostsApi())
    }, [dispatch])

    return (
        <Container maxWidth="lg" className="!flex flex-col gap-y-10">
            <AppBar className="rounded-xl mt-8 mx-0 py-4 flex !flex-row items-center justify-center text-center h-full"  position="static" color="inherit">
                <Typography className="text-cyan-400" variant="h2" align="center">Memories</Typography>
                <img className="ml-4 w-24 h-full" src={memoriesImg} alt="memories"/>
            </AppBar>
            <Grow in>
                <Container>
                    <Grid container justifyItems="space-between" alignItems="stretch" spacing={3}>
                        <Grid item xs={12} sm={7}>
                            <Posts/>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form/>
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>
    )
}

export default App
