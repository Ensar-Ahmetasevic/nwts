import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const FetchPreStorageWasteData = async () => {
  const response = await axios.get("/api/pre-storage-setup");
  const data = response.data.preStorageOfWasteData;
  return data;
};

const usePreStorageWasteQuery = () => {
  const query = useQuery({
    queryKey: ["preStorageWasteQueryKey"],
    queryFn: FetchPreStorageWasteData,
  });

  return query;
};

export default usePreStorageWasteQuery;
