import { Card, CardActions, CardMedia, Button, Typography, CardContent } from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { formatDate } from "../../util";

export default ({post, onDelete}) => {
    const {_id: id, title, creator, createdAt, selectedFile, tags, message, likeCount} = post;

    return (
        <Card className="flex flex-col justify-between rounded-2xl h-full relative">
            <CardMedia className="h-48 pt-16 bg-blend-darken" image={selectedFile} title={title}>
                <div className="absolute top-5 left-5 text-gray-800">
                    <Typography variant="h6">{creator}</Typography>
                    <Typography variant="body2">{formatDate(createdAt)}</Typography>
                </div>
                <div className="absolute top-5 right-5 text-white">
                    <Button className="text-white" size="small" onClick={() => {}}>
                        <MoreHorizIcon className="text-white"/>
                    </Button>
                </div>
            </CardMedia>
            
            <div className="flex justify-between m-5">
                <Typography variant="body2" color="textSecondary">{tags}</Typography>
            </div>
            <Typography className="py-0 px-4" variant="h5" gutterBottom>{title}</Typography>
            <CardContent>
                <Typography className="p-0" variant="h5" gutterBottom>{message}</Typography>
            </CardContent>
            <CardActions className="flex justify-between pt-0 pb-2 px-4">
                <Button size="small" color="primary" onClick={() => {}}>
                    <ThumbUpAltIcon fontSize="small"/> Like {likeCount}
                </Button>
                <Button size="small" color="primary" onClick={(event) => onDelete(event, id)}>
                    <DeleteIcon fontSize="small"/>
                </Button>
            </CardActions>
        </Card>
    )
}