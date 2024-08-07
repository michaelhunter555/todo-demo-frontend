import { useQueryClient } from "@tanstack/react-query";

export const useInvalidateQuery = () => {
  const queryClient = useQueryClient();

  const invalidateQuery = async (dependencies: string) => {
    return await queryClient.invalidateQueries({ queryKey: [dependencies] });
  };

  return { invalidateQuery };
};
