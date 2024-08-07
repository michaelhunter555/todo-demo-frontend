import { useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";

import { AuthContext } from "../../context/auth-context";
import { useTodo } from "../../hooks/todo-hook";
import { DrawerHeader, MainContent, StyledDrawer } from "./DashboardStyles";
import TodoProgressGuage from "./ProgressChart";
import SidebarMenu from "./SidebarMenu";
import StatsChart from "./StatsCharts";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

const Dashboard = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const [openMenu, setOpenMenu] = useState<boolean>(true);
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [todoPage, setTodoPage] = useState({
    page: 1,
    limit: 5,
  });
  const [totalPages, setTotalPages] = useState(1);

  const { getTodos } = useTodo();

  useEffect(() => {
    if (!auth?.isLoggedIn) {
      navigate("/");
    }
  }, [navigate, auth?.isLoggedIn]);

  const { data: todoList, isLoading: todoIsLoading } = useQuery({
    queryKey: ["todo", auth?.user?._id, todoPage.page, todoPage.limit],
    queryFn: () =>
      getTodos(String(auth?.user?._id), todoPage?.page, todoPage.limit),
    enabled: Boolean(auth?.user?._id && auth?.isLoggedIn),
  });

  useEffect(() => {
    if (totalPages !== todoList?.totalPages) {
      setTotalPages(todoList?.totalPages);
    }
  }, [totalPages, todoList?.totalPages]);

  const handleSidebarMenu = () => {
    setOpenMenu((prev) => !prev);
  };

  const handleAddTodo = () => {
    setOpenForm((prev) => !prev);
  };

  const handlePageChange = (page: number) => {
    setTodoPage({
      page: page,
      limit: todoPage?.limit,
    });
  };

  const totalComplete = todoList?.todos?.filter(
    (todo: { completed: boolean }) => todo.completed === true
  )?.length;

  console.log(todoList?.totalTasks, totalComplete);

  return (
    <Container maxWidth="xl">
      <StyledDrawer variant="permanent" anchor="left" open={openMenu}>
        <DrawerHeader>
          <IconButton onClick={handleSidebarMenu}>
            {openMenu ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <SidebarMenu open={openMenu} />
      </StyledDrawer>
      <MainContent openMenu={openMenu}>
        <Grid container direction="row" alignItems="start" spacing={2}>
          <Grid item xs={12} md={8}>
            <Stack spacing={2} alignItems="center">
              <Typography>What's the plan today {auth?.user?.name}?</Typography>
              <Chip
                onClick={handleAddTodo}
                label="Add New Task"
                clickable
                component="button"
                variant="filled"
                color="primary"
              />
            </Stack>
            {openForm ? (
              <TodoForm onTodoSuccess={() => setOpenForm(false)} />
            ) : (
              <TodoList
                onPageChange={(page: number) => handlePageChange(page)}
                page={todoPage?.page}
                totalPages={totalPages}
                todos={todoList?.todos}
                isLoading={todoIsLoading}
              />
            )}
          </Grid>
          <Grid item xs={12} md={4}>
            <Stack alignItems="center">
              <Typography color="text.secondary">
                You have completed {totalComplete}/{todoList?.totalTasks}
              </Typography>
              <TodoProgressGuage
                totalTodos={todoList?.totalTasks}
                completedTodos={totalComplete}
              />
              <Divider
                variant="middle"
                sx={{ margin: "0.5rem auto", width: "90%" }}
                flexItem
              />
              <StatsChart todos={todoList?.todos} />
            </Stack>
          </Grid>
        </Grid>
      </MainContent>
    </Container>
  );
};

export default Dashboard;
