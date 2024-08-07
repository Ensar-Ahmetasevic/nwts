import { useState } from "react";

import dayjs from "dayjs";

import ContainerDetails from "./show-container-details";
import CreateContainerProfile from "./create-container-profile";

import ModalTruckUpdate from "./truck-data/modal/modal-truck-update";

import { MdDeleteSweep } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

import useDeleteShippingInformationsMutations from "../../../requests/request-shipping-information/use-delete-shipping-informations-mutation";
import useUpdateShippingStatusMutation from "./../../../requests/request-shipping-information/use-update-shipping-status-mutation";
import LoadingSpinnerButton from "./../../shared/loading-spiner-button";

function LatestShippingData({ data, isLoading, error }) {
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  // const [currentStatus, setCurrentStatus] = useState(
  //   data?.shippingData?.status,
  // );

  // Delete data
  const deleteShippingInformationsMutations =
    useDeleteShippingInformationsMutations();

  // Update Shipping Status
  const updateShippingStatusMutation = useUpdateShippingStatusMutation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data</div>;
  }

  if (!data || !data.shippingData) {
    return <div>{data?.message || "No data available"}</div>;
  }

  // Destructure the necessary data
  const {
    id,
    entryDateTime,
    companyName,
    driverName,
    registrationPlates,
    containerProfiles,
    status,
  } = data?.shippingData;

  const updateStatus = (shippingStatus) => {
    const shippingStatusData = { status: shippingStatus, id };

    updateShippingStatusMutation.mutateAsync(shippingStatusData);
  };

  console.log(status);

  return (
    <>
      <ul className="border-2">
        <li>
          <div className="m-2 flex flex-row">
            <div className="w-1/2">
              {/* Truck Data */}
              <div className="flex flex-row items-center justify-between rounded-lg border-2 p-4">
                <div className="space-y-3 text-lg">
                  {/* Company Name */}
                  <div className="flex flex-row">
                    <p>Transport data for:</p>
                    <p className="ml-4 font-bold">{companyName}</p>
                  </div>

                  <div className="flex flex-row space-x-4">
                    {/* Add Containers */}
                    <CreateContainerProfile />

                    {/* Edit Truck Data */}
                    <div className="tooltip" data-tip="Edit">
                      <label
                        htmlFor="update_modal_shipping_data"
                        className="btnUpdate"
                        onClick={() => setOpenModalUpdate(true)}
                      >
                        <CiEdit />
                      </label>
                    </div>

                    {/* Delete Truck Data */}
                    <div className="tooltip" data-tip="Delete">
                      <button
                        className="btnDelete"
                        id="deleteButton"
                        onClick={() =>
                          deleteShippingInformationsMutations.mutateAsync(
                            data.shippingData.id,
                          )
                        }
                      >
                        <MdDeleteSweep />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div className="flex flex-col space-y-3">
                  <div className="flex flex-row space-x-2">
                    <h2>Activ status:</h2>
                    <h2 className="font-bold">{status}</h2>
                  </div>
                  <div className="flex flex-row space-x-4">
                    {/* IN */}
                    <button
                      className={`h-12 w-16 rounded text-center font-bold ${
                        status === "IN"
                          ? "pointer-events-none border-green-700 bg-green-700 text-white underline underline-offset-8 outline outline-offset-4 outline-green-700"
                          : "cursor-pointer border-2 border-slate-700 text-slate-700"
                      }`}
                      onClick={() => updateStatus("IN")}
                      disabled={status === "IN" || isLoading}
                    >
                      {isLoading ? <LoadingSpinnerButton /> : "IN"}
                    </button>

                    {/* OUT */}
                    <button
                      className={`h-12 w-16 rounded  text-center font-bold ${
                        status === "OUT"
                          ? "pointer-events-none bg-red-600 text-white underline underline-offset-8 outline outline-offset-4  outline-red-600"
                          : "cursor-pointer border-2 border-slate-700  text-slate-700"
                      }`}
                      onClick={() => updateStatus("OUT")}
                      disabled={status === "OUT" || isLoading}
                    >
                      {isLoading ? <LoadingSpinnerButton /> : "OUT"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Shipping Details */}
              <div className="ml-20 space-y-2">
                {containerProfiles && containerProfiles.length > 0 ? (
                  containerProfiles
                    .slice()
                    .reverse()
                    .map((profile) => (
                      <ContainerDetails key={profile.id} data={profile} />
                    ))
                ) : (
                  <div className="flex justify-center pt-10">
                    <p>No data available.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </li>
      </ul>

      {openModalUpdate ? (
        <ModalTruckUpdate
          closeModal={() => setOpenModalUpdate(false)}
          modalTruckFormData={data?.shippingData}
        />
      ) : null}
    </>
  );
}

export default LatestShippingData;
