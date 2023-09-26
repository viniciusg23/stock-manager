import { Box, Container, Typography } from "@mui/material";
import Form from "./components/Form";

function CreateProductPage() {
    return (
        <Container>
            <Typography textAlign={"center"} sx={{
                padding: ".5em",
                fontSize: "2em"
            }}>
                Cadastrar Novo Produto
            </Typography>

            <Box sx={{display: "flex", justifyContent: "center"}}>
                <Form />
            </Box>

        </Container>
    );
}

export default CreateProductPage;