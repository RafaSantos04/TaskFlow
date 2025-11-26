import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface SortableStatusProps {
    id: string;
    children: (data: { isDragging: boolean }) => React.ReactNode;
}

export default function SortableStatus({ id, children }: SortableStatusProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition: transition ?? "transform 0.2s ease",
        boxShadow: isDragging ? "0px 4px 12px rgba(0,0,0,0.15)" : "none",
        zIndex: isDragging ? 10 : 1,
        opacity: isDragging ? 0.4 : 1,
        cursor: "grab"
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            {children({ isDragging })}
        </div>
    );
}
