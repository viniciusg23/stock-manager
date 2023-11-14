import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Box, Button, useTheme } from "@mui/material";
import { getAuthorizationToken } from "../../../utils/getAuthorizationToken";
import { UnauthorizationError } from "../../../../../errors/UnauthorizationError";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../../../../reduxReducers/store";
import { useDispatch } from "react-redux";
import { enqueueSnackbar } from "notistack";
import { fetchEmployees } from "../../../../../reduxActions/fetchEmployees";
import { Employee } from "../../../../../entities/Employee";


const initialEmployee: Employee = {
    name: "",
    job: ""
};


function AddEmployeeForm(){
    const navigate = useNavigate();
    const [formValues, setEmployee] = useState<Employee>(initialEmployee);
    const dispatch = useDispatch<AppDispatch>();


    const handleChange = (prop: keyof Employee) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setEmployee({ ...formValues, [prop]: event.target.value });
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
                job: formValues.job
            });
    
            const options = {
                method: "POST",
                headers: {"Content-Type": "application/json", "Authorization": `Bearer ${getAuthorizationToken()}`},
                body: body
            };
              
            const jsonData = await fetch("/employee/create", options)
            const data = await jsonData.json();
    
            enqueueSnackbar(data.message, {variant: "success"});
    
            setEmployee(initialEmployee);
        } catch (error: any | UnauthorizationError) {
            if(error instanceof UnauthorizationError){
                alert("Sessão finalizada");
                return navigate("/");
            }

            enqueueSnackbar(error.message, {variant: "error"});
        } finally {
            dispatch(fetchEmployees());
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
            <TextField color="secondary" id="name" label="Nome do Funcionário" variant="outlined" fullWidth value={formValues.name} onChange={handleChange("name")} />
            
            <TextField color="secondary" id="category" label="Cargo do Funcionário" variant="outlined" fullWidth value={formValues.job} onChange={handleChange("job")} />
            
            <Button variant="contained" color="primary" onClick={handleSubmit}>
                Registrar
            </Button>
        </Box>
    );
};

export default AddEmployeeForm;


