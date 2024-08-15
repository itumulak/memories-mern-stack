import { useState } from "react";
import { createPortal } from "react-dom";
import { Grid, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Paper } from "@mui/material";
import { useDispatch } from "react-redux";
import { deletePostApi } from "../../api";
import Post from "../Post/Post";

export default ({posts}) => {
    const dispatch = useDispatch();
    const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false)
    const [idToDelete, setIdToDelete] = useState('')    

    const handleDelete = (event, id) => {        
        event.preventDefault()
        setIsOpenDeleteDialog(true)
        setIdToDelete(id)    
    }

    const handleConfirmDelete = (id) => {
        dispatch(deletePostApi(id))
        setIdToDelete('')
        setIsOpenDeleteDialog(false)
    }

    const handleCloseDialog = () => {
        setIsOpenDeleteDialog(false) 
    } 
    
    return (
        <>
            {
                posts.length > 0 ? 
                    <Grid container alignItems="stretch" spacing={3}>
                        {posts.map(post => (
                            <Grid key={post._id} item xs={12} sm={6}>
                                <Post key={post._id} onDelete={handleDelete} post={post}/>
                            </Grid>
                        ))}
                    </Grid> :
                    <Paper>You have no memories.</Paper>
            }
            {createPortal(
                <Dialog open={isOpenDeleteDialog} onClose={handleCloseDialog} aria-labelledby="confirm-delete-title" aria-describedby="confirm-delete-description">
                    <DialogTitle id="confirm-delete-title">Confirm Delete</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="confirm-delete-description">
                            Are you sure you want to delete this memory?
                        </DialogContentText>
                        <DialogActions>
                            <Button onClick={() => handleConfirmDelete(idToDelete)}>Confirm</Button>
                            <Button onClick={() => handleCloseDialog()}>Cancel</Button>
                        </DialogActions>
                    </DialogContent>
                </Dialog>,
                document.getElementById('dialog')
            )}
        </>
    )
}