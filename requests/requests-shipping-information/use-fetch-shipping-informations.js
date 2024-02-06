import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const FetchshippingInformationData = async () => {
  const response = await axios.get("/api/shipping-informations");

  const data = response.data;

  return data;
};

const useShippingInformationQuery = () => {
  const query = useQuery({
    queryKey: ["shippingInformationQueryKey"],
    queryFn: FetchshippingInformationData,
  });

  return query;
};

export default useShippingInformationQuery;
