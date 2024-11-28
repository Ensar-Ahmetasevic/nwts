import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

export default function useCreateFinalStorageCapacityMutation() {
  const queryClient = useQueryClient();

  const createFinalStorageCapacityMutation = async (formData) => {
    try {
      const response = await axios.post("/api/final-storage-setup", formData);
      return response.data;
    } catch (error) {
      console.error("Failed to create new Final-Storage Capacity Waste", error);
      toast.error(`Error: ${error.response?.data?.message || error.message}`);
      throw error;
    }
  };

  const mutation = useMutation({
    mutationFn: createFinalStorageCapacityMutation,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ["finalStorageCapacityQueryKey"],
      });
      queryClient.invalidateQueries({
        queryKey: ["finalStorageIDQueryKey"],
      });
      queryClient.invalidateQueries({
        queryKey: ["statusShippingInformations"],
      });

      // Toast a success message
      toast.success("Final-Storage Capacity Waste created successfully.", {
        autoClose: 2000,
      });
    },
  });

  return mutation;
}
