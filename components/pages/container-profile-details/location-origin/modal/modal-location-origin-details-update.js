import { useForm } from "react-hook-form";
import { useEffect } from "react";

import useUpdateLocationOriginMutation from "./../../../../../requests/request-container-profile/request-location-origin/use-update-location-origin-mutation";

export default function ModalLocationOriginDetailsUpdate({
  modalContainerTypeData,
  closeModal,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({});

  const updateLocationOriginMutation = useUpdateLocationOriginMutation();

  useEffect(() => {
    document.getElementById("modal_update_location_origin").showModal();
  }, [modalContainerTypeData]);

  const { name, address, origin, id } = modalContainerTypeData;

  const isFormSubmit = async (formData) => {
    try {
      const dataForUpdate = {
        ...formData,
        id,
      };

      await updateLocationOriginMutation.mutateAsync(dataForUpdate);

      closeModal();
    } catch (error) {
      console.error("Error updating Location Origin:", error);
    }
  };

  return (
    <>
      <dialog id="modal_update_location_origin" className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Edit Container Details</h3>

          <div className="modal-action flex flex-col">
            <form
              method="dialog"
              className="flex flex-col items-start space-y-4 pb-4"
              onSubmit={handleSubmit(isFormSubmit)}
            >
              <div className="flex w-64 flex-col space-y-2">
                <div className="flex flex-col space-y-2">
                  <label className="text-left text-sm">Name:</label>
                  <input
                    className="input input-md input-bordered px-2"
                    type="text"
                    placeholder="Type here"
                    defaultValue={name}
                    {...register("name", {
                      required: true,
                    })}
                  />
                </div>
                <div className="flex w-64 flex-col space-y-2">
                  <label className="text-left text-sm">Address:</label>
                  <input
                    className="input input-md input-bordered px-2"
                    type="text"
                    placeholder="Type here"
                    defaultValue={address}
                    {...register("address", {
                      required: true,
                    })}
                  />
                </div>
                <div className="flex w-64 flex-col space-y-2">
                  <label className="text-left text-sm">Origin:</label>
                  <input
                    className="input input-md input-bordered px-2"
                    type="text"
                    placeholder="Type here"
                    defaultValue={origin}
                    {...register("origin", {
                      required: true,
                    })}
                  />
                </div>
              </div>

              <div className="space-x-2">
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
