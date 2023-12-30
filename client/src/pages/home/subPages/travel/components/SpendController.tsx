import { Box, Paper, Typography } from "@mui/material";

interface ISpendControllerProps {
    actualCost: string;
    travelCost: string;
}

function SpendController(props: ISpendControllerProps) {

    const {actualCost, travelCost} = props;

    return (
        <Box
            sx={{
                display: "flex",
                gap: "1em",
                mb: "1em",
            }}
        >
            <Paper sx={{ flexGrow: 1 }}>
                <Typography>Atual:</Typography>
                <Typography>R${actualCost}</Typography>
            </Paper>
            <Paper sx={{ flexGrow: 1 }}>
                <Typography>Total:</Typography>
                <Typography>R${travelCost}</Typography>
            </Paper>
        </Box>
    );
}

export default SpendController;