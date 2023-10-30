import { useEffect, useState } from "react";
import SupplierController from "./SupplierController";
import Table from "../../../components/Table";
import { AppDispatch } from "../../../../../reduxReducers/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchSuppliers } from "../../../../../reduxActions/fetchSuppliers";
import { useSuppliers } from "../../../../../reduxReducers/slicers/sliceSuppliers";


interface ISupplierColumn{
    id: "id" | "name" | "description" | "action";
    label: string;
    minWidth: number
    align?: 'right';
}

interface ISupplierRow{
    id: string;
    name: string;
    description: string;
    action: JSX.Element;
}

const columns: ISupplierColumn[] = [
    { id: "id", label: "Código", minWidth: 150 },
    { id: "name", label: "Nome", minWidth: 150 },
    { id: "description", label: "Descrição", minWidth: 200},
    { id: "action", label: "Ações", minWidth: 100}
];


function SuppliersTable() {
    const [rows, setRows] = useState<ISupplierRow[]>([]);
    const {loading, suppliers, error} = useSelector(useSuppliers);

    console.log(suppliers);

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchSuppliers())
    }, []);

    useEffect(() => {
        const rows: ISupplierRow[] = [];

        for(const supplier of suppliers){
            rows.push({
                id: supplier.id!,
                name: supplier.name,
                description: supplier.description,
                action: <SupplierController supplier={supplier} />
            })
        }

        setRows(rows);
    }, [suppliers]);


    return (
        <>
            <Table isLoading={loading} columns={columns} rows={rows} />
        </>
    );
}

export default SuppliersTable;