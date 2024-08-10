import { useState } from "react";
import { Grid, TextField, InputAdornment, IconButton } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default ({name, label, type, handleShowPassword = {}, ...props}) => {
    const [showPassword, setShowPassword] = useState(false)

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    return (
        <Grid item xs={12} sm={isHalf ? 6 : 12}>
            <TextField
                name={name}
                label={label}
                type={type}
                InputProps={type === 'password' && {
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={handleShowPassword}>
                                {showPassword ? <VisibilityIcon/> : <VisibilityOffIcon/>}
                            </IconButton>
                        </InputAdornment>
                    )
                }}
                {...props}
            />
        </Grid>
    )
}