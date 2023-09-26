import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";

function ViewSupplierPage() {

    const [suppliers, setSuppliers] = useState<{name: string, description: string}[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const options = {method: 'GET'};

                const data = await fetch('/supplier/view', options);
                const jsonData = await data.json();

                setSuppliers(jsonData.suppliers);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"

        }}>
            <Typography textAlign={"center"} sx={{
                padding: ".5em",
                fontSize: "2em"
            }}>
                    Seus Fornecedores
            </Typography>
        <TableContainer component={Paper} elevation={4} sx={{
            width: "50%"
        }}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Nome do Fornecedor</TableCell>
                        <TableCell align="right">Descrição</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {suppliers.map((row) => (
                        <TableRow
                            key={row.name}
                        >
                            <TableCell component="th" scope="row" >
                                {row.name}
                            </TableCell>
                            <TableCell component="th" scope="row" align="right">
                                {row.description}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </Box>
    );
}

export default ViewSupplierPage;