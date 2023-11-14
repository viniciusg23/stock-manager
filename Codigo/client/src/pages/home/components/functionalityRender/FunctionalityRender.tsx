import { Box, Breadcrumbs, Link, Paper, Typography } from "@mui/material";
import { drawerWidth } from "../drawerNavegation/DrawerNavegation";
import ManageProducts from "../../subPages/manageProducts/ManageProducts";
import ManageSuppliers from "../../subPages/manageSuppliers/ManageSuppliers";
import ManageEmployees from "../../subPages/manageEmployees/ManageEmployees";
import ManageStock from "../../subPages/manageStock/ManageStock";
import RegisterSells from "../../subPages/registerSell/RegisterSells";
import ManageCategories from "../../subPages/manageCategories/ManageCategories";


function FunctionalityRender(props: { functionality: string, functionalityName: string }) {
    const { functionality, functionalityName } = props;

    let componentToRender = <div></div>;

    switch (functionality) {
        case "product":
            componentToRender = <ManageProducts />;
            break;
        case "supplier": 
            componentToRender = <ManageSuppliers />
            break;
        case "employee": 
            componentToRender = <ManageEmployees />
            break;
        case "stock":
            componentToRender = <ManageStock />
            break;
        case "sell":
            componentToRender = <RegisterSells />
            break;
        case "categories":
            componentToRender = <ManageCategories />
            break;
        default:
            componentToRender = <ManageStock />
    }

    return (
        <Box
            sx={{
                position: "fixed",
                bottom: 0,
                width: `calc(100vw - ${drawerWidth}px)`,
                height: `calc(100vh - ${64}px)`,
                backgroundColor: "background.default",
                padding: 4,
                pt: 2,
                marginRight: "2em",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                gap: 1.5,
                overflow: "auto"
            }}
        >
            <Paper elevation={0} sx={{ padding: 2, width: "100%" }}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="/home">
                        Sistema
                    </Link>
                    <Typography>{functionalityName}</Typography>
                </Breadcrumbs>
            </Paper>

            <Paper
                elevation={0}
                sx={{
                    padding: 2,
                    width: "100%",
                    backgroundColor: "background.paper",
                }}
            >
                {componentToRender}
            </Paper>
        </Box>
    );
}

export default FunctionalityRender;
