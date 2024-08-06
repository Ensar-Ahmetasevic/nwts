import { useState } from "react";

import useDeleteContainerProfileMutations from "../../../requests/request-container-profile/use-delete-container-profile-mutation";

import ModalShowContainerDetails from "./components/modal/modal-show-container-details";
import ModalContainerProfilUpdate from "./components/modal/modal-container-profile-update";

import { MdOutlineExpandMore } from "react-icons/md";
import { MdDeleteSweep } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { TbListDetails } from "react-icons/tb";

export default function showContainerDetails({ data }) {
  const [modalContenData, setModalContentData] = useState(null);
  const [openModalDetails, setOpenModalDetails] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [title, setTitle] = useState("");

  //Delete data
  const deleteContainerProfileMutations = useDeleteContainerProfileMutations();

  // MUTATIOS;
  function deleteHandler(id) {
    deleteContainerProfileMutations.mutateAsync(id);
  }

  const { quantity, locationOrigin, wasteProfile, containerType, id } = data;

  const containerDetails = [
    { title: "Waste Profile", name: wasteProfile.name, details: wasteProfile },
    //
    { title: "Quantity", name: quantity, details: { quantity } },
    //
    {
      title: "Location Origin",
      name: locationOrigin.name,
      details: locationOrigin,
    },
    {
      title: "Container Type",
      name: containerType.name,
      details: containerType,
    },
  ];

  const handleModalDetails = (detail) => {
    setModalContentData(detail.details);
    setTitle(detail.title);
    setOpenModalDetails(true);
  };

  const handleModalUpdateContainerProfile = () => {
    setOpenModalUpdate(true);
  };

  return (
    <div className="mx-2 p-2">
      <div>
        <ul className="rounded-lg border-2 p-2  font-medium">
          <div className="mb-4 flex flex-row space-x-3 text-lg">
            <h2 className="underline underline-offset-4">{quantity}</h2>
            <h2 className="font-normal">
              {quantity === 1 ? "container" : "containers"} of type
            </h2>
            <h2 className="underline underline-offset-4">
              {wasteProfile.name}
            </h2>
            <h2 className="font-normal">from</h2>
            <h2 className="underline underline-offset-4">
              {locationOrigin.name}
            </h2>
          </div>
          <div>
            <details className="collapse collapse-arrow bg-base-200">
              <summary className="collapse-title text-base">
                <div className="flex flex-row items-center space-x-2 ">
                  <TbListDetails />
                  <p>Details</p>
                </div>
              </summary>

              <div className="collapse-content">
                {containerDetails.map((detail, index) => (
                  <li key={index} className="flex space-x-3 text-base">
                    <p className="font-normal">{detail.title}</p>
                    <p>{detail.name}</p>

                    <div className="tooltip mt-1" data-tip="Extend">
                      <label
                        htmlFor="modal_container_details"
                        className="btnExtend"
                        onClick={() => handleModalDetails(detail)}
                      >
                        <MdOutlineExpandMore />
                      </label>
                    </div>
                  </li>
                ))}
              </div>
            </details>
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            <div className="tooltip" data-tip="Edit">
              <label
                htmlFor="update_modal_container_profile"
                className="btnUpdate"
                onClick={() => handleModalUpdateContainerProfile()}
              >
                <CiEdit />
              </label>
            </div>

            <div className="tooltip" data-tip="Delete">
              <button
                className="btnDelete flex items-center"
                onClick={() => deleteHandler(id)}
              >
                <MdDeleteSweep />
              </button>
            </div>
          </div>
        </ul>
      </div>

      {openModalDetails ? (
        <ModalShowContainerDetails
          closeModal={() => setOpenModalDetails(false)}
          modalContenData={modalContenData}
          title={title}
        />
      ) : null}

      {openModalUpdate ? (
        <ModalContainerProfilUpdate
          closeModal={() => setOpenModalUpdate(false)}
          modalContainerProfilData={data}
        />
      ) : null}
    </div>
  );
}
