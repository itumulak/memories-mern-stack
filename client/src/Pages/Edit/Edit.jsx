import { Paper, TextField, Typography } from "@mui/material"
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import NavBar from "../../components/NavBar/NavBar"
import TagInput from "../../components/TagInput/TagInput";
import { SkeletonPage } from "../../components/Skeleton/Skeleton";
import Dropzone from "../../components/Dropzone/Dropzone"
import { DivParent } from "../View/styles"
import { fetchPostApi, updatePostApi } from "../../api";
import { formatDate, getBase64, handleObjectDataChange } from "../../util";
import PageActions from "../../components/PageActions/PageActions";

export default () => {
    const [isLoading, setIsLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)
    const [postData, setPostData] = useState({})
    const { id } = useParams()
    const auth = useSelector(state => state.auth)
    const post = useSelector(state => state.post)
    const dispatch = useDispatch()
    const navigate = useNavigate()    

    useEffect(() => {
        dispatch(fetchPostApi(id)).then((response) => {
            setIsLoading(false)

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
            }
        })
    }, [])

    const handleFieldChange = (val, type) => {
        setPostData(prevData => handleObjectDataChange(val, type, prevData))
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

    const handleDrop = useCallback((acceptedFiles) => {
        const image = getBase64(acceptedFiles[0])
        image.then(value => {
            setPostData(prevData => {
                return {...prevData, image: value}
            })
        })
    })

    const handleUpdate = () => {
        setSubmitting(true)
        dispatch(updatePostApi({
            ...post, 
            id,
            title: postData.title, 
            tags: postData.tags,
            creator: auth.userId, 
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
                <DivParent className="gap-y-5 gap-x-12">
                    {isLoading ?
                        <SkeletonPage/> :
                        auth.isLogin ?
                            <>
                                <TextField className="title-area" fullWidth required onChange={(e) => handleFieldChange(e.target.value, 'title')} value={postData.title} />
                                <TagInput
                                    className="tags-area"
                                    fullWidth 
                                    onDelete={handleTagDelete} 
                                    onKeyDown={handleTagKeyEvent} 
                                    tags={postData.tags} 
                                />
                                <TextField className="description-area" fullWidth required onChange={(e) => handleFieldChange(e.target.value, 'description')} value={postData.description} />
                                <Typography className="pt-2" variant="caption">{`Created by ${postData.author} - ${formatDate(postData.createdAt)}`}</Typography>
                                <div className="image-area">
                                    <Dropzone onDrop={handleDrop} file={postData.image}/>
                                </div>
                                <div className="actions-area h-12 flex justify-between">
                                    <PageActions id={id} submitting={submitting} onUpdate={handleUpdate} edit={true}/>
                                </div>
                            </>
                        : navigate(`/${id}`)
                    }
                </DivParent>
            </Paper>
        </>
    )
}