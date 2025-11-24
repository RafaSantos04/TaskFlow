import { Box } from "@mui/material";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { useDispatch, useSelector } from "react-redux";
import StatusColumn from "./StatusColums";
import type { AppDispatch, RootState } from "@store/index";
import { updateTask } from "@store/task";

export default function StatusBoard() {
    const dispatch = useDispatch<AppDispatch>();
    const status = useSelector((state: RootState) => state.status.items);

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over) return;

        const taskId = active.id;

        console.log(taskId);

        const oldStatusId = active.data.current?.statusId;
        console.log(oldStatusId);
        const newStatusId = over.id;
        console.log(newStatusId);

        if (!newStatusId || oldStatusId === newStatusId) return;

        // dispatch(updateTask({
        //     id: taskId, data: {
        //         task: name,
        //         comments: description,
        //         status_id: newStatusId
        //     }
        // }));
    };

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <Box sx={{ display: "flex", gap: 3 }}>
                {status.map((st: any) => (
                    <StatusColumn key={st.id} status={st} />
                ))}
            </Box>
        </DndContext>
    );
}
