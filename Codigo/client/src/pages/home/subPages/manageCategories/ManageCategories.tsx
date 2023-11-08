import TableController from "../../components/TableController";
import CategoryForm from "./components/CategoryForm";
import CategoryTable from "./components/CategoryTable";
import FadeTransition from "../../components/FadeTransition";

function ManageCategories() {

    return (
        <FadeTransition>
            <>
                <TableController 
                    tableTitle="Suas Categorias de Produtos"
                    thereIsAddButton
                    formTitle="Adicionar Nova Categoria"
                    form={<CategoryForm />}
                />

                <CategoryTable />
            </>
        </FadeTransition>
    );
}

export default ManageCategories;