import ProductsTable from "./components/ProductsTable";
import TableController from "../../components/TableController";
import ProductForm from "./components/ProductForm";
import FadeTransition from "../../components/FadeTransition";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../reduxReducers/store";
import { fetchProducts } from "../../../../reduxActions/fetchProducts";
import { search } from "../../../../reduxReducers/slicers/sliceProducts";

function ManageProducts() {

    const [query, setQuery] = useState<string>("");
    const dispatch = useDispatch<AppDispatch>();


    useEffect(() => {
        dispatch(fetchProducts()).then(() => dispatch(search(query)));
    }, [dispatch, query]);

    return (
        <FadeTransition>
            <>
                <TableController 
                        tableTitle="Produtos"
                        thereIsAddButton
                        formTitle="Adicionar Novo Produto" 
                        form={<ProductForm control="create"/>}
                        setQuery={setQuery}
                    />
                    
                <ProductsTable />
            </>
        </FadeTransition>
    );
}

export default ManageProducts;