
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardActions, CardMedia, Button, Typography, CardContent, Paper, Fab, Avatar, ButtonBase, CircularProgress } from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { likePostApi } from "../../api";
import { formatDate } from "../../util";

export default ({post, onDelete}) => {
    const {_id: id, creator, title, name, createdAt, selectedFile, tags, message, likes, likeCount} = post;
    const dispatch = useDispatch();
    const isLogin = useSelector(state => state.auth.isLogin)  
    const userId = useSelector(state => state.auth.id)
    const [canLike, setCanLike] = useState(true)
    const [liking, setLiking] = useState(false)
    
    useEffect(() => {
        if ( likes.includes(userId) ) {            
            setCanLike(!canLike)
        }
    }, [])

    const handleLikePost = () => {
        setLiking(true)

        dispatch(likePostApi(id)).then(response => {
            if (!response.error) {
                setCanLike(!canLike)
                setLiking(false)
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
                    {isLogin &&
                        <div className="flex gap-x-2">
                            <Button disabled={liking} variant={liking ? 'outlined' : 'contained'} className="flex flex-row items-center gap-x-1" size="small" color="primary" onClick={isLogin && handleLikePost}>
                                {canLike ? 
                                    liking ? <><CircularProgress size="14px"/> Liking</> : <><ThumbUpAltIcon fontSize="small"/> Like</> : 
                                    liking ? <><CircularProgress size="14px"/> Unliking</> : <><ThumbDownIcon fontSize="small"/> Unlike</>
                                }
                            </Button>
                            <Typography className="flex items-center gap-2" variant="body2">{likeCount  > 0 ? `${likeCount} liked it.` : ''} </Typography>
                        </div>
                    }
                    {isLogin && userId === creator &&
                        <ButtonBase size="small" color="primary" onClick={(event) => onDelete(event, id)}>
                            <DeleteIcon fontSize="small" color="error" />
                        </ButtonBase>
                    }
                </CardActions>
            </Card>
    )
}