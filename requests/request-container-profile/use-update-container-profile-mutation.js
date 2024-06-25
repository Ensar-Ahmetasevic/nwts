import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

function useUpdateContainerProfileMutation() {
  const queryClient = useQueryClient();

  const updateContainerProfileMutations = async (id) => {
    try {
      const response = await axios.delete("/api/container-profile", {
        data: { id },
      });
      return response.data;
    } catch (error) {
      console.error("Failed to UPDATE shipping informations: ", error);
      toast.error(`Error: ${error.response.data.message}`);
      throw error; // Throw the error to trigger onError callback
    }
  };

  const mutation = useMutation({
    mutationFn: updateContainerProfileMutations,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ["containerProfileQueryKey"],
        queryKey: ["shippingInformationQueryKey"],
      });
      // Toast a success message
      toast.success("Container Profile data UPDATED successfully.", {
        autoClose: 2000,
      });
    },
  });

  return mutation;
}

export default useUpdateContainerProfileMutation;
