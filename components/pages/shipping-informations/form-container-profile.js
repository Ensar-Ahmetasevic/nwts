import { useForm } from "react-hook-form";
import useLocationOriginQuery from "./../../../requests/requests-container-profile/requests-location-origin/use-fetch-location-origin";

function FormContainerProfile({ toggleContainerProfileForm }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { data } = useLocationOriginQuery();

  console.log(data);

  const locationOriginData = data?.locationOriginData;

  function isFormSubmit(data) {
    console.log(data);
    // Toggle the state in the parent component -> AllShippingInformations()
    toggleContainerProfileForm();

    reset();
  }
  return (
    <>
      <form
        className="flex flex-col items-start space-y-4"
        onSubmit={handleSubmit(isFormSubmit)}
      >
        <div className="flex flex-col space-y-2">
          <label className="text-left text-sm">Quantity:</label>
          <input
            className="input input-bordered input-md px-2"
            type="number"
            placeholder="Type here"
            {...register("quantity", {
              required: true,
              min: 1,
            })}
          />
          {errors.example && <p>This is required</p>}
        </div>

        {/* Location origin */}
        <div className="flex w-64 flex-col space-y-2">
          <label className="text-left text-sm" htmlFor="location-origin">
            Please select location origin
          </label>

          <select
            className="select select-bordered select-md px-2"
            id="location-origin"
            {...register("locationOrigin", { required: true })}
          >
            <option value="">---</option>

            {locationOriginData?.map((origin) => (
              <option key={origin.id} value={origin.name}>
                {origin.name}
              </option>
            ))}
          </select>
        </div>

        {/* Waste profile */}
        <div className="flex w-64 flex-col space-y-2">
          <label className="text-left text-sm" htmlFor="waste-profile">
            Please select waste profile
          </label>

          <select
            className="select select-bordered select-md px-2"
            id="waste-profile"
            {...register("wasteProfile", { required: true })}
          >
            <option value="">---</option>
            <option value="M001">M001</option>
            <option value="M002">M002</option>
          </select>
        </div>

        {/* Container type */}
        <div className="flex w-64 flex-col space-y-2">
          <label className="text-left text-sm" htmlFor="container-type">
            Please select container type
          </label>

          <select
            className="select select-bordered select-md px-2"
            id="container-type"
            {...register("containerType", { required: true })}
          >
            <option value="">---</option>
            <option value="Concrete container">Concrete container</option>
            <option value="Strengthened steel container">
              Strengthened steel container
            </option>
          </select>
        </div>

        <div className=" space-x-2">
          <button className="btnSave" type="submit">
            Save
          </button>
          <button
            className="btnCancel"
            onClick={() => {
              toggleContainerProfileForm();
              reset();
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}

export default FormContainerProfile;
