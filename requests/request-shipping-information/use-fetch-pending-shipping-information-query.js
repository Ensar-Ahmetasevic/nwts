import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchPendingShippingInformations = async () => {
  const response = await axios.get(`/api/shipping-informations/pending`);
  return response.data.pendingShippingInformations;
};

const usePendingShippingInformationsQuery = (options = {}) => {
  const query = useQuery({
    queryKey: ["pendingShippingInformations"],
    queryFn: () => fetchPendingShippingInformations(),

    ...options,
  });

  return query;
};

export default usePendingShippingInformationsQuery;
