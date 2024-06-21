import { useState, useEffect } from "react";
import { MdOutlineExpandMore } from "react-icons/md";

import ModalContainerDetails from "./modal/modal-container-details";

function ContainerDetails({ data }) {
  const [modalContenData, setModalContentData] = useState(null);
  const [title, setTitle] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!data) {
    return <p>No data available.</p>;
  }

  const { quantity, locationOrigin, wasteProfile, containerType } = data;

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

  const handleModal = (detail) => {
    setModalContentData(detail.details);
    setTitle(detail.title);
    setIsModalOpen(true);
  };

  return (
    <div className="mx-2 space-y-2 rounded-md border object-left p-2">
      <ul>
        {containerDetails.map((detail, index) => (
          <li key={index} className="flex space-x-3">
            <p className="font-bold">{detail.title}</p>
            <p>{detail.name}</p>
            <button
              className="rounded border-2 border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-400"
              onClick={() => handleModal(detail)}
            >
              <MdOutlineExpandMore />
            </button>
          </li>
        ))}
      </ul>
      {isModalOpen && (
        <ModalContainerDetails
          modalContenData={modalContenData}
          title={title}
          closeModal={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

export default ContainerDetails;
