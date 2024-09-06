import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

export default function useCreatePreStorageTypeMutation() {
  const queryClient = useQueryClient();

  const createPreStorageTypeMutation = async ({ formData }) => {
    try {
      const response = await axios.post(
        "/api/pre-storage-setup/pre-storage-type",
        formData,
      );
      return response;
    } catch (error) {
      console.error("Failed to create new Pre-Storage Type data", error);
      toast.error(`Error: ${error}`);
      throw error;
    }
  };

  const mutation = useMutation({
    mutationFn: createPreStorageTypeMutation,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ["preStorageTypeQueryKey"],
      });
      // Toast a success message
      toast.success("Pre-Storage Type created successfully.", {
        autoClose: 2000,
      });
    },
  });

  return mutation;
}
