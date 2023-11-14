import { Paper, TableContainer, TableHead, TableRow, TableCell, TableBody, TablePagination, Table as MUITable, CircularProgress, Typography } from "@mui/material";
import { useState } from "react";


interface TableProps {
    columns: any[];
    rows: any[];
    isLoading: boolean;
}


function Table(props: TableProps) {
    const { columns, rows, isLoading } = props;

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);


    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <>
            {
                isLoading ? (
                    <Paper elevation={0} sx={{ display: "flex", justifyContent: "center" }}>
                        <CircularProgress color="secondary" />
                    </Paper>
                ) : (
                    <Paper elevation={0} sx={{ width: "100%", overflow: "hidden" }}>
                        <TableContainer sx={{ maxHeight: 440 }}>
                            <MUITable size="small" stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                align={column.align || "left"}
                                                style={{ minWidth: column.minWidth }}
                                            >
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row) => {
                                            return (
                                                <TableRow key={row.id} hover role="checkbox" tabIndex={-1} >
                                                    {columns.map((column) => {
                                                        const value = row[column.id];
                                                        return (
                                                            <TableCell 
                                                                key={column.id} 
                                                                align={column.align || "left"}
                                                            >
                                                                {value}
                                                            </TableCell>
                                                        );
                                                    })}
                                                </TableRow>
                                            );
                                        })}
                                </TableBody>
                            </MUITable>
                        </TableContainer>

                        {rows.length <= 0 && (
                            <Typography 
                                my="3em" 
                                sx={{
                                    opacity: 0.5,
                                    fontSize: "2em"
                                }}
                            >
                                Nenhum item cadastrado
                            </Typography>
                        )}

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
                )
            }
        </>
    );
}

export default Table;