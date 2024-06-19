import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

function useCreateContainerProfileMutation() {
  const queryClient = useQueryClient();

  const createContainerProfileMutation = async (formData) => {
    // console.log("comming from useCreateContainerProfileMutation:", formData);

    try {
      const response = await axios.post("/api/container-profile", formData);
      return response.data;
    } catch (error) {
      console.error("Failed to create new Container Profile data", error);
      toast.error(`Error: ${error.response?.data?.message || error.message}`);
      throw error;
    }
  };

  const mutation = useMutation({
    mutationFn: createContainerProfileMutation,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ["containerProfileQueryKey"],
      });
      // Toast a success message
      toast.success("Container Profile data created successfully.", {
        autoClose: 2000,
      });
    },
  });

  return mutation;
}

export default useCreateContainerProfileMutation;
