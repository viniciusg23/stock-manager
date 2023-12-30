import { Delete } from "@mui/icons-material";
import { Paper, Box, Typography, IconButton } from "@mui/material";
import { IPurchasedProduct } from "../ManageTravel";

interface IProductPurchasedOnTravelProps {
    info: IPurchasedProduct;
    handleRemoveProduct: (productId: number) => void;
}

function ProductPurchasedOnTravel(props: IProductPurchasedOnTravelProps) {
    const {id, product, uniquePrice, quantity, total} = props.info;
    const {handleRemoveProduct} = props;

    return (
        <Paper
            sx={{
                backgroundColor: "secondary.main",
                color: "white",
                padding: "0.5em",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "1em"
            }}
        >
            <Box 
                sx={{
                    width: "30%",
                    borderRight: "#fff solid 1px",
                    height: "100%",
                    display: "flex",
                    alignItems: "center"
                }}
            >
                <Typography textAlign="left" fontSize="2em">R${total}</Typography>
            </Box>
            <Box flexGrow={1}>
                <Typography textAlign="left" fontSize="1.2em">{product.name}</Typography>
                <Typography textAlign="left">Valor Unidade: R${uniquePrice}</Typography>
                <Typography textAlign="left">Quantidade: {quantity}</Typography>
            </Box>
            <Box>
                <IconButton aria-label="delete" onClick={() => handleRemoveProduct(id)}>
                    <Delete htmlColor="#fff" />
                </IconButton>
            </Box>
        </Paper>
    );
}

export default ProductPurchasedOnTravel;