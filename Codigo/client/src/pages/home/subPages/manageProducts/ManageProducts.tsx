import ProductsTable from "./components/ProductsTable";
import TableController from "../../components/TableController";
import ProductForm from "./components/ProductForm";
import { useProducts } from "../../../../reduxReducers/slicers/sliceProducts";

function ManageProducts() {

    

    return (
        <>

            <TableController 
                tableTitle="Seus Produtos"
                thereIsAddButton
                // selector="products"
                // slice={useProducts}
                formTitle="Adicionar Novo Produto" 
                form={<ProductForm control="create"/>}
            />
            
            <ProductsTable />

        </>
    );
}

export default ManageProducts;