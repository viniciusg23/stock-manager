import React, { useEffect, useState } from 'react';
import { Edit, Delete } from '@mui/icons-material/';
import { ButtonGroup, Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Tooltip } from '@mui/material';
import ProductController from './ProductController';

interface Column {
    id: 'code' | 'isFiscal' | 'category' | 'name' | 'costPrice' | 'purchaseDate' | 'supplier';
    label: string;
    minWidth?: number;
    align?: 'right';
}

interface Row {
    code: string;
    isFiscal: string;
    category: number;
    name: string;
    costPrice: number;
    purchaseDate: string;
    supplier: string;
}

const columns: Column[] = [
    { id: 'code', label: 'Código', minWidth: 100 },
    { id: 'isFiscal', label: 'Fiscal', minWidth: 50 },
    { id: 'category', label: 'Categoria', minWidth: 100 },
    { id: 'name', label: 'Nome', minWidth: 170 },
    { id: 'costPrice', label: 'Preço', minWidth: 100 },
    { id: 'purchaseDate', label: 'Data de Compra', minWidth: 100 },
    { id: 'supplier', label: 'Fornecedor', minWidth: 170 },
];



// const rows: Row[] = [
//     { code: '123', isFiscal: 'Sim', category: 1, name: 'Produto A', costPrice: 50, purchaseDate: '01/10/2023', supplier: 'Fornecedor A' },
// ];

function ProductsTable() {
    const [rows, setRows] = useState<Row[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const options = { method: 'GET' };
    
                const jsonData = await fetch('/product/view', options);
                const data = await jsonData.json();

                for(const product of data.products){
                    product.purchaseDate = formatDate(product.purchaseMonth, product.purchaseYear);
                }

                setRows(data.products);
            } catch (error: any) {
                alert(error.message);
            }
        }

        fetchData();
    }, []);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper elevation={0} sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table size="small" stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align || 'left'}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                            <TableCell
                                key="action"
                                align="left"
                            >
                                Ações
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align || 'left'}>
                                                    {value}
                                                </TableCell>
                                            );
                                        })}
                                        <TableCell>
                                            <ProductController product={row} />
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}

export default ProductsTable;

function formatDate(month: string, year: string){
    return month + "/" + year;
}