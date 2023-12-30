import { enqueueSnackbar } from "notistack";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Divider, Paper, Typography } from "@mui/material";
import { Doughnut } from "react-chartjs-2";
import { percentageOfSalesByCategory } from "../../../../../api/etl";
import { UnauthorizationError } from "../../../../../errors/UnauthorizationError";

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
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                ],
                borderWidth: 1,
            },
        ],
    };


    return (
        <Paper
            elevation={2}
            sx={{
                width: "40%"
            }}
        >
            <Typography textAlign="left" sx={{ padding: ".75em", fontSize: "1.5em", fontWeight: 600 }}>
                Categorias mais vendidas
            </Typography>
            <Divider />
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "1em" }}>
                <Doughnut data={chartData} />
            </Box>
        </Paper>
    );
}

export default PercentageOfSalesByCategory;