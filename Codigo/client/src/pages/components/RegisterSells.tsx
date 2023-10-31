import { Box, Button, Divider, FilledInput, FormControl, InputAdornment, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography, useTheme } from "@mui/material";
import { Close, ShoppingCartCheckout } from "@mui/icons-material";
import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { enqueueSnackbar } from "notistack";
import FadeIn from "react-fade-in";
import { UnauthorizationError } from "../../errors/UnauthorizationError";
import { fetchEmployees } from "../../reduxActions/fetchEmployees";
import { fetchProducts } from "../../reduxActions/fetchProducts";
import { useEmployees } from "../../reduxReducers/slicers/sliceEmployees";
import { useProducts } from "../../reduxReducers/slicers/sliceProducts";
import { AppDispatch } from "../../reduxReducers/store";
import { getAuthorizationToken } from "../home/utils/getAuthorizationToken";


interface IRegisterSellsProps {
    format: "system" | "agil";
    productId?: string;
}

function RegisterSells(props: IRegisterSellsProps) {
    const {format, productId} = props;

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const {products} = useSelector(useProducts);
    const {employees} = useSelector(useEmployees);

    const [availableQuantity, setAvailableQuantity] = useState<number>(0);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [selectedEmployee, setSelectedEmployee] = useState<string>("");
    const [buyerName, setBuyerName] = useState<string>("");
    const [buyerEmail, setBuyerEmail] = useState<string>("");
    const [buyerNumber, setBuyerNumber] = useState<string>("");


    const [selectedProductId, setSelectedProductId] = useState("");
    const [selectedProductSalePrice, setSelectedProductSalePrice] = useState<number>(0);
    useEffect(() => {
        const selectedProduct = products.find(product => product.id === selectedProductId);

        if (selectedProduct) {
            setAvailableQuantity(Number(selectedProduct.quantity));
            setSelectedProductSalePrice(Number(selectedProduct.salePrice));
        }
        else {
            setAvailableQuantity(0);
        }
    }, [selectedProductId])


    const [selectedQuantity, setSelectedQuantity] = useState<string>("");
    useEffect(() => {
        const product = products.find(product => product.id === selectedProductId);
        if (product) {
            setTotalPrice(Number(selectedQuantity) * selectedProductSalePrice);
        }
        else {
            setTotalPrice(0);
        }
    }, [selectedQuantity]);

    const handleSell = async () => {
        try {
            const body = JSON.stringify({
                productId: selectedProductId,
                quantity: selectedQuantity,
                salePrice: selectedProductSalePrice,
                employeeId: selectedEmployee,
                buyerName: buyerName,
                buyerEmail: buyerEmail ? buyerEmail : undefined,
                buyerNumber: buyerNumber ? buyerNumber : undefined
            })
    
            const options = {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: body
            };
                          
            const response = await fetch("/sell", options);
            const data = await response.json();
    
            enqueueSnackbar(data.message, {variant: "success"});
            
        }
        catch (error: any | UnauthorizationError) {
            if(error instanceof UnauthorizationError){
                alert("Sessão finalizada");
                return navigate("/");
            }

            enqueueSnackbar(error.message, {variant: "error"});
        }
        finally {
            window.location.reload();
        }
    }

    useEffect(() => {
        dispatch(fetchProducts());
        dispatch(fetchEmployees());
    }, []);


    return (
        <FadeIn>
            <Typography 
                align={format === "system" ? "left" : "center"}  
                variant="h5"
                bgcolor={format !== "system" ? "primary.main" : ""}
                color={format !== "system" ? "white" : ""}
            >
                Registrar Nova Venda
            </Typography>

            <Box padding={format !== "system" ? "1em" : ""}>
                <Typography mt="1em" align="left" variant="h6">Informações do Produto</Typography>
                <Box mt="1em" display="flex" flexDirection={format === "system" ? "row" : "column"} gap="1em">
                    <FormControl sx={{ my: 1 }} fullWidth>
                        <InputLabel color="secondary" id="select-product-label">Selecionar Produto</InputLabel>
                        <Select
                            color="secondary"
                            labelId="select-product-label"
                            value={selectedProductId}
                            label="Selecionar Produto"
                            onChange={(event) => setSelectedProductId(event.target.value)}
                        >
                            {products.map((product) => (
                                <MenuItem key={product.id} value={product.id}>{product.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl sx={{ my: 1 }} fullWidth>
                        <InputLabel color="secondary" id="select-quantity-label">Selecionar Quantidade</InputLabel>
                        <Select
                            color="secondary"
                            labelId="select-quantity-label"
                            value={selectedQuantity}
                            label="Selecionar Quantidade"
                            onChange={(event) => setSelectedQuantity(event.target.value)}
                        >
                            {Array.from({ length: availableQuantity }, (_, index) => (
                                <MenuItem key={index + 1} value={index + 1}>{index + 1}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl sx={{ my: 1 }} fullWidth>
                        <InputLabel color="secondary" id="select-employee-label">Selecionar Funcionário</InputLabel>
                        <Select
                            color="secondary"
                            labelId="select-employee-label"
                            value={selectedEmployee}
                            label="Selecionar Funcionário"
                            onChange={(event) => setSelectedEmployee(event.target.value)}
                        >
                            {employees.map((employee) => (
                                <MenuItem key={employee.id} value={employee.id}>{employee.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>

                <Typography mt="1em" align="left" variant="h6">Informações do Comprador</Typography>
                <Box mt="1em" display="flex" flexDirection={format === "system" ? "row" : "column"} gap="1em">
                    <TextField 
                        sx={{ my: 1 }}
                        label="Nome do Comprador"
                        type="text"
                        color="secondary"
                        id="buyer-name"
                        name="buyerName"
                        value={buyerName}
                        variant="filled"
                        onChange={(event) => setBuyerName(event.target.value)}
                        fullWidth
                    />

                    <TextField
                        sx={{ my: 1 }} 
                        label="Email do Comprador"
                        type="email"
                        color="secondary"
                        id="buyer-email"
                        name="buyerEmail"
                        value={buyerEmail}
                        variant="filled"
                        onChange={(event) => setBuyerEmail(event.target.value)}
                        fullWidth
                    />

                    <TextField 
                        sx={{ my: 1 }}
                        label="Número do Comprador"
                        type="tel"
                        color="secondary"
                        id="buyer-number"
                        name="buyerNumber"
                        value={buyerNumber}
                        variant="filled"
                        onChange={(event) => setBuyerNumber(event.target.value)}
                        fullWidth
                    />
                </Box>

                <Typography mt="1em" align="left" variant="h6">Informações da Venda</Typography>
                <Box mt="1em" display="flex" flexDirection={format === "system" ? "row" : "column"} gap="1em">

                    <FormControl sx={{ my: 1 }} variant="filled">
                        <InputLabel color="secondary" htmlFor="total-price">Valor Total</InputLabel>
                        <FilledInput
                            type="number"
                            color="secondary"
                            id="total-price"
                            value={totalPrice}
                            onChange={(event) => setTotalPrice(Number(event.target.value))}
                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        />
                    </FormControl>
                
                </Box>


                <Typography mt="1em" align="left" variant="h6">Finalizar Venda</Typography>
                <Box 
                    sx={{
                        mt: "1em",
                        display: "flex",
                        alignItems: "center",
                        gap: "1.5em",
                    }}
                >
                    <Button 
                        fullWidth={format === "agil" ? true : false} 
                        color="success" 
                        variant="contained" 
                        size="large" 
                        endIcon={<ShoppingCartCheckout />} 
                        onClick={handleSell}
                    >
                        Vender
                    </Button>
                    
                </Box>
            </Box>
        </FadeIn>
    );
}

export default RegisterSells;