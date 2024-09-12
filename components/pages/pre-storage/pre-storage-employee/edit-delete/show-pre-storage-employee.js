import { useState } from "react";

import useDeletePreStorageEmployeeMutation from "./../../../../../requests/request-pre-storage-setup/request-pre-storage-employee/use-delete-pre-storage-employee-mutation";

import ModalShowDetailsPreStorageEmployee from "./../modal/modal-show-details-pre-storage-employee";
import ModalUpdatePreStorageEmployee from "./../modal/modal-update-pre-storage-employee";

import { MdDeleteSweep } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { MdOutlineExpandMore } from "react-icons/md";

export default function ShowPreStorageEmployee({ preStorageData }) {
  const [openModalDetails, setOpenModalDetails] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);

  const deletePreStorageEmployeeMutation =
    useDeletePreStorageEmployeeMutation();

  return (
    <>
      {/* row */}
      <tr>
        <th></th>
        <td>{preStorageData?.name}</td>
        <td>
          <div className="tooltip" data-tip="Details">
            <label
              htmlFor="modal_details_pre_storage_employee"
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
                deletePreStorageEmployeeMutation.mutateAsync(preStorageData.id);
              }}
            >
              <MdDeleteSweep />
            </label>
          </div>
        </td>
      </tr>

      {/* Show Details */}
      {openModalDetails ? (
        <ModalShowDetailsPreStorageEmployee
          closeModal={() => setOpenModalDetails(false)}
          modalContenData={preStorageData}
        />
      ) : null}

      {/* Update */}
      {openModalUpdate ? (
        <ModalUpdatePreStorageEmployee
          closeModal={() => setOpenModalUpdate(false)}
          modalDataPreStorageEmployee={preStorageData}
        />
      ) : null}
    </>
  );
}
