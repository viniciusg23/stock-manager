import { enqueueSnackbar } from "notistack";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Avatar, Paper, Typography } from "@mui/material";
import { totalProductsSold } from "../../../../../api/etl";
import { UnauthorizationError } from "../../../../../errors/UnauthorizationError";
import { FormatListNumbered } from "@mui/icons-material";


function TotalProductsSold() {

    const [data, setData] = useState<number>(0);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchData = async () => {
            try {

                const result = await totalProductsSold();
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
            elevation={2}
            sx={{
                width: "100%",
                padding: "1.5em",
                display: "flex",
                justifyContent: "space-between"
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
                    Total de Vendas
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
            <Avatar sx={{ backgroundColor: "primary.main", width: 56, height: 56 }}>
                <FormatListNumbered />
            </Avatar>
        </Paper>
    );
}

export default TotalProductsSold;