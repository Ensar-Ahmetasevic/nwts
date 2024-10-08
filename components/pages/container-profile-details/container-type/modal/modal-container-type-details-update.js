import { useForm } from "react-hook-form";
import { useEffect } from "react";

import useUpdateContainerTypeMutation from "./../../../../../requests/request-container-profile/request-container-type/use-update-container-type-mutation";

export default function ModalContainerTypeDetailsUpdate({
  modalContainerTypeData,
  closeModal,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({});

  const updateContainerTypeMutation = useUpdateContainerTypeMutation();

  useEffect(() => {
    document.getElementById("modal_update_container_type").showModal();
  }, [modalContainerTypeData]);

  const {
    name,
    material,
    volume,
    carryingCapacity,
    radioactivityLevel,
    physicalProperties,
    footprint,
    description,
    id,
  } = modalContainerTypeData;

  const isFormSubmit = async (formData) => {
    try {
      const preparedData = {
        ...formData,
        id,
      };

      await updateContainerTypeMutation.mutateAsync(preparedData);

      closeModal();
    } catch (error) {
      console.error("Error updating Container Profile:", error);
    }
  };

  return (
    <>
      <dialog id="modal_update_container_type" className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Edit Container Details</h3>

          <div className="modal-action flex flex-col">
            <form
              method="dialog"
              className="flex flex-col items-start space-y-4 pb-4"
              onSubmit={handleSubmit(isFormSubmit)}
            >
              <div className="flex w-64 flex-col space-y-2">
                <div className="flex w-64 flex-col space-y-2">
                  <label className="text-left text-sm">Name:</label>
                  <input
                    className="input input-md input-bordered px-2"
                    type="text"
                    defaultValue={name}
                    placeholder="Type here"
                    {...register("name", {
                      required: true,
                    })}
                  />
                </div>
                <div className="flex w-64 flex-col space-y-2">
                  <label className="text-left text-sm">Material:</label>
                  <input
                    className="input input-md input-bordered px-2"
                    type="text"
                    defaultValue={material}
                    placeholder="Type here"
                    {...register("material", {
                      required: true,
                    })}
                  />
                </div>
                <div className="flex w-64 flex-col space-y-2">
                  <label className="text-left text-sm">{"Volume (m³) :"}</label>
                  <input
                    className="input input-md input-bordered px-2"
                    type="number"
                    step=".01"
                    defaultValue={volume}
                    placeholder="Type here"
                    {...register("volume", {
                      required: true,
                      min: 1,
                    })}
                  />
                </div>

                <div className="flex w-64 flex-col space-y-2">
                  <label className="text-left text-sm">
                    {"Carrying capacity (tons) :"}
                  </label>
                  <input
                    className="input input-md input-bordered px-2"
                    type="number"
                    step=".01"
                    defaultValue={carryingCapacity}
                    placeholder="Type here"
                    {...register("carryingCapacity", {
                      required: true,
                      min: 1,
                    })}
                  />
                </div>

                <div className="flex w-64 flex-col space-y-2">
                  <label className="text-left text-sm">
                    Radioactivity Level:
                  </label>
                  <input
                    className="input input-md input-bordered px-2"
                    type="text"
                    defaultValue={radioactivityLevel}
                    placeholder="Type here"
                    {...register("radioactivityLevel", {
                      required: true,
                    })}
                  />
                </div>

                <div className="flex w-64 flex-col space-y-2">
                  <label className="text-left text-sm">
                    Physical properties:
                  </label>
                  <input
                    className="input input-md input-bordered px-2"
                    type="text"
                    defaultValue={physicalProperties}
                    placeholder="Type here"
                    {...register("physicalProperties", {
                      required: true,
                    })}
                  />
                </div>

                <div className="flex w-64 flex-col space-y-2">
                  <label className="text-left text-sm">
                    {"Footprint (m²) :"}
                  </label>
                  <input
                    className="input input-md input-bordered px-2"
                    type="number"
                    step=".01"
                    defaultValue={footprint}
                    placeholder="Type here"
                    {...register("footprint", {
                      required: true,
                      min: 1,
                    })}
                  />
                </div>
              </div>

              <div className="flex w-full flex-col space-y-2">
                <label className="text-left text-sm">Description:</label>
                <textarea
                  className="textarea textarea-bordered"
                  rows={8}
                  cols={50}
                  type="text"
                  defaultValue={description}
                  placeholder="Type here"
                  {...register("description", {
                    required: true,
                  })}
                />
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
