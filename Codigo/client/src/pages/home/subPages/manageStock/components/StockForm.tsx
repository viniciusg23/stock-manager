import { ChangeEvent, useEffect, useState } from "react";
import { TextField, Typography, Box, Button, useTheme, MenuItem, Switch, Stack } from "@mui/material";
import { getAuthorizationToken } from "../../../utils/getAuthorizationToken";
import { UnauthorizationError } from "../../../../../errors/UnauthorizationError";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { Product } from "../../../../../entities/Product";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../../../../../reduxActions/fetchProducts";
import { AppDispatch } from "../../../../../reduxReducers/store";


const initialFormValues: Product = {
    id: "",
    code: "",
    isFiscal: false,
    category: null,
    name: "",
    quantity: 0,
    costPrice: 0,
    salePrice: 0,
    purchaseMonth: "Janeiro",
    purchaseYear: new Date().getFullYear(),
    supplier: null,
};

interface IStockFormProps {
    product: Product
}

function StockForm(props: IStockFormProps){
    const { product } = props;
    const dispatch = useDispatch<AppDispatch>();

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
    
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState<Product>(initialFormValues);

    const handleChange = (prop: keyof Product) => (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormValues({ ...formValues, [prop]: event.target.value });
    };

    const handleSubmit = async () => {
        try {

            for(const key in formValues){
                if (formValues[key] === "" || formValues[key] === null || formValues[key] === undefined) {
                    throw new Error("Invalid fields");
                }
            }

            const body: string = JSON.stringify({
                id: formValues.id,
                code: formValues.code,
                isFiscal: formValues.isFiscal,
                category: formValues.category?.id,
                name: formValues.name,
                quantity: formValues.quantity,
                costPrice: formValues.costPrice,
                salePrice: formValues.salePrice,
                purchaseMonth: monthNameToNumber(formValues.purchaseMonth),
                purchaseYear: formValues.purchaseYear,
                supplier: formValues.supplier?.id
            });
    
            const options = {
                method: "POST",
                headers: {"Content-Type": "application/json", "Authorization": `Bearer ${getAuthorizationToken()}`},
                body: body
            };
              
            const response = await fetch(`/product/edit`, options)
            const data = await response.json();

            if(!response.ok){
                throw new Error(data.message);
            }
    
            enqueueSnackbar(data.message, {variant: "success"});
            
        } catch (error: any | UnauthorizationError) {
            if(error instanceof UnauthorizationError){
                alert("Sessão finalizada");
                return navigate("/");
            }

            enqueueSnackbar(error.message, {variant: "error"});
        } finally {
            document.dispatchEvent(new Event("click"));
            dispatch(fetchProducts());
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
            <TextField color="secondary" id="name" label="Nome do Produto" variant="outlined" fullWidth value={formValues.name} onChange={handleChange("name")} />
            
            <TextField color="secondary" id="quantity" label="Quantidade do Produto em Estoque" variant="outlined" fullWidth value={formValues.quantity} onChange={handleChange("quantity")} />
            
            <TextField color="secondary" id="costPrice" label="Preço de Custo do Produto" variant="outlined" fullWidth type="number" value={formValues.costPrice} onChange={handleChange("costPrice")} />

            <TextField color="secondary" id="salePrice" label="Preço de Venda do Produto" variant="outlined" fullWidth type="number" value={formValues.salePrice} onChange={handleChange("salePrice")} />

            

            <Button variant="contained" color="primary" onClick={handleSubmit}>
                Atualizar
            </Button>
        </Box>
    );
};

export default StockForm;


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