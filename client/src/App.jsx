import { useEffect } from "react";
import { Container, AppBar, Typography, Grow, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import { fetchPostsApi } from "./api";
import "./index.css";
import memoriesImg from "./assets/images/memories.png"
import Posts from "./components/Posts";
import Form from "./components/Form";

function App() {
    const dispatch = useDispatch();
    const posts = useSelector(state => state.posts.items)

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
                    <Grid minHeight={600} container justifyItems="space-between" alignItems="stretch" spacing={3}>
                    {
                        !posts.length > 0 ? <div className="m-auto"><CircularProgress/></div> : 
                        <>
                            <Grid item xs={12} sm={4}>
                                <Form/>
                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <Posts posts={posts}/>
                            </Grid>
                        </>
                    }
                    </Grid>
                </Container>
            </Grow>
        </Container>
    )
}

export default App
