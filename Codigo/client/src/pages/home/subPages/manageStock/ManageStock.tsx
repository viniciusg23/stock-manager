import TableController from "../../components/TableController";
import StockTable from "./components/StockTable";
import FadeTransition from "../../components/FadeTransition";

function ManageStock() {

    return (
        <FadeTransition>
            <>
                <TableController 
                    tableTitle="Seu Estoque de Produtos"
                    thereIsAddButton={false}
                />
                <StockTable />
            </>
        </FadeTransition>
    );
}

export default ManageStock;