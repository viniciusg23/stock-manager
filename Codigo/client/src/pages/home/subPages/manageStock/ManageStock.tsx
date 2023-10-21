import FadeIn from "react-fade-in/lib/FadeIn";
import StockTable from "./components/StockTable";

function ManageStock() {
    return (
        <>
            <FadeIn>
                <StockTable />

            </FadeIn>
        </>
    );
}

export default ManageStock;