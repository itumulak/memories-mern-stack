import { Link } from 'react-router-dom';
import { AppBar, Button, Typography } from "@mui/material";
import memoriesImg from "../../assets/images/memories.png"

export default () => {
    return (
        <AppBar className="rounded-xl mt-8 mx-0 py-4 flex !flex-row items-center justify-between text-center h-full px-6"  position="static" color="inherit">
            <div className="flex flex-row items-center">
                <img className="ml-4 w-16 h-full" src={memoriesImg} alt="memories"/>
                <Typography component={Link} to="/" className="text-cyan-400" variant="h3" align="center">Memories</Typography>
            </div>
            <Button component={Link} to="/auth" variant="contained" size="medium">Login</Button>
        </AppBar> 
    )
}