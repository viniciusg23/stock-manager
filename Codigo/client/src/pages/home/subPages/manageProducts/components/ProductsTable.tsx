import React, { useEffect, useState } from 'react';
import { Edit, Delete } from '@mui/icons-material/';
import { ButtonGroup, Button, IconButton, Paper, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Tooltip } from '@mui/material';
import ProductController from './ProductController';
import Table from '../../../components/Table';

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
    const [rows, setRows] = useState<ProductRow[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const options = { method: 'GET' };
    
                const jsonData = await fetch('/product/view', options);
                const data = await jsonData.json();

                for(const product of data.products){
                    product.purchaseDate = formatDate(product.purchaseMonth, product.purchaseYear);
                    product.action = <ProductController product={product} />
                }

                setRows(data.products);

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

export default ProductsTable;

function formatDate(month: string, year: string){
    return month + "/" + year;
}