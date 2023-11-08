import { Add, Search } from "@mui/icons-material";
import { Box, Typography, FormControl, InputLabel, Input, InputAdornment, IconButton, Button, Tooltip } from "@mui/material";
import Form from "./Form";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useProducts } from "../../../reduxReducers/slicers/sliceProducts";



interface ITableControllerProps {
    tableTitle: string;
    thereIsAddButton: boolean;
    formTitle?: string;
    form?: JSX.Element;
}


function TableController(props: ITableControllerProps) {

    const {tableTitle, formTitle, form, thereIsAddButton} = props;
    
    
    const [searchValue, setSearchValue] = useState<string>("");
    const [openForm, setOpenForm] = useState<boolean>(false);

    const handleClose = () => {
        setOpenForm(false);
    }

    const handleOpen = () => {
        setOpenForm(true);
    }

    const handleSearch = () => {
        console.log(searchValue)
    }



    return (
        <>
            {thereIsAddButton && formTitle && form && (
                <Form isOpen={openForm} handleClose={handleClose} title={formTitle}>
                    {form}
                </Form>
            )}
            

            <Box display="flex" justifyContent="space-between" alignItems="end" mb="1em">
                <Typography variant="h4" m={0}>{tableTitle}</Typography>

                <Box display="flex" alignItems="end" gap="1.5em" >
                    <FormControl variant="standard" sx={{width: thereIsAddButton ? "50%" : "100%"}}>
                        <InputLabel htmlFor="standard-adornment-search">Pesquisar</InputLabel>
                        <Input
                            id="standard-adornment-search"
                            type="text"
                            onChange={(event) => setSearchValue(event.target.value)}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleSearch}
                                        edge="end"
                                    >
                                        <Search />
                                    </IconButton>
                                </InputAdornment>
                            }
                        />  
                    </FormControl>
                    {thereIsAddButton && (
                        <Tooltip title={formTitle} placement="top">
                            <Button 
                                variant="contained" 
                                color="success"  
                                endIcon={<Add />}
                                onClick={handleOpen}
                            >
                                Adicionar Novo
                            </Button>
                        </Tooltip>
                    )}
                    
                    
                </Box>
                
            </Box>
        </>
    );
}

export default TableController;