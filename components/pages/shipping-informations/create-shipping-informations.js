"use client";

import AllShippingInformations from "./all-shipping-informations";
import useCreateShippingInformationsMutation from "../../../requests/requests-shipping-information/use-create-shipping-informations-mutation";
import useShippingInformationQuery from "../../../requests/requests-shipping-information/use-fetch-shipping-informations";

function CreateShippingInformations() {
  //Fetching data
  const { data } = useShippingInformationQuery();

  const createShippingInformationsMutation =
    useCreateShippingInformationsMutation();

  return (
    <section id="shippingInformations">
      <div className="container mx-auto  flex-col items-center rounded-md border-2 pt-20 ">
        <div className="flex flex-col space-y-8 rounded-md border-2 text-center">
          {/*  */}
          <div className="flex flex-row items-center justify-center space-x-6">
            <h2>Crate New Shipping Informations</h2>
            <button
              className="btnAdd"
              type="submit"
              onClick={() => createShippingInformationsMutation.mutateAsync()}
            >
              Create
            </button>
          </div>
          <h1>Filter data:</h1>
        </div>

        <ul>
          {data?.shippingData.map((data) => (
            <AllShippingInformations key={data.id} data={data} />
          ))}
        </ul>
      </div>
    </section>
  );
}

export default CreateShippingInformations;
