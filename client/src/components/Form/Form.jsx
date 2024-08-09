import { useState, useEffect } from "react";
import FileBase64 from "react-file-base64";
import { TextField, Button, Typography, Paper } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { WithContext as TagsField, SEPARATORS } from "react-tag-input";

import { createPostApi, updatePostApi } from "../../api";

export default () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const post = useSelector(state => id ? state.posts.items.find(post => post._id === id) : null)
    const [postData, setPostData] = useState({
        creator: '',
        title: '',
        message: '',
        tags: '',
        selectedFile: ''
    });
    const [tags, setTags] = useState([])

    useEffect(() => {
        if ( id && post ) {            
            setPostData({...post})
        }        
    }, [id, post])

    useEffect(() => {
        const currTags = []
        Object.keys(postData.tags).forEach(key => currTags.push({id: postData.tags[key], text: postData.tags[key], className: ''}))
        
        if (currTags.length > 0) {
            setTags(currTags)    
        }
    }, [postData])
    

    const handlePostData = (val, type) => {
        let obj = new Object();
        obj[type] = val;

        setPostData(prevData => {            
            return {...prevData, ...obj}
        });
    }

    const clearData = () => {
        setPostData({creator: '', title: '', message: '', tags: '', selectedFile: ''})
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const currTags = []
        Object.keys(tags).forEach(key => currTags.push(tags[key].text))

        console.log(currTags);
        
        
        // if ( id ) {
        //     dispatch(updatePostApi({...postData, id}))         
        //     navigate('/')
        // }
        // else {
        //     dispatch(createPostApi(postData))
        //     navigate('/')
        // }

        // clearData()
    }

    const handleTagDelete = (index) => {
        setTags(tags.filter((_, i) => i !== index))
    }

    const handleTagAddition = (tags) => {
        setTags((prevTags) => {
            return [...prevTags, tags];
        })
    }

    const handleTagDrag = (tags, currPos, newPos) => {
        const newTags = tags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tags);
        setTags(newTags);
    }

    const handleTagClick = (index) => {
        console.log('The tag at index ' + index + ' was clicked'); 
    }

    const onClearAll = () => {
        setTags([])
    }

    const onTagUpdate = (index, newTag) => {
        const updatedTags = [...tags];
        updatedTags.splice(index, 1, newTag);
        setTags(updatedTags);
    }

    const removeTabBtn = ({className, onRemove}) => {
        return (
            <button className={`${className} ml-1`} onClick={onRemove}>
                <CloseIcon fontSize="small"/>
            </button>
        )
    }

    return (        
        <Paper>
            <form className="flex flex-col gap-5 p-8 " autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Typography variant="h6">{id ? 'Edit Memory' : 'Creating a Memory'}</Typography>
                <TextField name="creator" variant="outlined" label="Creator" fullWidth onChange={(event) => handlePostData(event.target.value, 'creator')} value={postData.creator}/>
                <TextField name="title" variant="outlined" label="Title" fullWidth onChange={(event) => handlePostData(event.target.value, 'title')} value={postData.title}/>
                <TextField name="message" variant="outlined" label="Message" fullWidth onChange={(event) => handlePostData(event.target.value, 'message')} value={postData.message}/>
                <TagsField
                    tags={tags}
                    handleDelete={handleTagDelete}
                    handleAddition={handleTagAddition}
                    handleDrag={handleTagDrag}
                    handleTagClick={handleTagClick}
                    onTagUpdate={onTagUpdate}
                    removeComponent={removeTabBtn}
                    inputFieldPosition="bottom"
                    editable
                    clearAll
                    onClearAll={onClearAll}
                    maxTags={5}
                    classNames={{
                        tagInputField: 'bg-white px-4 py-2 border-2 border-solid border-gray rounded w-full mt-2',
                        tag: 'mr-1 mb-8 border-2 border-solid border-grey p-1'
                    }}
                />
                <div>
                    <FileBase64 type="file" multiple={false} onDone={({base64}) => handlePostData(base64, 'selectedFile')} />
                </div>
                <Button variant="contained" color="primary" size="large" type="submit">{id ? 'Update' : 'Submit'}</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clearData}>Clear</Button>
            </form>
        </Paper>
    )
}