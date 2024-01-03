import { Paper, Typography, Divider, Box } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import { totalSaleByEmployee } from "../../../../../api/etl";
import { UnauthorizationError } from "../../../../../errors/UnauthorizationError";


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
                width: "70%",
                border: "1px solid #00000015"
            }}
        >
            <Typography textAlign="left" sx={{ padding: ".75em", fontSize: "1.5em", fontWeight: 600 }}>
                Total de Vendas por Funcionários
            </Typography>
            <Divider />
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "1em" }}>
                <Bar data={chartData} options={chartOptions} />
            </Box>
        </Paper>
    );
}

export default TotalSalesByEmployee;