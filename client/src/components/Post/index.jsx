
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Card, CardActions, CardMedia, Button, Typography, CardContent, Paper } from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import { likePostApi } from "../../api";
import { formatDate } from "../../util";

export default ({post, onDelete}) => {
    const {_id: id, title, creator, createdAt, selectedFile, tags, message, likeCount} = post;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLikePost = () => {
        dispatch(likePostApi(id))
    }

    return (
        <Card className="flex flex-col justify-between rounded-2xl h-full relative">
            <CardMedia className="h-48 pt-16 bg-blend-darken" image={selectedFile} title={title}>
                <div className="absolute top-5 right-1">
                    <Button className="text-white" size="small" onClick={() => navigate(`/edit/${id}`)}>
                        <Paper className="p-1">
                            <EditIcon fontSize="small" style={{color: 'black'}} className="text-white"/>    
                        </Paper>
                    </Button>
                </div>
            </CardMedia>
            <div className="pt-6 px-4">
                <Typography variant="h5" gutterBottom>{title}</Typography>
                <div className="flex flex-row gap-x-1 items-center">
                    <Typography variant="body2">{creator}</Typography> - <Typography variant="body2">{formatDate(createdAt)}</Typography>
                </div>
            </div>
            <CardContent>
                <Typography className="p-0" variant="body1" gutterBottom>{message}</Typography>
                <Typography variant="body2" color="textSecondary" className="flex gap-1">{tags.map(tag => <span>#{tag}</span>)}</Typography>
            </CardContent>
            <CardActions className="flex justify-between pt-0 pb-2 px-4">
                <Button className="flex flex-row items-center gap-x-1" size="small" color="primary" onClick={handleLikePost}>
                    <ThumbUpAltIcon fontSize="small"/> Like {likeCount}
                </Button>
                <Button size="small" color="primary" onClick={(event) => onDelete(event, id)}>
                    <DeleteIcon fontSize="small"/>
                </Button>
            </CardActions>
        </Card>
    )
}