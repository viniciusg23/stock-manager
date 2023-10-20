import { Box, Container, Typography } from "@mui/material";
import DrawerNavegation from "./components/drawerNavegation/DrawerNavegation";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthorizationToken } from "./utils/getAuthorizationToken";
import { UnauthorizationError } from "../../errors/UnauthorizationError";

function HomePage() {
    const navigate = useNavigate();

    useEffect(() => {
        try {
            const auth = getAuthorizationToken();
        } catch (error) {
            if(error instanceof UnauthorizationError){
                alert("Sessão finalizada");
                return navigate("/");
            }
        }
    }, [])

    return (
        <Box>
            <DrawerNavegation />
        </Box>
    );
}

export default HomePage;