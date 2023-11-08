import ProductsTable from "./components/ProductsTable";
import TableController from "../../components/TableController";
import ProductForm from "./components/ProductForm";
import FadeTransition from "../../components/FadeTransition";

function ManageProducts() {

    return (
        <FadeTransition>
            <>
                <TableController 
                        tableTitle="Seus Produtos"
                        thereIsAddButton
                        formTitle="Adicionar Novo Produto" 
                        form={<ProductForm control="create"/>}
                    />
                    
                <ProductsTable />
            </>
        </FadeTransition>
    );
}

export default ManageProducts;