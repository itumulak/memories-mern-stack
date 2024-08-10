import { useEffect } from "react";
import { Container, Grow, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import { fetchPostsApi } from "./api";
import "./index.css";
import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";
import NavBar from "./components/NavBar/NavBar";

function App() {
    const dispatch = useDispatch();
    const posts = useSelector(state => state.posts.items)

    useEffect(() => {
        dispatch(fetchPostsApi())
    }, [dispatch])

    return (
        <Container maxWidth="lg" className="!flex flex-col gap-y-10">
            <NavBar/>
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
