import { useState, useMemo } from "react";

import ModalPreStorageCapacityForm from "./capacity/modal/modal-pre-storage-capacity-form";
import ModalPreStorageConditionsForm from "./conditions/modal/modal-pre-storage-conditions-form";

import WarningMessage from "./../../../shared/warningMessage";

import CapacityDetails from "./capacity/capacity-details";
import ConditionsDetails from "./conditions/conditions-details";

export default function CapacityAndConditionsDetails({ data }) {
  const [isModalCapacityOpen, setIsModalCapacityOpen] = useState(false);
  const [isModalConditionsOpen, setIsModalConditionsOpen] = useState(false);

  // Function to toggle the visibility of a modal
  const toggleCapacityModal = () => setIsModalCapacityOpen((prev) => !prev);
  const toggelConditionsModal = () => setIsModalConditionsOpen((prev) => !prev);

  const lastCondition = data.preStorageConditions.at(-1);

  const haleConditions = data.preStorageConditions;
  const halesurface = data.surfaceArea;
  const containerFootprint = data.containerFootprint;

  // Total sum of containers in hale
  const totalContainers = data.preStorageEntry.reduce(
    (total, waste) => total + waste.quantity,
    0,
  );

  // Calculate maximum number of containers which can fit in the hall
  const maxContainer = Math.round(halesurface / containerFootprint);

  // Calculate of how many more containers can fit in the hall
  const freeContainers = maxContainer - totalContainers;

  // Used space in m2
  const usedSpace = totalContainers * containerFootprint;
  // Feespace in m2
  const freeSpace = halesurface - usedSpace;

  // Used Space Percentage
  const usedSpacePercentage = Math.round((usedSpace / halesurface) * 100);
  // Free Space Precentage
  const freeSpacePercentage = Math.round((freeSpace / halesurface) * 100);

  // Determining the warning message and color based on the number of free containers
  const { warningMessage, warningColor } = useMemo(() => {
    let warningMessage = "";
    let warningColor = "";

    if (freeContainers <= 5) {
      warningMessage = `Warning: Only ${freeContainers} free spots left in the hall !`;
      warningColor = "bg-red-600";
    } else if (freeContainers <= 10) {
      warningMessage = `Notice: ${freeContainers} free spots remaining in the hall.`;
      warningColor = "bg-orange-500";
    }

    return { warningMessage, warningColor };
  }, [freeContainers]);

  const dataForPieChart = [
    { name: "Free Space", value: freeSpace },
    { name: "Used Space", value: usedSpace },
  ];

  return (
    <div className="container mx-auto mt-20 flex max-w-4xl flex-col place-items-center rounded-box bg-base-300 p-6">
      {/* Display the name of the pre-storage location */}
      <div className="mb-10 mt-5">
        <h1 className="stat-value">{data.name}</h1>
      </div>

      {/* Display warning message if applicable */}

      {warningMessage && (
        <WarningMessage
          warningColor={warningColor}
          warningMessage={warningMessage}
        />
      )}
      {/* Capacity Details */}

      <CapacityDetails
        dataForPieChart={dataForPieChart}
        freeSpacePercentage={freeSpacePercentage}
        freeSpace={freeSpace}
        freeContainers={freeContainers}
        usedSpacePercentage={usedSpacePercentage}
        usedSpace={usedSpace}
        totalContainers={totalContainers}
        toggleModal={toggleCapacityModal}
      />

      <div className="divider divider-warning my-10">Conditions</div>

      {/* Conditions Details */}
      <ConditionsDetails
        toggelModal={toggelConditionsModal}
        haleConditions={lastCondition}
      />

      {/* Capacity modal component */}
      <ModalPreStorageCapacityForm
        isOpen={isModalCapacityOpen}
        closeModal={() => toggleCapacityModal()}
        hallData={data}
      />

      {/* Conditions modal component */}
      <ModalPreStorageConditionsForm
        isOpen={isModalConditionsOpen}
        closeModal={() => toggelConditionsModal()}
        hallData={data}
      />
    </div>
  );
}
