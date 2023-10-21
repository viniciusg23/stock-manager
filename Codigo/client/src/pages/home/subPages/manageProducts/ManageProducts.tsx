import FadeIn from "react-fade-in/lib/FadeIn";
import AddProduct from "./components/AddProduct";
import ProductsTable from "./components/ProductsTable";

function ManageProducts() {
    return (
        <>
            <AddProduct />

            <FadeIn>
                <ProductsTable />
            </FadeIn>
            
        </>
    );
}

export default ManageProducts;