import TableController from "../../components/TableController";
import AddEmployeeForm from "./components/AddEmployeeForm";
import EmployeeTable from "./components/EmployeeTable";
import FadeTransition from "../../components/FadeTransition";

function ManageEmployees() {

    return (
        <FadeTransition>
            <>            
                <TableController 
                    tableTitle="Funcionários" 
                    thereIsAddButton
                    formTitle="Adicionar Novo Funcionário" 
                    form={<AddEmployeeForm />}
                />

                <EmployeeTable />
            </>
        </FadeTransition>
    );
}

export default ManageEmployees;