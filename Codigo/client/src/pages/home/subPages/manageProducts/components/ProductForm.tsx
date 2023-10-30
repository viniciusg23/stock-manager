import { ChangeEvent, useEffect, useState } from 'react';
import { TextField, Typography, Box, Button, useTheme, MenuItem, Switch, Stack } from '@mui/material';
import { getAuthorizationToken } from '../../../utils/getAuthorizationToken';
import { UnauthorizationError } from '../../../../../errors/UnauthorizationError';
import { useNavigate } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';
import { Product } from '../../../../../entities/product/Product';
import { useDispatch } from 'react-redux';
import { fetchProducts } from '../../../../../reduxActions/fetchProducts';
import { AppDispatch } from '../../../../../reduxReducers/store';


const months: Array<"Janeiro" | "Fevereiro" | "Marco" | "Abril" | "Maio" | "Junho" | "Julho" | "Agosto" | "Setembro" | "Outubro" | "Novembro" | "Dezembro"> = [
    "Janeiro", "Fevereiro", "Marco", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

const initialFormValues: Product = {
    id: "",
    code: "",
    isFiscal: false,
    category: "",
    name: "",
    quantity: 0,
    costPrice: 0,
    salePrice: 0,
    purchaseMonth: 'Janeiro',
    purchaseYear: new Date().getFullYear(),
    supplier: "",
};

interface IProductFormProps {
    control: "create" | "edit"
    product?: Product
}

function ProductForm(props: IProductFormProps){
    const {control, product} = props;
    const dispatch = useDispatch<AppDispatch>();

    if(control === "edit" && product){
        initialFormValues.id = product.id;
        initialFormValues.code = product.code;
        initialFormValues.isFiscal = product.isFiscal;
        initialFormValues.category = product.category;
        initialFormValues.name = product.name;
        initialFormValues.quantity = product.quantity;
        initialFormValues.costPrice = product.costPrice;
        initialFormValues.salePrice = product.salePrice;
        initialFormValues.purchaseMonth = product.purchaseMonth;
        initialFormValues.purchaseYear = product.purchaseYear;
        initialFormValues.supplier = product.supplier;
    }
    
    const navigate = useNavigate();
    const theme = useTheme()
    const [formValues, setFormValues] = useState<Product>(initialFormValues);

    const handleChange = (prop: keyof Product) => (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormValues({ ...formValues, [prop]: event.target.value });
    };

    const handleSwitchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFormValues({ ...formValues, isFiscal: event.target.checked });
    };

    const handleSubmit = async () => {
        try {
            const body: string = JSON.stringify({
                id: formValues.id,
                code: formValues.code,
                isFiscal: formValues.isFiscal,
                category: formValues.category,
                name: formValues.name,
                quantity: 0,
                costPrice: formValues.costPrice,
                salePrice: 0,
                purchaseMonth: monthNameToNumber(formValues.purchaseMonth),
                purchaseYear: formValues.purchaseYear,
                supplier: formValues.supplier
            });
    
            const options = {
                method: 'POST',
                headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${getAuthorizationToken()}`},
                body: body
            };
              
            const response = await fetch(`/product/${control}`, options)
            const data = await response.json();

            if(!response.ok){
                throw new Error(data.message);
            }
    
            enqueueSnackbar(data.message, {variant: "success"});
    
            setFormValues(initialFormValues);
        } catch (error: any | UnauthorizationError) {
            if(error instanceof UnauthorizationError){
                alert("Sessão finalizada");
                return navigate("/");
            }

            enqueueSnackbar(error.message, {variant: "error"});
        } finally {
            dispatch(fetchProducts())
        }
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
                {control === "edit" ? "Atualizar" : "Registrar"}
            </Button>
        </Box>
    );
};

export default ProductForm;


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
