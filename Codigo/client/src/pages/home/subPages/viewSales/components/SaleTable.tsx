import { useEffect, useState } from "react";
import Table from "../../../components/Table";
import { AppDispatch } from "../../../../../reduxReducers/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchSales } from "../../../../../reduxActions/fetchSales";
import { useSales } from "../../../../../reduxReducers/slicers/sliceSales";
import SaleController from "./SaleController";


interface ISaleColumn{
    id: "id" | "buyer" | "product" | "quantity" | "total" | "employee" | "action";
    label: string;
    minWidth: number
    align?: "right";
}

interface ISaleRow{
    id: string;
    buyer: string;
    product: string;
    quantity: number;
    total: number;
    employee: string;
    action: JSX.Element;
}

const columns: ISaleColumn[] = [
    { id: "id", label: "Código", minWidth: 100 },
    { id: "buyer", label: "Comprador", minWidth: 100 },
    { id: "product", label: "Produto", minWidth: 150},
    { id: "quantity", label: "Quantidade Vendida", minWidth: 200 },
    { id: "total", label: "Valor Total", minWidth: 50 },
    { id: "employee", label: "Vendedor", minWidth: 100},
    { id: "action", label: "Ações", minWidth: 100}
];


function SaleTable() {
    const [rows, setRows] = useState<ISaleRow[]>([]);
    const {loading, sales, error} = useSelector(useSales);

    console.log(sales)

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchSales());
        // console.log(sales);
    }, []);

    useEffect(() => {
        const rows: ISaleRow[] = [];

        for(const sale of sales){
            rows.push({
                id: sale.id!,
                buyer: sale.buyerName,
                product: sale.product?.name ? sale.product.name : "Não encontrado",
                quantity: sale.quantity,
                total: sale.totalPrice,
                employee: sale.employee?.name ? sale.employee.name : "Não encontrado",
                action: <SaleController id={sale.id!} />
            })
        }

        setRows(rows);
    }, [sales]);


    return (
        <>
            <Table isLoading={loading} columns={columns} rows={rows} />
        </>
    );
}

export default SaleTable;