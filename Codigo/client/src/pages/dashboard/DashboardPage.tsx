import { Box, Container, Typography } from "@mui/material";
import NavBar from "./components/NavBar";
import TotalProfit from "./components/TotalProfit";
import PercentageOfSalesByCategory from "./components/PercentageOfSalesByCategory";
import { Chart, ArcElement, Legend, Tooltip, LinearScale, CategoryScale, BarElement } from "chart.js"
import TotalSalesByEmployee from "./components/TotalSalesByEmployee";


function DashboardPage() {
    //TODO abrir nova aba no navegador para a dashboard
    Chart.register(ArcElement, Tooltip, Legend, LinearScale, CategoryScale, BarElement);


    return (
        <Box sx={{ 
                backgroundColor: "background.default",
                // height: "100vh",
            }}
        >
            <NavBar />
            <Container sx={{paddingY: "2em"}}>
                <Box 
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "1em",
                        wrap: "wrap"
                    }}
                >
                    <TotalProfit />
                    <TotalProfit />
                    <TotalProfit />


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
            </Container>
        </Box>
    );
}

export default DashboardPage;
