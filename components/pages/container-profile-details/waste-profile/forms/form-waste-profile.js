import { useForm } from "react-hook-form";
import useCreateWasteProfileMutation from "../../../../../requests/request-container-profile/request-waste-profile/use-create-waste-profile-mutation";

function FormWasteProfile({ OnCancel }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const createWasteProfileMutation = useCreateWasteProfileMutation();

  function isFormSubmit({
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
  }) {
    // Trim the values before sending them
    const trimmedName = name.trim();
    const trimmedTypeOfWaste = typeOfWaste.trim();
    const trimmedWasteDescription = wasteDescription.trim();
    const trimmedRisksAndHazards = risksAndHazards.trim();
    const trimmedProcessingMethods = processingMethods.trim();
    const trimmedPhysicalProperties = physicalProperties.trim();
    const trimmedChemicalProperties = chemicalProperties.trim();
    const trimmedBiologicalProperties = biologicalProperties.trim();
    const trimmedCollectionProcedures = collectionProcedures.trim();
    const trimmedRecommendationsForTransport =
      recommendationsForTransport.trim();

    // Create the formData object with trimmed values
    const formData = {
      name: trimmedName,
      typeOfWaste: trimmedTypeOfWaste,
      wasteDescription: trimmedWasteDescription,
      risksAndHazards: trimmedRisksAndHazards,
      processingMethods: trimmedProcessingMethods,
      physicalProperties: trimmedPhysicalProperties,
      chemicalProperties: trimmedChemicalProperties,
      biologicalProperties: trimmedBiologicalProperties,
      collectionProcedures: trimmedCollectionProcedures,
      recommendationsForTransport: trimmedRecommendationsForTransport,
    };

    createWasteProfileMutation.mutateAsync({ formData });

    OnCancel(null);
    reset();
  }

  return (
    <>
      <div className="mt-10 flex flex-col items-center space-y-12 rounded-md border-2 border-red-500 bg-gray-900 p-5">
        <h1 className="text-xl font-bold">Add new "Waste profile"</h1>
        <form
          className="flex flex-col items-end space-y-8 px-12 pb-4"
          onSubmit={handleSubmit(isFormSubmit)}
        >
          <div className="flex flex-row space-x-20">
            {/* First 5 */}
            <div className="flex flex-col space-y-6">
              <div className="flex w-64 flex-col space-y-2">
                <label className="text-left text-sm">Name:</label>
                <input
                  className="input input-md input-bordered px-2"
                  type="text"
                  placeholder="Type here"
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
                  {...register("typeOfWaste", {
                    required: true,
                  })}
                />
              </div>

              <div className="flex w-64 flex-col space-y-2">
                <label className="text-left text-sm">Waste Description:</label>
                <input
                  className="input input-md input-bordered px-2"
                  type="text"
                  placeholder="Type here"
                  {...register("wasteDescription", {
                    required: true,
                  })}
                />
              </div>

              <div className="flex w-64 flex-col space-y-2">
                <label className="text-left text-sm">Risks And Hazards:</label>
                <input
                  className="input input-md input-bordered px-2"
                  type="text"
                  placeholder="Type here"
                  {...register("risksAndHazards", {
                    required: true,
                  })}
                />
              </div>

              <div className="flex w-64 flex-col space-y-2">
                <label className="text-left text-sm">Processing Methods:</label>
                <input
                  className="input input-md input-bordered px-2"
                  type="text"
                  placeholder="Type here"
                  {...register("processingMethods", {
                    required: true,
                  })}
                />
              </div>
            </div>

            {/* Second 5 */}

            <div className="flex flex-col space-y-6">
              <div className="flex w-64 flex-col space-y-2">
                <label className="text-left text-sm">
                  Physical Properties:
                </label>
                <input
                  className="input input-md input-bordered px-2"
                  type="text"
                  placeholder="Type here"
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
                  {...register("recommendationsForTransport", {
                    required: true,
                  })}
                />
              </div>
            </div>
          </div>

          <div className=" space-x-2">
            <button className="btnSave" type="submit">
              Save
            </button>
            <button
              className="btnCancel"
              onClick={() => {
                OnCancel(null);
                reset();
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default FormWasteProfile;
