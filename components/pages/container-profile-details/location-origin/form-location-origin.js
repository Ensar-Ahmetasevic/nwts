import { useForm } from "react-hook-form";
import useCreateLocationOriginMutation from "../../../../requests/request-container-profile/request-location-origin/use-create-location-origin-mutation";

function FormLocationOrigin({ cancelLocationOriginForm }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const createLocationOriginMutation = useCreateLocationOriginMutation();

  function isFormSubmit({ name, address, origin }) {
    // Trim the values before sending them
    const trimmedName = name.trim();
    const trimmedAddress = address.trim();
    const trimmedOrigin = origin.trim();

    // Create the formData object with trimmed values
    const formData = {
      name: trimmedName,
      address: trimmedAddress,
      origin: trimmedOrigin,
    };
    createLocationOriginMutation.mutateAsync({ formData });

    cancelLocationOriginForm(null);
    reset();
  }

  return (
    <>
      <div className="flex flex-col space-y-4">
        <h1 className="text-xl font-bold">Add new "Location origin"</h1>

        <form
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
                {...register("origin", {
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
                cancelLocationOriginForm(null);
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

export default FormLocationOrigin;
