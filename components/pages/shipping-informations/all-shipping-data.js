import Link from "next/link";
import dayjs from "dayjs";
import LoadingSpinnerButton from "./../../shared/loading-spiner-button";

export default function AllShippingData({ truck, isLoading, error }) {
  return (
    <div className="mx-auto w-2/3 pt-8">
      <table
        className={`table border-l-4 ${truck.truckStatus === "IN" ? "border-green-500" : "border-rose-500"}`}
      >
        <thead>
          <tr>
            <th></th>
            <th>Date</th>
            <th>Status</th>
            <th>Company Name</th>
            <th>DETAILS</th>
          </tr>
        </thead>
        <tbody>
          {/* row */}
          <tr>
            <th></th>
            <td>{dayjs(truck.entryDateTime).format("DD-MM-YYYY")}</td>
            <td>{truck.truckStatus}</td>
            <td>{truck.companyName}</td>
            <td>
              <Link
                className="btnCreate"
                href={`/shipping-informations/${truck.id}`}
              >
                {isLoading ? <LoadingSpinnerButton /> : "OPEN"}
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
