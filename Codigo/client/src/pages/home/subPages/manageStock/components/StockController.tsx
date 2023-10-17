import { Edit, Delete, QrCode2 } from "@mui/icons-material";
import { ButtonGroup, Tooltip, IconButton, Box, Button } from "@mui/material";
import Form from "../../../components/Form";
import { useState } from "react";
import { UnauthorizationError } from "../../../../../errors/UnauthorizationError";
import { getAuthorizationToken } from "../../../utils/getAuthorizationToken";
import { useNavigate } from "react-router-dom";

interface StockControllerProps {
    product: {
        id: string
        code: string;
        isFiscal: string;
        category: number;
        name: string;
        costPrice: number;
        purchaseDate: string;
        supplier: string;
    }
}

function StockController(props: StockControllerProps) {
    const navigate = useNavigate();
    const [isOepn, setIsOpen] = useState<boolean>(false);
    const [qrcode, setQrCode] = useState<string>("");

    const handleClose = () => {
        setIsOpen(false);
    }

    const handleOpen = () => {
        setIsOpen(true);
    }


    const {
        id,
        code,
        isFiscal,
        category,
        name,
        costPrice,
        purchaseDate,
        supplier
    } = props.product;

    const generateQrCode = async () => {
        try {
            //TODO fazer request para remover prod
            const options = { 
                method: 'GET',
                headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${getAuthorizationToken()}`},
            };
    
            const response = await fetch(`/sell/create-qrcode/${id}`, options);
            const data = await response.json();
    
            console.log(data.qrCode);

            setQrCode(data.qrCode);            
            handleOpen();

        }
        catch (error: any | UnauthorizationError) {
            if(error instanceof UnauthorizationError){
                alert("Sessão finalizada");
                return navigate("/");
            }

            alert(error.message)
        }
    }

    const updateProduct = () => {
        //TODO fazer request para atualizar prod
        console.log(`${name} Atualizado`);

    }


    return (
        <>
            <Form isOpen={isOepn} handleClose={handleClose}>
                <Box sx={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "1em"}}>
                    <img src={qrcode} width={300} />
                    <Box width={300} sx={{display: "flex", gap: "1em"}}>
                        <Button variant="contained" color="info" fullWidth>Imprimir</Button>
                        <Button variant="outlined" color="secondary" fullWidth onClick={handleClose}>Cancelar</Button>
                    </Box>
                </Box>
            </Form>
            <ButtonGroup variant="contained" disableElevation>
                <Tooltip title="Editar">
                    <IconButton color='info' sx={{backgroundColor: "info"}} onClick={updateProduct}>
                        <Edit />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Gerar QR Code">
                    <IconButton color='success' onClick={generateQrCode}>
                        <QrCode2 />
                    </IconButton>
                </Tooltip>
            </ButtonGroup>
        </>
    );
}

export default StockController;