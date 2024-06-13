import { useState } from "react";
import dayjs from "dayjs";

import FormContainerProfile from "./form-container-profile";
import ContainerProfileById from "./container-profile-by-id ";

import useDeleteShippingInformationsMutations from "./../../../requests/request-shipping-information/use-delete-shipping-informations-mutation";
import useContainerProfileQuery from "./../../../requests/request-container-profile/use-fetch-container-profile";

function AllShippingInformations({
  data: { id, createdAt, companyName, driverName, registrationPlates },
}) {
  const [showContainerProfileForm, setshowContainerProfileForm] =
    useState(false);

  //Fetching data
  const { data: containerProfileData } = useContainerProfileQuery();

  //Delete data
  const deleteShippingInformationsMutations =
    useDeleteShippingInformationsMutations();

  // Toggle
  function toggleContainerProfileFormHandler() {
    setshowContainerProfileForm(!showContainerProfileForm);
  }

  return (
    <li>
      <div className="m-2 flex flex-row p-2">
        <div className=" w-1/2 space-y-2 rounded-md border">
          <h2>Shipping Informations Data:</h2>

          {/* Shipping Id */}
          <div className="flex flex-col">
            <p className="font-bold">Shipping ID:</p>
            <p>{id}</p>
          </div>

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

        <ContainerProfileById data={containerProfileData} />
      </div>
    </li>
  );
}

export default AllShippingInformations;
