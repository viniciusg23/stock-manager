import { enqueueSnackbar } from "notistack";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Avatar, Paper, Typography } from "@mui/material";
import { totalProductsInStock } from "../../../../../api/etl";
import { UnauthorizationError } from "../../../../../errors/UnauthorizationError";
import { Inventory } from "@mui/icons-material";


function TotalProductsInStock() {

    const [data, setData] = useState<number>(0);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchData = async () => {
            try {

                const result = await totalProductsInStock();
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
            elevation={0}
            sx={{
                width: "100%",
                padding: "1.5em",
                display: "flex",
                justifyContent: "space-between",
                border: "1px solid #00000015"
            }}
        >
            <div>
                <Typography
                    textAlign="left"
                    sx={{
                        fontWeight: 600,
                        opacity: 0.7,
                        textTransform: "uppercase",
                    }}
                >
                    Estoque Atual
                </Typography>
                <Typography
                    textAlign="left"
                    sx={{
                        fontSize: "2em",
                        fontWeight: 700,

                    }}
                >
                    {data}
                </Typography>
            </div>
            <Avatar sx={{ backgroundColor: "#1640D6", width: 56, height: 56 }}>
                <Inventory />
            </Avatar>
        </Paper>
    );
}

export default TotalProductsInStock;