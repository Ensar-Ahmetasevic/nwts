"use client";

import AllShippingInformations from "./all-shipping-informations";
import useShippingInformationQuery from "../../../requests/request-shipping-information/use-fetch-shipping-informations";

import FormShippingInformations from "./form-shipping-informations";

function CreateShippingInformations() {
  //Fetching data
  const { data } = useShippingInformationQuery();

  return (
    <section id="shippingInformations">
      <div className="container mx-auto  flex-col items-center rounded-md border-2 pt-20 ">
        <FormShippingInformations />

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
