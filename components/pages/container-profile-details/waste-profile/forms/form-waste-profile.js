import { useForm } from "react-hook-form";
import useCreateWasteProfileMutation from "../../../../../requests/request-container-profile/request-waste-profile/use-create-waste-profile-mutation";
import LoadingSpinnerPage from "./../../../../shared/loading-spiner-page";
import useContainerTypeQuery from "../../../../../requests/request-container-profile/request-container-type/use-fetch-container-type-query";
import AlertWarning from "./../../../../shared/alert-warning";

function FormWasteProfile({ OnCancel }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const createWasteProfileMutation = useCreateWasteProfileMutation();

  const {
    data: containerTypeData,
    isLoading: isContainerTypeLoading,
    isError: isContainerTypeError,
  } = useContainerTypeQuery();

  if (isContainerTypeLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinnerPage />
      </div>
    );
  }

  if (!containerTypeData || isContainerTypeError) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <AlertWarning text={"Error loading data"} />
      </div>
    );
  }

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
    const numberRecommendationsForTransport = parseInt(
      recommendationsForTransport,
    );

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
      recommendationsForTransport: numberRecommendationsForTransport,
    };

    console.log("formData", formData);

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
            {/* Name  */}
            <div className="flex flex-col space-y-6">
              <div className="flex w-64 flex-col space-y-2">
                <label className="text-left text-sm">Name:</label>
                <input
                  className="input input-md input-bordered px-2"
                  type="text"
                  placeholder="Type here ..."
                  {...register("name", {
                    required: true,
                  })}
                />
              </div>

              {/* waste type  */}

              <div className="flex w-64 flex-col space-y-2">
                <label className="text-left text-sm">Type Of Waste:</label>
                <input
                  className="input input-md input-bordered px-2"
                  type="text"
                  placeholder="Type here ..."
                  {...register("typeOfWaste", {
                    required: true,
                  })}
                />
              </div>

              {/* waste description */}

              <div className="flex w-64 flex-col space-y-2">
                <label className="text-left text-sm">Waste Description:</label>
                <input
                  className="input input-md input-bordered px-2"
                  type="text"
                  placeholder="Type here ..."
                  {...register("wasteDescription", {
                    required: true,
                  })}
                />
              </div>

              {/* Risks and hazards*/}

              <div className="flex w-64 flex-col space-y-2">
                <label className="text-left text-sm">Risks And Hazards:</label>
                <input
                  className="input input-md input-bordered px-2"
                  type="text"
                  placeholder="Type here ..."
                  {...register("risksAndHazards", {
                    required: true,
                  })}
                />
              </div>

              {/* Processing methods */}

              <div className="flex w-64 flex-col space-y-2">
                <label className="text-left text-sm">Processing Methods:</label>
                <input
                  className="input input-md input-bordered px-2"
                  type="text"
                  placeholder="Type here ..."
                  {...register("processingMethods", {
                    required: true,
                  })}
                />
              </div>
            </div>

            {/* physical properties  */}
            <div className="flex flex-col space-y-6">
              <div className="flex w-64 flex-col space-y-2">
                <label className="text-left text-sm">
                  Physical Properties:
                </label>
                <input
                  className="input input-md input-bordered px-2"
                  type="text"
                  placeholder="Type here ..."
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
                  placeholder="Type here ..."
                  {...register("chemicalProperties", {
                    required: true,
                  })}
                />
              </div>

              {/* Biological Properties */}
              <div className="flex w-64 flex-col space-y-2">
                <label className="text-left text-sm">
                  Biological Properties:
                </label>
                <input
                  className="input input-md input-bordered px-2"
                  type="text"
                  placeholder="Type here ..."
                  {...register("biologicalProperties", {
                    required: true,
                  })}
                />
              </div>

              {/* collection procedures  */}
              <div className="flex w-64 flex-col space-y-2">
                <label className="text-left text-sm">
                  Collection Procedures:
                </label>
                <input
                  className="input input-md input-bordered px-2"
                  type="text"
                  placeholder="Type here ..."
                  {...register("collectionProcedures", {
                    required: true,
                  })}
                />
              </div>

              {/* transport recommendations */}

              <div className="flex w-64 flex-col space-y-2">
                <label className="text-left text-sm" htmlFor="location-origin">
                  Recommendations For Transport:
                </label>

                <select
                  className="select select-bordered select-md px-2"
                  id="location-origin"
                  {...register("recommendationsForTransport", {
                    required: true,
                  })}
                >
                  <option value="">---</option>

                  {containerTypeData.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
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
