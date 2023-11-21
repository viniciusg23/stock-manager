import { Explore, AttachMoney, Add, Close } from "@mui/icons-material";
import { FormControl, InputLabel, OutlinedInput, InputAdornment, Button, Tooltip, Box } from "@mui/material";
import { enqueueSnackbar } from "notistack";

interface INewTravelControllerProps {
    travelName: string;
    setTravelName: (value: React.SetStateAction<string>) => void;
    travelCost: string;
    setTravelCost: (value: React.SetStateAction<string>) => void;
    travelOptions: boolean;
    setTravelOptions: (value: React.SetStateAction<boolean>) => void
}

function NewTravelController(props: INewTravelControllerProps) {

    const {
        travelName,
        setTravelName,
        travelCost,
        setTravelCost,
        travelOptions,
        setTravelOptions
    } = props;

    const toggleTravelOptions = () => {
        if(!travelName && !travelCost){
            enqueueSnackbar("Todos os campos devem ser preenchidos corretamente.", {variant: "error"})
        }
        else{
            setTravelOptions(prev => !prev);
        }
    }

    return (
        <>
            {travelOptions ? (
                <Box mt="1em">
                    <Tooltip title="Cancelar registro dessa viagem" placement="top">
                        <Button
                            variant="contained"
                            color="error"
                            endIcon={<Close />}
                            onClick={toggleTravelOptions}
                        >
                            Cancelar Viagem
                        </Button>
                    </Tooltip>
                </Box>
                
            ) : (
                <Box display="flex" alignItems="center" gap="1.5em" mt="1em">

                    <div style={{ display: "flex", alignItems: "center", gap: "1em" }}>
                        <FormControl>
                            <InputLabel htmlFor="travel-name">Nome da Viagem</InputLabel>
                            <OutlinedInput
                                size="small"
                                type="text"
                                id="travel-name"
                                startAdornment={<InputAdornment position="start"><Explore /></InputAdornment>}
                                label="Nome da Viagem"
                                onChange={(event) => setTravelName(event.target.value)}
                                value={travelName}
                            />
                        </FormControl>

                        <FormControl>
                            <InputLabel htmlFor="total-spend">Total Gasto</InputLabel>
                            <OutlinedInput
                                size="small"
                                type="number"
                                id="total-spend"
                                startAdornment={<InputAdornment position="start"><AttachMoney /></InputAdornment>}
                                label="Total Gasto"
                                onChange={(event) => setTravelCost(event.target.value)}
                                value={travelCost}
                            />
                        </FormControl>
                    </div>

                    <Tooltip title="Adicionar Viagen" placement="top">
                        <Button
                            variant="contained"
                            color="success"
                            endIcon={<Add />}
                            onClick={toggleTravelOptions}
                        >
                            Adicionar Viagen
                        </Button>
                    </Tooltip>
                </Box>
            )}
        </>

    );
}

export default NewTravelController;