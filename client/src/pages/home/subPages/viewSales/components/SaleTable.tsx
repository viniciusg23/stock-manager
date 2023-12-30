import { useEffect, useState } from "react";
import Table from "../../../components/Table";
import { AppDispatch } from "../../../../../reduxReducers/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchSales } from "../../../../../reduxActions/fetchSales";
import { useSales } from "../../../../../reduxReducers/slicers/sliceSales";
import SaleController from "./SaleController";
import { enqueueSnackbar } from "notistack";
import { Typography } from "@mui/material";


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
    total: JSX.Element;
    employee: string;
    action: JSX.Element;
}

const columns: ISaleColumn[] = [
    { id: "id", label: "Código", minWidth: 100 },
    { id: "buyer", label: "Comprador", minWidth: 100 },
    { id: "product", label: "Produto", minWidth: 150},
    { id: "quantity", label: "Quantidade Vendida", minWidth: 100 },
    { id: "total", label: "Valor Total", minWidth: 50 },
    { id: "employee", label: "Vendedor", minWidth: 100},
    { id: "action", label: "Ações", minWidth: 100}
];


function SaleTable() {
    const [rows, setRows] = useState<ISaleRow[]>([]);
    const {loading, sales, error} = useSelector(useSales);

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if(error) enqueueSnackbar(error, {variant: "error"});
        dispatch(fetchSales());
    }, []);

    useEffect(() => {
        const rows: ISaleRow[] = [];

        console.log(sales);

        if(sales.length > 0){
            for(const sale of sales){
                rows.push({
                    id: sale.id!,
                    buyer: sale.buyerName,
                    product: sale.product?.name ? sale.product.name : "Não encontrado",
                    quantity: sale.quantity,
                    total: <Typography>R${sale.totalPrice.toFixed(2)}</Typography>,
                    employee: sale.employee?.name ? sale.employee.name : "Não encontrado",
                    action: <SaleController id={sale.id!} />
                })
            }
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