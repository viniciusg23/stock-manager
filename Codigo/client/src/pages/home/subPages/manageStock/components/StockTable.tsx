import { useEffect, useState } from "react";
import Table from "../../../components/Table";
import StockController from "./StockController";


interface IStockColumn{
    id: 'code' | 'name' | 'costPrice' | "salePrice" | "quantity" | 'supplier' | "action" | "profit";
    label: string;
    minWidth: number
    align?: 'right';
}

interface IStockRow{
    code: string
    category: string;
    name: string;
    costPrice: number;
    salePrice: number;
    quantity: number;
    supplier: string;
    profit: number;
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
    const [rows, setRows] = useState<IStockRow[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const options = { method: 'GET' };
    
                const jsonData = await fetch('/product/view', options);
                const data = await jsonData.json();

                for(const product of data.products){
                    product.action = <StockController product={product} />;
                    product.profit = (product.salePrice - product.costPrice).toFixed(2);
                }

                setRows(data.products);

            } catch (error: any) {
                alert(error.message);
            }
        }

        fetchData();
    }, []);


    return (
        <>
            <Table columns={columns} rows={rows} />
        </>
    );
}

export default StockTable;