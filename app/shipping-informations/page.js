"use client";

import { useState, useEffect } from "react";

import LatestShippingData from "../../components/pages/shipping-informations/latest-shipping-data";
import ModalTruckDataForm from "./../../components/pages/shipping-informations/truck-data/modal/modal-truck-data-form";

import useShippingInformationQuery from "./../../requests/request-shipping-information/use-fetch-shipping-informations";

function ShippingInformations() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  // Fetching LatestShippingData only if the form is submitted
  const { data, isLoading, error, status } = useShippingInformationQuery({
    enabled: isFormSubmitted,
  });

  useEffect(() => {
    if (isModalOpen) {
      setIsFormSubmitted(false); // Disable fetching data when modal is open
    }
  }, [isModalOpen]);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onSubmitForm = () => {
    setIsModalOpen(false);
    setIsFormSubmitted(true);
  };

  return (
    <>
      {isModalOpen ? (
        <ModalTruckDataForm
          closeModal={closeModal}
          onSubmitForm={onSubmitForm}
        />
      ) : null}

      {!isModalOpen && isFormSubmitted ? (
        <div className="items-centerpt-20 container mx-auto flex-col">
          <div className="px-20">
            <LatestShippingData
              data={data}
              isLoading={isLoading}
              error={error}
            />
          </div>
        </div>
      ) : null}
    </>
  );
}

export default ShippingInformations;
