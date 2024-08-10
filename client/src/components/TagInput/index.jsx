import DownShift from "downshift";
import { TextField, Chip } from "@mui/material";

export default ({tags, onDelete, onKeyDown, ...props}) => {
    return (
        <TextField {...props} name="tags" label="Tags" onKeyDown={(e) => onKeyDown(e, e.target.value)} InputProps={{startAdornment: tags && tags.map(item => <Chip key={item} tabIndex={-1} label={item} onDelete={(e) => onDelete(e, item)} />)}} />
    )
}