import { Edit, Delete } from "@mui/icons-material";
import { ButtonGroup, Tooltip, IconButton } from "@mui/material";
import { Supplier } from "../../../../../entities/Supplier";
import { getAuthorizationToken } from "../../../../../utils/getAuthorizationToken";
import { enqueueSnackbar } from "notistack";
import { UnauthorizationError } from "../../../../../errors/UnauthorizationError";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchSuppliers } from "../../../../../reduxActions/fetchSuppliers";
import { AppDispatch } from "../../../../../reduxReducers/store";
import { fetchSales } from "../../../../../reduxActions/fetchSales";

interface SaleControllerProps {
    id: string
}

function SaleController(props: SaleControllerProps) {
    const {id} = props;
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const removeSupplier = async () => {
        try {
            const body: string = JSON.stringify({
                id: id,
            });
    
            const options = {
                method: "POST",
                headers: {"Content-Type": "application/json", "Authorization": `Bearer ${getAuthorizationToken()}`},
                body: body
            };
              
            const response = await fetch("/sale/remove", options)
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
            dispatch(fetchSales());
        }

    }



    return (
        <ButtonGroup variant="contained" disableElevation>
            <Tooltip title="Excluir">
                <IconButton color="error" onClick={removeSupplier}>
                    <Delete />
                </IconButton>
            </Tooltip>
        </ButtonGroup>
    );
}

export default SaleController;