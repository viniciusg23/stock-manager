import { useState } from "react";
import FadeTransition from "../../components/FadeTransition";
import { Autocomplete, Box, Button, FormControl, Input, InputAdornment, InputLabel, OutlinedInput, Paper, TextField, Tooltip, Typography } from "@mui/material";
import { Add, Explore, AttachMoney } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useProducts } from "../../../../reduxReducers/slicers/sliceProducts";
import NewTravelController from "./components/NewTravelController";

function ManageTravel() {

    const { products } = useSelector(useProducts);

    const [travelName, setTravelName] = useState<string>("");
    const [travelCost, setTravelCost] = useState<string>("");



    const [travelOptions, setTravelOptions] = useState<boolean>(false);

    return (
        <FadeTransition>
            <>
                <Box display="flex" justifyContent="space-between" alignItems="end" mb="1em">
                    <Typography variant="h4" m={0}>Viagens</Typography>
                    <Box display="flex" alignItems="center" gap="1.5em" mt="1em">
                        <NewTravelController 
                            travelName={travelName}
                            setTravelName={setTravelName}
                            travelCost={travelCost}
                            setTravelCost={setTravelCost}
                            travelOptions={travelOptions}
                            setTravelOptions={setTravelOptions}
                        />
                    </Box>
                </Box>

                <Box 
                    sx={{ 
                        display: travelOptions ? "flex" : "none",
                        justifyContent: "space-between", 
                        mt: "2em", 
                        gap: "1em",
                    }}
                >
                    <Box 
                        sx={{ 
                            display: "flex", 
                            flexDirection: "column", 
                            alignItems: "left", 
                            width: "40%",
                            gap: "1em",
                            pr: "1.5em",
                            borderRight: "2px solid #000"
                        }}
                        
                    >
                        <Typography sx={{mb: "0.5em"}}>Informações do Produto</Typography>

                        <Autocomplete
                            fullWidth
                            disablePortal
                            id="combo-box-demo"
                            options={products}
                            getOptionLabel={(option) => option.name}
                            renderInput={(params) => <TextField {...params} label="Produto" />}
                        />

                        <FormControl>
                            <InputLabel htmlFor="unique-price">Valor Unitário</InputLabel>
                            <OutlinedInput
                                type="number"
                                id="unique-price"
                                startAdornment={<InputAdornment position="start">R$</InputAdornment>}
                                label="Valor Unitário"
                            />
                        </FormControl>

                        <FormControl>
                            <InputLabel htmlFor="quantity">Quantidade Comprada</InputLabel>
                            <OutlinedInput
                                type="number"
                                id="quantity"
                                label="Quantidade Comprada"
                            />
                        </FormControl>

                        <FormControl>
                            <InputLabel htmlFor="total">Total da Compra</InputLabel>
                            <OutlinedInput
                                type="number"
                                id="total"
                                label="Total da Compra"
                            />
                        </FormControl>

                        <Button fullWidth variant="contained" color="success">Adicionar Produto</Button>


                    </Box>
                    <Box 
                        sx={{ 
                            display: "flex", 
                            flexDirection: "column", 
                            alignItems: "left", 
                            width: "60%",
                            gap: "1em"
                        }}
                    >

                        <Typography sx={{mb: "0.5em"}}>Produtos Comprados Na Viagem</Typography>

                        <Paper sx={{backgroundColor: "primary.main"}}>
                            Produto adicionado
                        </Paper>
                    </Box>
                </Box>
            </>

        </FadeTransition>

    );
}

export default ManageTravel;


