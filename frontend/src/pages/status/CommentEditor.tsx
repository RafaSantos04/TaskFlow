import { useState } from "react";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import { useDispatch } from "react-redux";
import { updateTask } from "@store/task";
import type { AppDispatch } from "@store/index";

export function CommentEditor({ tsk }: any) {
    const dispatch = useDispatch<AppDispatch>();

    console.log(tsk);


    const [editing, setEditing] = useState(false);
    const [comment, setComment] = useState(tsk.comments ?? "");

    const handleSave = () => {
        dispatch(updateTask({
            id: tsk.id,
            data: { task: tsk.task, status_id: tsk.status_id, comments: comment }
        }));

        setEditing(false);
    };

    return (
        <TextField
            label="Comentario"
            size="small"
            multiline
            rows={4}
            value={comment}
            disabled={!editing}
            onChange={(e) => setComment(e.target.value)}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        {!editing ? (
                            <IconButton onClick={() => setEditing(true)}>
                                <EditIcon />
                            </IconButton>
                        ) : (
                            <IconButton onClick={handleSave}>
                                <CheckIcon />
                            </IconButton>
                        )}
                    </InputAdornment>
                ),
            }}
        />
    );
}
