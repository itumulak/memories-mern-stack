
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardActions, CardMedia, Button, Typography, CardContent, ButtonBase, CircularProgress } from "@mui/material";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import DeleteIcon from "@mui/icons-material/Delete";

import { likePostApi } from "../../api";
import { formatDate } from "../../util";

export default ({post, onDelete}) => {
    const {_id: id, creator, title, name, createdAt, selectedFile, tags, message, likes, likeCount} = post;
    const dispatch = useDispatch();
    const isLogin = useSelector(state => state.auth.isLogin)  
    const userId = useSelector(state => state.auth.id)
    const [updatingLike, setUpdatingLike] = useState(false)
    const [isLike, setIsLike] = useState(false)
    
    useEffect(() => {
        if ( likes.includes(userId) ) {
            setIsLike(true)
        }        
    }, [])

    const handleLikePost = (id) => {
        setUpdatingLike(true)

        dispatch(likePostApi(id)).then(response => {
            if (!response.error) {
                setIsLike(!isLike)
                setUpdatingLike(false)
            }
        })
    }

    return (
            <Card key={post._id} className="w-full flex flex-col justify-between rounded-2xl h-full relative">
                <ButtonBase className="w-full h-auto flex flex-col" LinkComponent={Link} to={`/${id}`}> 
                    <CardMedia className="h-48 w-full pt-16 bg-blend-darken" image={selectedFile} title={title}/>
                    <div className="w-full p-4">
                        <Typography variant="h5" gutterBottom>{title}</Typography>
                        <div className="flex flex-row gap-x-1 items-center">
                            <Typography variant="body2">{name}</Typography> - <Typography variant="body2">{formatDate(createdAt)}</Typography>
                        </div>
                    </div>
                    <CardContent className="w-full">
                        <Typography className="p-0" variant="body1" gutterBottom>{message}</Typography>
                        <Typography variant="body2" color="textSecondary" className="flex gap-1">{tags.map((tag, index) => <span key={`${tag}${index}`}>#{tag}</span>)}</Typography>
                        <br />
                    </CardContent>
                </ButtonBase>
                <CardActions className="flex justify-between pt-0 pb-2 px-4">
                    <div className="flex gap-x-2">
                        <Button 
                            disabled={isLogin ? false : true} 
                            variant={!isLike ? 'outlined' : 'contained'} 
                            className={`flex flex-row items-center gap-x-1 ${!isLogin ? `!border-neutral-200 !bg-stone-300` : ''}`} 
                            size="small" 
                            color="primary" 
                            onClick={() => isLogin && handleLikePost(id)}
                        >
                            {updatingLike ? <CircularProgress color="warning" size="14px"/> : <>{isLike ? <ThumbUpIcon fontSize="small"/> : <ThumbUpOffAltIcon fontSize="small"/>} {likeCount}</>}
                        </Button>
                    </div>

                    {isLogin && userId === creator &&
                        <ButtonBase size="small" color="primary" onClick={(event) => onDelete(event, id)}>
                            <DeleteIcon fontSize="small" color="error" />
                        </ButtonBase>
                    }
                </CardActions>
            </Card>
    )
}