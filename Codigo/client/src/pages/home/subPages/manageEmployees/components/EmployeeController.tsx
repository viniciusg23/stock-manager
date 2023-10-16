import { Edit, Delete } from "@mui/icons-material";
import { ButtonGroup, Tooltip, IconButton } from "@mui/material";

interface EmployeeControllerProps {
    employee: {
        id: string;
        name: string;
        job: string
    }
}

function EmployeeController(props: EmployeeControllerProps) {
    const {name, job, id} = props.employee;

    const removeEmployee = () => {
        //TODO fazer request para remover empl
        console.log(`${name} Removido`)
    }

    const updateEmployee = () => {
        //TODO fazer request para atualizar empl
        console.log(`${name} Atualizado`);

    }



    return (
        <ButtonGroup variant="contained" disableElevation>
            <Tooltip title="Editar">
                <IconButton color='info' onClick={removeEmployee}>
                    <Edit />
                </IconButton>
            </Tooltip>
            <Tooltip title="Excluir">
                <IconButton color='error' onClick={updateEmployee}>
                    <Delete />
                </IconButton>
            </Tooltip>
        </ButtonGroup>
    );
}

export default EmployeeController;