import { useForm } from "react-hook-form";
import { useEffect } from "react";

import useUpdateWasteProfileMutation from "./../../../../../requests/request-container-profile/request-waste-profile/use-update-waste-profile-mutation";

export default function ModalWasteProfileDetailsUpdate({
  modalContainerTypeData,
  closeModal,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({});

  const updateWasteProfileMutation = useUpdateWasteProfileMutation();

  useEffect(() => {
    document.getElementById("modal_update_waste_profile").showModal();
  }, [modalContainerTypeData]);

  const {
    name,
    typeOfWaste,
    wasteDescription,
    risksAndHazards,
    processingMethods,
    physicalProperties,
    chemicalProperties,
    biologicalProperties,
    collectionProcedures,
    recommendationsForTransport,
    id,
  } = modalContainerTypeData;

  const isFormSubmit = async (formData) => {
    try {
      const dataForUpdate = {
        ...formData,
        id,
      };

      await updateWasteProfileMutation.mutateAsync(dataForUpdate);

      closeModal();
    } catch (error) {
      console.error("Error updating Waste Profile:", error);
    }
  };

  return (
    <>
      <dialog id="modal_update_waste_profile" className="modal">
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
                    placeholder="Type here"
                    defaultValue={name}
                    {...register("name", {
                      required: true,
                    })}
                  />
                </div>

                <div className="flex w-64 flex-col space-y-2">
                  <label className="text-left text-sm">Type Of Waste:</label>
                  <input
                    className="input input-md input-bordered px-2"
                    type="text"
                    placeholder="Type here"
                    defaultValue={typeOfWaste}
                    {...register("typeOfWaste", {
                      required: true,
                    })}
                  />
                </div>

                <div className="flex w-64 flex-col space-y-2">
                  <label className="text-left text-sm">
                    Waste Description:
                  </label>
                  <input
                    className="input input-md input-bordered px-2"
                    type="text"
                    placeholder="Type here"
                    defaultValue={wasteDescription}
                    {...register("wasteDescription", {
                      required: true,
                    })}
                  />
                </div>

                <div className="flex w-64 flex-col space-y-2">
                  <label className="text-left text-sm">
                    Risks And Hazards:
                  </label>
                  <input
                    className="input input-md input-bordered px-2"
                    type="text"
                    placeholder="Type here"
                    defaultValue={risksAndHazards}
                    {...register("risksAndHazards", {
                      required: true,
                    })}
                  />
                </div>

                <div className="flex w-64 flex-col space-y-2">
                  <label className="text-left text-sm">
                    Processing Methods:
                  </label>
                  <input
                    className="input input-md input-bordered px-2"
                    type="text"
                    placeholder="Type here"
                    defaultValue={processingMethods}
                    {...register("processingMethods", {
                      required: true,
                    })}
                  />
                </div>

                <div className="flex w-64 flex-col space-y-2">
                  <label className="text-left text-sm">
                    Physical Properties:
                  </label>
                  <input
                    className="input input-md input-bordered px-2"
                    type="text"
                    placeholder="Type here"
                    defaultValue={physicalProperties}
                    {...register("physicalProperties", {
                      required: true,
                    })}
                  />
                </div>

                <div className="flex w-64 flex-col space-y-2">
                  <label className="text-left text-sm">
                    Chemical Properties:
                  </label>
                  <input
                    className="input input-md input-bordered px-2"
                    type="text"
                    placeholder="Type here"
                    defaultValue={chemicalProperties}
                    {...register("chemicalProperties", {
                      required: true,
                    })}
                  />
                </div>

                <div className="flex w-64 flex-col space-y-2">
                  <label className="text-left text-sm">
                    Biological Properties:
                  </label>
                  <input
                    className="input input-md input-bordered px-2"
                    type="text"
                    placeholder="Type here"
                    defaultValue={biologicalProperties}
                    {...register("biologicalProperties", {
                      required: true,
                    })}
                  />
                </div>

                <div className="flex w-64 flex-col space-y-2">
                  <label className="text-left text-sm">
                    Collection Procedures:
                  </label>
                  <input
                    className="input input-md input-bordered px-2"
                    type="text"
                    placeholder="Type here"
                    defaultValue={collectionProcedures}
                    {...register("collectionProcedures", {
                      required: true,
                    })}
                  />
                </div>

                <div className="flex w-64 flex-col space-y-2">
                  <label className="text-left text-sm">
                    Recommendations For Transport:
                  </label>
                  <input
                    className="input input-md input-bordered px-2"
                    type="text"
                    placeholder="Type here"
                    defaultValue={recommendationsForTransport}
                    {...register("recommendationsForTransport", {
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
