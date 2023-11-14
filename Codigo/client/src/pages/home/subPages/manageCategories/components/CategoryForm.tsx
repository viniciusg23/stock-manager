import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Box, Button, useTheme } from "@mui/material";
import { getAuthorizationToken } from "../../../utils/getAuthorizationToken";
import { UnauthorizationError } from "../../../../../errors/UnauthorizationError";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../../../../reduxReducers/store";
import { useDispatch } from "react-redux";
import { enqueueSnackbar } from "notistack";
import { fetchCategories } from "../../../../../reduxActions/fetchCategories";
import { Category } from "../../../../../entities/Category";


const initialCategory: Category = {
    name: "",
    fiscalCode: ""
};


function CategoryForm(){
    const navigate = useNavigate();
    const [formValues, setCategory] = useState<Category>(initialCategory);
    const dispatch = useDispatch<AppDispatch>();


    const handleChange = (prop: keyof Category) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setCategory({ ...formValues, [prop]: event.target.value });
    };

    const handleSubmit = async () => {
        try {

            for(const key in formValues){
                if (formValues[key] === "" || formValues[key] === null || formValues[key] === undefined) {
                    throw new Error("Invalid fields");
                }
            }

            const body: string = JSON.stringify({
                name: formValues.name,
                fiscalCode: formValues.fiscalCode
            });
    
            const options = {
                method: "POST",
                headers: {"Content-Type": "application/json", "Authorization": `Bearer ${getAuthorizationToken()}`},
                body: body
            };
              
            const jsonData = await fetch("/category/create", options)
            const data = await jsonData.json();
    
            enqueueSnackbar(data.message, {variant: "success"});
            setCategory(initialCategory);

        } catch (error: any | UnauthorizationError) {
            if(error instanceof UnauthorizationError){
                alert("Sessão finalizada");
                return navigate("/");
            }

            enqueueSnackbar(error.message, {variant: "error"});
        } finally {
            dispatch(fetchCategories());
        }
    };


    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                gap: 2,
            }}
        >
            <TextField color="secondary" id="name" label="Nome da Categoria" variant="outlined" fullWidth value={formValues.name} onChange={handleChange("name")} />
            
            <TextField color="secondary" id="category" label="Código Fiscal da Categoria" variant="outlined" fullWidth value={formValues.fiscalCode} onChange={handleChange("fiscalCode")} />
            
            <Button variant="contained" color="primary" onClick={handleSubmit}>
                Registrar
            </Button>
        </Box>
    );
};

export default CategoryForm;


