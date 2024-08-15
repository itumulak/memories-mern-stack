
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardActions, CardMedia, Button, Typography, CardContent, Paper, Fab, Avatar } from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { likePostApi } from "../../api";
import { formatDate } from "../../util";
import { useEffect, useState } from "react";

export default ({post, onDelete}) => {
    const {_id: id, title, name, createdAt, selectedFile, tags, message, likes, likeCount} = post;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLogin = useSelector(state => state.auth.isLogin)  
    const userId = useSelector(state => state.auth.id)
    const [canLike, setCanLike] = useState(true)
    
    useEffect(() => {
        if ( likes.includes(userId) ) {            
            setCanLike(!canLike)          
        }
    }, [post, userId])

    const handleLikePost = () => {
        dispatch(likePostApi(id))
    }

    return (
        <Card key={post._id} className="flex flex-col justify-between rounded-2xl h-full relative">
            <CardMedia className="h-48 pt-16 bg-blend-darken" image={selectedFile} title={title}>
                <div className="absolute top-5 right-1">
                    {isLogin && 
                        <Button className="text-white" size="small" onClick={() => navigate(`/edit/${id}`)}>
                            <Paper className="p-1">
                                <EditIcon fontSize="small" style={{color: 'black'}} className="text-white"/>    
                            </Paper>
                        </Button>
                    }
                    
                </div>
            </CardMedia>
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
                <Button disabled={!isLogin} variant="contained" className="flex flex-row items-center gap-x-1" size="small" color="primary" onClick={isLogin && handleLikePost}>
                    {canLike ? 
                        <><ThumbUpAltIcon fontSize="small"/> Like</> : 
                        <><ThumbDownIcon fontSize="small"/> Unlike</>
                    }
                </Button>
                {isLogin &&
                    <Button size="small" color="primary" onClick={(event) => onDelete(event, id)}>
                        <DeleteIcon fontSize="small"/>
                    </Button>
                }
            </CardActions>
        </Card>
    )
}