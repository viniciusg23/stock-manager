import { useSuppliers } from "../../../../reduxReducers/slicers/sliceSuppliers";
import TableController from "../../components/TableController";
import SupplierForm from "./components/SupplierForm";
import SuppliersTable from "./components/SuppliersTable";

function ManageSuppliers() {
    return (
        <>

            <TableController
                tableTitle="Seus Fornecedores"
                thereIsAddButton
                // selector="suppliers"
                // slice={useSuppliers}
                formTitle="Adicionar Novo Fornecedor"
                form={<SupplierForm />}
            />

            <SuppliersTable />
        </>
    );
}

export default ManageSuppliers;