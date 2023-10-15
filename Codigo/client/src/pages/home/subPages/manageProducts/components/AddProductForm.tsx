import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import MenuItem from '@mui/material/MenuItem';
import { Box, Button, useTheme } from '@mui/material';

interface FormValues {
    code: string;
    isFiscal: boolean;
    category: string;
    name: string;
    quantity: number;
    costPrice: number;
    salePrice: number;
    purchaseMonth: "Janeiro" | "Fevereiro" | "Marco" | "Abril" | "Maio" | "Junho" | "Julho" | "Agosto" | "Setembro" | "Outubro" | "Novembro" | "Dezembro";
    purchaseYear: number;
    supplier: string;
}

const months: Array<"Janeiro" | "Fevereiro" | "Marco" | "Abril" | "Maio" | "Junho" | "Julho" | "Agosto" | "Setembro" | "Outubro" | "Novembro" | "Dezembro"> = [
    "Janeiro", "Fevereiro", "Marco", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];


const initialFormValues: FormValues = {
    code: '',
    isFiscal: false,
    category: '',
    name: '',
    quantity: 0,
    costPrice: 0,
    salePrice: 0,
    purchaseMonth: 'Janeiro',
    purchaseYear: new Date().getFullYear(),
    supplier: '',
};


function AddProductForm(){

    const theme = useTheme()
    const [formValues, setFormValues] = useState<FormValues>(initialFormValues);

    const handleChange = (prop: keyof FormValues) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormValues({ ...formValues, [prop]: event.target.value });
    };

    const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({ ...formValues, isFiscal: event.target.checked });
    };

    const handleSubmit = async () => {
        console.log(formValues);

        const body: string = JSON.stringify({
            isFiscal: formValues.isFiscal,
            category: formValues.category,
            name: formValues.name,
            quantity: 0,
            costPrice: formValues.costPrice,
            salePrice: 0,
            purchaseMonth: monthNameToNumber(formValues.purchaseMonth),
            purchaseYear: formValues.purchaseYear,
            supplier: formValues.supplier,
        });

        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'User-Agent': 'insomnia/2023.5.8'},
            body: body
        };
          
        const jsonData = await fetch('/product/create', options)
        const data = await jsonData.json();

        alert(data.message);

        setFormValues(initialFormValues);
    };


    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                gap: 2,
            }}
        >
            <TextField color='secondary' id="name" label="Nome do Produto" variant="outlined" fullWidth value={formValues.name} onChange={handleChange('name')} />
            
            <TextField color='secondary' id="category" label="Categoria do Produto" variant="outlined" fullWidth value={formValues.category} onChange={handleChange('category')} />
            
            <TextField color='secondary' id="costPrice" label="Preço de Custo do Produto" variant="outlined" fullWidth type="number" value={formValues.costPrice} onChange={handleChange('costPrice')} />
            
            <TextField color='secondary' id="supplier" label="Fornecedor do Produto" variant="outlined" fullWidth value={formValues.supplier} onChange={handleChange('supplier')} />
            
            <Stack direction="row" spacing={1} alignItems="center">
                <Typography color={theme.palette.getContrastText("")}>Produto não é fiscal</Typography>
                <Switch color='secondary' checked={formValues.isFiscal} onChange={handleSwitchChange} />
                <Typography color={theme.palette.getContrastText("")}>Produto é fiscal</Typography>
            </Stack>
            
            <TextField
                id="purchaseMonth"
                select
                label="Mês de Compra do Produto"
                variant="outlined"
                fullWidth
                color='secondary'
                value={formValues.purchaseMonth}
                onChange={handleChange('purchaseMonth')}
            >
                {months.map((month) => (
                    <MenuItem key={month} value={month}>
                        {month}
                    </MenuItem>
                ))}
            </TextField>
            
            <TextField color='secondary' id="purchaseYear" label="Ano de Compra do Produto" variant="outlined" fullWidth type="number" value={formValues.purchaseYear} onChange={handleChange('purchaseYear')} />
            

            <Button variant="contained" color="primary" onClick={handleSubmit}>
                Registrar
            </Button>
        </Box>
    );
};

export default AddProductForm;


function monthNameToNumber(monthName: string): number {
    const months: { [key: string]: number } = {
        "Janeiro": 1,
        "Fevereiro": 2,
        "Marco": 3,
        "Abril": 4,
        "Maio": 5,
        "Junho": 6,
        "Julho": 7,
        "Agosto": 8,
        "Setembro": 9,
        "Outubro": 10,
        "Novembro": 11,
        "Dezembro": 12
    };

    return months[monthName];
}
