import dynamic from "next/dynamic";

// Dynamically import the CustomPieChart component without server-side rendering
const CustomPieChart = dynamic(
  () => import("./../../../../shared/custom-pie-chart"),
  {
    ssr: false,
  },
);

export default function CapacityDetails({
  dataForPieChart,
  freeSpacePercentage,
  freeSpace,
  freeContainers,
  usedSpacePercentage,
  usedSpace,
  totalContainers,
  toggleModal,
}) {
  return (
    <div className="flex flex-col ">
      {/* Display pie chart and usage information */}
      <div className="mb-6 flex w-full flex-row space-x-12">
        {/* Pie chart with transition effects */}
        <div className="flex flex-row items-center justify-evenly">
          <div className="transform transition-transform duration-700 ease-in-out hover:scale-110">
            <CustomPieChart data={dataForPieChart} />
          </div>
        </div>

        {/* Display free and used space information */}
        <div className="flex flex-col space-y-8">
          <InfoBox
            label="Free space"
            color="green"
            percentage={freeSpacePercentage}
            space={freeSpace}
            containers={freeContainers}
          />
          <InfoBox
            label="Used space"
            color="red"
            percentage={usedSpacePercentage}
            space={usedSpace}
            containers={totalContainers}
          />
        </div>
      </div>

      {/* Button to open the Capacity modal */}
      <button
        className="btn btn-outline btn-info mb-5 w-full transition delay-75 duration-200 ease-in-out hover:-translate-y-1 hover:scale-105"
        onClick={() => toggleModal()}
      >
        Update Capacity State
      </button>
    </div>
  );
}

// InfoBox component to display information about free or used space
function InfoBox({ label, color, percentage, space, containers }) {
  return (
    <div
      className={`flex transform flex-col items-center rounded-md border-4 transition-transform duration-500 ease-in-out hover:scale-105 border-${color}-500`}
    >
      <div className="my-4 flex flex-row items-center space-x-3">
        <div>
          <p>{label}</p>
        </div>
        {/* Colored indicator box */}
        <div className={`h-4 w-4 rounded bg-${color}-500`}></div>
      </div>
      {/* Table displaying the percentage, space in m2, and number of containers */}
      <table className="table">
        <tbody>
          <tr className="flex justify-around">
            <td>{percentage} %</td>
            <td>{space} m2</td>
            <td>{containers} Containers</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
