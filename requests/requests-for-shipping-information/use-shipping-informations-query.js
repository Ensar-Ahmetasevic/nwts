import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const FetchshippingInformationData = async () => {
  const response = await axios.get("/api/submit");

  console.log("i am comming from query", response.data);

  return response.data;
};

const useShippingInformationQuery = () => {
  const query = useQuery({
    queryKey: ["shippingInformationQueryKey"],
    queryFn: FetchshippingInformationData,
  });

  return query;
};

export default useShippingInformationQuery;
