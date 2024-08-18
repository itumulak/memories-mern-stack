import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Grow, Paper, Typography } from "@mui/material"

import NavBar from "../../components/NavBar/NavBar"
import { fetchPostApi } from "../../api";
import { DivParent } from './styles';
import { formatDate } from "../../util";

export default () => {
    const dispatch = useDispatch()
    const { id } = useParams()
    const [editMode, setEditMode] = useState(false)
    const userId = useSelector(state => state.auth.id)
    const post = useSelector(state => state.post)
    const [postData, setPostData] = useState({
        title: '',
        message: '',
        tags: [],
        selectedFile: '',
        author: '',
        createdAt: ''
    })

    useEffect(() => {
        if ( id ) {
            dispatch(fetchPostApi(id))            
        }
    }, [])

    return (
        <>
            <NavBar/>
            <Grow in>
                <Paper className="p-8">
                    <DivParent className="gap-x-12">
                        <Typography className="title-area border-b-2 pb-2" variant="h5">{post.title}</Typography>
                        <Typography className="tags-area pt-2 text-xs" color="GrayText" gutterBottom>{post.tags.map((tag, index) => <span key={`${tag}${index}`}>#{tag} </span>)}</Typography>
                        <Typography className="description-area border-b-2 pb-2 text-xl">{post.description}</Typography>
                        <Typography className="meta-area pt-2" variant="caption">Created by {post.author} - {formatDate(post.createdAt)}</Typography>                     
                        <div className="image-area">
                            <img className="rounded" src={post.image}/>
                        </div>
                    </DivParent>
                </Paper>
            </Grow>
        </>
    )
}