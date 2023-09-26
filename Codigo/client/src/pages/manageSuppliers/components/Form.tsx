import { Box, Button, FormControl, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Form() {

    const navigate = useNavigate();

    const [supplierName, setSupplierName] = useState<string>("");
    const [supplierDesc, setSupplierDesc] = useState<string>("");

    
    const handleSubmit = async () => {
        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: `{"name":"${supplierName}","description":"${supplierDesc}"}`
        };
          
        const data = await fetch('/supplier/create', options)
        const jsonData = await data.json();

        return navigate("/home");
    }


    return (
        <Box sx={{
            width: "50%",
        }}>
            <FormControl fullWidth margin="normal">
                <TextField
                    label="Nome do Fornecedor"
                    name="category"
                    value={supplierName}
                    onChange={(e) => setSupplierName(e.target.value)}
                    required
                />
            </FormControl>

            <FormControl fullWidth margin="normal">
                <TextField
                    label="Descricao do Fornecedor"
                    name="name"
                    value={supplierDesc}
                    onChange={(e) => setSupplierDesc(e.target.value)}
                    required
                />
            </FormControl>

            <Button variant="contained" onClick={handleSubmit}>Criar Fornecedor</Button>
        </Box>
    );
}

export default Form;