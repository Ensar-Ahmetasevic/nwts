import Link from "next/link";

import LoadingSpinnerButton from "./../../../shared/loading-spiner-button";

// Import dynamic from next/dynamic
import dynamic from "next/dynamic";

// Dynamically import CustomPieChart with ssr: false
const CustomPieChart = dynamic(
  () => import("../../../shared/custom-pie-chart"),
  {
    ssr: false,
  },
);

export default function CapacityAndConditions({ data }) {
  const halesurface = data.surfaceArea;
  const containerFootprint = data.containerFootprint;

  const totalContainers = data.preStorageEntry.reduce(
    (total, waste) => total + waste.quantity,
    0,
  );

  const usedSpace = totalContainers * containerFootprint;

  const freeSpace = halesurface - usedSpace;

  const dataForPieChart = [
    { name: "Free Space", value: freeSpace },
    { name: "Used Space", value: usedSpace },
  ];
  return (
    <div className="mx-10 flex w-1/2 flex-col space-y-10">
      <div className=" grid flex-grow place-items-center rounded-box bg-base-300">
        <div className="flex w-1/2 flex-col items-center">
          <div className="mb-10 mt-5">
            <h1 className="stat-value">{data.name}</h1>
          </div>

          <div className="mb-6 flex w-full flex-row items-center justify-evenly">
            <div>
              <CustomPieChart data={dataForPieChart} />
            </div>
            <div className="flex flex-col space-y-3 ">
              <div className="flex flex-row items-center space-x-3">
                <div>
                  <p>Free space</p>
                </div>
                <div className="h-4 w-4 rounded bg-green-500"></div>
              </div>
              <div className="flex flex-row items-center space-x-3">
                <div>
                  <p>Used space</p>
                </div>
                <div className="h-4 w-4 rounded  bg-red-500"></div>
              </div>
            </div>
          </div>

          <Link
            className="btn btn-outline btn-warning mb-5 w-full"
            href={`/pre-storage/${data.id}`}
          >
            DETAILS
          </Link>
        </div>
      </div>
    </div>
  );
}
