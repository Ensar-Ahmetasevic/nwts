import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

export default function useUpdateShippingStatusMutation() {
  const queryClient = useQueryClient();

  const updateShippingStatusMutations = async (shippingStatusData) => {
    try {
      const response = await axios.patch("/api/shipping-informations/pending", {
        shippingStatusData,
      });
      return response.data;
    } catch (error) {
      console.error("Failed to UPDATE Shipping Status: ", error);
      toast.error(`Error: ${error.response.data.message}`);
      throw error; // Throw the error to trigger onError callback
    }
  };

  const mutation = useMutation({
    mutationFn: updateShippingStatusMutations,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ["shippingInformationQueryKey"],
        queryKey: ["shippingInformationIDQueryKey"],
        queryKey: ["statusShippingInformations"],
      });
      // Toast a success message
      toast.success("Shipping Status UPDATED successfully.", {
        autoClose: 2000,
      });
    },
  });

  return mutation;
}
