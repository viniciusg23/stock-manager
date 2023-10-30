import { Fab, Tooltip } from "@mui/material";
import {Add} from "@mui/icons-material"
import ProductForm from "./ProductForm";
import { useState } from "react";
import Form from "../../../components/Form";

function AddProduct() {
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
                <ProductForm control="create"/>
            </Form>


            <Tooltip title="Adicionar Produto" placement="left">
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

export default AddProduct;