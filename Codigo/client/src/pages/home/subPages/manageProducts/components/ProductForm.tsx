import { ChangeEvent, useEffect, useState } from "react";
import { TextField, Typography, Box, Button, useTheme, MenuItem, Switch, Stack, Select, FormControl, InputLabel } from "@mui/material";
import { getAuthorizationToken } from "../../../utils/getAuthorizationToken";
import { UnauthorizationError } from "../../../../../errors/UnauthorizationError";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { Product } from "../../../../../entities/Product";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../../../reduxActions/fetchProducts";
import { AppDispatch } from "../../../../../reduxReducers/store";
import { fetchCategories } from "../../../../../reduxActions/fetchCategories";
import { useCategories } from "../../../../../reduxReducers/slicers/sliceCategories";
import { useSuppliers } from "../../../../../reduxReducers/slicers/sliceSuppliers";
import { fetchSuppliers } from "../../../../../reduxActions/fetchSuppliers";


const months: Array<"Janeiro" | "Fevereiro" | "Marco" | "Abril" | "Maio" | "Junho" | "Julho" | "Agosto" | "Setembro" | "Outubro" | "Novembro" | "Dezembro"> = [
    "Janeiro", "Fevereiro", "Marco", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

const initialFormValues: Product = {
    id: "null",
    code: "null",
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

interface IProductFormProps {
    control: "create" | "edit"
    product?: Product
}

function ProductForm(props: IProductFormProps){
    const {control, product} = props;
    const dispatch = useDispatch<AppDispatch>();
    const {categories} = useSelector(useCategories);
    const {suppliers} = useSelector(useSuppliers);

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
    const [category, setCategory] = useState<string>("");
    const [supplier, setSupplier] = useState<string>("");

    const handleChange = (prop: keyof Product) => (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormValues({ ...formValues, [prop]: event.target.value });
    };

    const handleSwitchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFormValues({ ...formValues, isFiscal: event.target.checked });
    };

    const handleSubmit = async () => {
        try {

            if(control === "create"){
                for(const key in formValues){
                    if ((formValues[key] === "" || formValues[key] === null || formValues[key] === undefined) &&  (key !== "id" && key !== "code" && key !== "category" && key !== "supplier")) {
                        throw new Error("Invalid fields");
                    }
                }
            }
            else {
                for(const key in formValues){
                    if ((formValues[key] === "" || formValues[key] === null || formValues[key] === undefined)) {
                        throw new Error("Invalid fields");
                    }
                }
            }
            

            const body: string = JSON.stringify({
                id: formValues.id,
                code: formValues.code,
                isFiscal: formValues.isFiscal,
                category: category,
                name: formValues.name,
                quantity: 0,
                costPrice: formValues.costPrice,
                salePrice: 0,
                purchaseMonth: monthNameToNumber(formValues.purchaseMonth),
                purchaseYear: formValues.purchaseYear,
                supplier: supplier
            });
    
            const options = {
                method: "POST",
                headers: {"Content-Type": "application/json", "Authorization": `Bearer ${getAuthorizationToken()}`},
                body: body
            };
              
            const response = await fetch(`/product/${control}`, options)
            const data = await response.json();

            if(!response.ok){
                throw new Error(data.message);
            }
    
            enqueueSnackbar(data.message, {variant: "success"});
    
            setFormValues(initialFormValues);
            setCategory("");
            setSupplier("");
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

    useEffect(() => {
        dispatch(fetchSuppliers());
        dispatch(fetchCategories());
    }, []);



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
            
            {/* <TextField color="secondary" id="category" label="Categoria do Produto" variant="outlined" fullWidth value={formValues.category} onChange={handleChange("category")} /> */}

            <FormControl sx={{ my: 1 }} fullWidth>
                <InputLabel color="secondary" id="select-category-label">Selecionar Categoria</InputLabel>
                <Select
                    color="secondary"
                    labelId="select-category-label"
                    value={category}
                    label="Selecionar Categoria"
                    onChange={(event) => setCategory(event.target.value)}
                >
                    {categories.map((category) => (
                        <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            
            <TextField color="secondary" id="costPrice" label="Preço de Custo do Produto" variant="outlined" fullWidth type="number" value={formValues.costPrice} onChange={handleChange("costPrice")} />
            

            <FormControl sx={{ my: 1 }} fullWidth>
                <InputLabel color="secondary" id="select-supplier-label">Selecionar Fornecedor</InputLabel>
                <Select
                    color="secondary"
                    labelId="select-supplier-label"
                    value={supplier}
                    label="Selecionar Fornecedor"
                    onChange={(event) => setSupplier(event.target.value)}
                >
                    {suppliers.map((supplier) => (
                        <MenuItem key={supplier.id} value={supplier.id}>{supplier.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            
            <Stack direction="row" spacing={1} alignItems="center">
                <Typography color={theme.palette.getContrastText("")}>Produto não é fiscal</Typography>
                <Switch color="secondary" checked={formValues.isFiscal} onChange={handleSwitchChange} />
                <Typography color={theme.palette.getContrastText("")}>Produto é fiscal</Typography>
            </Stack>
            
            <TextField
                id="purchaseMonth"
                select
                label="Mês de Compra do Produto"
                variant="outlined"
                fullWidth
                color="secondary"
                value={formValues.purchaseMonth}
                onChange={handleChange("purchaseMonth")}
            >
                {months.map((month) => (
                    <MenuItem key={month} value={month}>
                        {month}
                    </MenuItem>
                ))}
            </TextField>
            
            <TextField color="secondary" id="purchaseYear" label="Ano de Compra do Produto" variant="outlined" fullWidth type="number" value={formValues.purchaseYear} onChange={handleChange("purchaseYear")} />
            

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
