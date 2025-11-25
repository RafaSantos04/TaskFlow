import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface SortableStatusProps {
    id: string;
    children: (data: any) => React.ReactNode;
}

export default function SortableStatus({ id, children }:SortableStatusProps) {
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
        transition: transition || "transform 180ms ease",
        opacity: isDragging ? 0.4 : 1,
        cursor: "grab",
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            {children({ isDragging })}
        </div>
    );
}
