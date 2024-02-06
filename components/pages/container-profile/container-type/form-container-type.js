import { useForm } from "react-hook-form";
import useCreateLocationOriginMutation from "../../../../requests/requests-container-profile/requests-location-origin/use-create-location-origin-mutation";

function FormContainerType({ cancelContainerTypeForm }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const createLocationOriginMutation = useCreateLocationOriginMutation();

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
    createLocationOriginMutation.mutateAsync({ formData });

    cancelContainerTypeForm(null);
    reset();
  }

  return (
    <form
      className="flex flex-col items-start space-y-4"
      onSubmit={handleSubmit(isFormSubmit)}
    >
      <div className="flex w-64 flex-col space-y-2">
        <div className="flex w-64 flex-col space-y-2">
          <label className="text-left text-sm">Name:</label>
          <input
            className="input input-bordered input-md px-2"
            type="text"
            placeholder="Type here"
            {...register("name", {
              required: true,
            })}
          />
        </div>
        <div className="flex w-64 flex-col space-y-2">
          <label className="text-left text-sm">Material:</label>
          <input
            className="input input-bordered input-md px-2"
            type="text"
            placeholder="Type here"
            {...register("material", {
              required: true,
            })}
          />
        </div>
        <div className="flex w-64 flex-col space-y-2">
          <label className="text-left text-sm">Volume:</label>
          <input
            className="input input-bordered input-md px-2"
            type="number"
            placeholder="Type here"
            {...register("volume", {
              required: true,
              min: 1,
            })}
          />
        </div>

        <div className="flex w-64 flex-col space-y-2">
          <label className="text-left text-sm">Carrying capacity:</label>
          <input
            className="input input-bordered input-md px-2"
            type="number"
            placeholder="Type here"
            {...register("carryingCapacity", {
              required: true,
              min: 1,
            })}
          />
        </div>

        <div className="flex w-64 flex-col space-y-2">
          <label className="text-left text-sm">Radioactivity Level:</label>
          <input
            className="input input-bordered input-md px-2"
            type="text"
            placeholder="Type here"
            {...register("radioactivityLevel", {
              required: true,
            })}
          />
        </div>

        <div className="flex w-64 flex-col space-y-2">
          <label className="text-left text-sm">Physical properties:</label>
          <input
            className="input input-bordered input-md px-2"
            type="text"
            placeholder="Type here"
            {...register("physicalProperties", {
              required: true,
            })}
          />
        </div>

        <div className="flex w-64 flex-col space-y-2">
          <label className="text-left text-sm">Footprint:</label>
          <input
            className="input input-bordered input-md px-2"
            type="number"
            placeholder="Type here"
            {...register("footprint", {
              required: true,
              min: 1,
            })}
          />
        </div>

        <div className="flex w-64 flex-col space-y-2">
          <label className="text-left text-sm">Description:</label>
          <textarea
            className="input input-bordered input-md px-2"
            type="text"
            placeholder="Type here"
            {...register("description", {
              required: true,
            })}
          />
        </div>
      </div>

      <div className=" space-x-2">
        <button className="btnSave" type="submit">
          Save
        </button>
        <button
          className="btnCancel"
          onClick={() => {
            cancelContainerTypeForm(null);
            reset();
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default FormContainerType;
