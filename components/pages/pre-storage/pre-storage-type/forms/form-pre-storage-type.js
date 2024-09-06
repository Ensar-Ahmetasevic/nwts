import { useForm } from "react-hook-form";

import useCreatePreStorageTypeMutation from "./../../../../../requests/request-pre-storage-setup/request-pre-storage-type/use-create-pre-storage-type-mutation";

export default function FormPreStorageType({ OnCancel }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const createPreStorageTypeMutation = useCreatePreStorageTypeMutation();

  function isFormSubmit({ name, surfaceArea, preStorageFor }) {
    // Trim the values before sending them
    const trimmedName = name.trim();
    const trimmedPreStorageFor = preStorageFor.trim();
    const surfaceAreaNumber = parseFloat(surfaceArea); // Convert surfaceArea to a number

    if (isNaN(surfaceAreaNumber) || surfaceAreaNumber <= 0) {
      // Handle invalid number or display error to the user
      alert("Please enter a valid positive number for surface area");
      return;
    }

    // Restrict to two decimal places if necessary
    const surfaceAreaFormatted = surfaceAreaNumber.toFixed(2);

    // Create the formData object with trimmed values
    const formData = {
      name: trimmedName,
      surfaceArea: surfaceAreaFormatted,
      preStorageFor: trimmedPreStorageFor,
    };
    createPreStorageTypeMutation.mutateAsync({ formData });

    OnCancel(null);
    reset();
  }

  return (
    <>
      <div className="mt-10 flex flex-col items-center space-y-12 rounded-md border-2 border-red-500 bg-gray-900 p-5 px-12">
        <h1 className="text-xl font-bold">Add new "Pre-Storage Type"</h1>

        <form
          className="flex flex-col items-end space-y-8 pb-4"
          onSubmit={handleSubmit(isFormSubmit)}
        >
          <div className="flex flex-col space-y-6">
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
                step="0.01" // Allows numbers with up to two decimal places
                placeholder="Type here ..."
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
