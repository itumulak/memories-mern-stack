
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardActions, CardMedia, Button, Typography, CardContent, Paper, Fab, Avatar, ButtonBase } from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { likePostApi } from "../../api";
import { formatDate } from "../../util";

export default ({post, onDelete}) => {
    const {_id: id, creator, title, name, createdAt, selectedFile, tags, message, likes, likeCount} = post;
    const dispatch = useDispatch();
    const isLogin = useSelector(state => state.auth.isLogin)  
    const userId = useSelector(state => state.auth.id)
    const [canLike, setCanLike] = useState(true)
    
    useEffect(() => {
        if ( likes.includes(userId) ) {            
            setCanLike(!canLike)
        }
    }, [])

    const handleLikePost = () => {
        dispatch(likePostApi(id)).then(response => {
            if (!response.error) {
                setCanLike(!canLike)
            }
        })
    }

    return (
        <ButtonBase className="w-full h-full" to={`/${id}`}>    
            <Card key={post._id} className="w-full flex flex-col justify-between rounded-2xl h-full relative">
                <CardMedia className="h-48 pt-16 bg-blend-darken" image={selectedFile} title={title}/>
                <div className="pt-6 px-4">
                    <Typography variant="h5" gutterBottom>{title}</Typography>
                    <div className="flex flex-row gap-x-1 items-center">
                        <Typography variant="body2">{name}</Typography> - <Typography variant="body2">{formatDate(createdAt)}</Typography>
                    </div>
                </div>
                <CardContent>
                    <Typography className="p-0" variant="body1" gutterBottom>{message}</Typography>
                    <Typography variant="body2" color="textSecondary" className="flex gap-1">{tags.map((tag, index) => <span key={`${tag}${index}`}>#{tag}</span>)}</Typography>
                    <br />
                    <Typography className="flex items-center gap-2" variant="body2"><ThumbUpIcon color="info" fontSize="small"/> {likeCount}</Typography>
                </CardContent>
                <CardActions className="flex justify-between pt-0 pb-2 px-4">
                    {isLogin &&
                        <Button disabled={!isLogin} variant="contained" className="flex flex-row items-center gap-x-1" size="small" color="primary" onClick={isLogin && handleLikePost}>
                            {canLike ? 
                                <><ThumbUpAltIcon fontSize="small"/> Like</> : 
                                <><ThumbDownIcon fontSize="small"/> Unlike</>
                            }
                        </Button>
                    }
                    {isLogin && userId === creator &&
                        <Button size="small" color="primary" onClick={(event) => onDelete(event, id)}>
                            <DeleteIcon fontSize="small"/>
                        </Button>
                    }
                </CardActions>
            </Card>
        </ButtonBase>
    )
}