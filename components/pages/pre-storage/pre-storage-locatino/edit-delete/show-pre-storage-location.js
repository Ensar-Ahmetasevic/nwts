import { useState } from "react";

import useDeletePreStorageLocationMutation from "../../../../../requests/request-pre-storage-setup/request-pre-storage-location/use-delete-pre-storage-location-mutation";

import ModalShowDetailsPreStorageLocation from "../modal/modal-show-details-pre-storage-location";

import { MdDeleteSweep } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { MdOutlineExpandMore } from "react-icons/md";
import ModalUpdatePreStorageLocation from "../modal/modal-update-pre-storage-location";

export default function ShowPreStorageLocation({ preStorageData }) {
  const [openModalDetails, setOpenModalDetails] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);

  const deletePreStorageLocationMutation =
    useDeletePreStorageLocationMutation();

  return (
    <>
      {/* row */}
      <tr>
        <th></th>
        <td>{preStorageData?.name}</td>
        <td>
          <div className="tooltip" data-tip="Details">
            <label
              htmlFor="modal_details_pre_storage_location"
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
                deletePreStorageLocationMutation.mutateAsync(preStorageData.id);
              }}
            >
              <MdDeleteSweep />
            </label>
          </div>
        </td>
      </tr>

      {/* Show Details */}
      {openModalDetails ? (
        <ModalShowDetailsPreStorageLocation
          closeModal={() => setOpenModalDetails(false)}
          modalContenData={preStorageData}
        />
      ) : null}

      {/* Update */}
      {openModalUpdate ? (
        <ModalUpdatePreStorageLocation
          closeModal={() => setOpenModalUpdate(false)}
          modalDataPreStorageLocation={preStorageData}
        />
      ) : null}
    </>
  );
}
