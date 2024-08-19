import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button, ButtonBase, ButtonGroup, Grow, Paper, Skeleton, TextField, Typography } from "@mui/material"
import CancelIcon from '@mui/icons-material/Cancel';

import NavBar from "../../components/NavBar/NavBar"
import { fetchPostApi, updatePostApi } from "../../api";
import { DivParent } from './styles';
import { formatDate, getBase64, handleObjectDataChange } from "../../util";
import TagInput from "../../components/TagInput/TagInput";
import Dropzone from '../../components/Dropzone/Dropzone';

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

    const handleDrop = useCallback((acceptedFiles) => {
        const image = getBase64(acceptedFiles[0])
        image.then(value => {
            setPostData(prevData => {
                return {...prevData, image: value}
            })
        })
    })

    useEffect(() => {
        setIsLoading(true)
        dispatch(fetchPostApi(id)).then(response => {
            if ( !response.error ) {
                setIsLoading(false)
                setPostData(post)

                if ( location.pathname.includes('/edit')  ) {
                    setEditMode(true)
                }
                else {
                    setEditMode(false)
                }
            }
        })
        
    }, [dispatch, isLogin, location])

    const handleEdit = () => {
        setEditMode(true)
        navigate(`/${id}/edit`)
    }

    const handleCancelEdit = () => {
        navigate(`/${id}`)
    }

    const handleTagDelete = (e, item) => {
        e.preventDefault()     
        const updatedTags = [...postData.tags]
        updatedTags.splice(updatedTags.indexOf(item), 1)
        
        setPostData({...postData, tags: updatedTags}) 
    }

    const handleTagKeyEvent = (e) => {
        if ( e.key === 'Enter' ) {            
            e.preventDefault()
            const newTag = e.target.value
            const currTags = postData.tags

            setPostData((prevData) => {
                return {...prevData, tags: [...currTags, newTag]}
            }, e.target.value = '')
        }
    }

    const handleFieldChange = (val, type) => {
        setPostData(prevData => handleObjectDataChange(val, type, prevData))
    }

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
            <Grow in>
                <Paper className="p-8">
                    <DivParent className="gap-x-12">
                        {isLoading ?
                            <Skeleton className="title-area" height={60}/> : 
                            editMode ?
                                <TextField fullWidth required onChange={(e) => handleFieldChange(e.target.value, 'title')} value={postData.title} /> :
                                <Typography className="title-area content-center border-b-2 pb-2" variant="h5">{post.title}</Typography>
                            
                        }
                        {isLoading ?
                            <Skeleton className="tags-area" /> :
                            editMode ?
                                <TagInput 
                                    fullWidth 
                                    onDelete={handleTagDelete} 
                                    onKeyDown={handleTagKeyEvent} 
                                    tags={postData.tags} 
                                /> :
                                <Typography className="tags-area pt-2 text-xs" color="GrayText" gutterBottom>
                                    {post.tags.map((tag, index) => <span key={`${tag}${index}`}>#{tag} </span>)}
                                </Typography>
                        }
                        {isLoading ?
                            <div className="description-area">{Array.from({length: 15}).map((_, i) => <Skeleton key={i} height={10}/>)}</div> :
                            editMode ?
                                <TextField fullWidth required onChange={(e) => handleFieldChange(e.target.value, 'description')} value={postData.description} /> :
                                <Typography className="description-area border-b-2 pb-2 text-xl">
                                    {post.description}
                                </Typography>
                        }
                        {isLoading ?
                            <Skeleton className="meta-area"/> : 
                            <Typography className="meta-area pt-2" variant="caption">{`Created by ${post.author} - ${formatDate(postData.createdAt)}`}</Typography>
                        }
                        <div className="image-area">
                            {isLoading ? 
                                <Skeleton height={300}/> : 
                                editMode ? 
                                    <Dropzone onDrop={handleDrop} file={postData.image}/> :
                                    <img className="rounded" src={post.image}/>
                            }
                        </div>
                        <div className="actions-area mr-0 ml-auto">
                            {isLoading ?
                                <Skeleton width={50} height={50}/> :
                                isLogin && userId === post.authorId ?
                                    !editMode ?
                                        <ButtonBase 
                                            className="!py-4 !text-blue-600 !hover:text-blue-800 !visited:text-blue-600"
                                            onClick={handleEdit}
                                            variant="text"
                                        >Edit</ButtonBase> :
                                        <ButtonGroup variant="contained">
                                            <Button variant={submitting ? `outlined` : `contained`} disabled={submitting} size="small" onClick={handleUpdate}>{submitting ? `Saving...` : `Save`}</Button>
                                            <Button size="small" color="error" onClick={handleCancelEdit}>
                                                <CancelIcon/>
                                            </Button>
                                        </ButtonGroup> : ''
                            }
                        </div>
                    </DivParent>
                </Paper>
            </Grow>
        </>
    )
}