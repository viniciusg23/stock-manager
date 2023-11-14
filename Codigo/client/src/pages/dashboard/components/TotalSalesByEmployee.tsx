import { Paper, Typography, Divider, Box } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import { totalSaleByEmployee } from "../../../api/etl";
import { UnauthorizationError } from "../../../errors/UnauthorizationError";

interface IData {
    employee: string,
    totalSale: number
}


function TotalSalesByEmployee() {

    const [data, setData] = useState<IData[]>([]);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchData = async () => {
            try {

                const result = await totalSaleByEmployee();

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

    const employees = data.map(item => item.employee);
    const totalSales = data.map(item => item.totalSale);

    const chartData = {
        labels: employees,
        datasets: [
            {
                label: "Total Vendido",
                data: totalSales,
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
            }
        ],
    };

    const chartOptions = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <Paper
            elevation={0}
            sx={{
                width: "60%"
            }}
        >
            <Typography textAlign="left" sx={{ padding: ".75em", fontSize: "1.5em", fontWeight: 600 }}>
                Total de Vendas por Funcionários
            </Typography>
            <Divider />
            <Box sx={{ padding: "2em" }}>
                <Bar data={chartData} options={chartOptions} />
            </Box>
        </Paper>
    );
}

export default TotalSalesByEmployee;