import { useContext, useState } from "react";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";

import { AuthContext } from "../../context/auth-context";
import { useInvalidateQuery } from "../../hooks/invalidateQuery-hook";
import { useTodo } from "../../hooks/todo-hook";
import TodoForm from "./TodoForm";

export type TodoProps = {
  _id: string;
  todo: string;
  completed: boolean;
  addDate: string;
  completedDate: string;
};

interface TodoListProps {
  todos: TodoProps[];
  isLoading: boolean;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const convertDate = (addDate: string) => {
  const date = new Date(addDate);
  return date.toLocaleString();
};

const TodoList = ({
  todos,
  isLoading,
  page,
  totalPages,
  onPageChange,
}: TodoListProps) => {
  const auth = useContext(AuthContext);
  const { getTodoById, deleteTodoById, markTodoCompleted } = useTodo();
  const [editId, setEditId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { invalidateQuery } = useInvalidateQuery();

  const { data: todo, isLoading: todoIsLoading } = useQuery({
    queryKey: ["editTodo", editId, auth?.user?._id],
    queryFn: () => getTodoById(editId as string),
    enabled: Boolean(editId && auth?.user?._id),
    staleTime: 5 * 60 * 60 * 1000,
  });

  const handleEditId = (id: string) => {
    setEditId(id);
    setIsEditing(true);
  };

  const handleDeleteTodo = async (todoId: string) => {
    if (todoId) {
      await deleteTodoById(todoId, String(auth?.user?._id));
      await invalidateQuery("todo");
    }
  };

  const handleCompletedTodo = async (todoId: string, isCompleted: boolean) => {
    if (todoId) {
      await markTodoCompleted(todoId, !isCompleted);
      await invalidateQuery("todo");
    }
  };

  return (
    <Box>
      {isLoading && <CircularProgress />}
      {!isLoading &&
        !isEditing &&
        todos &&
        todos?.map((todo) => (
          <List key={todo?._id}>
            <Card
              sx={{
                width: "100%",
                background: todo?.completed ? "#d3d3d3" : "#fffffb",
              }}
            >
              <CardContent>
                <Grid container>
                  <Grid item>
                    <Typography variant="subtitle2">
                      {convertDate(todo.addDate)}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      {todo.todo}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="flex-end"
                  spacing={2}
                  sx={{ width: "100%" }}
                >
                  <Chip
                    onClick={() => handleDeleteTodo(todo?._id)}
                    variant="outlined"
                    color="error"
                    icon={<ClearIcon />}
                    component="button"
                    clickable
                    label="remove"
                  />
                  <Chip
                    onClick={() => handleEditId(todo?._id)}
                    variant="outlined"
                    icon={<EditIcon />}
                    component="button"
                    clickable
                    label="edit"
                  />

                  <Chip
                    onClick={() =>
                      handleCompletedTodo(todo?._id, todo?.completed)
                    }
                    color={todo?.completed ? "default" : "primary"}
                    variant="outlined"
                    icon={
                      todo?.completed ? (
                        <CheckCircleIcon />
                      ) : (
                        <RemoveCircleIcon />
                      )
                    }
                    component="button"
                    clickable
                    label={todo?.completed ? "Done" : "Finished?"}
                  />
                </Stack>
              </CardActions>
            </Card>
          </List>
        ))}
      <Box
        sx={{
          marginTop: 5,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {!isLoading && todos?.length === 0 && (
          <Typography color="text.secondary" variant="h6">
            No Todos yet, maybe add one?
          </Typography>
        )}
        <Stack
          sx={{ width: "100%", margin: isEditing ? "2rem auto" : "0 auto" }}
        >
          {isEditing && !todoIsLoading && (
            <TodoForm
              isUpdate={true}
              todoData={todo}
              onTodoSuccess={() => setIsEditing(false)}
            />
          )}
        </Stack>
      </Box>
      {!isEditing && totalPages > 1 && (
        <Pagination
          page={page}
          count={totalPages}
          onChange={(event, page) => onPageChange(page)}
        />
      )}
    </Box>
  );
};

export default TodoList;
