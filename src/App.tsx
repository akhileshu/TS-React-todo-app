import {
  Container,
  TextField,
  Stack,
  AppBar,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";

import TodoItem from "./components/TodoItem";
import { useState, useEffect } from "react";
import { getTodos, saveTodos } from "./utils";

function App() {
  const [todos, setTodos] = useState<TodoItemType[]>(getTodos());
  const [title, setTitle] = useState<TodoItemType["title"]>("");
  const completeHandler = (id: TodoItemType["id"]): void => {
    const updatedTodos = todos.map((todo: TodoItemType) => {
      return todo.id === id
        ? { ...todo, isCompleted: !todo.isCompleted }
        : todo;
    });
    setTodos(updatedTodos);
  };
  const deleteHandler = (id: TodoItemType["id"]): void => {
    const updatedTodos = todos.filter((todo: TodoItemType) => {
      return todo.id === id ? null : todo;
    });
    setTodos(updatedTodos);
  };
  const submitHandler = (): void => {
    if (!title.trim()) return;
    const newTodo: TodoItemType = {
      title,
      isCompleted: false,
      id: String(Math.random() * 1000),
    };
    setTitle("");
    setTodos((todos) => [...todos, newTodo]);

    console.log(todos);
  };
  const editHandler = (
    id: TodoItemType["id"],
    newTitle: TodoItemType["title"],
    newIsCompleted: TodoItemType["isCompleted"]
  ): void => {
    if (!newTitle.trim()) return;
    const updatedTodos = todos.map((todo: TodoItemType) => {
      return todo.id === id
        ? { ...todo, title: newTitle, isCompleted: newIsCompleted }
        : todo;
    });
    setTodos(updatedTodos);
  };
  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  return (
    <>
      <Container>
        <AppBar position="static">
          <Toolbar>
            <Typography>App</Typography>
          </Toolbar>
        </AppBar>

        <Stack height={"80%"} direction={"column"} spacing={"1rem"} p={"1rem"}>
          {todos.map((todo, index) => {
            return (
              <TodoItem
                deleteHandler={deleteHandler}
                completeHandler={completeHandler}
                editHandler={editHandler}
                key={index}
                todo={todo}
              />
            );
          })}
        </Stack>
        <TextField
          onKeyDown={(e) => {
            if (e.key === "Enter") submitHandler();
          }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          label={"New Task"}
        />
        <Button
          disabled={!title.trim()}
          onClick={submitHandler}
          sx={{ margin: "1rem 0" }}
          variant="contained"
        >
          Add
        </Button>
      </Container>
    </>
  );
}

export default App;
