import { useState } from "react";

import useDeleteWasteProfileMutation from "./../../../../../requests/request-container-profile/request-waste-profile/use-delete-waste-profile-mutation";

import ModalShowWasteProfileDetails from "./../modal/modal-show-waste-profile-details";
import ModalWasteProfileDetailsUpdate from "./../modal/modal-waste-profile-details-update";

import { MdDeleteSweep } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { MdOutlineExpandMore } from "react-icons/md";

export default function ShowWasteProfile({ wasteData }) {
  const [openModalDetails, setOpenModalDetails] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);

  const deleteWasteProfileMutation = useDeleteWasteProfileMutation();

  return (
    <>
      {/* row */}
      <tr>
        <th></th>
        <td>{wasteData?.name}</td>
        <td>
          <div className="tooltip" data-tip="Details">
            <label
              htmlFor="modal_waste_details"
              className="btnExtend"
              onClick={() => setOpenModalDetails(true)}
            >
              <MdOutlineExpandMore />
            </label>
          </div>
        </td>
        <td>
          <div className="tooltip" data-tip="Edit">
            <button
              className="btnUpdate"
              onClick={() => setOpenModalUpdate(true)}
            >
              <CiEdit />
            </button>
          </div>
        </td>
        <td>
          <div className="tooltip" data-tip="Delete">
            <label
              className="btnDelete flex items-center"
              onClick={() => {
                deleteWasteProfileMutation.mutateAsync(wasteData.id);
              }}
            >
              <MdDeleteSweep />
            </label>
          </div>
        </td>
      </tr>

      {/* Show Details */}
      {openModalDetails ? (
        <ModalShowWasteProfileDetails
          closeModal={() => setOpenModalDetails(false)}
          modalContenData={wasteData}
        />
      ) : null}

      {/* Update */}
      {openModalUpdate ? (
        <ModalWasteProfileDetailsUpdate
          closeModal={() => setOpenModalUpdate(false)}
          modalContainerTypeData={wasteData}
        />
      ) : null}
    </>
  );
}
