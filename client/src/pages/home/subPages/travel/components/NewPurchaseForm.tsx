import { Box, Typography, Autocomplete, TextField, FormControl, InputLabel, OutlinedInput, InputAdornment, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useProducts } from "../../../../../reduxReducers/slicers/sliceProducts";



interface INewPurchaseFormProps {
    uniquePrice: number | string;
    handleUniquePriceChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    quantity: number | string;
    handleQuantityChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    total: number | string;
    handleTotalChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleProductSelect: (event: React.ChangeEvent<{}>, value: any | null) => void;
    handleAddProduct: () => void;
}

function NewPurchaseForm(props: INewPurchaseFormProps) {

    const { products } = useSelector(useProducts);
    
    const {
        uniquePrice,
        handleUniquePriceChange,
        quantity,
        handleQuantityChange,
        total,
        handleTotalChange,
        handleProductSelect,
        handleAddProduct
    } = props;



    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "left",
                gap: "1em",
                
            }}
        >
            <Typography sx={{ fontSize: "1.2em" }}>Informações do Produto</Typography>

            <Autocomplete
                fullWidth
                disablePortal
                id="combo-box-demo"
                options={products}
                getOptionLabel={(option) => option.name}
                onChange={handleProductSelect}
                renderInput={(params) => <TextField {...params} label="Produto" />}
            />

            <FormControl>
                <InputLabel htmlFor="unique-price">Valor Unitário</InputLabel>
                <OutlinedInput
                    type="number"
                    id="unique-price"
                    startAdornment={<InputAdornment position="start">R$</InputAdornment>}
                    label="Valor Unitário"
                    value={uniquePrice}
                    onChange={handleUniquePriceChange}
                />
            </FormControl>

            <FormControl>
                <InputLabel htmlFor="quantity">Quantidade Comprada</InputLabel>
                <OutlinedInput
                    type="number"
                    id="quantity"
                    label="Quantidade Comprada"
                    value={quantity}
                    onChange={handleQuantityChange}
                />
            </FormControl>

            <FormControl>
                <InputLabel htmlFor="total">Total da Compra</InputLabel>
                <OutlinedInput
                    type="number"
                    id="total"
                    label="Total da Compra"
                    value={total}
                    onChange={handleTotalChange}
                />
            </FormControl>

            <Button fullWidth variant="contained" color="success" onClick={handleAddProduct}>
                Adicionar Produto
            </Button>
        </Box>
    );
}

export default NewPurchaseForm;