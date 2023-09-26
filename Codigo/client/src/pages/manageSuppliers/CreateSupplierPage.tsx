import { Typography, Container, Box } from "@mui/material";
import Form from "./components/Form";

function CreateSupplierPage() {
    return (
        <div>
            <Container>
                <Typography textAlign={"center"} sx={{
                    padding: ".5em",
                    fontSize: "2em"
                }}>
                    Cadastrar Novo Fornecedor
                </Typography>

                <Box sx={{
                    display: "flex",
                    justifyContent: "center"
                }}>
                    <Form />
                </Box>
            
            </Container>
        </div>
    );
}

export default CreateSupplierPage;