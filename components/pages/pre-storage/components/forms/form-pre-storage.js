"use client";

import { useForm } from "react-hook-form";

import usePreStorageLocationQuery from "./../../../../../requests/request-pre-storage-setup/request-pre-storage-location/use-fetch-pre-storage-location-query,";
import usePreStorageEmployeeQuery from "../../../../../requests/request-pre-storage-setup/request-pre-storage-employee/use-fetch-pre-storage-employee-query,";
import useCreatePreStorageWasteMutation from "../../../../../requests/request-pre-storage-setup/use-create-pre-storage-waste-mutation";

import LoadingSpinnerButton from "../../../../shared/loading-spiner-button";

export default function FormPreStorage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Create data
  const {
    mutateAsync: createPreStorageWasteMutation,
    isPending,
    isError,
    isSuccess,
  } = useCreatePreStorageWasteMutation();

  // Fetching data

  const { data: preStorageEmployeeData } = usePreStorageEmployeeQuery();
  const { data: preStorageLocationData } = usePreStorageLocationQuery();

  const isFormSubmit = async ({
    quantity,
    preStorageLocation,
    responsibleEmployee,
  }) => {
    // Ensure values are numbers
    const formData = {
      quantity: parseInt(quantity),
      preStorageLocationId: parseInt(preStorageLocation),
      responsibleEmployeePreStorageId: parseInt(responsibleEmployee),
    };

    console.log("formData", formData);

    try {
      await createPreStorageWasteMutation(formData);
      reset();
    } catch (error) {
      console.error("Error creating Pre-Storage Waste:", error);
    }
  };

  return (
    <>
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
              required: true,
              min: {
                value: 1, // Ensure quantity is at least 1
                message: "Quantity must be greater than or equal to 1",
              },
            })}
          />
          {errors.example && (
            <p className="text-sm text-red-500">{errors.quantity.message}</p>
          )}
        </div>

        {/* Pre-Storage Type */}
        <div className="flex w-64 flex-col space-y-2">
          <label className="text-left text-sm" htmlFor="pre-storage-location">
            Please select Pre-Storage Location
          </label>

          <select
            className="select select-bordered select-md px-2"
            id="pre-storage-location"
            {...register("preStorageLocation", { required: true })}
          >
            <option value="">---</option>

            {preStorageLocationData?.map((preStorageLocation) => (
              <option key={preStorageLocation.id} value={preStorageLocation.id}>
                {preStorageLocation.name}
              </option>
            ))}
          </select>
        </div>

        {/*Responsible employee */}
        <div className="flex w-64 flex-col space-y-2">
          <label className="text-left text-sm" htmlFor="responsible-employee">
            Please select Responsible employee
          </label>

          <select
            className="select select-bordered select-md px-2"
            id="responsible-employee"
            {...register("responsibleEmployee", { required: true })}
          >
            <option value="">---</option>

            {preStorageEmployeeData?.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.name} {employee.surname}
              </option>
            ))}
          </select>
        </div>

        <div className=" space-x-2">
          <button className="btnSave" type="submit" disabled={isPending}>
            {isPending ? <LoadingSpinnerButton /> : "Save"}
          </button>
        </div>
      </form>
    </>
  );
}
