import { Edit, Delete } from "@mui/icons-material";
import { ButtonGroup, Tooltip, IconButton } from "@mui/material";
import Form from "../../../components/Form";
import { useState } from "react";
import ProductForm from "./ProductForm";
import { getAuthorizationToken } from "../../../utils/getAuthorizationToken";
import { UnauthorizationError } from "../../../../../errors/UnauthorizationError";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { Product } from "../../../../../entities/Product";
import { AppDispatch } from "../../../../../reduxReducers/store";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../../../../../reduxActions/fetchProducts";

interface ProductControllerProps {
    product: Product
}

function ProductController(props: ProductControllerProps) {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const { product } = props;
    const [openForm, setOpenForm] = useState<boolean>(false);

    const handleClose = () => {
        setOpenForm(false);
    }

    const handleOpen = () => {
        setOpenForm(true);
    }


    const removeProduct = async () => {    
        try {
            const body: string = JSON.stringify({
                id: product.id,
            });
    
            const options = {
                method: 'POST',
                headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${getAuthorizationToken()}`},
                body: body
            };
              
            const response = await fetch("/product/remove", options)
            const data = await response.json();

            if(!response.ok){
                throw new Error(data.message);
            }
    
            enqueueSnackbar(data.message, {variant: "success"});
            
        } catch (error: any | UnauthorizationError) {
            if(error instanceof UnauthorizationError){
                alert("Sessão finalizada");
                return navigate("/");
            }

            enqueueSnackbar(error.message, {variant: "error"})
        } finally {
            dispatch(fetchProducts());
        }
    }


    return (
        <>
            <Form isOpen={openForm} handleClose={handleClose} title="Editar Produto">
                <ProductForm control="edit" product={product}/>
            </Form>

            <ButtonGroup variant="contained" disableElevation>
                <Tooltip title="Editar">
                    <IconButton color='info' sx={{backgroundColor: "info"}} onClick={handleOpen}>
                        <Edit />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Excluir">
                    <IconButton color='error' onClick={removeProduct}>
                        <Delete />
                    </IconButton>
                </Tooltip>
            </ButtonGroup>
        </>
    );
}

export default ProductController;