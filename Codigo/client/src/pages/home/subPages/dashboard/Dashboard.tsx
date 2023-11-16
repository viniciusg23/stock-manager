import { Box, Container } from "@mui/material";
import TotalProfit from "./components/TotalProfit";
import PercentageOfSalesByCategory from "./components/PercentageOfSalesByCategory";
import { Chart, ArcElement, Legend, Tooltip, LinearScale, CategoryScale, BarElement } from "chart.js"
import TotalSalesByEmployee from "./components/TotalSalesByEmployee";
import TotalProductsSold from "./components/TotalProductsSold";
import TotalProductsInStock from "./components/TotalProductsInStock";


function Dashboard() {
    //TODO abrir nova aba no navegador para a dashboard
    Chart.register(ArcElement, Tooltip, Legend, LinearScale, CategoryScale, BarElement);


    return (
        <Box 
        >
            <Box 
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "1em",
                    wrap: "wrap"
                }}
            >
                <TotalProfit />
                <TotalProductsSold />
                <TotalProductsInStock />


            </Box>

            <Box 
                sx={{
                    marginTop: "2em",
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "1em",
                    wrap: "wrap"
                }}>
                <PercentageOfSalesByCategory />
                <TotalSalesByEmployee />
            </Box>
        </Box>
    );
}

export default Dashboard;
