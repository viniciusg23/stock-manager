import { Fab, Tooltip } from "@mui/material";
import {Add} from "@mui/icons-material"
import { useState } from "react";
import Form from "../../../components/Form";
import AddSupplierForm from "./AddSupplierForm";

function AddSupplier() {
    const [openForm, setOpenForm] = useState<boolean>(false);

    const handleClose = () => {
        setOpenForm(false);
    }

    const handleOpen = () => {
        setOpenForm(true);
    }

    return (
        <>
            <Form isOpen={openForm} handleClose={handleClose}>
                <AddSupplierForm />
            </Form>


            <Tooltip title="Adicionar Fornecedor" placement="left">
                <Fab 
                    sx={{
                        position: "absolute",
                        bottom: "3em",
                        right: "3em"
                    }} 
                    color="primary" 
                    aria-label="add"
                    onClick={handleOpen}
                >
                    <Add />
                </Fab>
            </Tooltip>
        </>
        
    );
}

export default AddSupplier;