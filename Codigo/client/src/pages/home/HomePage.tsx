import { Box, Container, Typography } from "@mui/material";
import CardItem from "./components/CardItem";

function HomePage() {
    return (
        <Container>
            <Typography variant="h5" component="div" my="1em">
                Gerenciamento de Produtos
            </Typography>
            <Box sx={{
                marginBottom: "4em",
                display: "flex",
                gap: 3
            }}>
                <CardItem header="Cadastrar Novos Produtos" description="Cadestre novos produtos em seu estoque" route="/create-product"/>
                <CardItem header="Visualizar Produtos" description="Visualize os produtos em seu estoque" route="/view-product"/>
            </Box>
            

            <Typography variant="h5" component="div" my="1em">
                Gerenciamento de Fornecedores
            </Typography>
            <Box sx={{
                marginBottom: "4em",
                display: "flex",
                gap: 3
            }}>
                <CardItem header="Cadastrar Novos Fornecedores" description="Cadestre novos fornecedores de sua loja" route="/create-supplier"/>
                <CardItem header="Visualizar Fornecedores" description="Visualize os fornecedores de sua loja" route="/view-supplier"/>
            </Box>

            
        </Container>
    );
}

export default HomePage;