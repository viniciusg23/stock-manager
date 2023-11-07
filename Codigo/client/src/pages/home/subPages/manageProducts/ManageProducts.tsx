import { Search, Add } from "@mui/icons-material";
import { FormControl, InputLabel, InputAdornment, IconButton, Typography, Box, Input, Button, Divider } from "@mui/material";
import AddProduct from "./components/AddProduct";
import ProductsTable from "./components/ProductsTable";

function ManageProducts() {

    const handleSearch = () => {

    }

    return (
        <>
            <AddProduct />


            <Box display="flex" justifyContent="space-between" alignItems="end" mb="1em">
                <Typography variant="h4" m={0}>Seus Produtos</Typography>

                <Box display="flex" alignItems="end" gap="1.5em" >
                    <FormControl variant="standard" sx={{width: "50%"}}>
                        <InputLabel htmlFor="standard-adornment-search">Pesquisar</InputLabel>
                        <Input
                            id="standard-adornment-search"
                            type="text"
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleSearch}
                                        edge="end"
                                    >
                                        <Search />
                                    </IconButton>
                                </InputAdornment>
                            }
                        />  
                    </FormControl>
                    <Button variant="contained" color="success"  endIcon={<Add />}>Adicionar Novo</Button>
                </Box>
                
            </Box>
            
            <ProductsTable />

        </>
    );
}

export default ManageProducts;