import TableController from "../../components/TableController";
import AddEmployeeForm from "./components/AddEmployeeForm";
import EmployeeTable from "./components/EmployeeTable";
import FadeTransition from "../../components/FadeTransition";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { search } from "../../../../reduxReducers/slicers/sliceEmployees";
import { AppDispatch } from "../../../../reduxReducers/store";
import { fetchEmployees } from "../../../../reduxActions/fetchEmployees";

function ManageEmployees() {

    const [query, setQuery] = useState<string>("");
    const dispatch = useDispatch<AppDispatch>();


    useEffect(() => {
        dispatch(fetchEmployees()).then(() => dispatch(search(query)));
    }, [query]);

    return (
        <FadeTransition>
            <>            
                <TableController 
                    tableTitle="Funcionários" 
                    thereIsAddButton
                    formTitle="Adicionar Novo Funcionário" 
                    form={<AddEmployeeForm />}
                    setQuery={setQuery}
                />

                <EmployeeTable />
            </>
        </FadeTransition>
    );
}

export default ManageEmployees;

function useState<T>(arg0: string): [any, any] {
    throw new Error("Function not implemented.");
}
