import { Edit, Delete, QrCode2 } from "@mui/icons-material";
import { ButtonGroup, Tooltip, IconButton, Box, Button } from "@mui/material";
import Form from "../../../components/Form";
import { useState } from "react";
import { UnauthorizationError } from "../../../../../errors/UnauthorizationError";
import { getAuthorizationToken } from "../../../utils/getAuthorizationToken";
import { useNavigate } from "react-router-dom";
import { Product } from "../../../../../entities/product/Product";
import StockForm from "./StockForm";

interface StockControllerProps {
    product: Product
}

function StockController(props: StockControllerProps) {
    const { product } = props;
    const navigate = useNavigate();
    const [isQrCodeOpen, setIsQrCodeOpen] = useState<boolean>(false);
    const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
    const [qrcode, setQrCode] = useState<string>("");

    const handleQrCodeClose = () => {
        setIsQrCodeOpen(false);
    }

    const handleQrCodeOpen = () => {
        setIsQrCodeOpen(true);
    }

    const handleEditClose = () => {
        setIsEditOpen(false);
    }

    const handleEditOpen = () => {
        setIsEditOpen(true);
    }

    const { id } = props.product;

    const generateQrCode = async () => {
        try {
            const options = { 
                method: 'GET',
                headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${getAuthorizationToken()}`},
            };
    
            const response = await fetch(`/sell/create-qrcode/${id}`, options);
            const data = await response.json();
    
            setQrCode(data.qrCode);            
            handleQrCodeOpen();

        }
        catch (error: any | UnauthorizationError) {
            if(error instanceof UnauthorizationError){
                alert("Sessão finalizada");
                return navigate("/");
            }

            alert(error.message)
        }
    }


    return (
        <>
            <Form isOpen={isQrCodeOpen} handleClose={handleQrCodeClose}>
                <Box sx={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "1em"}}>
                    <div id="ticket">
                        <img src={qrcode} width={300} />
                        
                    </div>
                    <Box width={300} sx={{display: "flex", gap: "1em"}}>
                        <Button variant="contained" color="info" fullWidth>Imprimir</Button>
                        <Button variant="outlined" color="secondary" fullWidth onClick={handleQrCodeClose}>Cancelar</Button>
                    </Box>
                </Box>
            </Form>
            <Form isOpen={isEditOpen} handleClose={handleEditClose}>
                <StockForm product={product}></StockForm>
            </Form>
            <ButtonGroup variant="contained" disableElevation>
                <Tooltip title="Editar">
                    <IconButton color='info' sx={{backgroundColor: "info"}} onClick={handleEditOpen}>
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