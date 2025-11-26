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
    verticalListSortingStrategy
} from "@dnd-kit/sortable";

import { motion } from "framer-motion";

import SortableStatus from "./SortableStatus";

import {
    createStatus,
    updateStatus,
    deleteStatus,
    fetchStatusById,
    clearSelectedStatus,
    updateStatusOrder,
    fetchStatus
} from '@store/status';


interface StatusControllerProps {
    openProps: (open: boolean) => void;
    open: boolean;
}

export default function StatusController({ openProps, open }: StatusControllerProps) {
    const dispatch = useDispatch<AppDispatch>();

    const status = useSelector((state: RootState) => state.status.items);
    const loading = useSelector((state: RootState) => state.status.loading);
    const selectedStatus = useSelector((state: RootState) => state.status.selectedStatus);

    const orderedStatus = [...status].sort((a, b) => a.order - b.order);

    const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [color, setColor] = useState("#2196f3");
    const [order, setOrder] = useState("0");

    useEffect(() => {
        if (selectedStatus) {
            setName(selectedStatus.name);
            setDescription(selectedStatus.description);
            setColor(selectedStatus.color);
            setOrder(String(selectedStatus.order));
        } else {
            resetForm();
        }
    }, [selectedStatus]);

    const resetForm = () => {
        setName("");
        setDescription("");
        setColor("#2196f3");
        setOrder("0");
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

    const moveStatusUp = async (currentOrder: number) => {
        const ordered = [...orderedStatus];
        const index = ordered.findIndex(s => s.order === currentOrder);
        if (index <= 0) return;

        const current = ordered[index];
        const above = ordered[index - 1];

        await dispatch(updateStatusOrder({ id: current.id, order: above.order }));
        dispatch(fetchStatus())
    };

    const moveStatusDown = async (currentOrder: number) => {
        const ordered = [...orderedStatus];
        const index = ordered.findIndex(s => s.order === currentOrder);
        if (index === -1 || index >= ordered.length - 1) return;

        const current = ordered[index];
        const below = ordered[index + 1];

        await dispatch(updateStatusOrder({ id: current.id, order: below.order })).unwrap();
        dispatch(fetchStatus())
    };

    const handleDragEnd = async ({ active, over }: any) => {
        if (!over || active.id === over.id) return;

        const ordered = [...orderedStatus];

        const oldIndex = ordered.findIndex(s => s.id === active.id);
        const newIndex = ordered.findIndex(s => s.id === over.id);

        if (oldIndex === -1 || newIndex === -1) return;

        const draggedStatus = ordered[oldIndex];
        const targetStatus = ordered[newIndex];

        await dispatch(updateStatusOrder({ id: draggedStatus.id, order: targetStatus.order })).unwrap();
        dispatch(fetchStatus())
    };

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

                    <Box flex={1}>
                        <Typography variant="h6" mb={1}>
                            Status Listados
                        </Typography>

                        <DndContext
                            sensors={sensors}
                            collisionDetection={closestCenter}
                            onDragEnd={handleDragEnd}
                        >
                            <SortableContext
                                items={orderedStatus.map(s => s.id)}
                                strategy={verticalListSortingStrategy}
                            >
                                <Box display="flex" flexDirection="column" gap={1}>
                                    {orderedStatus.map((st) => (
                                        <SortableStatus key={st.id} id={st.id}>
                                            {({ listeners, attributes, isDragging, transform }: any) => (
                                                <motion.div
                                                    layout
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -10 }}
                                                    transition={{ duration: 0.15 }}
                                                >
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
                                                            transition: "background-color .2s ease, border .2s ease, transform .15s ease",
                                                            boxShadow: isDragging ? "0px 4px 12px rgba(0,0,0,0.15)" : "none",
                                                            zIndex: isDragging ? 10 : 1,
                                                            "&:hover": { backgroundColor: "#f5f5f5", transform: "scale(1.01)" },
                                                        }}
                                                    >
                                                        <Box display="flex" alignItems="center" gap={1}>
                                                            <Box {...listeners} {...attributes} sx={{ cursor: "grab", px: 1 }}>
                                                                ☰
                                                            </Box>
                                                            <Box sx={{
                                                                width: 16,
                                                                height: 16,
                                                                borderRadius: "50%",
                                                                backgroundColor: st.color,
                                                                border: "1px solid #999"
                                                            }} />
                                                            <Typography>{st.name}</Typography>
                                                        </Box>

                                                        <Box display="flex" alignItems="center" gap={1}>
                                                            <IconButton
                                                                size="small"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    moveStatusUp(st.order);
                                                                }}
                                                                sx={{
                                                                    transition: "transform .15s ease, opacity .2s",
                                                                    opacity: 0.8,
                                                                    "&:hover": { transform: "scale(1.2)", opacity: 1 },
                                                                    "&:active": { transform: "scale(0.85)" },
                                                                }}
                                                            >
                                                                <ArrowUpwardIcon fontSize="inherit" />
                                                            </IconButton>

                                                            <IconButton
                                                                size="small"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    moveStatusDown(st.order);
                                                                }}
                                                                sx={{
                                                                    transition: "transform .15s ease, opacity .2s",
                                                                    opacity: 0.8,
                                                                    "&:hover": { transform: "scale(1.2)", opacity: 1 },
                                                                    "&:active": { transform: "scale(0.85)" },
                                                                }}
                                                            >
                                                                <ArrowDownwardIcon fontSize="inherit" />
                                                            </IconButton>

                                                            {/* <Tooltip title="Excluir status" arrow>
                                                                <IconButton
                                                                    size="small"
                                                                    color="error"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        dispatch(deleteStatus(st.id));
                                                                    }}
                                                                    sx={{
                                                                        transition: "transform .15s ease, opacity .2s",
                                                                        opacity: 0.8,
                                                                        "&:hover": { transform: "scale(1.2)", opacity: 1 },
                                                                        "&:active": { transform: "scale(0.85)" },
                                                                    }}
                                                                >
                                                                    ❌
                                                                </IconButton>
                                                            </Tooltip> */}
                                                        </Box>
                                                    </Box>
                                                </motion.div>
                                            )}
                                        </SortableStatus>
                                    ))}
                                </Box>
                            </SortableContext>

                        </DndContext>
                    </Box>

                    <Box flex={1} display="flex" flexDirection="column" gap={2}>
                        <Typography variant="h6">Cadastrar / Editar Status</Typography>

                        <TextField
                            label="Nome"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            fullWidth
                        />

                        <TextField
                            label="Descrição"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            fullWidth
                            multiline
                            rows={3}
                        />

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
                <Button
                    variant="contained"
                    onClick={handleSave}
                    disabled={loading}
                    sx={{
                        transition: "opacity .3s ease",
                        opacity: loading ? 0.6 : 1,
                    }}
                >
                    {loading ? "Salvando..." : selectedStatus ? "Atualizar" : "Salvar"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
