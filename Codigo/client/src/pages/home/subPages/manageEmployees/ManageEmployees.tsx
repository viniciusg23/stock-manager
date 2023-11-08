import { useEmployees } from "../../../../reduxReducers/slicers/sliceEmployees";
import TableController from "../../components/TableController";
import AddEmployeeForm from "./components/AddEmployeeForm";
import EmployeeTable from "./components/EmployeeTable";

function ManageEmployees() {
    return (
        <>
            {/* <AddEmployee /> */}

            <TableController 
                tableTitle="Seus Funcionários" 
                thereIsAddButton
                // selector="employees"
                // slice={useEmployees}
                formTitle="Adicionar Novo Funcionário" 
                form={<AddEmployeeForm />}
            />

            <EmployeeTable />
        </>
    );
}

export default ManageEmployees;