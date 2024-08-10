import { Link } from 'react-router-dom';
import { AppBar, Typography } from "@mui/material";
import memoriesImg from "../../assets/images/memories.png"

export default () => {
    return (
        <AppBar className="rounded-xl mt-8 mx-0 py-4 flex !flex-row items-center justify-center text-center h-full"  position="static" color="inherit">
            <Typography component={Link} to="/" className="text-cyan-400" variant="h2" align="center">Memories</Typography>
            <img className="ml-4 w-24 h-full" src={memoriesImg} alt="memories"/>
        </AppBar>
    )
}