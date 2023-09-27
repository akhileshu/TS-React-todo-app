import { Button, Checkbox, Paper, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
type PropsType = {
  todo: TodoItemType;
  deleteHandler: (id: TodoItemType["id"]) => void;
  completeHandler: (id: TodoItemType["id"]) => void;
  editHandler: (
    id: TodoItemType["id"],
    newTitle: TodoItemType["title"],
    newIsCompleted: TodoItemType["isCompleted"]
  ) => void;
};
function TodoItem({
  todo,
  completeHandler,
  deleteHandler,
  editHandler,
}: PropsType) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [titleVal, setTitleVal] = useState<TodoItemType["title"]>(todo.title);
  const [isCompletedVal, setIsCompletedVal] = useState<
    TodoItemType["isCompleted"]
  >(todo.isCompleted);
  // Synchronize isCompleted with todo.isCompleted when entering edit mode
  useEffect(() => {
    if (isEditing) {
      setIsCompletedVal(todo.isCompleted);
      setTitleVal(todo.title);
    }
  }, [isEditing, todo.isCompleted, todo.title]);
  const submitEditHandler = (): void => {
    setIsEditing((state) => !state);
    editHandler(todo.id, titleVal, isCompletedVal);
  };
  return (
    <Paper sx={{ padding: "1rem" }}>
      {isEditing ? (
        <>
          <TextField
            onKeyDown={(e) => {
              if (e.key === "Enter") submitEditHandler();
            }}
            value={titleVal}
            onChange={(e) => setTitleVal(e.target.value)}
            fullWidth
            label={"edit title"}
          />
          <Checkbox
            id="isCompleted"
            // misbehaving when using isCompleted
            checked={isCompletedVal}
            onChange={(e) => setIsCompletedVal(e.target.checked)}
          />
          <label htmlFor="isCompleted">Completed</label>{" "}
          <Button
            variant="contained"
            onClick={() => {
              setIsEditing((state) => !state);
              editHandler(todo.id, titleVal, isCompletedVal);
            }}
          >
            Save
          </Button>
        </>
      ) : (
        <>
          <Typography>{todo.title}</Typography>
          <Button variant="contained">
            {todo.isCompleted ? "completed" : "pending"}
          </Button>

          <Checkbox
            checked={todo.isCompleted}
            onChange={() => completeHandler(todo.id)}
          />
          <Button
            onClick={() => {
              setIsEditing((state) => !state);
            }}
          >
            Edit
          </Button>
          <Button onClick={() => deleteHandler(todo.id)} color="warning">
            Delete
          </Button>
        </>
      )}
    </Paper>
  );
}

export default TodoItem;
