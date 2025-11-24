import {
    Box, Button, Dialog, DialogActions, DialogContent, DialogTitle,
    IconButton, Tooltip, Typography, TextField
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@store/index';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors
} from "@dnd-kit/core";
import {
    SortableContext,
    verticalListSortingStrategy,
    arrayMove
} from "@dnd-kit/sortable";

import SortableStatus from "./SortableStatus";
import {
    createStatus,
    updateStatus,
    deleteStatus,
    fetchStatusById,
    clearSelectedStatus,
    updateStatusOrder
} from '@store/status';

// -------------------------------------------------------------

interface StatusControlerProps {
    openProps: (open: boolean) => void;
    open: boolean;
}

export default function StatusController({ openProps, open }: StatusControlerProps) {
    const dispatch = useDispatch<AppDispatch>();

    const status = useSelector((state: RootState) => state.status.items);
    const selectedStatus = useSelector((state: RootState) => state.status.selectedStatus);

    const sensors = useSensors(useSensor(PointerSensor, {
        activationConstraint: { distance: 5 }
    }));

    // -------------------------------------------------------------
    // STATES
    // -------------------------------------------------------------
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [color, setColor] = useState("#2196f3");

    // -------------------------------------------------------------
    // SIDE EFFECTS
    // -------------------------------------------------------------
    useEffect(() => {
        if (selectedStatus) {
            setName(selectedStatus.name);
            setDescription(selectedStatus.description);
            setColor(selectedStatus.color);
        } else {
            resetForm();
        }
    }, [selectedStatus]);

    // -------------------------------------------------------------
    // HELPERS
    // -------------------------------------------------------------
    const resetForm = () => {
        setName("");
        setDescription("");
        setColor("#2196f3");
    };

    const handleNewStatus = () => {
        resetForm();
        dispatch(clearSelectedStatus());
    };

    const handleSave = () => {
        if (!name.trim()) {
            alert("Informe um nome para o status!");
            return;
        }

        const payload = { name, description, color };

        if (selectedStatus) {
            dispatch(updateStatus({ id: selectedStatus.id, ...payload }));
        } else {
            dispatch(createStatus(payload));
        }

        handleClose();
    };

    const handleClose = () => {
        dispatch(clearSelectedStatus());
        resetForm();
        openProps(false);
    };

    // -------------------------------------------------------------
    // MOVE PARA CIMA E PARA BAIXO
    // -------------------------------------------------------------
    const moveStatusUp = (index: number) => {
        if (index === 0) return;
        const reordered = arrayMove(status, index, index - 1);
        dispatch(updateStatusOrder(reordered));
    };

    const moveStatusDown = (index: number) => {
        if (index === status.length - 1) return;
        const reordered = arrayMove(status, index, index + 1);
        dispatch(updateStatusOrder(reordered));
    };

    // -------------------------------------------------------------
    // RENDER
    // -------------------------------------------------------------
    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
            <DialogTitle>
                Gerenciar Status
                <Tooltip title="Adicionar novo Status" arrow>
                    <IconButton sx={{ ml: 2 }} onClick={handleNewStatus}>
                        <AddBoxIcon />
                    </IconButton>
                </Tooltip>
            </DialogTitle>

            <DialogContent dividers>
                <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={3}>

                    {/* ------------------------------------------------------------- */}
                    {/* LISTA DE STATUS                                            */}
                    {/* ------------------------------------------------------------- */}
                    <Box flex={1}>
                        <Typography variant="h6" mb={1}>Status Listados</Typography>

                        <DndContext
                            sensors={sensors}
                            collisionDetection={closestCenter}
                            onDragEnd={({ active, over }) => {
                                if (!over || active.id === over.id) return;

                                const oldIndex = status.findIndex(s => s.id === active.id);
                                const newIndex = status.findIndex(s => s.id === over.id);

                                dispatch(updateStatusOrder(arrayMove(status, oldIndex, newIndex)));
                            }}
                        >
                            <SortableContext
                                items={status.map(s => s.id)}
                                strategy={verticalListSortingStrategy}
                            >
                                <Box display="flex" flexDirection="column" gap={1}>
                                    {status.map((st, index) => (
                                        <SortableStatus key={st.id} id={st.id}>
                                            {({ listeners }: any) => (
                                                <Box
                                                    onClick={() => dispatch(fetchStatusById(st.id))}
                                                    sx={{
                                                        p: 1.5,
                                                        borderRadius: 1,
                                                        backgroundColor: "white",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "space-between",
                                                        border: selectedStatus?.id === st.id
                                                            ? "2px solid #1976d2"
                                                            : "1px solid #ccc",
                                                        cursor: "pointer",
                                                        "&:hover": { backgroundColor: "#f5f5f5" }
                                                    }}
                                                >
                                                    <Box display="flex" alignItems="center" gap={1}>

                                                        {/* DRAG HANDLE */}
                                                        <Box {...listeners} sx={{ cursor: "grab", px: 1 }}>
                                                            ☰
                                                        </Box>

                                                        {/* BULLET COLOR */}
                                                        <Box sx={{
                                                            width: 16,
                                                            height: 16,
                                                            borderRadius: "50%",
                                                            backgroundColor: st.color,
                                                            border: "1px solid #999"
                                                        }} />

                                                        <Typography>{st.name}</Typography>
                                                    </Box>

                                                    {/* BOTÕES: mover / deletar */}
                                                    <Box display="flex" alignItems="center" gap={1}>
                                                        <IconButton size="small" onClick={(e) => {
                                                            e.stopPropagation();
                                                            moveStatusUp(index);
                                                        }}>
                                                            <ArrowUpwardIcon fontSize="inherit" />
                                                        </IconButton>

                                                        <IconButton size="small" onClick={(e) => {
                                                            e.stopPropagation();
                                                            moveStatusDown(index);
                                                        }}>
                                                            <ArrowDownwardIcon fontSize="inherit" />
                                                        </IconButton>
                                                        <Tooltip title="Excluir status" placement="top" arrow>
                                                            <IconButton
                                                                size="small"
                                                                color="error"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    dispatch(deleteStatus(st.id));
                                                                }}
                                                            >
                                                                ❌
                                                            </IconButton>
                                                        </Tooltip>
                                                    </Box>
                                                </Box>
                                            )}
                                        </SortableStatus>
                                    ))}
                                </Box>
                            </SortableContext>
                        </DndContext>
                    </Box>

                    {/* ------------------------------------------------------------- */}
                    {/* FORMULÁRIO                                                  */}
                    {/* ------------------------------------------------------------- */}
                    <Box flex={1} display="flex" flexDirection="column" gap={2}>
                        <Typography variant="h6">Cadastrar / Editar Status</Typography>

                        <TextField label="Nome do status" value={name}
                            onChange={(e) => setName(e.target.value)} fullWidth />

                        <TextField label="Descrição" value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            fullWidth multiline rows={3} />

                        <Box>
                            <Typography variant="body2" mb={1}>Cor do status</Typography>
                            <TextField
                                type="color"
                                value={color}
                                onChange={(e) => setColor(e.target.value)}
                                sx={{ width: 100 }}
                            />
                        </Box>
                    </Box>

                </Box>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button variant="contained" onClick={handleSave}>
                    {selectedStatus ? "Atualizar" : "Salvar"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
