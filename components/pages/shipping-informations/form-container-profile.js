import { useForm } from "react-hook-form";
import useLocationOriginQuery from "../../../requests/request-container-profile/request-location-origin/use-fetch-location-origin";
import useWasteProfileQuery from "../../../requests/request-container-profile/request-waste-profile/use-fetch-waste-profile";
import useContainerTypeQuery from "../../../requests/request-container-profile/request-container-type/use-fetch-location-origin";
import useCreateContainerProfileMutation from "./../../../requests/request-container-profile/use-create-container-profile-mutation";

function FormContainerProfile({ toggleContainerProfileForm }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const createContainerProfileMutation = useCreateContainerProfileMutation();

  const { data: resLocationOriginData } = useLocationOriginQuery();
  const locationOriginData = resLocationOriginData?.locationOriginData;

  const { data: resWasteProfileData } = useWasteProfileQuery();
  const wasteProfileData = resWasteProfileData?.wasteProfileData;

  const { data: resContainerTypeData } = useContainerTypeQuery();
  const containerTypeData = resContainerTypeData?.containerTypeData;

  function isFormSubmit({
    quantity,
    locationOrigin,
    wasteProfile,
    containerType,
  }) {
    const formData = {
      quantity,
      locationOriginId: locationOrigin,
      wasteProfileId: wasteProfile,
      containerTypeId: containerType,
    };

    // Toggle the state in the parent component -> AllShippingInformations()
    toggleContainerProfileForm();

    createContainerProfileMutation.mutateAsync({ formData });

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
              <option key={origin.id} value={origin.id}>
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

            {wasteProfileData?.map((waste) => (
              <option key={waste.id} value={waste.id}>
                {waste.name}
              </option>
            ))}
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

            {containerTypeData?.map((container) => (
              <option key={container.id} value={container.id}>
                {container.name}
              </option>
            ))}
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
