import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

export default function useUpdatePreStorageTypeMutation() {
  const queryClient = useQueryClient();

  const updatePreStorageTypeMutation = async (dataForUpdate) => {
    try {
      const response = await axios.put(
        "/api/pre-storage-setup/pre-storage-type",
        {
          dataForUpdate,
        },
      );
      return response.data;
    } catch (error) {
      console.error("Failed to UPDATE PreStorage Type informations: ", error);
      toast.error(`Error: ${error.response.data.message}`);
      throw error; // Throw the error to trigger onError callback
    }
  };

  const mutation = useMutation({
    mutationFn: updatePreStorageTypeMutation,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ["preStorageTypeQueryKey"],
      });
      // Toast a success message
      toast.success("PreStorage Type UPDATED successfully.", {
        autoClose: 2000,
      });
    },
  });

  return mutation;
}