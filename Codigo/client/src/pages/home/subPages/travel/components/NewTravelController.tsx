import { Explore, AttachMoney, Add } from "@mui/icons-material";
import { FormControl, InputLabel, OutlinedInput, InputAdornment, Button, Tooltip } from "@mui/material";

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

    return (
        <>
            <div style={{ display: "flex", alignItems: "end", gap: "1em" }}>
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
                    onClick={() => setTravelOptions(true)}
                >
                    Adicionar Viagen
                </Button>
            </Tooltip>
        </>
    );
}

export default NewTravelController;