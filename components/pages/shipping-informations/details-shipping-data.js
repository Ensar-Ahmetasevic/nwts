import { useRouter } from "next/navigation";

import ShowContainerDetails from "./container-data/show-container-details";

import TruckData from "./truck-data/truck-data";
import TruckDataDetails from "./truck-data/truck-data-details";

export default function DetailsShippingData({
  data,
  isLoading,
  error,
  shippingID,
}) {
  const router = useRouter();

  // Add validation check for data structure
  if (!data?.shippingData?.containerProfiles) {
    return <div>Invalid data structure</div>;
  }

  const { containerProfiles } = data.shippingData;

  return (
    <>
      <ul className="mt-12">
        <li>
          <div className="m-2 flex flex-row">
            <div className="w-1/2">
              {/* Truck Details */}
              <TruckData
                data={data}
                isLoading={isLoading}
                error={error}
                shippingID={shippingID}
              />
              <div className="tooltip mb-4 mt-4" data-tip="Go Back">
                <button className="btnNeutral" onClick={() => router.back()}>
                  {"<< --"}
                </button>
              </div>

              {/* Container Details */}
              <div className="ml-20 space-y-2">
                {containerProfiles && containerProfiles.length > 0 ? (
                  containerProfiles
                    .slice()
                    .reverse()
                    .map((profile) => (
                      <ShowContainerDetails key={profile.id} data={profile} />
                    ))
                ) : (
                  <div className="flex justify-center pt-10">
                    <p>No containers in the truck</p>
                  </div>
                )}
              </div>
            </div>
            <div>
              <TruckDataDetails data={data} />
            </div>
          </div>
        </li>
      </ul>
    </>
  );
}
