import { useForm } from "react-hook-form";

import useUpdateTruckDataMutation from "./../../../../../requests/request-shipping-information/use-update-truck-data-mutation";

export default function ModalTruckUpdate({ modalTruckFormData, closeModal }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({});

  const updateTruckDataMutation = useUpdateTruckDataMutation();

  const { companyName, driverName, registrationPlates, id } =
    modalTruckFormData;

  const isFormSubmit = async (formData) => {
    try {
      const updatedTruckData = {
        ...formData,
        id,
      };

      await updateTruckDataMutation.mutateAsync(updatedTruckData);

      closeModal();
    } catch (error) {
      console.error("Error updating Truck Data:", error);
    }
  };

  return (
    <>
      <input
        type="checkbox"
        id="modal_truck_data"
        className="modal-toggle"
        checked="true"
        readOnly
      />
      <div className="modal" role="dialog">
        <div className="modal-box w-11/12 max-w-5xl">
          <form
            className="flex flex-col space-y-8 text-center"
            onSubmit={handleSubmit(isFormSubmit)}
          >
            <div>
              <h2>Crate New Shipping Informations</h2>
            </div>

            <div className="flex flex-col items-center justify-center space-y-6 md:flex-row md:space-x-3 md:space-y-0">
              <div className="flex w-64 flex-col space-y-2">
                <label className="text-left text-sm">Company Name:</label>
                <input
                  className="input input-md input-bordered px-2"
                  type="text"
                  placeholder="Type here"
                  defaultValue={companyName}
                  {...register("companyName", {
                    required: true,
                  })}
                />
              </div>

              <div className="flex w-64 flex-col space-y-2">
                <label className="text-left text-sm">Driver Name:</label>
                <input
                  className="input input-md input-bordered px-2"
                  type="text"
                  placeholder="Type here"
                  defaultValue={driverName}
                  {...register("driverName", {
                    required: true,
                  })}
                />
              </div>

              <div className="flex w-64 flex-col space-y-2">
                <label className="text-left text-sm">
                  Registration Plates:
                </label>
                <input
                  className="input input-md input-bordered px-2"
                  type="text"
                  placeholder="Type here"
                  defaultValue={registrationPlates}
                  {...register("registrationPlates", {
                    required: true,
                  })}
                />
              </div>
            </div>
            <div>
              <button className="btnUpdate" type="submit">
                Update
              </button>
            </div>
          </form>
          <div className="modal-action">
            <label
              htmlFor="modal_truck_data"
              className="btn"
              onClick={() => closeModal()}
            >
              Cancel
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
