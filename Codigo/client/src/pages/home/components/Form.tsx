import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { Divider, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";


interface FormProps {
    isOpen: boolean;
    handleClose: () => void;
    children: JSX.Element;
    title: string;
}

export default function Form(props: FormProps) {

    const {isOpen, handleClose, children, title} = props;

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={isOpen}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={isOpen}>
                <Box 
                    sx={{
                        position: "absolute" as "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "80%",
                        minWidth: 400,
                        maxWidth: 700,
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2
                    }}
                >
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography  variant="h5" >{title}</Typography>
                        <IconButton aria-label="close" onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <Divider sx={{mb: "2em"}}></Divider>

                    {children}

                </Box>
            </Fade>
        </Modal>
    );
}
