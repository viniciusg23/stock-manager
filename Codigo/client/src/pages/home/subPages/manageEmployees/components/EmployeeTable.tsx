import { useEffect, useState } from "react";
import Table from "../../../components/Table";
import EmployeeController from "./EmployeeController";
import { UnauthorizationError } from "../../../../../errors/UnauthorizationError";
import { useNavigate } from "react-router-dom";
import { getAuthorizationToken } from "../../../utils/getAuthorizationToken";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../../reduxReducers/store";
import { useEmployees } from "../../../../../reduxReducers/slicers/sliceEmployees";
import { fetchEmployees } from "../../../../../reduxActions/fetchEmployees";

interface IEmployeeColumn{
    id: "id" | "name" | "job" | "action";
    label: string;
    minWidth: number
    align?: "right";
}

interface IEmployeeRow{
    id: string,
    name: string;
    job: string;
    action: JSX.Element;
}

const columns: IEmployeeColumn[] = [
    { id: "id", label: "Código", minWidth: 100 },
    { id: "name", label: "Nome", minWidth: 170 },
    { id: "job", label: "Cargo", minWidth: 150 },
    { id: "action" , label: "Ações", minWidth: 70 }
];


function EmployeeTable() {
    const dispatch = useDispatch<AppDispatch>();
    const {loading, employees, error} = useSelector(useEmployees);
    const [rows, setRows] = useState<IEmployeeRow[]>([]);


    useEffect(() => {
        dispatch(fetchEmployees());
    }, []);

    useEffect(() => {
        const rows: IEmployeeRow[] = [];

        for(const employee of employees){
            rows.push({
                id: employee.id!,
                name: employee.name,
                job: employee.job,
                action: <EmployeeController employee={employee}/>
            })
        }

        setRows(rows);
    }, [employees])


    return (
        <>
            <Table isLoading={loading} columns={columns} rows={rows} />
        </>
    );
}

export default EmployeeTable;