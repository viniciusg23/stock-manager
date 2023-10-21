import FadeIn from "react-fade-in/lib/FadeIn";
import AddEmployee from "./components/AddEmployee";
import EmployeeTable from "./components/EmployeeTable";

function ManageEmployees() {
    return (
        <>
            <AddEmployee />
            <FadeIn>
                <EmployeeTable />
            </FadeIn>
        </>
    );
}

export default ManageEmployees;