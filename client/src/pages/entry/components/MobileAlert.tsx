import { useTheme } from "@emotion/react";
import { Alert, AlertTitle, Box, IconButton, useMediaQuery } from "@mui/material";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

function MobileAlert() {

    const isMobile = useMediaQuery("(max-width:767px)");

    const [alertVisible, setAlertVisible] = useState<boolean>(true);

    const handleCloseAlert = () => {
        setAlertVisible(false);
    };


    return (
        <>
            {isMobile && alertVisible &&(
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    minHeight="100vh" // 100% da altura da tela
                    bgcolor="rgba(0, 0, 0, 0.5)" // Cor de fundo com opacidade
                    position="fixed"
                    top={0}
                    left={0}
                    width="100%"
                    zIndex={9999}
                >
                    <Alert 
                        severity="warning" 
                        sx={{ 
                            width: "100%", 
                            height: "100vh",
                            paddingTop: "1.5em"
                        }}
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={handleCloseAlert}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                    >
                        <AlertTitle>Tamanho de tela</AlertTitle>
                        A tela do dispositivo móvel pode afetar o funcionamento do sistema.
                    </Alert>
                </Box>
            )}
        </>
    );
}

export default MobileAlert;