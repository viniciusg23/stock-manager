import { useState } from "react";
import FadeTransition from "../../components/FadeTransition";
import { Box, Button, FormControl, Input, InputAdornment, InputLabel, OutlinedInput, TextField, Tooltip, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";

function ManageTravel() {
    const [travelName, setTravelName] = useState<string>("");
    const [travelCost, setTravelCost] = useState<string>("");

    const [travelOptions, setTravelOptions] = useState<boolean>(false);

    return (
        <FadeTransition>
            <Box display="flex" justifyContent="space-between" alignItems="end" mb="1em">
                <Typography variant="h4" m={0}>Viagens</Typography>

                <Box display="flex" alignItems="center" gap="1.5em" >
                    <div style={{ display: "flex", alignItems: "end", gap: "1em" }}>
                        <FormControl>
                            <InputLabel htmlFor="travel-name">Nome da Viagem</InputLabel>
                            <OutlinedInput
                                size="small"
                                id="travel-name"
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                label="Nome da Viagem"
                            />
                        </FormControl>

                        <FormControl>
                            <InputLabel htmlFor="total-spend">Total Gasto</InputLabel>
                            <OutlinedInput
                                size="small"
                                id="total-spend"
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                label="Total Gasto"
                            />
                        </FormControl>
                    </div>

                    <Tooltip title="Adicionar Viagen" placement="top">
                        <Button 
                            variant="contained" 
                            color="success"  
                            endIcon={<Add />}
                            onClick={() => setTravelOptions(true)}
                        >
                            Adicionar Viagen
                        </Button>
                    </Tooltip>
                    
                    
                </Box>
                
            </Box>

        </FadeTransition>

    );
}

export default ManageTravel;


