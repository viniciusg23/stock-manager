import { Box, Button, Divider, FilledInput, FormControl, InputAdornment, InputLabel, MenuItem, Select, SelectChangeEvent, Typography, useTheme } from "@mui/material";
import { Close, ShoppingCartCheckout } from "@mui/icons-material";
import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UnauthorizationError } from "../../../../errors/UnauthorizationError";
import { getAuthorizationToken } from "../../utils/getAuthorizationToken";

interface Product {
    id: string;
    name: string;
    quantity: string;
    salePrice: string;
}

interface Employee {
    id: string;
    name: string;
}

function RegisterSells() {
    const navigate = useNavigate()

    const [products, setProducts] = useState<Product[]>([]);
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [availableQuantity, setAvailableQuantity] = useState<number>(0);
    const [totalPrice, setTotalPrice] = useState<number>(0);


    const [selectedProductId, setSelectedProduct] = useState("");
    const [selectedProductSalePrice, setSelectedProductSalePrice] = useState<number>(0);
    const handleChangeProduct = (event: SelectChangeEvent) => {
        setSelectedProduct(event.target.value);

        const selectedProductId = products.find(product => product.id === event.target.value);

        if (selectedProductId) {
            setAvailableQuantity(Number(selectedProductId.quantity));
            setSelectedProductSalePrice(Number(selectedProductId.salePrice));
        }
        else {
            setAvailableQuantity(0);
        }
    };

    const [selectedQuantity, setSelectedQuantity] = useState<string>("");
    const handleChangeQuantity = (event: SelectChangeEvent) => {
        setSelectedQuantity(event.target.value);

        const product = products.find(product => product.id === selectedProductId);

        if (product) {
            setTotalPrice(Number(event.target.value) * selectedProductSalePrice);
        }
        else {
            setTotalPrice(0);
        }
    }

    const [selectedEmployee, setSelectedEmployee] = useState<string>("");
    const handleChangeEmployee = (event: SelectChangeEvent) => {
        setSelectedEmployee(event.target.value);
    }

    const handleChangeTotalPrice = (event: ChangeEvent<HTMLInputElement>) => {
        setTotalPrice(Number(event.target.value));
    }

    const handleSell = async () => {

        try {
            console.log("sell")
    
            const body = JSON.stringify({
                productId: selectedProductId,
                quantity: selectedQuantity,
                salePrice: selectedProductSalePrice,
                employeeId: selectedEmployee
            })
    
            const options = {
                method: 'POST',
                headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${getAuthorizationToken()}`},
                body: body
            };
              
            const response = await fetch("/sell", options);
            const data = await response.json();
    
            alert(data.message);
            
        }
        catch (error: any | UnauthorizationError) {
            if(error instanceof UnauthorizationError){
                alert("Sessão finalizada");
                return navigate("/");
            }

            alert(error.message)
        } 
    }

    const handleCancel = () => {
        console.log("cancel")
    }





    useEffect(() => {
        const fetchProductsData = async () => {
            try {
                const jsonData = await fetch('/product/view');
                const data = await jsonData.json();

                setProducts(data.products);

            } catch (error: any) {
                alert(error.message);
            }
        }

        const fetchEmployeesData = async () => {
            try {
                const jsonData = await fetch('/employee/view');
                const data = await jsonData.json();

                setEmployees(data.employees);

            } catch (error: any) {
                alert(error.message);
            }
        }

        fetchProductsData();
        fetchEmployeesData();
    }, [])


    return (
        <>
            <Typography align="left" variant="h5">Registrar Nova Venda</Typography>
            <Divider />

            <Box >
                {/* selecionar produto, selecionar quantidade, selecionar vendedor, valor total, confirmar */}

                <Typography mt="1em" align="left" variant="h6">Informações do Produto</Typography>
                <Box mt="1em" display="flex">
                    <FormControl sx={{ m: 1 }} fullWidth>
                        <InputLabel color="secondary" id="select-product-label">Selecionar Produto</InputLabel>
                        <Select
                            color="secondary"
                            labelId="select-product-label"
                            value={selectedProductId}
                            label="Selecionar Produto"
                            onChange={handleChangeProduct}
                        >
                            {products.map((product) => (
                                <MenuItem key={product.id} value={product.id}>{product.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl sx={{ m: 1 }} fullWidth>
                        <InputLabel color="secondary" id="select-quantity-label">Selecionar Quantidade</InputLabel>
                        <Select
                            color="secondary"
                            labelId="select-quantity-label"
                            value={selectedQuantity}
                            label="Selecionar Quantidade"
                            onChange={handleChangeQuantity}
                        >
                            {Array.from({ length: availableQuantity }, (_, index) => (
                                <MenuItem key={index + 1} value={index + 1}>{index + 1}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl sx={{ m: 1 }} fullWidth>
                        <InputLabel color="secondary" id="select-employee-label">Selecionar Funcionário</InputLabel>
                        <Select
                            color="secondary"
                            labelId="select-employee-label"
                            value={selectedEmployee}
                            label="Selecionar Funcionário"
                            onChange={handleChangeEmployee}
                        >
                            {employees.map((employee) => (
                                <MenuItem key={employee.id} value={employee.id}>{employee.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>

                <Typography mt="1em" align="left" variant="h6">Informações da Venda</Typography>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center"
                    }}    
                >
                    <FormControl sx={{ m: 1 }} variant="filled">
                        <InputLabel color="secondary" htmlFor="total-price">Valor Total</InputLabel>
                        <FilledInput
                            type="number"
                            color="secondary"
                            id="total-price"
                            value={totalPrice}
                            onChange={handleChangeTotalPrice}
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
                        maxWidth: 600
                    }}
                >
                    <Button 
                        fullWidth
                        color="success" 
                        variant="contained" 
                        size="large" 
                        endIcon={<ShoppingCartCheckout />} 
                        onClick={handleSell}
                    >
                        Vender
                    </Button>
                    <Button 
                        fullWidth
                        color="warning" 
                        variant="outlined" 
                        size="large" 
                        endIcon={<Close />} 
                        onClick={handleCancel}
                    >
                        Cancelar
                    </Button>
                    
                </Box>
            </Box>
        </>
    );
}

export default RegisterSells;