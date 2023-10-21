import FadeIn from "react-fade-in/lib/FadeIn";
import AddSupplier from "./components/AddSupplier";
import SuppliersTable from "./components/SuppliersTable";

function ManageSuppliers() {
    return (
        <>
            <AddSupplier />
            <FadeIn>
                <SuppliersTable />
            </FadeIn>
        </>
    );
}

export default ManageSuppliers;