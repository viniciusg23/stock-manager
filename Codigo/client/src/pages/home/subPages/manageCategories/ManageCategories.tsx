import TableController from "../../components/TableController";
import CategoryForm from "./components/CategoryForm";
import CategoryTable from "./components/CategoryTable";
import FadeTransition from "../../components/FadeTransition";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { search } from "../../../../reduxReducers/slicers/sliceCategories";
import { AppDispatch } from "../../../../reduxReducers/store";
import { fetchCategories } from "../../../../reduxActions/fetchCategories";

function ManageCategories() {

    const [query, setQuery] = useState<string>("");
    const dispatch = useDispatch<AppDispatch>();


    useEffect(() => {
        dispatch(fetchCategories()).then(() => dispatch(search(query)));
    }, [dispatch, query]);

    return (
        <FadeTransition>
            <>
                <TableController 
                    tableTitle="Categorias de Produtos"
                    thereIsAddButton
                    formTitle="Adicionar Nova Categoria"
                    form={<CategoryForm />}
                    setQuery={setQuery}
                />

                <CategoryTable />
            </>
        </FadeTransition>
    );
}

export default ManageCategories;