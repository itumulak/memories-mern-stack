import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Paper, Typography } from "@mui/material"

import NavBar from "../../components/NavBar/NavBar"
import { fetchPostApi, updatePostApi } from "../../api";
import { DivParent } from './styles';
import { formatDate } from "../../util";
import PageActions from "../../components/PageActions/PageActions";
import { SkeletonPage } from "../../components/Skeleton/Skeleton";

export default () => {
    const [isLoading, setIsLoading] = useState(true)
    const [editMode, setEditMode] = useState(false)
    const [postData, setPostData] = useState({})
    const [submitting, setSubmitting] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const { id } = useParams()
    const userId = useSelector(state => state.auth.id)
    const isLogin = useSelector(state => state.auth.isLogin)
    const post = useSelector(state => state.post)

    useEffect(() => {
        setIsLoading(true)
        dispatch(fetchPostApi(id)).then(response => {
            if ( !response.error ) {
                const { title, tags, createdAt, likeCount, message: description, name: author, selectedFile: image } = response.payload
                setPostData(prevData => {
                    return {
                        ...prevData,
                        title,
                        tags,
                        createdAt,
                        likeCount,
                        description,
                        author,
                        image
                     }
                })


                if ( location.pathname.includes('/edit')  ) {
                    if ( isLogin ) {
                        setEditMode(true)
                    }
                    else {
                        navigate(`/${id}`)
                    }
                }
                else {
                    setEditMode(false)
                }
                setIsLoading(false)

            }
        })
        
    }, [dispatch, isLogin, location])

    const handleUpdate = () => {
        setSubmitting(true)
        dispatch(updatePostApi({
            ...post, 
            id,
            title: postData.title, 
            tags: postData.tags,
            creator: userId, 
            name: post.author,
            message: postData.description,
            selectedFile: postData.image 
        })).then(response => {
            if (!response.error) {
                setSubmitting(false)
                navigate(`/${id}`)
            }
        })
    }

    return (
        <>
            <NavBar/>
            <Paper className="p-8">
                <DivParent className="gap-x-12">
                    {isLoading ?
                        <SkeletonPage/> :
                        <>
                            <Typography className="title-area content-center border-b-2 pb-2" variant="h5">{post.title}</Typography>
                            <Typography className="tags-area pt-2 text-xs" color="GrayText" gutterBottom>
                                {post.tags.map((tag, index) => <span key={`${tag}${index}`}>#{tag} </span>)}
                            </Typography>
                            <Typography className="description-area border-b-2 pb-2 text-xl">
                                {post.description}
                            </Typography>
                            <Typography className="meta-area pt-2" variant="caption">{`Created by ${post.author} - ${formatDate(postData.createdAt)}`}</Typography>

                            <div className="image-area">
                                <img className="rounded" src={post.image}/>     

                            </div>
                            <div className="actions-area h-8 flex justify-between">
                                <PageActions id={id} submitting={submitting} onUpdate={handleUpdate} edit={false}/>
                            </div>
                        </>
                    }
                    
                </DivParent>
            </Paper>
        </>
    )
}