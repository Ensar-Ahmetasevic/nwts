import { useState } from "react";

import useDeletePreStorageTypeMutation from "./../../../../../requests/request-pre-storage-setup/request-pre-storage-type/use-delete-pre-storage-type-mutation";

import ModalShowDetailsPreStorageType from "./../modal/modal-show-details-pre-storage-type";

import { MdDeleteSweep } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { MdOutlineExpandMore } from "react-icons/md";
import ModalUpdatePreStorageType from "./../modal/modal-update-pre-storage-type";

export default function ShowPreStorageType({ preStorageData }) {
  const [openModalDetails, setOpenModalDetails] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);

  const deletePreStorageTypeMutation = useDeletePreStorageTypeMutation();

  return (
    <>
      {/* row */}
      <tr>
        <th></th>
        <td>{preStorageData?.name}</td>
        <td>
          <div className="tooltip" data-tip="Details">
            <label
              htmlFor="modal_details_pre_storage_type"
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
                deletePreStorageTypeMutation.mutateAsync(preStorageData.id);
              }}
            >
              <MdDeleteSweep />
            </label>
          </div>
        </td>
      </tr>

      {/* Show Details */}
      {openModalDetails ? (
        <ModalShowDetailsPreStorageType
          closeModal={() => setOpenModalDetails(false)}
          modalContenData={preStorageData}
        />
      ) : null}

      {/* Update */}
      {openModalUpdate ? (
        <ModalUpdatePreStorageType
          closeModal={() => setOpenModalUpdate(false)}
          modalDataPreStorageType={preStorageData}
        />
      ) : null}
    </>
  );
}
