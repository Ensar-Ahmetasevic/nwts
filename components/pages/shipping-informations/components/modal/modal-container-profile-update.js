import { useForm } from "react-hook-form";

import useWasteProfileQuery from "../../../../../requests/request-container-profile/request-waste-profile/use-fetch-waste-profile";
import useLocationOriginQuery from "../../../../../requests/request-container-profile/request-location-origin/use-fetch-location-origin";
import useContainerTypeQuery from "../../../../../requests/request-container-profile/request-container-type/use-fetch-location-origin";

export default function ModalContainerProfilUpdate({
  modalContainerProfilData,
  closeModal,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({});

  const { data: resLocationOriginData } = useLocationOriginQuery();
  const locationOriginData = resLocationOriginData?.locationOriginData;

  const { data: resWasteProfileData } = useWasteProfileQuery();
  const wasteProfileData = resWasteProfileData?.wasteProfileData;

  const { data: resContainerTypeData } = useContainerTypeQuery();
  const containerTypeData = resContainerTypeData?.containerTypeData;

  const isFormSubmit = (formData) => {
    // onSubmit({ ...formData, id: data.id });
    console.log(formData);
    closeModal();
  };

  const { quantity, locationOrigin, wasteProfile, containerType, id } =
    modalContainerProfilData;

  return (
    <>
      <input type="checkbox" id="update_modal" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <form
            className="flex flex-col items-start space-y-4"
            onSubmit={handleSubmit(isFormSubmit)}
          >
            <div className="flex flex-col space-y-2">
              {/* Quantity */}
              <label className="text-left text-sm">Quantity:</label>
              <input
                className="input input-md input-bordered px-2"
                type="number"
                placeholder="Type here"
                defaultValue={quantity}
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
                defaultValue={locationOrigin.id}
                {...register("locationOrigin", { required: true })}
              >
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
                defaultValue={wasteProfile.id}
                {...register("wasteProfile", { required: true })}
              >
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
                defaultValue={containerType.id}
                {...register("containerType", { required: true })}
              >
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
            </div>
          </form>

          <div className="modal-action">
            <label htmlFor="update_modal" className="btn" onClick={closeModal}>
              Cancel
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
