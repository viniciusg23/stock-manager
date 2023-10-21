import { Edit, Delete } from "@mui/icons-material";
import { ButtonGroup, Tooltip, IconButton } from "@mui/material";

interface ProductControllerProps {
    product: {
        code: string;
        isFiscal: string;
        category: number;
        name: string;
        costPrice: number;
        purchaseDate: string;
        supplier: string;
    }
}

function ProductController(props: ProductControllerProps) {
    const {
        code,
        isFiscal,
        category,
        name,
        costPrice,
        purchaseDate,
        supplier
    } = props.product;

    const removeProduct = () => {
        //TODO fazer request para remover prod
        console.log(`${name} Removido`)
    }

    const updateProduct = () => {
        //TODO fazer request para atualizar prod
        console.log(`${name} Atualizado`);
        

    }



    return (
        <ButtonGroup variant="contained" disableElevation>
            <Tooltip title="Editar">
                <IconButton color='info' sx={{backgroundColor: "info"}} onClick={updateProduct}>
                    <Edit />
                </IconButton>
            </Tooltip>
            <Tooltip title="Excluir">
                <IconButton color='error' onClick={removeProduct}>
                    <Delete />
                </IconButton>
            </Tooltip>
        </ButtonGroup>
    );
}

export default ProductController;