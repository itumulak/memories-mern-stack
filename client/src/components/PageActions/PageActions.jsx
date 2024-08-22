import { useState } from "react";
import { createPortal } from "react-dom";
import { Dialog, DialogContent, DialogContentText, DialogActions, Button, ButtonBase, ButtonGroup, DialogTitle } from "@mui/material"
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { deletePostApi } from "../../api";

export default ({id, authorId, submitting, onUpdate, edit}) => {
    const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false)
    const [editMode, setEditMode] = useState(edit || false)
    const user = useSelector(state => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleConfirmDelete = (id) => {
        setIsOpenDeleteDialog(false)
        dispatch(deletePostApi(id)).then(response => {
            if ( ! response.error ) {
                navigate('/')
            }
        })
    }
    
    const handleCloseDialog = () => {
        setIsOpenDeleteDialog(false) 
    }

    const handleDelete = (event) => {        
        event.preventDefault()
        setIsOpenDeleteDialog(true)
    }

    const handleCancelEdit = () => {
        setEditMode(false)
        navigate(`/${id}`)
    }

    const handleEdit = () => {
        setEditMode(true)
        navigate(`/${id}/edit`)
    }

    return (
        <>
            {user.isLogin && user.id === authorId && (
                <>
                    <ButtonBase onClick={(e) => handleDelete(e, id)}>
                        <DeleteIcon color="error" />
                    </ButtonBase>
                    {editMode ? (
                        <ButtonGroup variant="contained">
                            <Button variant={submitting ? 'outlined' : 'contained'} disabled={submitting} size="small" onClick={onUpdate}>
                                {submitting ? 'Saving...' : 'Save'}
                            </Button>
                            <Button size="small" color="error" onClick={handleCancelEdit}>
                                <CancelIcon />
                            </Button>
                        </ButtonGroup>
                    ) : (
                        <ButtonBase 
                            className="!py-4 !text-blue-600 !hover:text-blue-800 !visited:text-blue-600"
                            onClick={handleEdit}
                            variant="text"
                        >
                            Edit
                        </ButtonBase>
                    )}
                </>
            )}
            {createPortal(
                <Dialog open={isOpenDeleteDialog} onClose={handleCloseDialog} aria-labelledby="confirm-delete-title" aria-describedby="confirm-delete-description">
                    <DialogTitle id="confirm-delete-title">Confirm Delete</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="confirm-delete-description">
                            Are you sure you want to delete this memory?
                        </DialogContentText>
                        <DialogActions>
                            <Button onClick={() => handleConfirmDelete(id)}>Confirm</Button>
                            <Button onClick={() => handleCloseDialog()}>Cancel</Button>
                        </DialogActions>
                    </DialogContent>
                </Dialog>,
                document.getElementById('dialog')
            )}
        </>
    )
}