import { useState } from "react";

// Import dynamic from next/dynamic
import dynamic from "next/dynamic";

// Dynamically import CustomPieChart with ssr: false
const CustomPieChart = dynamic(
  () => import("../../../shared/custom-pie-chart"),
  { ssr: false },
);

import ModalPreStorageForm from "./capacity/modal/modal-pre-storage-form";

export default function CapacityAndConditionsDetails({ data }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open the modal
  const openModal = () => setIsModalOpen(true);

  // Function to close the modal
  const closeModal = () => setIsModalOpen(false);

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

  const dataForPieChart = [
    { name: "Free Space", value: freeSpace },
    { name: "Used Space", value: usedSpace },
  ];
  return (
    <>
      <div className="container mx-auto mt-20  flex max-w-4xl flex-col place-items-center rounded-box bg-base-300 p-6">
        {/* Pre Storage Location Name */}
        <div className="mb-10 mt-5">
          <h1 className="stat-value">{data.name}</h1>
        </div>
        {/* Capacitiy */}
        <div className="flex flex-col ">
          {/* Graf and usage */}
          <div className="w-ful mb-6 flex flex-row space-x-12">
            {/* Graf and legenda */}
            <div className="flex flex-row items-center justify-evenly">
              <div className="transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110">
                <CustomPieChart data={dataForPieChart} />
              </div>
            </div>
            {/* Usage */}
            <div className="flex flex-col space-y-8">
              {/* Free space */}
              <div className="flex flex-col items-center rounded-md border-4 border-green-500">
                <div className="my-4 flex flex-row items-center space-x-3">
                  <div>
                    <p>Free space</p>
                  </div>
                  <div className="h-4 w-4 rounded bg-green-500"></div>
                </div>
                <table className="table">
                  <tbody>
                    <tr className="flex justify-around">
                      <td>{freeSpacePercentage} %</td>
                      <td>{freeSpace} m2</td>
                      <td>{freeContainers} Containers</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* Used space */}
              <div className="flex flex-col items-center rounded-md border-4 border-red-500">
                <div className="my-4 flex flex-row items-center space-x-3">
                  <div>
                    <p>Used space</p>
                  </div>
                  <div className="h-4 w-4 rounded bg-red-500"></div>
                </div>
                <table className="table">
                  <tbody>
                    <tr className="flex justify-around">
                      <td>{usedSpacePercentage} %</td>
                      <td>{usedSpace} m2</td>
                      <td>{totalContainers} Containers</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* CTA */}
          <button
            className="btn btn-outline btn-info mb-5 w-full transition delay-75 duration-200 ease-in-out hover:-translate-y-1 hover:scale-105"
            onClick={openModal}
          >
            Update Hall State
          </button>
        </div>

        {/* Conditions */}
        <div class="prose">
          <h1>Conditions</h1>
        </div>
      </div>

      {/* Modal */}
      <ModalPreStorageForm
        isOpen={isModalOpen}
        closeModal={closeModal}
        hallData={data}
      />
    </>
  );
}
