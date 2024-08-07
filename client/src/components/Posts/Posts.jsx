import { useSelector } from "react-redux";
import { CircularProgress, Grid } from "@mui/material";
import Post from "../Post/Post";

export default () => {
    const posts = useSelector(state => state.posts.items)
    
    return (
       !posts.length ? <CircularProgress/> :
            <Grid container alignItems="stretch" spacing={3}>
                {posts.map(post => (
                    <Grid key={post._id} item xs={12} sm={6}>
                        <Post post={post}/>
                    </Grid>
                ))}
            </Grid>
    )
}