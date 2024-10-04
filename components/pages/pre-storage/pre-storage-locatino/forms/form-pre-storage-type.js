import { useForm } from "react-hook-form";

import useCreatePreStorageLocationMutation from "../../../../../requests/request-pre-storage-setup/request-pre-storage-location/use-create-pre-storage-location-mutation";

export default function FormPreStorageLocation({ OnCancel }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const createPreStorageLocationMutation =
    useCreatePreStorageLocationMutation();

  function isFormSubmit({
    name,
    surfaceArea,
    containerFootprint,
    containerType,
    wasteProfile,
    preStorageFor,
  }) {
    // Trim the values before sending them
    const trimmedName = name.trim();
    const trimmedPreStorageFor = preStorageFor.trim();
    const trimmedContainerType = containerType.trim();
    const trimmedWasteProfile = wasteProfile.trim();
    const surfaceAreaNumber = parseInt(surfaceArea);
    const containerFootprintNumber = parseInt(containerFootprint);

    // Create the formData object with trimmed values
    const formData = {
      name: trimmedName,
      surfaceArea: surfaceAreaNumber,
      containerType: trimmedContainerType,
      wasteProfile: trimmedWasteProfile,
      preStorageFor: trimmedPreStorageFor,
      containerFootprint: containerFootprintNumber,
    };
    createPreStorageLocationMutation.mutateAsync({ formData });

    OnCancel(null);
    reset();
  }

  return (
    <>
      <div className="mt-10 flex flex-col items-center space-y-12 rounded-md border-2 border-red-500 bg-gray-900 p-5 px-12">
        <h1 className="text-xl font-bold">Add new "Pre-Storage Location"</h1>

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
                step="1" // Restrict to whole numbers
                min="1" // Prevent 0 or negative values
                placeholder="Type here ..."
                {...register("surfaceArea", {
                  required: true,
                  min: {
                    value: 1,
                    message: "Please enter a valid positive number",
                  },
                })}
              />

              {errors.surfaceArea && (
                <p className="text-sm text-red-500">
                  {errors.surfaceArea.message}
                </p>
              )}
            </div>

            {/* Container Footprint  */}
            <div className="flex w-64 flex-col space-y-2">
              <label className="text-left text-sm">
                {"Container Footprint (m²)"}:
              </label>
              <input
                className="input input-md input-bordered px-2"
                type="number"
                step="1" // Restrict to whole numbers
                min="1" // Prevent 0 or negative values
                placeholder="Type here ..."
                {...register("containerFootprint", {
                  required: true,
                  min: {
                    value: 1,
                    message: "Please enter a valid positive number",
                  },
                })}
              />

              {errors.surfaceArea && (
                <p className="text-sm text-red-500">
                  {errors.surfaceArea.message}
                </p>
              )}
            </div>

            {/* Container Type */}
            <div className="flex flex-col space-y-2">
              <label className="text-left text-sm">Container Type:</label>
              <input
                className="input input-md input-bordered px-2"
                type="text"
                placeholder="Type here ..."
                {...register("containerType", {
                  required: true,
                })}
              />
            </div>

            {/*   Waste Profile
             */}
            <div className="flex flex-col space-y-2">
              <label className="text-left text-sm">Waste Profile:</label>
              <input
                className="input input-md input-bordered px-2"
                type="text"
                placeholder="Type here ..."
                {...register("wasteProfile", {
                  required: true,
                })}
              />
            </div>

            {/* Pre-Storage For */}

            <div className="flex w-64 flex-col space-y-2">
              <label className="text-left text-sm">Pre-Storage For:</label>
              <textarea
                className="textarea textarea-bordered"
                rows={4}
                cols={50}
                type="text"
                placeholder="Radioactive waste from nuclear facilities ..."
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
