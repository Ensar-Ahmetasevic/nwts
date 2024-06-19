import { useState } from "react";

import ModalContainerDetails from "./modal/modal-container-details";

function ContainerDetails({ data }) {
  const [showModal, setShowModal] = useState(false);

  if (!data) {
    return <p>No data available.</p>;
  }

  const { quantity, locationOrigin, wasteProfile, containerType } = data;

  return (
    <div className="mx-auto w-1/2 space-y-2 rounded-md border p-2">
      <ul>
        <li>
          <p className="font-bold">Waste Profile:</p> {wasteProfile.name}
        </li>
        <li>
          <p className="font-bold">Quantity:</p> {quantity}
        </li>
        <li>
          <p className="font-bold">Location Origin:</p> {locationOrigin.name}
          {/* <button
            className="btnInfoSmall"
            onClick={() => document.getElementById("my_modal_5").showModal()}
          >
            Open Modal
          </button> */}
          <label htmlFor="my_modal_6" className="btn">
            open modal
          </label>
        </li>

        <li>
          <p className="font-bold">Container Type:</p> {containerType.name}
        </li>
      </ul>

      <ModalContainerDetails htmlFor={"my_modal_6"} />
    </div>
  );
}

export default ContainerDetails;
