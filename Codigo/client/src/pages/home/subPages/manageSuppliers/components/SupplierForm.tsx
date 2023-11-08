import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Box, Button } from '@mui/material';
import { UnauthorizationError } from '../../../../../errors/UnauthorizationError';
import { useNavigate } from 'react-router-dom';
import { getAuthorizationToken } from '../../../utils/getAuthorizationToken';
import { useDispatch } from 'react-redux';
import { enqueueSnackbar } from 'notistack';
import { fetchSuppliers } from '../../../../../reduxActions/fetchSuppliers';
import { AppDispatch } from '../../../../../reduxReducers/store';
import { Supplier } from '../../../../../entities/Supplier';


const initialSupplier: Supplier = {
    name: "",
    description: ""
};

function SupplierForm(){
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const [formValues, setSupplier] = useState<Supplier>(initialSupplier);

    const handleChange = (prop: keyof Supplier) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setSupplier({ ...formValues, [prop]: event.target.value });
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
                description: formValues.description
            });
    
            const options = {
                method: 'POST',
                headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${getAuthorizationToken()}`},
                body: body
            };
              
            const jsonData = await fetch('/supplier/create', options);
            const data = await jsonData.json();
    
            enqueueSnackbar(data.message, {variant: "success"});
            setSupplier(initialSupplier);
        } 
        catch (error: any | UnauthorizationError) {
            if(error instanceof UnauthorizationError){
                alert("Sessão finalizada");
                return navigate("/");
            }

            enqueueSnackbar(error.message, {variant: "error"});
        } finally {
            dispatch(fetchSuppliers());
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
            <TextField color='secondary' id="name" label="Nome do Fornecedor" variant="outlined" fullWidth value={formValues.name} onChange={handleChange('name')} />
            
            <TextField color='secondary' id="description" label="Descrição do Fornecedor" variant="outlined" fullWidth value={formValues.description} onChange={handleChange('description')} />
            
            <Button variant="contained" color="primary" onClick={handleSubmit}>
                Registrar
            </Button>
        </Box>
    );
};

export default SupplierForm;