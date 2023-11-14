import { enqueueSnackbar } from "notistack";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UnauthorizationError } from "../../../errors/UnauthorizationError";
import { percentageOfSalesByCategory } from "../../../api/etl";
import { Box, Divider, Paper, Typography } from "@mui/material";
import { Chart, Doughnut } from "react-chartjs-2";

interface IData {
    category: string, 
    percentage: number
}

function PercentageOfSalesByCategory() {

    const [data, setData] = useState<IData[]>([]);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchData = async () => {
            try {

                const result = await percentageOfSalesByCategory();

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

    const categories = data.map(item => item.category);
    const percentages = data.map(item => item.percentage);

    const chartData = {
        labels: categories,
        datasets: [
            {
                label: "# Porcentagem de Vendas",
                data: percentages,
                backgroundColor: [
                    "green",
                    "red",
                    "blue",
                ],
            },
        ],
    };


    return (
        <Paper
            elevation={0}
            sx={{
                width: "40%"
            }}
        >
            <Typography textAlign="left" sx={{padding: "1.5em", fontSize: "1.5em", fontWeight: 600}}>
                Categorias mais vendidas
            </Typography>
            <Divider />
            <Box sx={{padding: "2em"}}>
                <Doughnut data={chartData} />
            </Box>
        </Paper>
    );
}

export default PercentageOfSalesByCategory;