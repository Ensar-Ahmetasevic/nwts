import { useForm } from "react-hook-form";
import { useEffect } from "react";

import useUpdatePreStorageTypeMutation from "./../../../../../requests/request-pre-storage-setup/request-pre-storage-type/use-update-pre-storage-type-mutation";

export default function ModalUpdatePreStorageType({
  modalDataPreStorageType,
  closeModal,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({});

  const updatePreStorageTypeMutation = useUpdatePreStorageTypeMutation();

  useEffect(() => {
    document.getElementById("modal_update_pre_storage_type").showModal();
  }, [modalDataPreStorageType]);

  const { name, surfaceArea, preStorageFor, id } = modalDataPreStorageType;

  const isFormSubmit = async (formData) => {
    try {
      const dataForUpdate = {
        ...formData,
        id,
      };

      await updatePreStorageTypeMutation.mutateAsync(dataForUpdate);

      closeModal();
    } catch (error) {
      console.error("Error updating Pre-Storage Type:", error);
    }
  };

  return (
    <>
      <dialog id="modal_update_pre_storage_type" className="modal">
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
                      required: true,
                    })}
                  />
                </div>

                {/* Surface Area  */}
                <div className="flex w-64 flex-col space-y-2">
                  <label className="text-left text-sm">
                    {"Surface Area (m²)"}:
                  </label>
                  <input
                    className="input input-md input-bordered px-2"
                    type="number"
                    step="0.01" // Allows numbers with up to two decimal places
                    placeholder="Type here ..."
                    defaultValue={surfaceArea}
                    {...register("surfaceArea", {
                      required: true,
                    })}
                  />
                </div>

                <div className="flex w-64 flex-col space-y-2">
                  <label className="text-left text-sm">Pre-Storage For:</label>
                  <textarea
                    className="textarea textarea-bordered"
                    rows={4}
                    cols={50}
                    type="text"
                    placeholder="Radioactive waste from nuclear facilities ..."
                    defaultValue={preStorageFor}
                    {...register("preStorageFor", {
                      required: true,
                    })}
                  />
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
