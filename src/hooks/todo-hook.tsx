import { useCallback, useState } from "react";

export const useTodo = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  //getTodos
  const getTodos = useCallback(
    async (id: string, page: number, limit: number) => {
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_TODO
          }/get-todo/${id}?page=${page}&limit=${limit}`,
          { method: "GET" }
        );

        if (!response.ok) {
          throw new Error("error with finding user");
        }

        const data = await response.json();

        return {
          todos: data.userTodos,
          page: data.pageNum,
          totalPages: data.totalPages,
          totalTasks: data.totalTodos,
        };
      } catch (err) {
        console.log(err);
      }
    },
    []
  );

  //get todosbyid
  const getTodoById = useCallback(async (id: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_TODO}/get-todo-by-id?todoId=${id}`,
        { method: "GET" }
      );

      if (!response.ok) {
        throw new Error("error with finding user");
      }

      const data = await response.json();

      return data.todo;
    } catch (err) {
      console.log(err);
    }
  }, []);

  //create todos
  const addTodo = useCallback(async (todo: string, id: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_TODO}/create-todo?id=${id}`,
        {
          method: "POST",
          body: JSON.stringify({ todo }),
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      const data = await response.json();
      return data.success;
    } catch (err) {
      console.log(err);
    }
  }, []);

  //edit todos
  const updateTodoById = useCallback(
    async (updatedTodo: string, todoId: string) => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_TODO}/update-todo?todoId=${todoId}`,
          {
            method: "PATCH",
            body: JSON.stringify({ updatedTodo }),
            headers: { "Content-Type": "application/json" },
          }
        );

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message);
        }
        const data = await response.json();
        setIsLoading(false);
        return data.success;
      } catch (err) {
        setIsLoading(false);
        console.log(err);
      }
    },
    []
  );

  const markTodoCompleted = useCallback(
    async (todoId: string, isCompleted: boolean) => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_TODO}/mark-todo-completed?todoId=${todoId}`,
          {
            method: "PATCH",
            body: JSON.stringify({ isCompleted }),
            headers: { "Content-Type": "application/json" },
          }
        );

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message);
        }

        const data = await response.json();
        setIsLoading(false);
        return data.success;
      } catch (err) {
        setIsLoading(false);
        console.log(err);
      }
    },
    []
  );

  //delete todos
  const deleteTodoById = useCallback(async (todoId: string, userId: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_TODO
        }/delete-todo?todoId=${todoId}&userId=${userId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const data = await response.json();
      setIsLoading(false);

      return data.success;
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  }, []);

  return {
    isLoading,
    getTodos,
    addTodo,
    getTodoById,
    updateTodoById,
    deleteTodoById,
    markTodoCompleted,
  };
};
