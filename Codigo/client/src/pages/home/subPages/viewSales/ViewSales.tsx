import FadeTransition from "../../components/FadeTransition";
import TableController from "../../components/TableController";
import SaleTable from "./components/SaleTable";

function ViewSales() {
    return (
        <FadeTransition>
            <>
                <TableController 
                    tableTitle="Vendas"
                    thereIsAddButton={false}
                />

                <SaleTable />
            </>
        </FadeTransition>
    );
}

export default ViewSales;