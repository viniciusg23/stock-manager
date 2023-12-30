import { useNavigate } from "react-router-dom";
import { Category } from "../../../../../entities/Category";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../reduxReducers/store";
import { getAuthorizationToken } from "../../../../../utils/getAuthorizationToken";
import { enqueueSnackbar } from "notistack";
import { UnauthorizationError } from "../../../../../errors/UnauthorizationError";
import { fetchCategories } from "../../../../../reduxActions/fetchCategories";
import { Delete } from "@mui/icons-material";
import { ButtonGroup, Tooltip, IconButton } from "@mui/material";


interface CategoryControllerProps {
    category: Category;
}

function CategoryController(props: CategoryControllerProps) {
    const {id} = props.category;

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const removeCategory = async () => {
        try {
            const body: string = JSON.stringify({
                id: id,
            });
    
            const options = {
                method: "POST",
                headers: {"Content-Type": "application/json", "Authorization": `Bearer ${getAuthorizationToken()}`},
                body: body
            };
              
            const response = await fetch("/category/remove", options)
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
            dispatch(fetchCategories());
        }
    }



    return (
        <ButtonGroup variant="contained" disableElevation>
            <Tooltip title="Excluir">
                <IconButton color="error" onClick={removeCategory}>
                    <Delete />
                </IconButton>
            </Tooltip>
        </ButtonGroup>
    );
}

export default CategoryController;