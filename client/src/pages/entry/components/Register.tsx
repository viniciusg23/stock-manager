import { ChangeEvent, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { ArrowForwardIos } from "@mui/icons-material";




function Register(props: {option: React.Dispatch<React.SetStateAction<"login" | "register">>}) {

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordVerify, setPasswordVerify] = useState<string>("");
    const [systemPassword, setSystemPassword] = useState<string>("")
;
    const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handlePasswordVerifyChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPasswordVerify(event.target.value);
    }

    const handleSystemPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSystemPassword(event.target.value);
    };

    const handleRegister = async () => {
        const options = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: `{"name":"${username}","password":"${password}", "systemPassword": "${systemPassword}"}`
        };
          
        const data = await fetch("/user/register", options);

        if(data.ok){
            props.option("login");
        }
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
                <TextField 
                    color="secondary" 
                    id="system-password" 
                    label="Senha do Sistema" 
                    type="password" 
                    variant="standard" 
                    fullWidth 
                    value={systemPassword}
                    onChange={handleSystemPasswordChange}
                />
                <Button color="secondary" variant="contained" endIcon={<ArrowForwardIos />} fullWidth sx={{ marginTop: 3 }} onClick={handleRegister}>
                    Registrar
                </Button>
            </Box>
        </Box>
    );
}

export default Register;