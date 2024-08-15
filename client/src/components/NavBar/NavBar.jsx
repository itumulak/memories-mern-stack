import { useEffect, useState } from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import { AppBar, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';

import memoriesImg from "../../assets/images/memories.png"

export default () => {
    const navigate = useNavigate()
    const user = useSelector(state => state.auth)
    const [userName, setUserName] = useState('')
    
    useEffect(() => {
              
    }, [user])

    const handleLogout = () => {
        // dispatch(logout())
        navigate('/')
    }

    return (
        <AppBar className="rounded-xl mt-8 mx-0 py-4 flex !flex-row items-center justify-between text-center h-full px-6"  position="static" color="inherit">
            <div className="flex flex-row items-center">
                <img className="ml-4 w-16 h-full" src={memoriesImg} alt="memories"/>
                <Typography component={Link} to="/" className="text-cyan-400" variant="h3" align="center">Memories</Typography>
            </div>
            {user.isLogin ? 
                <Button onClick={handleLogout} variant="contained" color="error">Logout</Button> : 
                <Button component={Link} to="/auth" variant="contained" size="medium">Login</Button>
            }
        </AppBar> 
    )
}