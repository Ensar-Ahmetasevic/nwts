"use client";

import DetailsShippingData from "../../../components/pages/shipping-informations/details-shipping-data";
import LoadingSpinnerButton from "./../../../components/shared/loading-spiner-button";
import useShippingInformationByIdQuery from "./../../../requests/request-shipping-information/use-fetch-shipping-information-by-id-query";

export default function ShippingDetails({ params }) {
  const shippingID = params.shippingID;

  // Fetching ShippingData
  const { data, isLoading, error } =
    useShippingInformationByIdQuery(shippingID);

  if (!data) {
    return (
      <div className="flex flex-col items-center space-y-4">
        <LoadingSpinnerButton /> Loading data...
      </div>
    );
  }

  if (error) {
    return <div>Error loading data</div>;
  }

  return (
    <>
      <div className="items-centerpt-20 container mx-auto flex-col">
        <div className="px-20">
          <DetailsShippingData
            data={data}
            isLoading={isLoading}
            error={error}
            shippingID={shippingID}
          />
        </div>
      </div>
    </>
  );
}
