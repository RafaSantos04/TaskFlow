import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TaskCard from "./TaskCard";

export default function SortableTask({ task, statusId }: any) {
    const { setNodeRef, attributes, listeners, transform, transition } =
        useSortable({
            id: task.id,
            data: { statusId },
        });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        touchAction: "none",
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <TaskCard task={task} />
        </div>
    );
}
