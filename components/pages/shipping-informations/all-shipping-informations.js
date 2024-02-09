import { useState } from "react";
import dayjs from "dayjs";

import FormContainerProfile from "./form-container-profile";
import useDeleteShippingInformationsMutations from "./../../../requests/request-shipping-information/use-delete-shipping-informations-mutation";

function AllShippingInformations({ data }) {
  const [showContainerProfileForm, setshowContainerProfileForm] =
    useState(false);

  const deleteShippingInformationsMutations =
    useDeleteShippingInformationsMutations();

  // Toggle
  function toggleContainerProfileFormHandler() {
    setshowContainerProfileForm(!showContainerProfileForm);
  }
  return (
    <li>
      <div className="m-2 flex flex-row  p-2">
        <div className=" w-1/2 space-y-2 rounded-md border">
          <h2>Shipping Informations Data:</h2>
          <p>ID: {data.id}</p>
          <p>Created At: {dayjs(data.createdAt).format("DD/MM/YYYY")}</p>
          <button
            className="btnDelete"
            disabled={showContainerProfileForm}
            onClick={() =>
              deleteShippingInformationsMutations.mutateAsync(data.id)
            }
          >
            Delete Shipping Information
          </button>

          <div className=" flex flex-col space-y-2 ">
            <p>Creat Container Profile</p>
            <div className="space-x-2">
              <button
                className="btnAdd"
                disabled={showContainerProfileForm}
                onClick={() => toggleContainerProfileFormHandler()}
              >
                Add Container Profile
              </button>
            </div>
          </div>

          {/* Container Profile Form */}
          <div>
            {showContainerProfileForm && (
              <FormContainerProfile
                toggleContainerProfileForm={toggleContainerProfileFormHandler}
              />
            )}
          </div>
        </div>
        <div className="w-1/2 space-y-2 rounded-md border p-2">
          <h2>Container Profile Data:</h2>
          <ul>
            <li>Container Profile: ID 00202</li>
            <li>Quantity: 15</li>
            <li>Location origin: Zwischenlager Brokdorf</li>
            <li>Waste profile: M001</li>
            <li>Container type: Strengthened steel</li>
          </ul>
        </div>
      </div>
    </li>
  );
}

export default AllShippingInformations;
