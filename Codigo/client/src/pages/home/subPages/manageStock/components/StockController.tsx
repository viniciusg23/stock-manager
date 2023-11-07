import { Edit, Delete, QrCode2 } from "@mui/icons-material";
import { ButtonGroup, Tooltip, IconButton, Box, Button } from "@mui/material";
import Form from "../../../components/Form";
import { LegacyRef, RefObject, useRef, useState } from "react";
import { UnauthorizationError } from "../../../../../errors/UnauthorizationError";
import { getAuthorizationToken } from "../../../utils/getAuthorizationToken";
import { useNavigate } from "react-router-dom";
import { Product } from "../../../../../entities/product/Product";
import StockForm from "./StockForm";
import { useReactToPrint } from "react-to-print";
import ProductTicket from "./ProductTicket";

interface StockControllerProps {
    product: Product
}

function StockController(props: StockControllerProps) {
    const { product } = props;

    const navigate = useNavigate();
    const componentRef = useRef(null);
    
    const [isQrCodeOpen, setIsQrCodeOpen] = useState<boolean>(false);
    const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
    const [qrcode, setQrCode] = useState<string>("");


    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: "Etiqueta de Produto",
    });

    

    const generateQrCode = async () => {
        try {
            const options = { 
                method: 'GET',
                headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${getAuthorizationToken()}`},
            };
    
            const response = await fetch(`/product/create-qrcode/${product.id}`, options);
            const data = await response.json();
    
            setQrCode(data.qrCode);            
            setIsQrCodeOpen(true);

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
            <Form isOpen={isQrCodeOpen} handleClose={() => setIsQrCodeOpen(false)} title="QR Code do Produto">
                <Box sx={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "3em"}}>
                    <ProductTicket 
                        ref={componentRef}
                        name={product.name} 
                        code={product.code} 
                        price={product.salePrice} 
                        qrCode={qrcode} 
                    />
                    <Box width={300} sx={{display: "flex", gap: "1em"}}>
                        <Button variant="contained" color="info" fullWidth onClick={handlePrint}>Imprimir</Button>
                        <Button variant="outlined" color="secondary" fullWidth onClick={() => setIsQrCodeOpen(false)}>Cancelar</Button>
                    </Box>
                </Box>
            </Form>
            <Form isOpen={isEditOpen} handleClose={() => setIsEditOpen(false)} title="Editar Produto do Estoque">
                <StockForm product={product}></StockForm>
            </Form>
            <ButtonGroup variant="contained" disableElevation>
                <Tooltip title="Editar">
                    <IconButton color='info' sx={{backgroundColor: "info"}} onClick={() => setIsEditOpen(true)}>
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