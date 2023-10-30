import { useParams } from "react-router-dom";
import { Box, Button, Container, Divider, FilledInput, FormControl, InputAdornment, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, Typography } from "@mui/material";
import { ShoppingCartCheckout } from "@mui/icons-material";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UnauthorizationError } from "../../errors/UnauthorizationError";

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

function AgilSell() {
    const { id } = useParams();
    const navigate = useNavigate()

    const [products, setProducts] = useState<Product[]>([]);
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [availableQuantity, setAvailableQuantity] = useState<number>(0);
    const [totalPrice, setTotalPrice] = useState<number>(0);


    const [selectedProductId, setSelectedProductId] = useState("");
    const [selectedProductSalePrice, setSelectedProductSalePrice] = useState<number>(0);
    const handleChangeProduct = (event: SelectChangeEvent) => {
        setSelectedProductId(event.target.value);
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
                headers: {'Content-Type': 'application/json'},
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


    useEffect(() => {
        const options = { 
            method: 'GET',
            headers: {'Content-Type': 'application/json'}, 
        };


        const fetchProductsData = async () => {
            try {
                const jsonData = await fetch('/product/view', options);
                const data = await jsonData.json();

                setProducts(data.products);

            } catch (error: any) {
                alert(error.message);
            }
        }

        const fetchEmployeesData = async () => {
            try {
                const jsonData = await fetch('/employee/view', options);
                const data = await jsonData.json();

                setEmployees(data.employees);

            } catch (error: any) {
                alert(error.message);
            }
        }

        fetchProductsData();
        fetchEmployeesData();

        
        if(id){
            setSelectedProductId(id);
        }
    }, []);

    useEffect(() => {
        const selectedProduct = products.find(product => product.id === selectedProductId);

        if (selectedProduct) {
            setAvailableQuantity(Number(selectedProduct.quantity));
            setSelectedProductSalePrice(Number(selectedProduct.salePrice));
        }
        else {
            setAvailableQuantity(0);
        }
    }, [selectedProductId]);


    return (
        <>
            <Paper
                elevation={2}
                sx={{
                    width: "100%",
                    backgroundColor: "primary.main",
                    borderRadius: 0,
                    padding: ".5em"
                }}>
                <Typography variant="h4" color="primary.contrastText">Registrar Nova Venda</Typography>
            </Paper>

            <Container>

                <Typography mt="1em" align="left" variant="h6">Informações do Produto</Typography>
                <Divider />

                <Box mt="1em" display="flex" flexDirection="column" width="100%" gap="1em">
                    <FormControl fullWidth>
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

                    <FormControl fullWidth>
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

                    <FormControl fullWidth>
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
                <Divider />

                <Box
                    sx={{
                        mt: "1em",
                        display: "flex",
                        alignItems: "center"
                    }}    
                >
                    <FormControl variant="filled">
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
                <Divider />

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
                    
                </Box>
            </Container>
        </>
    );
}

export default AgilSell;