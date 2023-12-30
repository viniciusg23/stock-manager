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
                    "rgba(39, 174, 96, 0.5)",
                    "rgba(52, 152, 219, 0.5)",
                    "rgba(241, 196, 15, 0.5)",
                    "rgba(231, 76, 60, 0.5)",
                    "rgba(142, 68, 173, 0.5)",
                    "rgba(255, 87, 34, 0.5)", 
                ],
                borderColor: [
                    "rgba(39, 174, 96, 1)",
                    "rgba(52, 152, 219, 1)", 
                    "rgba(241, 196, 15, 1)",
                    "rgba(231, 76, 60, 1)", 
                    "rgba(142, 68, 173, 1)", 
                    "rgba(255, 87, 34, 1)", 
                ],
                borderWidth: 1,
            },
        ],
    };


    return (
        <Paper
            elevation={0}
            sx={{
                width: "40%",
                border: "1px solid #00000015"
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