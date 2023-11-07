import { Box, Typography, useTheme } from "@mui/material";
import { PureComponent } from "react";

interface ProductTicketProps {
    name: string;
    code: string;
    price: number
    qrCode: string;
}

class ProductTicket extends PureComponent<ProductTicketProps> {
    render() {
        const {name, code, price, qrCode} = this.props

        return (
            <Box 
                id="ticket" 
                sx={{
                    display: "flex", 
                    alignItems: "center", 
                    border: "solid #00000025 1px",
                    borderRadius: "10px",
                    padding: "1.5em",
                    gap: "2em"
                }}
            >
                <img src={qrCode} width={256} />
                <Box style={{display: "flex", flexDirection: "column", gap: ".8em"}}>
                    <Box>
                        <Typography color="inherit" variant="h4">{name}</Typography>
                        <Typography variant="h6">{code}</Typography>
                    </Box>
                    
                    <Typography variant="h5">Preço: <b>R${price}</b></Typography>
                </Box>
            </Box>
        );
    }
}


export default ProductTicket;