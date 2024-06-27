"use client";

import CreateShippingInformations from "../../components/pages/shipping-informations/create-shipping-informations";
import LatestShippingData from "../../components/pages/shipping-informations/latest-shipping-data";
import CreateContainerProfile from "../../components/pages/shipping-informations/create-container-profile";
import useShippingInformationQuery from "./../../requests/request-shipping-information/use-fetch-shipping-informations";

function ShippingInformations() {
  // Fetching LatestShippingData
  const { data, isLoading, error } = useShippingInformationQuery();

  return (
    <div className="container mx-auto flex-col items-center rounded-md border-2 pt-20">
      <CreateShippingInformations />
      <LatestShippingData data={data} isLoading={isLoading} error={error} />
      {!isLoading && data?.shippingData ? <CreateContainerProfile /> : null}
    </div>
  );
}

export default ShippingInformations;
