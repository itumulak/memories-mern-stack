import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate  } from 'react-router-dom';
import { AppBar, Button, Typography } from "@mui/material";
import { useDispatch } from 'react-redux';

// import { logout } from "../../redux/slices/authSlice";
import memoriesImg from "../../assets/images/memories.png"

export default () => {
    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isLogin, setIsLogin] = useState(false)

    useEffect(() => {
        const userName = localStorage.getItem('name')
        const userToken = localStorage.getItem('token')

        if ( userName && userToken ) {
            setIsLogin(true)
        }
        else {
            setIsLogin(false)
        }        
    }, [location])

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
            {isLogin ? 
                <Button onClick={handleLogout} variant="contained" color="error">Logout</Button> : 
                <Button component={Link} to="/auth" variant="contained" size="medium">Login</Button>
            }
        </AppBar> 
    )
}