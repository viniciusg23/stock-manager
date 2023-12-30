import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { search } from "../../../../reduxReducers/slicers/sliceProducts";
import { AppDispatch } from "../../../../reduxReducers/store";
import FadeTransition from "../../components/FadeTransition";
import TableController from "../../components/TableController";
import SaleTable from "./components/SaleTable";
import { fetchSales } from "../../../../reduxActions/fetchSales";

function ViewSales() {

    const [query, setQuery] = useState<string>("");
    const dispatch = useDispatch<AppDispatch>();


    useEffect(() => {
        dispatch(fetchSales()).then(() => dispatch(search(query)));
    }, [query]);

    return (
        <FadeTransition>
            <>
                <TableController 
                    tableTitle="Vendas"
                    thereIsAddButton={false}
                    setQuery={setQuery}
                />

                <SaleTable />
            </>
        </FadeTransition>
    );
}

export default ViewSales;