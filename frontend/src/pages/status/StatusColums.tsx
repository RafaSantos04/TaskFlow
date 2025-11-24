import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import TaskCardSortable from "@pages/task/SortableTask";
import { Paper, Typography, Box } from "@mui/material";

export default function StatusColumn({ status }: any) {
    const tasks = status.relationship_task ?? [];

    return (
        <Paper
            sx={{
                width: 300,
                p: 2,
                backgroundColor: "#0000009f",
                borderRadius: 2,
            }}
        >
            <Typography color="white" variant="h6" fontWeight={700}>
                {status.name}
            </Typography>

            <Box mt={2} display="flex" flexDirection="column" gap={1}>
                <SortableContext
                    items={tasks.map((t: any) => t.id)}
                    strategy={verticalListSortingStrategy}
                >
                    {tasks.map((task: any) => (
                        <TaskCardSortable
                            key={task.id}
                            task={task}
                            statusId={status.id}
                        />
                    ))}
                </SortableContext>
            </Box>
        </Paper>
    );
}
