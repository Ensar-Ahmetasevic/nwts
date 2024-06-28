import dayjs from "dayjs";

import ContainerDetails from "./show-container-details";

import useDeleteShippingInformationsMutations from "../../../requests/request-shipping-information/use-delete-shipping-informations-mutation";

function LatestShippingData({ data, isLoading, error }) {
  //Delete data
  const deleteShippingInformationsMutations =
    useDeleteShippingInformationsMutations();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data</div>;
  }

  if (!data || !data.shippingData) {
    return <div>{data.message}</div>;
  }

  // Destructure the necessary data
  const {
    createdAt,
    companyName,
    driverName,
    registrationPlates,
    containerProfiles,
  } = data?.shippingData;

  return (
    <ul>
      <li>
        <div className="m-2 flex flex-row p-2">
          <div className=" w-1/2 space-y-2 rounded-md border">
            <h2>Latest Shipping Data:</h2>

            {/* Created At */}
            <div className="flex flex-col">
              <p className="font-bold">Created At:</p>
              <p>{dayjs(createdAt).format("DD/MM/YYYY, HH:mm")}</p>
            </div>
            {/* Company Name */}
            <div className="flex flex-col">
              <p className="font-bold">Company Name:</p>
              <p>{companyName}</p>
            </div>

            {/* Driver Name */}
            <div className="flex flex-col">
              <p className="font-bold">Driver Name:</p>
              <p>{driverName}</p>
            </div>

            {/* Registration Plates */}
            <div className="flex flex-col">
              <p className="font-bold">Registration Plates:</p>
              <p>{registrationPlates}</p>
            </div>

            <button
              className="btnDelete"
              onClick={() =>
                deleteShippingInformationsMutations.mutateAsync(
                  data.shippingData.id,
                )
              }
            >
              Delete
            </button>
          </div>

          {/* Shipping Details */}

          <div className="w-1/2 space-y-2 rounded-md border">
            <h2>Details:</h2>
            {containerProfiles && containerProfiles.length > 0
              ? containerProfiles
                  .slice()
                  .reverse()
                  .map((profile) => (
                    <ContainerDetails key={profile.id} data={profile} />
                  ))
              : null}
          </div>
        </div>
      </li>
    </ul>
  );
}

export default LatestShippingData;
