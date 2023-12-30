import { useState } from "react";
import { Box, Button, Grid, Paper, Typography, useTheme } from "@mui/material";
import { ArrowBackIosNew } from "@mui/icons-material";
import Login from "./components/Login";
import Register from "./components/Register";
import "./entry.css";

function EntryPage() {

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
            <Register option={setOptions} />
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
                        className="entry-background"
                        sx={{display: "flex", flexDirection: "column", alignItems: "center"}}
                    >
                        <div>
                            <Typography 
                                color="white" 
                                fontSize="3rem" 
                                textAlign="center"
                                letterSpacing={5}
                            >
                                COMPLEMENTO
                            </Typography>
                        </div>
                        
                        <Typography 
                            color="white" 
                            fontSize="1rem" 
                            textAlign="center" 
                            mt="1em"
                        >
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

export default EntryPage;
