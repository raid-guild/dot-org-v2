import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CONSULTATION_INSERT_MUTATION } from "../gql/mutations";
import { client } from "../gql";

export const useCreateConsult = () => {
  const queryClient = useQueryClient();

  const { mutate, mutateAsync, isLoading, isError, isSuccess } = useMutation(
    async (data: any) => {
      await client().mutate({
        mutation: CONSULTATION_INSERT_MUTATION,
        variables: {
          name: data.name || "Namey McNameface",
        },
      });
    },
    {
      onSuccess: (data, { bulkItemCount }) => {
        console.log("success", data);
      },
      onError: (error) => {
        console.log("error", error);
      },
    }
  );
  return { mutate, mutateAsync, isLoading, isError, isSuccess };
};
