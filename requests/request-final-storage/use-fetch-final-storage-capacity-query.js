import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const FetchFinalStorageCapacityData = async () => {
  const response = await axios.get("/api/final-storage-setup");
  const data = response.data.finalStorageOfCapacityData;
  return data;
};

const useFinalStorageCapacityQuery = () => {
  const query = useQuery({
    queryKey: ["finalStorageCapacityQueryKey"],
    queryFn: FetchFinalStorageCapacityData,
  });

  return query;
};

export default useFinalStorageCapacityQuery;
