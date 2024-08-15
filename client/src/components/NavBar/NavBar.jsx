import { useEffect, useState } from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import { AppBar, Button, Grow, Typography } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';

import memoriesImg from "../../assets/images/memories.png"
import { logout } from '../../redux/slices/authSlice';

export default () => {
    const [userName, setUserName] = useState('')
    const user = useSelector(state => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    useEffect(() => {
        setUserName(localStorage.getItem('loginName'))
    }, [user])

    const handleLogout = () => {        
        dispatch(logout())
        navigate('/')
    }

    return (
        <Grow in>
            <AppBar className="rounded-xl mt-8 mx-0 py-4 flex !flex-row items-center justify-between text-center h-full px-6"  position="static" color="inherit">
                <div className="flex flex-row items-center">
                    <img className="ml-4 w-16 h-full" src={memoriesImg} alt="memories"/>
                    <Typography component={Link} to="/" className="text-cyan-400" variant="h3" align="center">Memories</Typography>
                </div>
                {user.isLogin ? 
                    <div className="flex items-center gap-x-4"><span className="text-black">Welcome back, <strong>{userName}</strong></span> <Button onClick={handleLogout} variant="contained" color="error">Logout</Button></div> : 
                    <Button component={Link} to="/auth" variant="contained" size="medium">Login</Button>
                }
            </AppBar>
        </Grow> 
    )
}