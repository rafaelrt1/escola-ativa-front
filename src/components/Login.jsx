import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';



const Login = () => {
    return (
        <>
            <h1>Login</h1>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    required
                    id="outlined-required"
                    label="Usuário"
                />
                <TextField
                    required
                    id="outlined-disabled"
                    label="Senha"
                    type="password"
                    autoComplete="current-password"
                />
                <Button variant="outlined">Entrar</Button>
            </Box>
    </>
    );
}

export default Login;