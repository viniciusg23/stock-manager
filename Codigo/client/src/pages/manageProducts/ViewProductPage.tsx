import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

interface Product {
  code: string;
  isFiscal: boolean;
  category: string;
  name: string;
  quantity: number;
  costPrice: number;
  salePrice: number;
  purchaseMonth: string;
  purchaseYear: number;
  supplier: string;
}

function ViewProductPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const options = { method: "GET" };
        const data = await fetch("/product/view", options);
        const jsonData = await data.json();
        setProducts(jsonData.products);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          textAlign={"center"}
          sx={{
            padding: ".5em",
            fontSize: "2em",
          }}
        >
          Seus Produtos
        </Typography>
        <TableContainer component={Paper} elevation={4} sx={{ width: "80%" }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>Categoria</TableCell>
                <TableCell>Quantidade</TableCell>
                <TableCell>Custo</TableCell>
                <TableCell>Preço de Venda</TableCell>
                <TableCell>Mês de Compra</TableCell>
                <TableCell>Ano de Compra</TableCell>
                <TableCell>Fornecedor</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((row, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell>{row.category}</TableCell>
                  <TableCell>{row.quantity}</TableCell>
                  <TableCell>{row.costPrice}</TableCell>
                  <TableCell>{row.salePrice}</TableCell>
                  <TableCell>{row.purchaseMonth}</TableCell>
                  <TableCell>{row.purchaseYear}</TableCell>
                  <TableCell>{row.supplier}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}

export default ViewProductPage;
