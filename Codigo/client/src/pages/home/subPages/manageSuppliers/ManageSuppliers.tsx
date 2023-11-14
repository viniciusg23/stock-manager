import TableController from "../../components/TableController";
import SupplierForm from "./components/SupplierForm";
import SuppliersTable from "./components/SuppliersTable";
import FadeTransition from "../../components/FadeTransition";

function ManageSuppliers() {

    
    return (
        <FadeTransition>
            <>
                <TableController
                    tableTitle="Fornecedores"
                    thereIsAddButton
                    formTitle="Adicionar Novo Fornecedor"
                    form={<SupplierForm />}
                />

                <SuppliersTable />
            </>
        </FadeTransition>  
    );
}

export default ManageSuppliers;