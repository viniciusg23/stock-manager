import { useProducts } from "../../../../reduxReducers/slicers/sliceProducts";
import TableController from "../../components/TableController";
import StockTable from "./components/StockTable";

function ManageStock() {
    return (
        <>

            <TableController 
                tableTitle="Seu Estoque de Produtos"
                // selector="products"
                // slice={useProducts}
                thereIsAddButton={false}
            />
            <StockTable />
        </>
    );
}

export default ManageStock;