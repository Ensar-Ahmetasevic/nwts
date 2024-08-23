import { useState } from "react";
import { useRouter } from "next/navigation";

import CreateContainerProfile from "./../container-data/create-container-profile";

import ModalTruckUpdate from "./../components/modals/modal-truck-update";

import { MdDeleteSweep } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

import useDeleteShippingInformationsMutations from "./../../../../requests/request-shipping-information/use-delete-shipping-informations-mutation";
import useUpdateShippingStatusMutation from "./../../../../requests/request-shipping-information/use-update-shipping-status-mutation";

import LoadingSpinnerButton from "./../../../shared/loading-spiner-button";

export default function TruckData({ data, isLoading, error, shippingID }) {
  const [openModalUpdate, setOpenModalUpdate] = useState(false);

  const router = useRouter();
  // Delete data
  const {
    mutateAsync: deleteMutateAsync,
    isSuccess: successfullyDeleted,
    isPending: deleteLoading,
    isError: deleteError,
  } = useDeleteShippingInformationsMutations();

  // Update Shipping Status
  const {
    mutateAsync: updateMutateAsync,
    isSuccess: successfullyUpdated,
    isPending: updateLoading,
    isError: updateError,
  } = useUpdateShippingStatusMutation();

  if (isLoading) {
    return (
      <div>
        <LoadingSpinnerButton /> Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <LoadingSpinnerButton /> Error loading data
      </div>
    );
  }

  if (!data || !data.shippingData) {
    return <div>{data?.message || "No data available"}</div>;
  }

  // Destructure the necessary data
  const { id, companyName, status } = data?.shippingData;

  // Updating Truck Status
  const updateStatus = (shippingStatus) => {
    const shippingStatusData = {
      status: shippingStatus,
      id,
      exitDateTime: new Date().toISOString(),
    };

    updateMutateAsync(shippingStatusData);
  };

  // Delete Truck Data
  const handleDelete = async () => {
    await deleteMutateAsync(data.shippingData.id);

    if (!successfullyDeleted) {
      router.push("/shipping-informations"); // Redirect after successfully deleting
    }
  };

  return (
    <>
      {/* Truck Data */}
      <div
        className={`flex flex-row items-center justify-between rounded-lg ${status === "IN" ? "border-green-600" : "border-red-600"} border-2 p-4`}
      >
        <div className="space-y-3 text-lg">
          {/* Company Name */}
          <div className="flex flex-row">
            <p>Transport data for:</p>
            <p className="ml-4 font-bold">{companyName}</p>
          </div>

          <div className="flex flex-row space-x-4">
            {/* Add Containers */}
            <CreateContainerProfile
              shippingID={shippingID}
             
            />

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
                disabled={deleteLoading || successfullyDeleted}
                onClick={() => handleDelete()}
              >
                {deleteLoading ? <LoadingSpinnerButton /> : <MdDeleteSweep />}
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
              className={`pointer-events-none h-12 w-16 rounded text-center font-bold ${
                status === "IN"
                  ? " border-green-700 bg-green-700 text-white underline underline-offset-8 outline outline-offset-4 outline-green-700"
                  : "border-2 border-slate-700 text-slate-700"
              }`}
              disabled={status === "IN" || isLoading}
            >
              {updateLoading ? <LoadingSpinnerButton /> : "IN"}
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
              {updateLoading ? <LoadingSpinnerButton /> : "OUT"}
            </button>
          </div>
        </div>
      </div>

      {openModalUpdate ? (
        <ModalTruckUpdate
          closeModal={() => setOpenModalUpdate(false)}
          modalTruckFormData={data?.shippingData}
        />
      ) : null}
    </>
  );
}
