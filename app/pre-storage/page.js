"use client";

import CapacityAndConditions from "../../components/pages/pre-storage/capacity-and-conditions/capacity-and-conditions";

import usePreStorageLocationQuery from "./../../requests/request-pre-storage-setup/request-pre-storage-location/use-fetch-pre-storage-location-query,";

import AlertWarning from "./../../components/shared/alert-warning";
import LoadingSpinnerPage from "./../../components/shared/loading-spiner-page";

export default function PreStorage() {
  const { data, isLoading, isError } = usePreStorageLocationQuery();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinnerPage />
      </div>
    );
  }

  if (isError || !data || data.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center">
        <AlertWarning text={"There are no Containers in the Pre-Storage!"} />
      </div>
    );
  }

  // Reverse the data array to change the rendering order
  const reversedData = data.slice().reverse();

  // data.slice() creates a new array copy so that we don't mutate the original data array.
  // data.reverse() reverses the order of the elements in the new array.

  return (
    <ul>
      {reversedData.map((preStorageData) => (
        <li className="my-14 flex justify-center" key={preStorageData.id}>
          <CapacityAndConditions data={preStorageData} />
        </li>
      ))}
    </ul>
  );
}
