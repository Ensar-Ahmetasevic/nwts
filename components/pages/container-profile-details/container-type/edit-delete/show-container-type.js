import { useState } from "react";

import useDeleteContainerTypeMutation from "./../../../../../requests/request-container-profile/request-container-type/use-delete-container-type-mutation";

import ModalShowContainerTypeDetails from "./../modal/modal-show-container-type-details";
import ModalContainerTypeDetailsUpdate from "./../modal/modal-container-type-details-update";

import { MdDeleteSweep } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { MdOutlineExpandMore } from "react-icons/md";

export default function ShowContainerType({ containerData }) {
  const [openModalDetails, setOpenModalDetails] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);

  const deleteContainerTypeMutation = useDeleteContainerTypeMutation();

  return (
    <>
      {/* row */}
      <tr>
        <th></th>
        <td>{containerData?.name}</td>
        <td>
          <div className="tooltip" data-tip="Details">
            <label
              htmlFor="modal_container_details"
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
                console.log(containerData.id),
                  deleteContainerTypeMutation.mutateAsync(containerData.id);
              }}
            >
              <MdDeleteSweep />
            </label>
          </div>
        </td>
      </tr>

      {openModalDetails ? (
        <ModalShowContainerTypeDetails
          closeModal={() => setOpenModalDetails(false)}
          modalContenData={containerData}
        />
      ) : null}

      {openModalUpdate ? (
        <ModalContainerTypeDetailsUpdate
          closeModal={() => setOpenModalUpdate(false)}
          modalContainerTypeData={containerData}
        />
      ) : null}
    </>
  );
}
