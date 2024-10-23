"use client";

import { useForm } from "react-hook-form";

import useCreatePreStorageCapacityMutation from "./../../../../../../requests/request-pre-storage/use-create-pre-storage-capacity-mutation";

import usePreStorageEmployeeQuery from "../../../../../../requests/request-pre-storage/request-pre-storage-employee/use-fetch-pre-storage-employee-query,";

import LoadingSpinnerButton from "../../../../../shared/loading-spiner-button";
import LoadingSpinnerPage from "../../../../../shared/loading-spiner-page";
import AlertWarning from "../../../../../shared/alert-warning";
import useUpdateShippingStatusMutation from "../../../../../../requests/request-shipping-information/use-update-shipping-status-mutation";

export default function ModalPreStorageCapacityForm({
  isOpen,
  closeModal,
  hallData,
  entryData,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { quantity: entryData.totalQuantity } });

  // Update Entry staus
  const {
    mutateAsync: updateShippingStatusMutations,
    isPending: UpdateShippingStatusPending,
    isSuccess: UpdateShippingStatusSuccess,
  } = useUpdateShippingStatusMutation();

  // Create data
  const {
    mutateAsync: createPreStorageCapacityMutation,
    isPending: PreStorageCapacityPending,
    isSuccess: PreStorageCapacitySuccess,
  } = useCreatePreStorageCapacityMutation();

  // Fetching Pre Storage Employee data
  const {
    data: preStorageEmployeeData,
    isLoading,
    isError,
  } = usePreStorageEmployeeQuery();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinnerPage />
      </div>
    );
  }

  if (isError || !preStorageEmployeeData) {
    return (
      <div className="flex h-screen items-center justify-center">
        <AlertWarning text={"Error loading Pre Storage Employee request"} />
      </div>
    );
  }

  const isFormSubmit = async ({ quantity, responsibleEmployee }) => {
    // Ensure values are numbers
    const formData = {
      quantity: parseInt(quantity),
      preStorageLocationId: parseInt(hallData.id),
      responsiblePreStorageEmployeeId: parseInt(responsibleEmployee),
    };

    try {
      // Step 1: Create the PreStorage capacity entry
      await createPreStorageCapacityMutation(formData);

      // Step 2: Update the Shipping Information status after successful capacity creation
      await updateShippingStatusMutations({
        status: "accepted",
        id: entryData.id,
      });

      // Step 3: Reset the form and close modal
      reset();
      closeModal();
    } catch (error) {
      console.error("Error handling the form submission:", error);
    }
  };

  return (
    <>
      {isOpen ? (
        <div className="modal modal-open">
          <div className="modal-box">
            {/* Form */}
            <form
              className="flex flex-col items-start space-y-4"
              onSubmit={handleSubmit(isFormSubmit)}
            >
              <div className="flex flex-col space-y-2">
                {/* Quantity */}
                <label className="text-left text-sm">Quantity:</label>
                <input
                  className="input input-md input-bordered px-2"
                  type="number"
                  step="1" // Restrict to whole numbers
                  min="1" // Prevent 0 or negative values
                  placeholder="Type here ..."
                  {...register("quantity", {
                    required: "Quantity must be greater than or equal to 1",
                  })}
                />
                {errors.example && (
                  <p className="text-sm text-red-500">
                    {errors.quantity.message}
                  </p>
                )}
              </div>

              {/*Responsible employee */}
              <div className="flex w-64 flex-col space-y-2">
                <label
                  className="text-left text-sm"
                  htmlFor="responsible-employee"
                >
                  Please select Responsible employee
                </label>

                <select
                  className="select select-bordered select-md px-2"
                  id="responsible-employee"
                  {...register("responsibleEmployee", {
                    required: "Please select Responsible employee",
                  })}
                >
                  <option value="">---</option>

                  {preStorageEmployeeData.map((employee) => (
                    <option key={employee.id} value={employee.id}>
                      {employee.name} {employee.surname}
                    </option>
                  ))}
                </select>
              </div>
              <div className=" space-x-2">
                <button
                  className="btnSave"
                  type="submit"
                  disabled={UpdateShippingStatusPending}
                >
                  {UpdateShippingStatusPending ? (
                    <LoadingSpinnerButton />
                  ) : (
                    "Save"
                  )}
                </button>
              </div>
            </form>

            <div className="modal-action">
              <button
                className="btn"
                onClick={() => {
                  closeModal(), reset();
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
