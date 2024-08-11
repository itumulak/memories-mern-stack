import { Button, Container, Avatar, Typography, Paper, Stack, Grid } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useState } from "react";

import Input from './InputBuilder';
import NavBar from "../../components/NavBar/NavBar";

export default () => {
    const [isSignUp, setIsSignUp] = useState(true)

    const handleSwitch = () => {
        setIsSignUp(!isSignUp)
    }

    const handleSubmit = () => {
        
    }

    return (
        <>
            <NavBar/>
            <Container component="main" maxWidth="xs" className="!flex flex-col gap-4">
                <Paper className="flex flex-col gap-y-4 p-6 rounded">
                    <Container className="!flex flex-col gap-4 m-auto text-center">
                        <Avatar className="self-center">
                            <LockOutlinedIcon/>
                        </Avatar>
                        <Typography variant="h5">{isSignUp ? `Sign Up` : `Sign In`}</Typography>
                    </Container>
                    <form className="flex gap-6 flex-col" onSubmit={handleSubmit}>
                        {isSignUp && 
                        <Stack direction="row" spacing={3}>
                            <Input 
                                name="firstName" 
                                label="First Name" 
                                type="text" 
                                variant="outlined"
                                required
                                fullWidth
                            />
                            <Input 
                                name="lastName" 
                                label="Last Name" 
                                type="text" 
                                variant="outlined"
                                required
                                fullWidth
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
                        />
                        <Input  
                            name="password" 
                            label="Password" 
                            type="password" 
                            variant="outlined"
                            required
                            fullWidth
                        />
                        {isSignUp &&
                        <Input  
                            name="confirmPassword" 
                            label="Confirm Password" 
                            type="password" 
                            variant="outlined"
                            required
                            fullWidth
                        />
                        }
                        <Button variant="contained" color="primary" size="large">
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
                </Paper>
            </Container>
        </>
    )
}