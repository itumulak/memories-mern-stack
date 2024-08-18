import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Grid, Grow, Paper, Skeleton, Typography } from "@mui/material"

import NavBar from "../../components/NavBar/NavBar"
import { fetchPostApi } from "../../api";
import { DivParent } from './styles';
import { formatDate } from "../../util";

export default () => {
    const [isLoading, setIsLoading] = useState(true)
    const dispatch = useDispatch()
    const { id } = useParams()
    const post = useSelector(state => state.post)

    useEffect(() => {
        if ( id ) {
            dispatch(fetchPostApi(id)).then(response => {
                if ( !response.error ) {
                    setIsLoading(!isLoading)
                }
            })      
        }
    }, [dispatch])

    return (
        <>
            <NavBar/>
            <Grow in>
                <Paper className="p-8">
                    <DivParent className="gap-x-12">
                        <Typography className="title-area border-b-2 pb-2" variant="h5">{isLoading ? <Skeleton height={60}/> : post.title}</Typography>
                        <Typography className="tags-area pt-2 text-xs" color="GrayText" gutterBottom>{isLoading ? <Skeleton/> : post.tags.map((tag, index) => <span key={`${tag}${index}`}>#{tag} </span>)}</Typography>
                        <Typography className="description-area border-b-2 pb-2 text-xl">{isLoading ? Array.from({length: 15}).map((_, i) => <Skeleton key={i} height={10}/>) : post.description}</Typography>
                        <Typography className="meta-area pt-2" variant="caption">{isLoading ? <Skeleton/> : `Created by ${post.author} - ${formatDate(post.createdAt)}`}</Typography>                     
                        <div className="image-area">
                            {isLoading ? <Skeleton height={300}/> : <img className="rounded" src={post.image}/>}
                        </div>
                    </DivParent>
                </Paper>
            </Grow>
        </>
    )
}