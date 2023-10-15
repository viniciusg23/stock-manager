import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';

import { ReactNode } from 'react';

interface FormProps {
    isOpen: boolean;
    handleClose: () => void;
    children: JSX.Element;
}

export default function Form(props: FormProps) {

    const {isOpen, handleClose, children} = props;

    return (
        <div>
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
                            position: 'absolute' as 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: "80%",
                            minWidth: 400,
                            maxWidth: 700,
                            bgcolor: 'background.paper',
                            boxShadow: 24,
                            p: 4,
                            borderRadius: 2
                        }}
                    >
                        
                        {children}

                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
