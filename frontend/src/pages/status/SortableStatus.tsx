import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface SortableStatusProps {
    id: string;
    children: (data: any) => React.ReactNode;
}

export default function SortableStatus({ id, children }: SortableStatusProps) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes}>
            {children({ listeners })}
        </div>
    );
}
