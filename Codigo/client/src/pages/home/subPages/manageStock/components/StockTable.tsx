import { useEffect, useState } from "react";
import Table from "../../../components/Table";
import StockController from "./StockController";
import { UnauthorizationError } from "../../../../../errors/UnauthorizationError";
import { getAuthorizationToken } from "../../../utils/getAuthorizationToken";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useProducts } from "../../../../../reduxReducers/slicers/sliceProducts";
import { AppDispatch } from "../../../../../reduxReducers/store";
import { fetchProducts } from "../../../../../reduxActions/fetchProducts";


interface IStockColumn{
    id: 'code' | 'name' | 'costPrice' | "salePrice" | "quantity" | 'supplier' | "action" | "profit";
    label: string;
    minWidth: number
    align?: 'right';
}

interface IStockRow{
    code: string
    name: string;
    costPrice: number;
    salePrice: number;
    quantity: number;
    profit: number;
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
    
    // const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const {products, loading, error} = useSelector(useProducts);
    const [rows, setRows] = useState<IStockRow[]>([]);


    useEffect(() => {
        dispatch(fetchProducts())
    }, []);

    useEffect(() => {
        const rows: IStockRow[] = [];

        for(const product of products){
            const row: IStockRow = {
                code: product.code,
                quantity: product.quantity,
                name: product.name,
                costPrice: product.costPrice,
                salePrice: product.salePrice,
                action: <StockController product={product} />,
                profit: product.salePrice - product.costPrice
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