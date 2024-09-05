import { useForm } from "react-hook-form";

import useCreateContainerTypeMutation from "../../../../../requests/request-container-profile/request-container-type/use-create-container-type-mutation";

function FormContainerType({ OnCancel }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const createContainerTypeMutation = useCreateContainerTypeMutation();

  function isFormSubmit({
    name,
    material,
    volume,
    carryingCapacity,
    radioactivityLevel,
    physicalProperties,
    footprint,
    description,
  }) {
    // Trim the values before sending them
    const trimmedName = name.trim();
    const trimmedMaterial = material.trim();
    const trimmedRadioactivityLevel = radioactivityLevel.trim();
    const trimmedPhysicalProperties = physicalProperties.trim();
    const trimmeddescription = description.trim();

    // Create the formData object with trimmed values
    const formData = {
      name: trimmedName,
      material: trimmedMaterial,
      volume,
      carryingCapacity,
      radioactivityLevel: trimmedRadioactivityLevel,
      physicalProperties: trimmedPhysicalProperties,
      footprint,
      description: trimmeddescription,
    };
    createContainerTypeMutation.mutateAsync({ formData });

    OnCancel(null);
    reset();
  }

  return (
    <>
      <div className="mt-10 flex flex-col items-center space-y-12 rounded-md border-2 border-red-500 bg-gray-900 p-5">
        <h1 className="text-xl font-bold">Add new "Container Type"</h1>
        <form
          className="flex flex-col items-end space-y-8 px-12 pb-4"
          onSubmit={handleSubmit(isFormSubmit)}
        >
          <div className="flex flex-row space-x-20">
            {/* Name, Material, Volume, Carrying capacity */}
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
              <div className="flex w-64 flex-col space-y-2">
                <label className="text-left text-sm">Material:</label>
                <input
                  className="input input-md input-bordered px-2"
                  type="text"
                  placeholder="Type here ..."
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
                  placeholder="Type here ..."
                  {...register("volume", {
                    required: true,
                    min: 1,
                  })}
                />
              </div>

              <div className="flex w-64 flex-col space-y-2">
                <label className="text-left text-sm">
                  {" "}
                  {"Carrying capacity (tons) :"}
                </label>
                <input
                  className="input input-md input-bordered px-2"
                  type="number"
                  step=".01"
                  placeholder="Type here ..."
                  {...register("carryingCapacity", {
                    required: true,
                    min: 1,
                  })}
                />
              </div>
            </div>

            {/* Radioactivity Level, Physical properties, Footprint,  Description */}
            <div className="flex flex-col space-y-6">
              <div className="flex w-64 flex-col space-y-2">
                <label className="text-left text-sm">
                  Radioactivity Level:
                </label>
                <input
                  className="input input-md input-bordered px-2"
                  type="text"
                  placeholder="Type here ..."
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
                  placeholder="Type here ..."
                  {...register("physicalProperties", {
                    required: true,
                  })}
                />
              </div>

              <div className="flex w-64 flex-col space-y-2">
                <label className="text-left text-sm">
                  {" "}
                  {"Footprint (m²) :"}
                </label>
                <input
                  className="input input-md input-bordered px-2"
                  type="number"
                  step=".01"
                  placeholder="Type here ..."
                  {...register("footprint", {
                    required: true,
                    min: 1,
                  })}
                />
              </div>

              <div className="flex w-64 flex-col space-y-2">
                <label className="text-left text-sm">Description:</label>
                <textarea
                  className="textarea textarea-bordered"
                  rows={4}
                  cols={50}
                  type="text"
                  placeholder="Type here ..."
                  {...register("description", {
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

export default FormContainerType;
