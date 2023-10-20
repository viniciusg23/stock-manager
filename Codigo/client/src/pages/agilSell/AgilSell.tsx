import { Container, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

function AgilSell() {
    const { id } = useParams();

    return (
        <Container>
            <Typography variant="h6">Vender Produto</Typography>
            <Typography>ID do Produto {id}</Typography>
        </Container>
    );
}

export default AgilSell;