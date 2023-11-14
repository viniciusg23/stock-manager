import { Box, Container, Typography } from "@mui/material";
import NavBar from "./components/NavBar";
import TotalProfit from "./components/TotalProfit";
import PercentageOfSalesByCategory from "./components/PercentageOfSalesByCategory";
import { Chart, ArcElement, Legend, Tooltip } from 'chart.js'


function DashboardPage() {
    //TODO abrir nova aba no navegador para a dashboard
    Chart.register(ArcElement, Tooltip, Legend);


    return (
        <Box sx={{ 
                backgroundColor: "background.default",
                height: "100vh"
            }}
        >
            <NavBar />
            <Container sx={{marginTop: "2em"}}>
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
                    <TotalProfit />


                </Box>
                {/* <Typography>Dashboard não implementada</Typography> */}
                <Box 
                    sx={{
                        marginTop: "2em",
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "1em",
                        wrap: "wrap"
                    }}>
                    <PercentageOfSalesByCategory />
                </Box>
            </Container>
        </Box>
    );
}

export default DashboardPage;
