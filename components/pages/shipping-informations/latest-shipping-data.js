import dayjs from "dayjs";

import ContainerDetails from "./show-container-details";

import { GrStatusGoodSmall } from "react-icons/gr";

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
    return <div>{data?.message || "No data available"}</div>;
  }

  // Destructure the necessary data
  const {
    entryDateTime,
    companyName,
    driverName,
    registrationPlates,
    containerProfiles,
    status,
  } = data?.shippingData;

  const truckStatus = () => {
    {
      if (status === "IN") {
        return <GrStatusGoodSmall style={{ color: "green" }} />;
      } else if (status === "OUT") {
        return <GrStatusGoodSmall style={{ color: "red" }} />;
      } else {
        return null;
      }
    }
  };

  return (
    <ul className="border-2">
      <li>
        <div className="m-2 flex flex-row p-2">
          <div className=" w-1/2 space-y-2 ">
            <h2>Latest Shipping Data:</h2>

            {/* Status */}
            <div className={`flex flex-col`}>
              <p className="font-bold">Status:</p>
              <div className="flex flex-row space-x-2">
                <p> {status} </p>
                <p className="mt-1">{truckStatus()}</p>
              </div>
            </div>

            {/* Company Name */}
            <div className="flex flex-row">
              <p>Transport data for:</p>
              <p className="ml-4 font-bold">{companyName}</p>
            </div>

            {/* entryDateTime */}
            {/* <div className="flex flex-col">
              <p className="font-bold">Entry Date:</p>
              <p>{dayjs(entryDateTime).format("DD/MM/YYYY, HH:mm")}</p>
            </div> */}

            {/* Driver Name */}
            {/* <div className="flex flex-col">
              <p className="font-bold">Driver Name:</p>
              <p>{driverName}</p>
            </div> */}

            {/* Registration Plates */}
            {/* <div className="flex flex-col">
              <p className="font-bold">Registration Plates:</p>
              <p>{registrationPlates}</p>
            </div> */}

            <div className=" flex flex-row space-x-2">
              <button
                className="btnDelete"
                onClick={() =>
                  deleteShippingInformationsMutations.mutateAsync(
                    data.shippingData.id,
                  )
                }
              >
                D
              </button>
              <p>Delete</p>
            </div>
          </div>

          {/* Shipping Details */}

          <div className="w-1/2 space-y-2">
            {containerProfiles && containerProfiles.length > 0 ? (
              containerProfiles
                .slice()
                .reverse()
                .map((profile) => (
                  <ContainerDetails key={profile.id} data={profile} />
                ))
            ) : (
              <div className="flex justify-center pt-10">
                <p>No data available.</p>
              </div>
            )}
          </div>
        </div>
      </li>
    </ul>
  );
}

export default LatestShippingData;
