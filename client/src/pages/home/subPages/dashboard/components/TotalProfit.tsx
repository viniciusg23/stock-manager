import { useEffect, useState } from "react";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { Avatar, Paper, Typography } from "@mui/material";
import { LocalAtm } from "@mui/icons-material";
import { formatNumber } from "../utils/formatNumber";
import { totalProfit } from "../../../../../api/etl";
import { UnauthorizationError } from "../../../../../errors/UnauthorizationError";

function TotalProfit() {

    const [data, setData] = useState<string>("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {

                const result = await totalProfit();

                setData(result);

            } catch (error: any | UnauthorizationError) {
                if (error instanceof UnauthorizationError) {
                    alert("Sessão finalizada");
                    return navigate("/");
                }

                enqueueSnackbar(error.message, { variant: "error" });
            }
        };

        fetchData();
    }, []);

    return (
        <Paper 
            elevation={2}
            sx={{
                width: "100%", 
                padding: "1.5em",
                display: "flex",
                justifyContent: "space-between"
            }}
        >
            <div>
                <Typography 
                    textAlign="left" 
                    sx={{
                        fontWeight: 600,
                        opacity: 0.7,
                        textTransform: "uppercase",
                        // fontSize: "0.9em"
                    }}
                >
                    Faturamento
                </Typography>
                <Typography 
                    textAlign="left" 
                    sx={{
                        fontSize: "2em",
                        fontWeight: 700,

                    }}
                >
                    ${formatNumber(Number(data))}
                </Typography>
            </div>
            <Avatar sx={{backgroundColor: "green", width: 56, height: 56}}>
                <LocalAtm />
            </Avatar>
        </Paper>
    );
}

export default TotalProfit;

