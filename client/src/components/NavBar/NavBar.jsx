import { useEffect, useState } from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import { AppBar, Button, IconButton, InputBase, Paper, Typography } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

import SearchIcon from '@mui/icons-material/Search';
import memoriesImg from "../../assets/images/memories.png"
import { logout } from '../../redux/slices/authSlice';

export default () => {
    const [userName, setUserName] = useState('')
    const [showSearchBar, setShowSearchBar] = useState(false)
    const [keyword, setKeyword] = useState('')
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

    const handleSearchBar = (e) => {
        e.preventDefault()
        setShowSearchBar(!showSearchBar)
    }

    const handleSearchSubmit = (e) => {
        e.preventDefault()

        navigate(`/?s=${keyword}`)
    }

    return (
        <AppBar className="rounded-xl mx-0 py-4 flex !flex-row gap-x-2 items-center justify-between text-center h-full px-6"  position="static" color="inherit">
            <div className="flex flex-row items-center">
                <Typography component={Link} to="/" className="text-cyan-400" variant="h3" align="center">
                    <img className="w-16 h-full" src={memoriesImg} alt="memories"/>
                </Typography>
            </div>
            <div className="flex flex-row gap-x-2">
                {showSearchBar &&
                    <Paper className="flex" component="form" onSubmit={handleSearchSubmit}>
                        <InputBase onChange={(e) => setKeyword(e.target.value)} className="p-2" placeholder="Search..." inputProps={{"aria-label": "search"}}/>
                        <IconButton type="submit" aria-label="search">
                            <SearchIcon/>
                        </IconButton>
                    </Paper>
                }
                {!showSearchBar && 
                    <Button onClick={handleSearchBar}>
                        <SearchIcon/>
                    </Button>
                }
                {user.isLogin ? 
                    <div className="flex items-center gap-x-4" sx={{ display: { xs: 'none', md: 'block' } }}>
                        <Typography sx={{ display: { xs: 'none', lg: 'block' } }} variant="inherit" className="text-black">Welcome back, <strong>{userName}</strong></Typography> 
                        <Button className="!flex !gap-x-2 content-center" onClick={handleLogout} variant="contained" color="error">
                            <Typography sx={{ display: { xs: 'none', lg: 'block' } }} variant="inherit">Logout</Typography>
                            <LogoutIcon/>
                        </Button>
                    </div> :
                    <Button 
                        className="!flex !gap-x-2 content-center"
                        component={Link} to="/auth" 
                        variant="contained" 
                        size="medium"
                    >
                        <Typography sx={{ display: { xs: 'none', lg: 'block' } }} variant="inherit">Login</Typography>
                        <LoginIcon/>
                    </Button>
                }
            </div>
            
        </AppBar>
    )
}