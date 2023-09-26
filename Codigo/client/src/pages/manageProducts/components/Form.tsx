import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { set } from "mongoose";
import { useState } from "react";
import SupplierSelect from "./SupplierSelect";
import { useNavigate } from "react-router-dom";

function Form() {

    const navigate = useNavigate();

    const [isFiscal, setIsFiscal] = useState<0 | 1>();
    const [category, setCategory] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [quantity, setQuantity] = useState<number>();
    const [costPrice, setCostPrice] = useState<number>();
    const [salePrice, setSalePrice] = useState<number>();
    const [pursacheMonth, setPursacheMonth] = useState<number>();
    const [pursacheYear, setPursacheYear] = useState<number>();
    const [supplier, setSupplier] = useState<string>("");

    const handleSubmit = async () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "isFiscal": isFiscal,
            "category": category,
            "name": name,
            "quantity": quantity,
            "costPrice": costPrice,
            "salePrice": salePrice,
            "purchaseMonth": pursacheMonth,
            "purchaseYear": pursacheYear,
            "supplier": supplier
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
        };

        console.log(raw)

        const data = await fetch("/product/create", requestOptions);
        const jsonData = await data.json();
            

        return navigate("/home");
    }


    return (
        <Box sx={{width: "70%"}}>
            <FormControl fullWidth>
                <InputLabel id="isFiscal">Produto é Fiscal</InputLabel>
                <Select
                    labelId="isFiscal"
                    value={isFiscal}
                    label="Produto é Fiscal"
                    onChange={() => { setIsFiscal(isFiscal === 0 ? 1 : 0) }}
                >
                    <MenuItem value={1}>É fiscal</MenuItem>
                    <MenuItem value={0}>Não é fiscal</MenuItem>
                </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
                <TextField
                    label="Categoria do Produto"
                    name="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                />
            </FormControl>

            <FormControl fullWidth margin="normal">
                <TextField
                    label="Nome do Produto"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </FormControl>

            <FormControl fullWidth margin="normal">
                <TextField
                    label="Quantidade"
                    type="number"
                    name="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    required
                />
            </FormControl>

            <FormControl fullWidth margin="normal">
                <TextField
                    label="Valor de Custo"
                    type="number"
                    name="costPrice"
                    value={costPrice}
                    onChange={(e) => setCostPrice(parseInt(e.target.value))}
                    required
                />
            </FormControl>

            <FormControl fullWidth margin="normal">
                <TextField
                    label="Valor de Venda"
                    type="number"
                    name="salePrice"
                    value={salePrice}
                    onChange={(e) => setSalePrice(parseInt(e.target.value))}
                    required
                />
            </FormControl>

            <FormControl fullWidth>
                <InputLabel id="pursacheMonth">Mês de Compra</InputLabel>
                <Select
                    labelId="pursacheMonth"
                    value={pursacheMonth}
                    label="Mês de Compra"
                    onChange={(e) => { setPursacheMonth(e.target.value as number) }}
                >
                    <MenuItem value={1}>Janeiro</MenuItem>
                    <MenuItem value={2}>Fevereiro</MenuItem>
                    <MenuItem value={3}>Março</MenuItem>
                    <MenuItem value={4}>Abril</MenuItem>
                    <MenuItem value={5}>Maio</MenuItem>
                    <MenuItem value={6}>Junho</MenuItem>
                    <MenuItem value={7}>Julho</MenuItem>
                    <MenuItem value={8}>Agosto</MenuItem>
                    <MenuItem value={9}>Setembro</MenuItem>
                    <MenuItem value={10}>Outubro</MenuItem>
                    <MenuItem value={11}>Novembro</MenuItem>
                    <MenuItem value={12}>Dezembro</MenuItem>
                </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
                <TextField
                    label="Ano da Compra"
                    type="number"
                    name="pursacheYear"
                    value={pursacheYear}
                    onChange={(e) => setPursacheYear(parseInt(e.target.value))}
                    required
                />
            </FormControl>

            <FormControl fullWidth>
                <InputLabel>Fornecedor Do Produto</InputLabel>
                <SupplierSelect supplierState={setSupplier}/>
            </FormControl>

            <Button variant="contained" onClick={handleSubmit} sx={{mt: 3}}>Criar Produto</Button>
        </Box>
    );
}

export default Form;