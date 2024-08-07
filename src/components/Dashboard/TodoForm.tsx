import { useContext, useEffect } from "react";

import { Stack } from "@mui/material";
import Button from "@mui/material/Button";
import FormHelperText from "@mui/material/FormHelperText";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";

import { AuthContext } from "../../context/auth-context";
import { useInvalidateQuery } from "../../hooks/invalidateQuery-hook";
import { useTodo } from "../../hooks/todo-hook";
import { useForm } from "../../hooks/useForm";
import SkeletonForm from "./SkeletonForm";
import { TodoProps } from "./TodoList";

interface TodoFormProps {
  onTodoSuccess: () => void;
  todoData?: TodoProps;
  isUpdate?: boolean;
}

const TodoForm = ({ onTodoSuccess, todoData, isUpdate }: TodoFormProps) => {
  const { invalidateQuery } = useInvalidateQuery();
  const auth = useContext(AuthContext);
  const { addTodo, isLoading, updateTodoById } = useTodo();
  const [formState, inputHandler, setFormData] = useForm(
    {
      todo: {
        value: isUpdate ? todoData?.todo : "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    if (formState?.isValid) {
      setFormData(
        {
          todo: {
            value: formState?.inputs?.todo?.value,
            isValid: true,
          },
        },
        true
      );
    }
  }, [setFormData, formState?.isValid, formState?.inputs?.todo?.value]);

  const submitTodoHandler = async (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();
    try {
      if (!isUpdate) {
        const todoResponse = await addTodo(
          String(formState?.inputs?.todo?.value),
          String(auth?.user?._id)
        );
        if (todoResponse) {
          onTodoSuccess();
        }
      } else {
        const updateTodo = await updateTodoById(
          String(formState?.inputs?.todo?.value),
          String(todoData?._id)
        );

        if (updateTodo) {
          onTodoSuccess();
        }
      }
      await invalidateQuery("todo");
      await invalidateQuery("editTodo");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {!isLoading ? (
        <Paper sx={{ padding: 2, borerRadius: 10 }}>
          <form onSubmit={submitTodoHandler}>
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <FormHelperText>What Needs to be done?</FormHelperText>
                <TextField
                  fullWidth
                  id="todo"
                  name="todo"
                  value={formState?.inputs?.todo?.value}
                  onChange={(event) =>
                    inputHandler(
                      "todo",
                      event.target.value,
                      event.target.value.length > 0
                    )
                  }
                />
              </Grid>
              <Stack
                direction="row"
                justifyContent="flex-end"
                sx={{ marginTop: 2 }}
                spacing={2}
              >
                <Button
                  color="error"
                  variant="outlined"
                  onClick={onTodoSuccess}
                >
                  Go back
                </Button>
                <Button
                  variant="outlined"
                  disabled={!formState?.isValid}
                  type="submit"
                >
                  {isUpdate ? "Update" : "Add Todo"}
                </Button>
              </Stack>
            </Grid>
          </form>
        </Paper>
      ) : (
        <SkeletonForm />
      )}
    </>
  );
};

export default TodoForm;
