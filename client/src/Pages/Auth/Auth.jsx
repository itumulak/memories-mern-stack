import { Container, Stack, Avatar, Typography, Grid, TextField } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

export default () => {
    const handleSignUp = () => {
        
    }

    return (
        <Container component="main" maxWidth="xs">
            <Container className="gap-4">
                <Avatar>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography variant="h5">Sign In</Typography>
            </Container>
            <Container>
                <form>
                    <Grid container spacing={2}>
                        <TextField name="firstName" label="First Name" handleChange />
                    </Grid>
                </form>
            </Container>
            
        </Container>
    )
}