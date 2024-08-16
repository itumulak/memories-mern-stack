import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { Grow, Container, Grid } from "@mui/material";
import { CircularProgress } from "@mui/material";

import { fetchPostsApi } from "../../api";
import Form from '../../components/Form/Form'
import Posts from '../../components/Posts/Posts'
import NavBar from '../../components/NavBar/NavBar';

export default () => {
    const dispatch = useDispatch()
    const posts = useSelector(state => state.posts.items)
    const totalPosts = useSelector(state => state.posts.total)
    const isFulfilled = useSelector(state => state.posts.fulfilled)   
    const { page } = useParams()

    useEffect(() => {
        let currentPage = page - 1

        dispatch(fetchPostsApi(currentPage))
    }, [dispatch, page])

    return (
        <>
            <NavBar/>
            <Grow in>
                <Container>
                    <Grid minHeight={600} container justifyItems="space-between" alignItems="stretch" spacing={3}>
                    {
                        !isFulfilled ? <div className="m-auto"><CircularProgress/></div> : 
                        <>
                            <Grid item xs={12} sm={4}>
                                <Form/>
                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <Posts posts={posts} totalPosts={totalPosts}/>
                            </Grid>
                        </>
                    }
                    </Grid>
                </Container>
            </Grow>
        </>
    )
}