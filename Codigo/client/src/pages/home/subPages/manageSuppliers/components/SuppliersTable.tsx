import { useEffect, useState } from "react";
import SupplierController from "./SupplierController";
import Table from "../../../components/Table";


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
}

const columns: ISupplierColumn[] = [
    { id: "id", label: "Código", minWidth: 150 },
    { id: "name", label: "Nome", minWidth: 150 },
    { id: "description", label: "Descrição", minWidth: 200},
    { id: "action", label: "Ações", minWidth: 100}
];


function SuppliersTable() {
    const [rows, setRows] = useState<ISupplierRow[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const options = { method: 'GET' };
    
                const jsonData = await fetch('/supplier/view', options);
                const data = await jsonData.json();

                for(const supplier of data.suppliers){
                    supplier.action = <SupplierController supplier={supplier} />
                }

                setRows(data.suppliers);

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

export default SuppliersTable;