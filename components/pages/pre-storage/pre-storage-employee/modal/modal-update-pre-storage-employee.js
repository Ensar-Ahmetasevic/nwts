import { useForm } from "react-hook-form";
import { useEffect } from "react";

import useUpdatePreStorageEmployeeMutation from "../../../../../requests/request-pre-storage/request-pre-storage-employee/use-update-pre-storage-employee-mutation";

import dayjs from "dayjs";

export default function ModalUpdatePreStorageEmployee({
  modalDataPreStorageEmployee,
  closeModal,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({});

  const updatePreStorageEmployeeMutation =
    useUpdatePreStorageEmployeeMutation();

  useEffect(() => {
    document.getElementById("modal_update_pre_storage_employee").showModal();
  }, [modalDataPreStorageEmployee]);

  const {
    name,
    surname,
    dateOfBirth,
    address,
    qualifications,
    safetyTraining,
    id,
  } = modalDataPreStorageEmployee;

  const isFormSubmit = async (formData) => {
    const formattedSafetyTraining =
      formData.safetyTraining === "true" ? true : false;

    const formattedDateOfBirth = dayjs(formData.dateOfBirth).toDate();

    try {
      const dataForUpdate = {
        ...formData,
        safetyTraining: formattedSafetyTraining, // Ensure safetyTraining is a boolean
        dateOfBirth: formattedDateOfBirth,
        id,
      };

      await updatePreStorageEmployeeMutation.mutateAsync(dataForUpdate);

      closeModal();
    } catch (error) {
      console.error("Error updating Pre-Storage Employee:", error);
    }
  };

  return (
    <>
      <dialog id="modal_update_pre_storage_employee" className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Edit Container Details</h3>

          <div className="modal-action flex flex-col">
            <form
              className="flex flex-col items-end space-y-8 pb-4"
              onSubmit={handleSubmit(isFormSubmit)}
            >
              <div className="flex flex-col space-y-6">
                {/* Name */}
                <div className="flex flex-col space-y-2">
                  <label className="text-left text-sm">Name:</label>
                  <input
                    className="input input-md input-bordered px-2"
                    type="text"
                    placeholder="Type here ..."
                    defaultValue={name}
                    {...register("name", {
                      required: "Pre storage employee name is required",
                    })}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Surname  */}
                <div className="flex w-64 flex-col space-y-2">
                  <label className="text-left text-sm">Surname:</label>
                  <input
                    className="input input-md input-bordered px-2"
                    type="text"
                    placeholder="Type here ..."
                    defaultValue={surname}
                    {...register("surname", {
                      required: "Pre storage employee surname is required",
                    })}
                  />
                  {errors.surname && (
                    <p className="text-sm text-red-500">
                      {errors.surname.message}
                    </p>
                  )}
                </div>

                {/* Adress */}
                <div className="flex w-64 flex-col space-y-2">
                  <label className="text-left text-sm">Address:</label>
                  <input
                    className="input input-md input-bordered px-2"
                    type="text"
                    placeholder="Type here ..."
                    defaultValue={address}
                    {...register("address", {
                      required: "Address is required",
                    })}
                  />
                  {errors.address && (
                    <p className="text-sm text-red-500">
                      {errors.address.message}
                    </p>
                  )}
                </div>

                {/* Qualifications */}
                <div className="flex w-64 flex-col space-y-2">
                  <label className="text-left text-sm">Qualifications:</label>
                  <input
                    className="input input-md input-bordered px-2"
                    type="text"
                    placeholder="Type here ..."
                    defaultValue={qualifications}
                    {...register("qualifications", {
                      required: "Qualifications is required",
                    })}
                  />
                  {errors.qualifications && (
                    <p className="text-sm text-red-500">
                      {errors.qualifications.message}
                    </p>
                  )}
                </div>

                {/* Date Of Birth */}
                <div className="flex flex-col space-y-2">
                  <label className="text-left text-sm">Date Of Birth:</label>
                  <input
                    className="input input-md input-bordered px-2"
                    type="date"
                    placeholder="Select date"
                    defaultValue={dayjs(dateOfBirth).format("YYYY-MM-DD")}
                    {...register("dateOfBirth", {
                      required: "Date of birth is required",
                    })}
                  />
                  {errors.dateOfBirth && (
                    <p className="text-sm text-red-500">
                      {errors.dateOfBirth.message}
                    </p>
                  )}
                </div>

                {/* Safety Training */}
                <div className="flex w-64 flex-col space-y-2">
                  <label className="text-left text-sm">Safety Training:</label>

                  <div className="form-control items-start">
                    <label className="label cursor-pointer space-x-6">
                      <span className="label-text">Yes</span>
                      <input
                        type="radio"
                        className="radio checked:bg-blue-500"
                        value={true}
                        defaultChecked={safetyTraining === true}
                        {...register("safetyTraining", {
                          required: "Safety training selection is required",
                        })}
                      />
                    </label>
                  </div>
                  <div className="form-control items-start">
                    <label className="label cursor-pointer space-x-6">
                      <span className="label-text">No</span>
                      <input
                        type="radio"
                        className="radio checked:bg-red-500"
                        value={false}
                        defaultChecked={safetyTraining === false}
                        {...register("safetyTraining", {
                          required: "Safety training selection is required",
                        })}
                      />
                    </label>
                  </div>
                  {errors.safetyTraining && (
                    <p className="text-sm text-red-500">
                      {errors.safetyTraining.message}
                    </p>
                  )}
                </div>
              </div>

              <div className=" space-x-2">
                <button className="btnSave" type="submit">
                  Save
                </button>
              </div>
            </form>

            <div className="modal-action">
              <form method="dialog">
                <button className="btn" onClick={closeModal}>
                  Close
                </button>
              </form>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
