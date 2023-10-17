import { Box, Button, Divider, FilledInput, FormControl, InputAdornment, InputLabel, MenuItem, Select, SelectChangeEvent, Typography, useTheme } from "@mui/material";
import { Send } from "@mui/icons-material";
import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";

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
    const theme = useTheme()
    const [products, setProducts] = useState<Product[]>([]);
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [availableQuantity, setAvailableQuantity] = useState<number>(0);
    const [totalPrice, setTotalPrice] = useState<number>(0);


    const [selectedProduct, setSelectedProduct] = useState("");
    const handleChangeProduct = (event: SelectChangeEvent) => {
        setSelectedProduct(event.target.value);

        const selectedProduct = products.find(product => product.id === event.target.value);

        if (selectedProduct) {
            setAvailableQuantity(Number(selectedProduct.quantity));
        }
        else {
            setAvailableQuantity(0);
        }
    };

    const [selectedQuantity, setSelectedQuantity] = useState<string>("");
    const handleChangeQuantity = (event: SelectChangeEvent) => {
        setSelectedQuantity(event.target.value);

        const product = products.find(product => product.id === selectedProduct);

        if (product) {
            setTotalPrice(Number(product.quantity) * Number(product.salePrice));
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

    const handleSell = () => {
        
    }

    const handleCancel = () => {

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
                            value={selectedProduct}
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
                        gap: "1.5em"
                    }}
                >
                    <Button 
                        color="warning" 
                        variant="outlined" 
                        size="large" 
                        endIcon={<Send />} 
                        onClick={handleSell}
                    >
                        Cancelar
                    </Button>
                    <Button 
                        color="success" 
                        variant="contained" 
                        size="large" 
                        endIcon={<Send />} 
                        onClick={handleCancel}
                    >
                        Vender
                    </Button>
                </Box>
            </Box>
        </>
    );
}

export default RegisterSells;