import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, Paper, TextField, Typography, useTheme } from '@mui/material';
import { ArrowForwardIos, ArrowBackIosNew } from '@mui/icons-material';
import Login from "../components/login/Login";
import Register from "../components/register/Register";

function Entry() {

    const theme = useTheme();
    const [options, setOptions] = useState<"login" | "register">("login");

    
    const toggleOptions = () => {
        options === "login" ? setOptions("register") : setOptions("login");
    }

    const OptionsLogin = (
        <div>
            <Login />
            <Typography sx={{ marginTop: 2 }}>Não possui uma conta?</Typography>
            <Button color="secondary" variant="outlined" startIcon={<ArrowBackIosNew />} fullWidth onClick={toggleOptions}>
                Registrar
            </Button>
        </div>
    );

    const OptionsRegister = (
        <div>
            <Register />
            <Typography sx={{ marginTop: 2 }}>Já possui uma conta?</Typography>
            <Button color="secondary" variant="outlined" startIcon={<ArrowBackIosNew />} fullWidth onClick={toggleOptions}>
                Fazer Login
            </Button>
        </div>
    );


    return (
        <Box 
            sx={{
                height: "100vh", 
                display: "flex", 
                justifyContent: "center", 
                alignItems: "center", 
                backgroundColor: theme.palette.background.default
            }}
        >
            <Paper sx={{width: "70%", height: "80%", borderRadius: 2.5}} elevation={10}>
                <Grid container sx={{width: "100%", height: "100%"}}>
                    <Grid 
                        item 
                        xs={6}
                        sx={{
                            height: "100%",
                            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.dev/svgjs' width='1440' height='1440' preserveAspectRatio='none' viewBox='0 0 1440 1440'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1077%26quot%3b)' fill='none'%3e%3crect width='1440' height='1440' x='0' y='0' fill='rgba(51%2c 59%2c 115%2c 1)'%3e%3c/rect%3e%3cpath d='M 0%2c344 C 144%2c359.2 432%2c484.4 720%2c420 C 1008%2c355.6 1296%2c101.6 1440%2c22L1440 1440L0 1440z' fill='rgba(74%2c 85%2c 162%2c 1)'%3e%3c/path%3e%3cpath d='M 0%2c883 C 96%2c948.2 288%2c1236.2 480%2c1209 C 672%2c1181.8 768%2c770.8 960%2c747 C 1152%2c723.2 1344%2c1021.4 1440%2c1090L1440 1440L0 1440z' fill='rgba(117%2c 134%2c 247%2c 1)'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1077'%3e%3crect width='1440' height='1440' fill='white'%3e%3c/rect%3e%3c/mask%3e%3c/defs%3e%3c/svg%3e");`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            borderTopLeftRadius: 10,
                            borderBottomLeftRadius: 10,
                            padding: 7,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <Typography color="white" fontSize={"1rem"} textAlign="center">
                            Gerencie seu Estoque
                        </Typography>
                    </Grid>
                    <Grid 
                        item 
                        xs={6} 
                        sx={{
                            borderTopLeftRadius: 10,
                            borderBottomLeftRadius: 10,
                            padding: 7,
                        }}
                    >
                        {options === "login" ? (OptionsLogin) : (OptionsRegister)}
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
}

export default Entry;
