import { useEffect, useState } from "react";
import ProductController from "./ProductController";
import Table from "../../../components/Table";
import { useDispatch, useSelector } from "react-redux";
import { useProducts } from "../../../../../reduxReducers/slicers/sliceProducts";
import { fetchProducts } from "../../../../../reduxActions/fetchProducts";
import { AppDispatch } from "../../../../../reduxReducers/store";

interface ProductColumn{
    id: "code" | "isFiscal" | "category" | "name" | "costPrice" | "purchaseDate" | "supplier" | "action";
    label: string;
    minWidth: number
    align?: "right";
}

interface ProductRow{
    code: string;
    isFiscal: string;
    category: string;
    name: string;
    costPrice: number;
    purchaseDate: string;
    supplier: string;
    action: JSX.Element;
}

const columns: ProductColumn[] = [
    { id: "code", label: "Código", minWidth: 100 },
    { id: "isFiscal", label: "Fiscal", minWidth: 50 },
    { id: "category", label: "Categoria", minWidth: 100 },
    { id: "name", label: "Nome", minWidth: 170 },
    { id: "costPrice", label: "Preço", minWidth: 100 },
    { id: "purchaseDate", label: "Data de Compra", minWidth: 100 },
    { id: "supplier", label: "Fornecedor", minWidth: 170 },
    { id: "action", label: "Ações", minWidth: 90}
];


function ProductsTable() {
    const {products, loading, error} = useSelector(useProducts);
    const dispatch = useDispatch<AppDispatch>();


    const [rows, setRows] = useState<ProductRow[]>([]);

    useEffect(() => {
        dispatch(fetchProducts())
    }, [])


    useEffect(() => {
        const rows: ProductRow[] = [];

        for(const product of products){
            const row: ProductRow = {
                code: product.code,
                isFiscal: product.isFiscal ? "Sim" : "Não",
                category: product.category ? product.category.name : "Indefinido",
                name: product.name,
                costPrice: product.costPrice,
                purchaseDate: formatDate(product.purchaseMonth, product.purchaseYear),
                supplier: product.supplier ? product.supplier.name : "Indefinido",
                action: <ProductController product={product} />
            }

            rows.push(row);
        }

        setRows(rows);
    }, [products]);


    return (
        <>

            

            <Table isLoading={loading} columns={columns} rows={rows} />
        </>
    );
}

export default ProductsTable;

function formatDate(month: string, year: number){
    return month + "/" + year;
}