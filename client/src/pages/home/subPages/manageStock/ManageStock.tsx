import TableController from "../../components/TableController";
import StockTable from "./components/StockTable";
import FadeTransition from "../../components/FadeTransition";
import { search } from "../../../../reduxReducers/slicers/sliceProducts";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../reduxReducers/store";
import { fetchProducts } from "../../../../reduxActions/fetchProducts";

function ManageStock() {

    const [query, setQuery] = useState<string>("");
    const dispatch = useDispatch<AppDispatch>();


    useEffect(() => {
        dispatch(fetchProducts()).then(() => dispatch(search(query)));
    }, [dispatch, query]);

    return (
        <FadeTransition>
            <>
                <TableController 
                    tableTitle="Estoque de Produtos"
                    thereIsAddButton={false}
                    setQuery={setQuery}
                />
                <StockTable />
            </>
        </FadeTransition>
    );
}

export default ManageStock;