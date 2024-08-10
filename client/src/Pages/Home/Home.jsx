import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Grow, Container, Grid } from "@mui/material";
import { CircularProgress } from "@mui/material";

import { fetchPostsApi } from "../../api";
import Form from '../../components/Form/Form'
import Posts from '../../components/Posts/Posts'
import NavBar from '../../components/NavBar/NavBar';

export default () => {
    const dispatch = useDispatch();
    const posts = useSelector(state => state.posts.items)

    useEffect(() => {
        dispatch(fetchPostsApi())
    }, [dispatch])

    return (
        <>
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
        </>
    )
}