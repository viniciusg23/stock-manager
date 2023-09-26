import { ChangeEvent, useState } from 'react';
import { Alert, Box, Button, TextField } from '@mui/material';
import { ArrowForwardIos } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function Register() {

    const navigate = useNavigate();

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordVerify, setPasswordVerify] = useState<string>("");

    const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handlePasswordVerifyChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPasswordVerify(event.target.value);
    }

    const handleRegister = async () => {
        //TODO: implement register request
    };


    

    return (
        <Box>
            <h2>Registrar</h2>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                <TextField 
                    color="secondary" 
                    id="username-register" 
                    label="Nome de Usuário" 
                    variant="standard" 
                    fullWidth 
                    value={username} 
                    onChange={handleUsernameChange} 
                />
                <TextField 
                    color="secondary" 
                    id="password-register" 
                    label="Senha" 
                    type="password" 
                    variant="standard" 
                    fullWidth 
                    value={password} 
                    onChange={handlePasswordChange} 
                />
                <TextField 
                    color="secondary" 
                    id="password-register" 
                    label="Confirmar Senha" 
                    type="password" 
                    variant="standard" 
                    fullWidth 
                    value={passwordVerify}
                    onChange={handlePasswordVerifyChange}
                />
                <Button color="secondary" variant="contained" endIcon={<ArrowForwardIos />} fullWidth sx={{ marginTop: 3 }} onClick={handleRegister}>
                    Registrar
                </Button>
            </Box>
        </Box>
    );
}

export default Register;