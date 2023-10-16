import { Edit, Delete } from "@mui/icons-material";
import { ButtonGroup, Tooltip, IconButton } from "@mui/material";

interface SupplierControllerProps {
    supplier: {
        id: string;
        name: string;
        description: string;
    }
}

function SupplierController(props: SupplierControllerProps) {
    const {name, description} = props.supplier;

    const removeSupplier = () => {
        //TODO fazer request para remover supp
        console.log(`${name} Removido`)
    }

    const updateSupplier = () => {
        //TODO fazer request para atualizar sup
        console.log(`${name} Atualizado`);

    }



    return (
        <ButtonGroup variant="contained" disableElevation>
            <Tooltip title="Editar">
                <IconButton color='info' sx={{backgroundColor: "info"}} onClick={updateSupplier}>
                    <Edit />
                </IconButton>
            </Tooltip>
            <Tooltip title="Excluir">
                <IconButton color='error' onClick={removeSupplier}>
                    <Delete />
                </IconButton>
            </Tooltip>
        </ButtonGroup>
    );
}

export default SupplierController;