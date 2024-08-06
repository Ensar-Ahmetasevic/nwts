import { useState } from "react";

import dayjs from "dayjs";

import ContainerDetails from "./show-container-details";
import CreateContainerProfile from "./create-container-profile";

import ModalTruckUpdate from "./truck-data/modal/modal-truck-update";

import { GrStatusGoodSmall } from "react-icons/gr";
import { MdDeleteSweep } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

import useDeleteShippingInformationsMutations from "../../../requests/request-shipping-information/use-delete-shipping-informations-mutation";

function LatestShippingData({ data, isLoading, error }) {
  const [openModalUpdate, setOpenModalUpdate] = useState(false);

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
    <>
      <ul className="border-2">
        <li>
          <div className="m-2 flex flex-row">
            <div className="w-1/2">
              {/* Status */}

              <div className="space-y-3 rounded-lg border-2 p-4 text-lg">
                <div className="flex flex-col">
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

                <div className="flex flex-row space-x-4">
                  {/* Add Containers */}
                  <CreateContainerProfile />

                  {/* Edit Truck Data */}
                  <div className="tooltip" data-tip="Edit">
                    <label
                      htmlFor="update_modal_shipping_data"
                      className="btnUpdate"
                      onClick={() => setOpenModalUpdate(true)}
                    >
                      <CiEdit />
                    </label>
                  </div>

                  {/* Delete Truck Data */}
                  <div className="tooltip" data-tip="Delete">
                    <button
                      className="btnDelete"
                      id="deleteButton"
                      onClick={() =>
                        deleteShippingInformationsMutations.mutateAsync(
                          data.shippingData.id,
                        )
                      }
                    >
                      <MdDeleteSweep />
                    </button>
                  </div>
                </div>
              </div>

              {/* Shipping Details */}
              <div className="ml-20 space-y-2">
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
          </div>
        </li>
      </ul>

      {openModalUpdate ? (
        <ModalTruckUpdate
          closeModal={() => setOpenModalUpdate(false)}
          modalTruckFormData={data?.shippingData}
        />
      ) : null}
    </>
  );
}

export default LatestShippingData;
