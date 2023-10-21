import { useEffect, useState } from 'react';
import Table from '../../../components/Table';
import EmployeeController from './EmployeeController';
import { UnauthorizationError } from '../../../../../errors/UnauthorizationError';
import { useNavigate } from 'react-router-dom';
import { getAuthorizationToken } from '../../../utils/getAuthorizationToken';

interface EmployeeColumn{
    id: 'id' | 'name' | 'job' | "action";
    label: string;
    minWidth: number
    align?: 'right';
}

interface EmployeeRow{
    id: string,
    name: string;
    job: string;
}

const columns: EmployeeColumn[] = [
    { id: "id", label: "Código", minWidth: 100 },
    { id: "name", label: "Nome", minWidth: 170 },
    { id: "job", label: "Cargo", minWidth: 150 },
    { id: "action" , label: "Ações", minWidth: 70 }
];


function EmployeeTable() {
    const navigate = useNavigate();
    const [rows, setRows] = useState<EmployeeRow[]>([]);
    const [loading, setLoading] = useState<boolean>(true);


    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const options = { 
                    method: 'GET',
                    headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${getAuthorizationToken()}`},
                };
    
                const jsonData = await fetch('/employee/view', options);
                const data = await jsonData.json();

                for(const employee of data.employees){
                    employee.action = <EmployeeController employee={employee} />
                }

                setRows(data.employees);

            } catch (error: any | UnauthorizationError) {
                if(error instanceof UnauthorizationError){
                    alert("Sessão finalizada");
                    return navigate("/");
                }

                alert(error);
            } finally {
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

export default EmployeeTable;