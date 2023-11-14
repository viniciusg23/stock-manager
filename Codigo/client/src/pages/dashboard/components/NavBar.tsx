import { Box, AppBar, Toolbar, Typography } from "@mui/material";
import Profile from "../../components/Profile";


export default function MenuAppBar() {

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Complemento Outlet
                    </Typography>

                    <Profile />
    
                </Toolbar>
            </AppBar>
        </Box>
    );
}
