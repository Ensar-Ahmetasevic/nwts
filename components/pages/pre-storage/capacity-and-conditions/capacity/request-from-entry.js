import { useState } from "react";

import ModalPreStorageCapacityForm from "./modal/modal-pre-storage-capacity-form";

export default function RequestFromEntry({ entryData, hallData }) {
  const [isModalCapacityOpen, setIsModalCapacityOpen] = useState(false);

  // Function to toggle the visibility of a modal
  const toggleCapacityModal = () => setIsModalCapacityOpen((prev) => !prev);

  return (
    <>
      <div className="w-full overflow-x-auto">
        <table className="menu table min-h-full w-1/2 bg-base-200 p-4 text-base-content">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Company name:</th>
              <th>Registration:</th>
              <th>Quantity</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <th></th>
              <td>{entryData.companyName}</td>
              <td>{entryData.registrationPlates}</td>
              <td>{entryData.totalQuantity}</td>
              <td>
                <button
                  className="btnSave"
                  onClick={() => toggleCapacityModal()}
                >
                  Accept
                </button>
              </td>
              <td>
                <button className="btnCancel">Reject</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* Capacity modal component */}
      <ModalPreStorageCapacityForm
        isOpen={isModalCapacityOpen}
        closeModal={() => toggleCapacityModal()}
        hallData={hallData}
        entryData={entryData}
      />
    </>
  );
}
