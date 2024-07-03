"use client";

import { useState } from "react";

import LatestShippingData from "../../components/pages/shipping-informations/latest-shipping-data";
import CreateContainerProfile from "../../components/pages/shipping-informations/create-container-profile";
import ModalTruckDataForm from "./../../components/pages/shipping-informations/truck-data/modal/modal-truck-data-form";

import useShippingInformationQuery from "./../../requests/request-shipping-information/use-fetch-shipping-informations";

function ShippingInformations() {
  const [isModalOpen, setIsModalOpen] = useState(true);

  // Fetching LatestShippingData
  const { data, isLoading, error } = useShippingInformationQuery();

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {isModalOpen ? (
        <ModalTruckDataForm closeModal={closeModal} isModalOpen={isModalOpen} />
      ) : null}

      {!isModalOpen ? (
        <div className="items-centerpt-20 container mx-auto flex-col">
          <div className="px-20">
            <LatestShippingData
              data={data}
              isLoading={isLoading}
              error={error}
            />
            {!isLoading && data?.shippingData ? (
              <CreateContainerProfile />
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}

export default ShippingInformations;
