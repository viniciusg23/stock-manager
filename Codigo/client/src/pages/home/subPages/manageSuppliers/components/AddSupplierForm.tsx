import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Box, Button } from '@mui/material';
import { UnauthorizationError } from '../../../../../errors/UnauthorizationError';
import { useNavigate } from 'react-router-dom';
import { getAuthorizationToken } from '../../../utils/getAuthorizationToken';

interface FormValues {
    name: string;
    description: string;
}


const initialFormValues: FormValues = {
    name: "",
    description: ""
};


function AddSupplierForm(){
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState<FormValues>(initialFormValues);

    const handleChange = (prop: keyof FormValues) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormValues({ ...formValues, [prop]: event.target.value });
    };

    const handleSubmit = async () => {
        try {
            console.log(formValues);
    
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
    
            alert(data.message);
            setFormValues(initialFormValues);
        } 
        catch (error: any | UnauthorizationError) {
            if(error instanceof UnauthorizationError){
                alert("Sessão finalizada");
                return navigate("/");
            }

            alert(error.message)
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

export default AddSupplierForm;