import { useState } from "react";

import ModalShowContainerTypeDetails from "./modal/modal-show-container-type-details";
import ModalContainerTypeUpdate from "./modal/modal-container-type-update";

import { MdDeleteSweep } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { MdOutlineExpandMore } from "react-icons/md";

export default function ShowContainerType({ isCancel, containerData }) {
  const [openModalDetails, setOpenModalDetails] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);

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
              onClick={() => console.log("deleted")}
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
        <ModalContainerTypeUpdate
          closeModal={() => setOpenModalUpdate(false)}
          modalContainerTypeData={containerData}
        />
      ) : null}
    </>
  );
}
