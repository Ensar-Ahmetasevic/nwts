import { useState } from "react";
import dayjs from "dayjs";

import FormContainerProfile from "./forms/form-container-profile";
import ContainerDetails from "./container-details";

import useDeleteShippingInformationsMutations from "../../../requests/request-shipping-information/use-delete-shipping-informations-mutation";
import useShippingInformationQuery from "../../../requests/request-shipping-information/use-fetch-shipping-informations";

function LatestShippingData() {
  const [showContainerProfileForm, setshowContainerProfileForm] =
    useState(false);

  // Fetching data
  const { data, isLoading, error } = useShippingInformationQuery();

  //Delete data
  const deleteShippingInformationsMutations =
    useDeleteShippingInformationsMutations();

  // Toggle
  function toggleContainerProfileFormHandler() {
    setshowContainerProfileForm(!showContainerProfileForm);
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data</div>;
  }

  if (!data || !data.shippingData) {
    return <div>No data available</div>;
  }

  // Destructure the necessary data
  const {
    id,
    createdAt,
    companyName,
    driverName,
    registrationPlates,
    containerProfiles,
  } = data?.shippingData;

  return (
    <ul>
      <li>
        <div className="m-2 flex flex-row p-2">
          <div className=" w-1/2 space-y-2 rounded-md border">
            <h2>Latest Shipping Data:</h2>

            {/* Created At */}
            <div className="flex flex-col">
              <p className="font-bold">Created At:</p>
              <p>{dayjs(createdAt).format("DD/MM/YYYY, HH:mm")}</p>
            </div>
            {/* Company Name */}
            <div className="flex flex-col">
              <p className="font-bold">Company Name:</p>
              <p>{companyName}</p>
            </div>

            {/* Driver Name */}
            <div className="flex flex-col">
              <p className="font-bold">Driver Name:</p>
              <p>{driverName}</p>
            </div>

            {/* Registration Plates */}
            <div className="flex flex-col">
              <p className="font-bold">Registration Plates:</p>
              <p>{registrationPlates}</p>
            </div>

            <button
              className="btnDelete"
              disabled={showContainerProfileForm}
              onClick={() =>
                deleteShippingInformationsMutations.mutateAsync(
                  data.shippingData.id,
                )
              }
            >
              Delete
            </button>

            <div className="flex flex-row space-x-2">
              <p>Creat Container Profile</p>

              <button
                className="btnAdd"
                disabled={showContainerProfileForm}
                onClick={() => toggleContainerProfileFormHandler()}
              >
                Add
              </button>
            </div>

            {/* Container Profile Form */}
            <div>
              {showContainerProfileForm && (
                <FormContainerProfile
                  toggleContainerProfileForm={toggleContainerProfileFormHandler}
                  shippingInformationId={id}
                />
              )}
            </div>
          </div>

          {/* Shipping Details */}

          <div className="w-1/2 space-y-2 rounded-md border">
            <h2>Details:</h2>
            {containerProfiles && containerProfiles.length > 0 ? (
              containerProfiles
                .slice()
                .reverse()
                .map((profile) => (
                  <ContainerDetails key={profile.id} data={profile} />
                ))
            ) : (
              <p>No container profiles available.</p>
            )}
          </div>
        </div>
      </li>
    </ul>
  );
}

export default LatestShippingData;
