import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Avatar, Typography, Paper, Stack, Grid, Grow, Alert, Fade } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from "react-router-dom";

import { handleObjectDataChange } from "../../util";
import { createUser, signIn } from "../../api";
import Input from './InputBuilder';
import NavBar from "../../components/NavBar/NavBar";

export default () => {
    const [isSignUp, setIsSignUp] = useState(false)
    const [userInput, setUserInput] = useState({firstName: '', lastName: '', email: '', password: '', confirmPassword: ''})
    const [error, setError] = useState('')
    const dispatch = useDispatch()
    const userData = useSelector(state => state.auth)
    const navigate = useNavigate()

    const handleSwitch = () => {
        setIsSignUp(!isSignUp)
    }

    const handleChange = (val, type) => {
        setUserInput(prevData => handleObjectDataChange(val, type, prevData))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        if (isSignUp) {
            dispatch(createUser(userInput)).then(response => {
                if ( response.error ) {
                    handleErrors(response.payload.error.response)                
                }
            })
        }
        else {
            dispatch(signIn(userInput)).then(response => {
                if ( response.error ) {    
                    handleErrors(response.payload.error.response)                
                }
            })
        }
    }

    const handleErrors = (response) => {
        const { status, data } = response

        if ( status === 400 ) {
            setError(data.message)
        }
    }

    useEffect(() => {
        if (userData.isLogin) {
            setTimeout(() => {
                navigate('/')
            }, 1000)
        }
    }, [userData])

    return (
        <>
            <NavBar/>
            <Grow in>
                <Container component="main" maxWidth="xs" className="!flex flex-col gap-4">
                    <Paper className="flex flex-col gap-y-4 p-6 rounded">
                        {userData.isLogin ? 
                            <div className="text-center">Successfully logged in.</div> :
                            <>
                                <Container className="!flex flex-col gap-4 m-auto text-center">
                                    <Avatar className="self-center">
                                        <LockOutlinedIcon/>
                                    </Avatar>
                                    <Typography variant="h5">{isSignUp ? `Sign Up` : `Sign In`}</Typography>
                                </Container>
                                <form className="flex gap-6 flex-col" onSubmit={(e) => handleSubmit(e)}>
                                    {error.length > 0 &&
                                    <Grow in>
                                        <Alert severity="error">{error}</Alert>
                                    </Grow>
                                    }
                                    {isSignUp && 
                                    <Stack direction="row" spacing={3}>
                                        <Input 
                                            name="firstName" 
                                            label="First Name" 
                                            type="text" 
                                            variant="outlined"
                                            required
                                            fullWidth
                                            onChange={e => handleChange(e.target.value, 'firstName')}
                                        />
                                        <Input 
                                            name="lastName" 
                                            label="Last Name" 
                                            type="text" 
                                            variant="outlined"
                                            required
                                            fullWidth
                                            onChange={e => handleChange(e.target.value, 'lastName')}
                                        />
                                    </Stack>
                                    }
                                    <Input 
                                        name="email" 
                                        label="Email Address" 
                                        type="email" 
                                        variant="outlined"
                                        required
                                        fullWidth
                                        onChange={e => handleChange(e.target.value, 'email')}
                                    />
                                    <Input  
                                        name="password" 
                                        label="Password" 
                                        type="password" 
                                        variant="outlined"
                                        required
                                        fullWidth
                                        onChange={e => handleChange(e.target.value, 'password')}
                                    />
                                    {isSignUp &&
                                    <Input  
                                        name="confirmPassword" 
                                        label="Confirm Password" 
                                        type="password" 
                                        variant="outlined"
                                        required
                                        fullWidth
                                        onChange={e => handleChange(e.target.value, 'confirmPassword')}
                                    />
                                    }
                                    <Button type="submit" variant="contained" color="primary" size="large">
                                        {isSignUp ? `Sign Up` : `Sign In`}
                                    </Button>
                                    <Grid container className="!block text-center">
                                        <Grid item>
                                            <Button variant="text" onClick={handleSwitch}>
                                                {isSignUp ? `Already have an account? Sign In` : `Don't have an account? Sign Up`}
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </form>
                            </>
                        }
                    </Paper>
                </Container>
            </Grow>
        </>
    )
}