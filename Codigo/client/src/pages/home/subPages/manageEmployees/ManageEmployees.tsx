import { useEffect, useState } from "react";
import TableController from "../../components/TableController";
import AddEmployeeForm from "./components/AddEmployeeForm";
import EmployeeTable from "./components/EmployeeTable";
import FadeTransition from "../../components/FadeTransition";
import { useDispatch } from "react-redux";
import { search } from "../../../../reduxReducers/slicers/sliceEmployees";
import { AppDispatch } from "../../../../reduxReducers/store";
import { fetchEmployees } from "../../../../reduxActions/fetchEmployees";

function ManageEmployees() {

    const [query, setQuery] = useState<string>("");
    const dispatch = useDispatch<AppDispatch>();


    useEffect(() => {
        dispatch(fetchEmployees()).then(() => dispatch(search(query)));
    }, [dispatch, query]);

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