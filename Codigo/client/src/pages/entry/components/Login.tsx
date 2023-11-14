import { useState, ChangeEvent, useEffect } from "react";
import { Alert, Box, Button, TextField } from "@mui/material";
import { ArrowForwardIos } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";


function Login() {

    const navigate = useNavigate();
    
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    useEffect(() => {
        //TODO: verificar se ja existe token de login no localstorage
        const token = window.localStorage.getItem("authorization");

        if(token){
            return navigate("/home");
        }
        
    }, []);

    const handleLogin = async () => {
        const options = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: `{"name":"${username}","password":"${password}"}`
        };
          
        const data = await fetch("/user/login", options);
        const jsonData = await data.json();

        console.log(jsonData);

        if(!data.ok){
            alert(jsonData.message);
        }

        window.localStorage.setItem("authorization", jsonData.authorization);
        return navigate("/home");
    };

    return (
        <Box>
            <h2>Login</h2>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                <TextField 
                    color="secondary" 
                    id="username-login" 
                    label="Nome de Usuário" 
                    variant="standard" 
                    fullWidth 
                    value={username} 
                    onChange={handleUsernameChange} 
                />
                <TextField 
                    color="secondary" 
                    id="password-login" 
                    label="Senha" 
                    type="password" 
                    variant="standard" 
                    fullWidth 
                    value={password} 
                    onChange={handlePasswordChange} 
                />
                <Button 
                    color="secondary" 
                    variant="contained" 
                    endIcon={<ArrowForwardIos />} 
                    fullWidth 
                    sx={{ marginTop: 3 }}
                    onClick={handleLogin}
                >
                    Entrar
                </Button>
            </Box>
        </Box>
    );
}

export default Login;