"use client";

import CreateShippingInformations from "../../components/pages/shipping-informations/create-shipping-informations";
import LatestShippingData from "../../components/pages/shipping-informations/latest-shipping-data";
import CreateContainerProfile from "../../components/pages/shipping-informations/create-container-profile";

function ShippingInformations() {
  return (
    <>
      <div className="container mx-auto flex-col items-center rounded-md border-2 pt-20">
        <CreateShippingInformations />
        <LatestShippingData />
        <CreateContainerProfile />
      </div>
    </>
  );
}

export default ShippingInformations;
