import { MdOutlineExpandMore } from "react-icons/md";

import ModalContainerDetails from "./modal/modal-container-details";

function ContainerDetails({ data }) {
  if (!data) {
    return <p>No data available.</p>;
  }

  const { quantity, locationOrigin, wasteProfile, containerType } = data;

  const details = [
    { label: "Waste Profile:", name: wasteProfile.name },
    { label: "Quantity:", name: quantity },
    { label: "Location Origin:", name: locationOrigin.name },
    { label: "Container Type:", name: containerType.name },
  ];

  return (
    <div className="mx-2 space-y-2 rounded-md border object-left p-2">
      <ul>
        {details.map((detail, index) => (
          <li key={index} className="flex space-x-3">
            <p className="font-bold">{detail.label}</p>
            <p>{detail.name}</p>
            <button
              className=""
              onClick={() => document.getElementById("my_modal_5").showModal()}
            >
              <MdOutlineExpandMore />
            </button>
          </li>
        ))}
      </ul>

      <ModalContainerDetails htmlFor={"my_modal_5"} />
    </div>
  );
}

export default ContainerDetails;
