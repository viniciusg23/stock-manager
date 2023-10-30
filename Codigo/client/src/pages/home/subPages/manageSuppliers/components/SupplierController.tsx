import { Edit, Delete } from "@mui/icons-material";
import { ButtonGroup, Tooltip, IconButton } from "@mui/material";
import { Supplier } from "../../../../../entities/supplier/Supplier";
import { getAuthorizationToken } from "../../../utils/getAuthorizationToken";
import { enqueueSnackbar } from "notistack";
import { UnauthorizationError } from "../../../../../errors/UnauthorizationError";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchSuppliers } from "../../../../../reduxActions/fetchSuppliers";
import { AppDispatch } from "../../../../../reduxReducers/store";

interface SupplierControllerProps {
    supplier: Supplier
}

function SupplierController(props: SupplierControllerProps) {
    const {id} = props.supplier;
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const removeSupplier = async () => {
        try {
            const body: string = JSON.stringify({
                id: id,
            });
    
            const options = {
                method: 'POST',
                headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${getAuthorizationToken()}`},
                body: body
            };
              
            const response = await fetch("/supplier/remove", options)
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
            dispatch(fetchSuppliers());
        }

    }



    return (
        <ButtonGroup variant="contained" disableElevation>
            <Tooltip title="Excluir">
                <IconButton color='error' onClick={removeSupplier}>
                    <Delete />
                </IconButton>
            </Tooltip>
        </ButtonGroup>
    );
}

export default SupplierController;