import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Tooltip, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch, RootState } from '@store/index';
import AddBoxIcon from '@mui/icons-material/AddBox';


import { createStatus, updateStatus, deleteStatus, fetchStatusById, clearSelectedStatus } from '@store/status'



interface StatusControlerProps {
    openProps: (open: boolean) => void;
    open: boolean;
}

export default function StatusController({ openProps, open }: StatusControlerProps) {
    const dispatch = useDispatch<AppDispatch>()

    const handleCleanAddStatus = () => {
        console.log('Adicione um status')
    }


    const handleSelectStatus = () => {

    }


    const handleSave = () => {

    }


    const handleDeleteStatus = () => {

    }

    const handleClose = () => {
        dispatch(clearSelectedStatus())
        openProps(false);
    };



    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="md"
        >
            <DialogTitle>
                Gerenciar Status

                <Tooltip title="Adicionar novo Status" arrow>
                    <IconButton
                        aria-label="add_status"
                        onClick={handleCleanAddStatus}
                        sx={{ ml: 2 }}
                    >
                        <AddBoxIcon />
                    </IconButton>
                </Tooltip>
            </DialogTitle>

            <DialogContent dividers >
                <Box
                    display="flex"
                    flexDirection={{ xs: "column", md: "row" }}
                    gap={3}
                >

                    <Box flex={1}>
                        <Typography variant="h6" mb={1}>
                            Status Listados
                        </Typography>


                    </Box>



                </Box>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button variant="contained" onClick={handleSave}>
                </Button>
            </DialogActions>
        </Dialog>
    )


}