import TableController from "../../components/TableController";
import SupplierForm from "./components/SupplierForm";
import SuppliersTable from "./components/SuppliersTable";
import FadeTransition from "../../components/FadeTransition";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { search } from "../../../../reduxReducers/slicers/sliceSuppliers";
import { AppDispatch } from "../../../../reduxReducers/store";
import { fetchSuppliers } from "../../../../reduxActions/fetchSuppliers";

function ManageSuppliers() {

    const [query, setQuery] = useState<string>("");
    const dispatch = useDispatch<AppDispatch>();


    useEffect(() => {
        dispatch(fetchSuppliers()).then(() => dispatch(search(query)));
    }, [query]);

    
    return (
        <FadeTransition>
            <>
                <TableController
                    tableTitle="Fornecedores"
                    thereIsAddButton
                    formTitle="Adicionar Novo Fornecedor"
                    form={<SupplierForm />}
                    setQuery={setQuery}
                />

                <SuppliersTable />
            </>
        </FadeTransition>  
    );
}

export default ManageSuppliers;