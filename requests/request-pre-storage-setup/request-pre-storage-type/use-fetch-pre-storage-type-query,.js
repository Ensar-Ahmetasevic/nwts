import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const FetchPreStorageTypeData = async () => {
  const response = await axios.get("/api/pre-storage-setup/pre-storage-type");
  const data = response.data.preStorageTypeData;

  return data;
};

const usePreStorageTypeQuery = () => {
  const query = useQuery({
    queryKey: ["preStorageTypeQueryKey"],
    queryFn: FetchPreStorageTypeData,
  });

  return query;
};

export default usePreStorageTypeQuery;
