import { useState } from "react";

import useDeleteContainerProfileMutations from "./../../../requests/request-container-profile/use-delete-container-profile-mutation";

import ModalContainerDetails from "./modal/modal-container-details";
import ModalContainerProfilUpdate from "./modal/modal-container-profile-update";

import { MdOutlineExpandMore } from "react-icons/md";
import { MdDeleteSweep } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

function ContainerDetails({ data }) {
  const [modalContenData, setModalContentData] = useState(null);
  const [openModalDetails, setOpenModalDetails] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [title, setTitle] = useState("");

  //Delete data
  const deleteContainerProfileMutations = useDeleteContainerProfileMutations();

  // TODO ITEM MUTATIOS;
  function deleteHandler(id) {
    deleteContainerProfileMutations.mutateAsync(id);
  }

  if (!data) {
    return <p>No data available.</p>;
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

  const handleModalUpdate = (detail) => {
    console.log("update--- done...");

    setOpenModalUpdate(true);
  };

  return (
    <div className="mx-2 space-y-2 rounded-md border object-left p-2">
      <ul>
        {containerDetails.map((detail, index) => (
          <li key={index} className="flex space-x-3">
            <p className="font-bold">{detail.title}</p>
            <p>{detail.name}</p>
            <div className="tooltip mt-1" data-tip="Extend">
              <button
                className="btnExtend"
                onClick={() => handleModalDetails(detail)}
              >
                <label htmlFor="modal_container_details">
                  <MdOutlineExpandMore />
                </label>
              </button>
            </div>
          </li>
        ))}
        <div className="mt-2 flex justify-end space-x-2">
          <div className="tooltip" data-tip="Edit">
            <label
              htmlFor="update_modal"
              className="btnUpdate flex items-center"
              onClick={() => handleModalUpdate()}
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

      {openModalDetails && (
        <ModalContainerDetails
          closeModal={() => setOpenModalDetails(false)}
          modalContenData={modalContenData}
          title={title}
        />
      )}

      {openModalUpdate && (
        <ModalContainerProfilUpdate
          closeModal={() => setOpenModalUpdate(false)}
          modalContainerProfilData={data}
        />
      )}
    </div>
  );
}

export default ContainerDetails;
