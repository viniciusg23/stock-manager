import { useEffect, useState } from 'react';
import Table from '../../../components/Table';
import EmployeeController from './EmployeeController';

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
    const [rows, setRows] = useState<EmployeeRow[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const options = { method: 'GET' };
    
                const jsonData = await fetch('/employee/view', options);
                const data = await jsonData.json();

                for(const employee of data.employees){
                    employee.action = <EmployeeController employee={employee} />
                }

                setRows(data.employees);

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

export default EmployeeTable;