import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

export default function useDeletePreStorageTypeMutation() {
  const queryClient = useQueryClient();

  const deletePreStorageTypeMutation = async (id) => {
    try {
      const response = await axios.delete(
        "/api/pre-storage-setup/pre-storage-type",
        {
          data: { id },
        },
      );
      return response.data;
    } catch (error) {
      console.error("Failed to DELETE Pre-Storage Type: ", error);
      toast.error(`Error: ${error.response.data.message}`);
      throw error; // Throw the error to trigger onError callback
    }
  };

  const mutation = useMutation({
    mutationFn: deletePreStorageTypeMutation,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ["preStorageTypeQueryKey"],
      });
      // Toast a success message
      toast.success("Pre-Storage Type DELETED successfully.", {
        autoClose: 2000,
      });
    },
  });

  return mutation;
}
