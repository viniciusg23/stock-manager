import { useEffect, useState } from 'react';
import ProductController from './ProductController';
import Table from '../../../components/Table';
import { UnauthorizationError } from '../../../../../errors/UnauthorizationError';
import { useNavigate } from 'react-router-dom';
import { getAuthorizationToken } from '../../../utils/getAuthorizationToken';

interface ProductColumn{
    id: 'code' | 'isFiscal' | 'category' | 'name' | 'costPrice' | 'purchaseDate' | 'supplier' | "action";
    label: string;
    minWidth: number
    align?: 'right';
}

interface ProductRow{
    code: string;
    isFiscal: string;
    category: number;
    name: string;
    costPrice: number;
    purchaseDate: string;
    supplier: string;
}

const columns: ProductColumn[] = [
    { id: 'code', label: 'Código', minWidth: 100 },
    { id: 'isFiscal', label: 'Fiscal', minWidth: 50 },
    { id: 'category', label: 'Categoria', minWidth: 100 },
    { id: 'name', label: 'Nome', minWidth: 170 },
    { id: 'costPrice', label: 'Preço', minWidth: 100 },
    { id: 'purchaseDate', label: 'Data de Compra', minWidth: 100 },
    { id: 'supplier', label: 'Fornecedor', minWidth: 170 },
    { id: "action", label: "Ações", minWidth: 90}
];


function ProductsTable() {
    const navigate = useNavigate();
    const [rows, setRows] = useState<ProductRow[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const options = { 
                    method: 'GET',
                    headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${getAuthorizationToken()}`}, 
                };
    
                const jsonData = await fetch('/product/view', options);
                const data = await jsonData.json();

                for(const product of data.products){
                    product.isFiscal = product.isFiscal ? "Sim" : "Não"; 
                    product.purchaseDate = formatDate(product.purchaseMonth, product.purchaseYear);
                    product.action = <ProductController product={product} />;
                }

                setRows(data.products);
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

export default ProductsTable;

function formatDate(month: string, year: string){
    return month + "/" + year;
}