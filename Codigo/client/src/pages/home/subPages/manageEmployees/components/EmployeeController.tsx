import { Edit, Delete } from "@mui/icons-material";
import { ButtonGroup, Tooltip, IconButton } from "@mui/material";
import { Employee } from "../../../../../entities/Employee";
import { getAuthorizationToken } from "../../../../../utils/getAuthorizationToken";
import { enqueueSnackbar } from "notistack";
import { UnauthorizationError } from "../../../../../errors/UnauthorizationError";
import { fetchEmployees } from "../../../../../reduxActions/fetchEmployees";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../reduxReducers/store";

interface EmployeeControllerProps {
    employee: Employee;
}

function EmployeeController(props: EmployeeControllerProps) {
    const {id} = props.employee;

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const removeEmployee = async () => {
        try {
            const body: string = JSON.stringify({
                id: id,
            });
    
            const options = {
                method: "POST",
                headers: {"Content-Type": "application/json", "Authorization": `Bearer ${getAuthorizationToken()}`},
                body: body
            };
              
            const response = await fetch("/employee/remove", options)
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
            dispatch(fetchEmployees());
        }
    }



    return (
        <ButtonGroup variant="contained" disableElevation>
            <Tooltip title="Excluir">
                <IconButton color="error" onClick={removeEmployee}>
                    <Delete />
                </IconButton>
            </Tooltip>
        </ButtonGroup>
    );
}

export default EmployeeController;