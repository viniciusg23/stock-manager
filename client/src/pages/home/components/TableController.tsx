import { Add, Search } from "@mui/icons-material";
import { Box, Typography, FormControl, InputLabel, Input, InputAdornment, IconButton, Button, Tooltip } from "@mui/material";
import Form from "./Form";
import { useState } from "react";


interface ITableControllerProps {
    tableTitle: string;
    thereIsAddButton: boolean;
    setQuery: (value: string) => void;
    formTitle?: string;
    form?: JSX.Element;
}


function TableController(props: ITableControllerProps) {

    const {tableTitle, formTitle, form, thereIsAddButton, setQuery} = props;
    
    
    const [searchValue, setSearchValue] = useState<string>("");
    const [openForm, setOpenForm] = useState<boolean>(false);

    const handleClose = () => {
        setOpenForm(false);
    }

    const handleOpen = () => {
        setOpenForm(true);
    }

    const handleSearch = () => {
        setQuery(searchValue);
        // console.log(searchValue)
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