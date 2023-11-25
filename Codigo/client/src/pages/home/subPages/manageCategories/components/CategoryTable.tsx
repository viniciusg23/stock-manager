import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCategories } from "../../../../../reduxReducers/slicers/sliceCategories";
import { AppDispatch } from "../../../../../reduxReducers/store";
import { fetchCategories } from "../../../../../reduxActions/fetchCategories";
import CategoryController from "./CategoryController";
import Table from "../../../components/Table";
import { enqueueSnackbar } from "notistack";


interface ICategoryColumn{
    id: "id" | "name" | "fiscalCode" | "action";
    label: string;
    minWidth: number
    align?: "right";
}

interface ICategoryRow{
    id: string,
    name: string;
    fiscalCode: string;
    action: JSX.Element;
}

const columns: ICategoryColumn[] = [
    { id: "id", label: "Código", minWidth: 100 },
    { id: "name", label: "Nome", minWidth: 170 },
    { id: "fiscalCode", label: "Código Fiscal", minWidth: 150 },
    { id: "action" , label: "Ações", minWidth: 70 }
];

function CategoryTable() {

    const dispatch = useDispatch<AppDispatch>();
    const {loading, categories, error} = useSelector(useCategories);
    const [rows, setRows] = useState<ICategoryRow[]>([]);


    useEffect(() => {
        if(error) enqueueSnackbar(error, {variant: "error"});
        dispatch(fetchCategories());
    }, []);

    useEffect(() => {
        const rows: ICategoryRow[] = [];

        for(const category of categories){
            rows.push({
                id: category.id!,
                name: category.name,
                fiscalCode: category.fiscalCode,
                action: <CategoryController category={category}/>
            })
        }

        setRows(rows);
    }, [categories])


    return (
        <>
            <Table isLoading={loading} columns={columns} rows={rows} />
        </>
    );
}

export default CategoryTable;