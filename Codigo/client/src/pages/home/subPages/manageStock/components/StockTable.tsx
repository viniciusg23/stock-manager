import { useEffect, useState } from "react";
import Table from "../../../components/Table";
import StockController from "./StockController";
import { useDispatch, useSelector } from "react-redux";
import { useProducts } from "../../../../../reduxReducers/slicers/sliceProducts";
import { AppDispatch } from "../../../../../reduxReducers/store";
import { fetchProducts } from "../../../../../reduxActions/fetchProducts";
import { enqueueSnackbar } from "notistack";
import { Typography } from "@mui/material";


interface IStockColumn{
    id: "code" | "name" | "costPrice" | "salePrice" | "quantity" | "supplier" | "action" | "profit";
    label: string;
    minWidth: number
    align?: "right";
}

interface IStockRow{
    code: string
    name: string;
    costPrice: string;
    salePrice: string;
    quantity: number;
    profit: JSX.Element;
    action: JSX.Element;
}

const columns: IStockColumn[] = [
    { id: "code", label: "Código", minWidth: 150 },
    { id: "name", label: "Nome", minWidth: 200 },
    { id: "quantity", label: "Quantidade", minWidth: 150 },
    { id: "costPrice", label: "Preço de Custo", minWidth: 150 },
    { id: "salePrice", label: "Preço de Venda", minWidth: 150 },
    { id: "profit", label: "Lucro", minWidth: 150 },
    { id: "action", label: "Ações", minWidth: 100 }
];


function StockTable() {
    
    const dispatch = useDispatch<AppDispatch>();

    const {products, loading, error} = useSelector(useProducts);
    const [rows, setRows] = useState<IStockRow[]>([]);


    useEffect(() => {
        if(error) enqueueSnackbar(error, {variant: "error"});
        dispatch(fetchProducts());
    }, []);

    useEffect(() => {
        const rows: IStockRow[] = [];

        for(const product of products){
            const profit = product.salePrice - product.costPrice;

            const row: IStockRow = {
                code: product.code,
                quantity: product.quantity,
                name: product.name,
                costPrice: product.costPrice.toFixed(2),
                salePrice: product.salePrice.toFixed(2),
                action: <StockController product={product} />,
                profit: <Typography color={profit < 1 ? "red" : "green"}>{profit.toFixed(2)}</Typography>
            }

            rows.push(row);
        }

        setRows(rows);
    }, [products]);


    return (
        <>
            <Table isLoading={loading} columns={columns} rows={rows} />
        </>
    );
}

export default StockTable;