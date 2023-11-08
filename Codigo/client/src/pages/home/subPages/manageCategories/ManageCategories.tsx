import { useCategories } from "../../../../reduxReducers/slicers/sliceCategories";
import TableController from "../../components/TableController";
import CategoryForm from "./components/CategoryForm";
import CategoryTable from "./components/CategoryTable";

function ManageCategories() {
    return (
        <>

            <TableController 
                tableTitle="Suas Categorias de Produtos"
                thereIsAddButton
                // selector="categories"
                // slice={useCategories}
                formTitle="Adicionar Nova Categoria"
                form={<CategoryForm />}
            />

            <CategoryTable />
        </>
    );
}

export default ManageCategories;