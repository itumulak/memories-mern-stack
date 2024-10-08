import { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { createPostApi } from "../../api";
import TagInput from "../TagInput/TagInput";
import { getBase64, loadingDiv } from "../../util";
import Dropzone from '../../components/Dropzone/Dropzone';

export default () => {
    const isLogin = useSelector(state => state.auth.isLogin)
    const [submitting, setSubmitting] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const name = localStorage.getItem('loginName')
    const userId = useSelector(state => state.auth.id)
    const post = useSelector(state => id ? state.posts.items.find(post => post._id === id) : null)
    const [postData, setPostData] = useState({
        title: '',
        message: '',
        tags: [],
        selectedFile: ''
    });    

    useEffect(() => {        
        if ( id && post ) {            
            setPostData({...post})
        }
        else {
            clearData()
        }      
    }, [id, post])    

    const handlePostData = (val, type) => {
        let obj = new Object();
        obj[type] = val;

        setPostData(prevData => {            
            return {...prevData, ...obj}
        });
    }

    const clearData = () => {
        setPostData({title: '', message: '', tags: [], selectedFile: ''})
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        setSubmitting(true)

        dispatch(createPostApi({...postData, creator: userId, name})).then(response => {
            if ( ! response.error ) {
                clearData()
                setSubmitting(false)
            }
        })

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

    const handleDrop = (acceptedFiles) => {
        const image = getBase64(acceptedFiles[0])

        image.then(value => {
            setPostData(prevData => {
                return {...prevData, selectedFile: value}
            })
        })
    }

    return (
        <Paper>
            {isLogin ? 
                <form className="flex flex-col gap-5 p-8 " autoComplete="off" noValidate onSubmit={handleSubmit}>
                    <Typography variant="h6">{id ? <div className="flex justify-between">Edit Memory <Button className="!min-w-0" component={Link} to="/"><ArrowBackIcon/></Button></div> : 'Create your Memory'}</Typography>
                    <TextField name="title" variant="outlined" label="Title" fullWidth onChange={(event) => handlePostData(event.target.value, 'title')} value={postData.title}/>
                    <TextField name="message" variant="outlined" label="Message" fullWidth onChange={(event) => handlePostData(event.target.value, 'message')} value={postData.message}/>
                    <TagInput tags={postData.tags} onDelete={handleTagDelete} onKeyDown={handleTagKeyEvent}/>
                    <Dropzone onDrop={handleDrop} file={postData.selectedFile}/>
                    <Button disabled={submitting} variant="contained" color="primary" size="large" type="submit">{submitting ? loadingDiv('Submitting') : 'Submit'}</Button>
                    <Button variant="contained" color="secondary" size="small" onClick={clearData}>Clear</Button>
                </form> : 
                <div className="flex flex-col gap-y-2 items-center justify-center min-h-96">
                    <Typography variant="body1">You are not logged in.</Typography>
                    <Button variant="contained" size="small" component={Link} to="/auth">Login</Button>
                </div>
            }
        </Paper>
    )
}