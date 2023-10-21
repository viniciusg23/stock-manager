import { useEffect, useState } from "react";
import SupplierController from "./SupplierController";
import Table from "../../../components/Table";
import { UnauthorizationError } from "../../../../../errors/UnauthorizationError";
import { useNavigate } from "react-router-dom";
import { getAuthorizationToken } from "../../../utils/getAuthorizationToken";


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
    const navigate = useNavigate();
    const [rows, setRows] = useState<ISupplierRow[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const options = { 
                    method: 'GET',
                    headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${getAuthorizationToken()}`},
                };
    
                const jsonData = await fetch('/supplier/view', options);
                const data = await jsonData.json();

                for(const supplier of data.suppliers){
                    supplier.action = <SupplierController supplier={supplier} />
                }

                setRows(data.suppliers);

            } 
            catch (error: any | UnauthorizationError) {
                if(error instanceof UnauthorizationError){
                    alert("Sessão finalizada");
                    return navigate("/");
                }
    
                alert(error.message)
            }
            finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);


    return (
        <>
            <Table isLoading={loading} columns={columns} rows={rows} />
        </>
    );
}

export default SuppliersTable;