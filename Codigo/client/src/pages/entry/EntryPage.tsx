import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Paper, TextField, Typography, useTheme } from "@mui/material";
import { ArrowForwardIos, ArrowBackIosNew } from "@mui/icons-material";
import Login from "./components/Login";
import Register from "./components/Register";

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
                        sx={{
                            height: "100%",
                            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev/svgjs" width="1440" height="1440" preserveAspectRatio="none" viewBox="0 0 1440 1440"%3e%3cg mask="url(%26quot%3b%23SvgjsMask1024%26quot%3b)" fill="none"%3e%3crect width="1440" height="1440" x="0" y="0" fill="rgba(166%2c 9%2c 16%2c 1)"%3e%3c/rect%3e%3cpath d="M0%2c626.517C114.354%2c604.302%2c162.678%2c468.403%2c257.89%2c401.284C347.236%2c338.301%2c475.039%2c334.709%2c539.346%2c246.311C607.962%2c151.989%2c643.329%2c24.615%2c614.034%2c-88.285C585.367%2c-198.767%2c468.404%2c-255.17%2c388.161%2c-336.344C313.997%2c-411.37%2c254.524%2c-498.928%2c160.607%2c-546.977C53.033%2c-602.013%2c-76.454%2c-682.922%2c-184.837%2c-629.498C-297.02%2c-574.201%2c-262.236%2c-392.721%2c-344.124%2c-298.185C-425.988%2c-203.676%2c-617.733%2c-214.346%2c-649.253%2c-93.349C-679.746%2c23.706%2c-534.707%2c111.397%2c-478.757%2c218.641C-426.568%2c318.676%2c-417.356%2c442.603%2c-331.468%2c515.775C-240.96%2c592.883%2c-116.719%2c649.191%2c0%2c626.517" fill="%2385070d"%3e%3c/path%3e%3cpath d="M1440 1978.851C1565.252 1997.234 1699.7359999999999 2077.874 1810.224 2016.08 1920.1770000000001 1954.585 1921.518 1798.337 1970.3809999999999 1682.217 2017.5349999999999 1570.159 2095.768 1467.763 2092.09 1346.244 2088.221 1218.411 2037.8310000000001 1091.019 1949.684 998.356 1863.278 907.523 1738.616 864.461 1614.843 844.541 1500.859 826.197 1390.569 862.175 1278.6100000000001 890.356 1161.9470000000001 919.721 1018.7090000000001 916.201 946.847 1012.681 874.923 1109.2440000000001 941.0740000000001 1246.623 924.426 1365.872 907.874 1484.427 807.052 1597.743 849.543 1709.653 891.998 1821.469 1024.769 1867.156 1133.597 1916.772 1230.377 1960.896 1334.763 1963.406 1440 1978.851" fill="%23c70b13"%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id="SvgjsMask1024"%3e%3crect width="1440" height="1440" fill="white"%3e%3c/rect%3e%3c/mask%3e%3c/defs%3e%3c/svg%3e");`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
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

export default EntryPage;
