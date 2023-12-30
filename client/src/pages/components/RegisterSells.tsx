import { Autocomplete, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FilledInput, FormControl, Input, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { ShoppingCartCheckout } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { enqueueSnackbar } from "notistack";
import { UnauthorizationError } from "../../errors/UnauthorizationError";
import { fetchEmployees } from "../../reduxActions/fetchEmployees";
import { fetchProducts } from "../../reduxActions/fetchProducts";
import { useEmployees } from "../../reduxReducers/slicers/sliceEmployees";
import { useProducts } from "../../reduxReducers/slicers/sliceProducts";
import { AppDispatch } from "../../reduxReducers/store";
import { registerSell } from "../../api/sales";


interface IRegisterSellsProps {
    format: "system" | "agil";
    productId?: string;
}

function RegisterSells(props: IRegisterSellsProps) {
    const { format, productId } = props;

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { products } = useSelector(useProducts);
    const { employees } = useSelector(useEmployees);

    const [availableQuantity, setAvailableQuantity] = useState<number>(0);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [expectedTotalPrice, setExpectedTotalPrice] = useState<number>(0);
    const [selectedEmployee, setSelectedEmployee] = useState<string>("");
    const [buyerName, setBuyerName] = useState<string>("");
    const [buyerEmail, setBuyerEmail] = useState<string>("");
    const [buyerNumber, setBuyerNumber] = useState<string>("");
    const [discount, setDiscount] = useState<string>("");


    const [systemPasswordModal, setSystemPasswordModal] = useState<boolean>(false);
    const [systemPassword, setSystemPassword] = useState<string>("");


    const [selectedProductId, setSelectedProductId] = useState("");
    const [selectedProductSalePrice, setSelectedProductSalePrice] = useState<number>(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(fetchProducts());
                await dispatch(fetchEmployees());
      
                if (productId) {
                    setSelectedProductId(productId);
        
                    const selectedProduct = products.find((product) => product.id === selectedProductId);
        
                    if (selectedProduct) {
                        setAvailableQuantity(Number(selectedProduct.quantity));
                        setSelectedProductSalePrice(Number(selectedProduct.salePrice));
                    }
                    
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                enqueueSnackbar("Houve um erro ao buscar pelo produto", {variant: "error"})
            }
          };

        fetchData();
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
    }, [selectedProductId])


    const [selectedQuantity, setSelectedQuantity] = useState<number>(0);
    useEffect(() => {
        const product = products.find(product => product.id === selectedProductId);
        if (product) {
            setExpectedTotalPrice(Number(selectedQuantity) * selectedProductSalePrice);
        }
        else {
            setExpectedTotalPrice(0);
        }
    }, [selectedQuantity]);

    useEffect(() => {
        setTotalPrice(Number(expectedTotalPrice));
    }, [expectedTotalPrice])
    
    useEffect(() => {
        const discountedPrice = Number(expectedTotalPrice) * (Number(discount) / 100);
        setTotalPrice(Number(expectedTotalPrice) - discountedPrice);
    }, [discount, expectedTotalPrice]);



    const handleSell = async () => {
        try {

            if (
                selectedProductId === "" ||
                selectedQuantity < 1 ||
                selectedProductSalePrice < 1 ||
                selectedEmployee === "" ||
                buyerName === ""
            ) {
                throw new Error("Invalid fields");
            }

            const body = JSON.stringify({
                productId: selectedProductId,
                quantity: selectedQuantity,
                salePrice: selectedProductSalePrice,
                employeeId: selectedEmployee,
                buyerName: buyerName,
                buyerEmail: buyerEmail ? buyerEmail : undefined,
                buyerNumber: buyerNumber ? buyerNumber : undefined,
                systemPassword: systemPassword
            })

            const data = await registerSell(body);


            enqueueSnackbar(data.message, { variant: "success" });
            setSystemPasswordModal(false);

        }
        catch (error: any | UnauthorizationError) {
            if (error instanceof UnauthorizationError) {
                alert("Sessão finalizada");
                return navigate("/");
            }

            enqueueSnackbar(error.message, { variant: "error" });
        }
        finally {
            window.location.reload();
        }
    }

    


    return (
        <>

            <Dialog open={systemPasswordModal} onClose={() => setSystemPasswordModal(false)}>
                <DialogTitle>Realizar Venda</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Para realizar uma venda é necessário informar a senha padrão do sistema. Caso tenha alguma dúvida entre em contato com o proprierário do Sistema.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="system-password"
                        label="Senha do Sistema"
                        type="password"
                        fullWidth
                        variant="standard"
                        onChange={(event) => setSystemPassword(event.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setSystemPasswordModal(false)}>Cancelar</Button>
                    <Button onClick={handleSell}>Vender</Button>
                </DialogActions>
            </Dialog>
      

            <Typography
                align={format === "system" ? "left" : "center"}
                variant="h5"
                bgcolor={format !== "system" ? "primary.main" : ""}
                padding={format !== "system" ? ".75em" : ""}
                color={format !== "system" ? "white" : ""}
            >
                Registrar Nova Venda
            </Typography>

            <Box 
                sx={{
                    padding: format !== "system" ? "1em" : "",
                    display: "flex",
                    flexDirection: format !== "system" ? "column" : "row",
                    gap: "1.5em",
                }}
            >
                <Box mt="1em" display="flex" flexDirection="column" gap="1em" width="100%">
                    <Typography mt="1em" align="left" variant="h6">Informações do Produto</Typography>

                
                    <FormControl sx={{ my: 1 }} fullWidth>
                        <Autocomplete
                            fullWidth
                            disablePortal
                            id="combo-box-demo"
                            options={products}
                            getOptionLabel={(option) => option.name}
                            onChange={(event: React.ChangeEvent<{}>, value: any) => setSelectedProductId(value.id)}
                            renderInput={(params) => <TextField {...params} label="Produto *" />}
                        />
                    </FormControl>

                    <FormControl sx={{ my: 1 }} fullWidth>
                        <InputLabel color="secondary" id="select-quantity-label">Selecionar Quantidade *</InputLabel>
                        <Select
                            color="secondary"
                            labelId="select-quantity-label"
                            value={selectedQuantity}
                            label="Selecionar Quantidade *"
                            onChange={(event) => setSelectedQuantity(Number(event.target.value))}
                        >
                            {Array.from({ length: availableQuantity }, (_, index) => (
                                <MenuItem key={index + 1} value={index + 1}>{index + 1}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl sx={{ my: 1 }} fullWidth>
                        <InputLabel color="secondary" id="select-employee-label">Selecionar Funcionário *</InputLabel>
                        <Select
                            color="secondary"
                            labelId="select-employee-label"
                            value={selectedEmployee}
                            label="Selecionar Funcionário *"
                            onChange={(event) => setSelectedEmployee(event.target.value)}
                        >
                            {employees.map((employee) => (
                                <MenuItem key={employee.id} value={employee.id}>{employee.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>

                <Box mt="1em" display="flex" flexDirection="column" gap="1em" width="100%">
                    <Typography mt="1em" align="left" variant="h6">Informações do Comprador</Typography>


                    <TextField
                        sx={{ my: 1 }}
                        label="Nome do Comprador *"
                        type="text"
                        color="secondary"
                        id="buyer-name"
                        name="buyerName"
                        value={buyerName}
                        
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
                        
                        onChange={(event) => setBuyerNumber(event.target.value)}
                        fullWidth
                    />
                </Box>

                <Box mt="1em" display="flex" flexDirection="column" gap="1em" width="100%">
                    <Typography mt="1em" align="left" variant="h6">Informações da Venda</Typography>


                    <FormControl sx={{ my: 1 }} variant="filled">
                        <InputLabel color="secondary" htmlFor="total-price">Valor Total</InputLabel>
                        <FilledInput
                            contentEditable={false}
                            type="number"
                            color="secondary"
                            id="total-price"
                            value={totalPrice}
                            onChange={(event) => {
                                setExpectedTotalPrice(Number(event.target.value))
                            }}
                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        />
                    </FormControl>

                    <TextField
                        sx={{ my: 1 }}
                        label="Porcentagem de Desconto"
                        type="number"
                        color="secondary"
                        value={discount}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">%</InputAdornment>,
                        }}
                        onChange={(event) => setDiscount(event.target.value)}

                    />

                    <Button
                        fullWidth={format === "agil" ? true : false}
                        color="success"
                        variant="contained"
                        size="large"
                        endIcon={<ShoppingCartCheckout />}
                        onClick={() => setSystemPasswordModal(true)}
                    >
                        Vender
                    </Button>
                </Box>


            </Box>
        </>
    );
}

export default RegisterSells;