import { useState, useEffect } from "react";
import FileBase64 from "react-file-base64";
import { TextField, Button, Typography, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { createPostApi, updatePostApi } from "../../api";
import TagInput from "../TagInput/TagInput";

export default () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const post = useSelector(state => id ? state.posts.items.find(post => post._id === id) : null)
    const [postData, setPostData] = useState({
        creator: '',
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
        setPostData({creator: '', title: '', message: '', tags: [], selectedFile: ''})
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if ( id ) {
            dispatch(updatePostApi({...postData, id}))         
            navigate('/')
        }
        else {
            dispatch(createPostApi(postData))
            navigate('/')
        }

        clearData()
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

    return (
        <Paper>
            <form className="flex flex-col gap-5 p-8 " autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Typography variant="h6">{id ? <div className="flex justify-between">Edit Memory <Button className="!min-w-0" component={Link} to="/"><ArrowBackIcon/></Button></div> : 'Creating a Memory'}</Typography>
                <TextField name="creator" variant="outlined" label="Creator" fullWidth onChange={(event) => handlePostData(event.target.value, 'creator')} value={postData.creator}/>
                <TextField name="title" variant="outlined" label="Title" fullWidth onChange={(event) => handlePostData(event.target.value, 'title')} value={postData.title}/>
                <TextField name="message" variant="outlined" label="Message" fullWidth onChange={(event) => handlePostData(event.target.value, 'message')} value={postData.message}/>
                <TagInput tags={postData.tags} onDelete={handleTagDelete} onKeyDown={handleTagKeyEvent}/>
                <div>
                    <FileBase64 type="file" multiple={false} onDone={({base64}) => handlePostData(base64, 'selectedFile')} />
                </div>
                <Button variant="contained" color="primary" size="large" type="submit">{id ? 'Update' : 'Submit'}</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clearData}>Clear</Button>
            </form>
        </Paper>
    )
}