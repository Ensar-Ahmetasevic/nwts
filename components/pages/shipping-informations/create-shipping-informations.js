"use client";

import LatestShippingData from "./latestShippingData";
import FormShippingInformations from "./forms/form-shipping-informations";

function CreateShippingInformations() {
  return (
    <section id="shippingInformations">
      <div className="container mx-auto flex-col items-center rounded-md border-2 pt-20">
        <FormShippingInformations />
        <LatestShippingData />
      </div>
    </section>
  );
}

export default CreateShippingInformations;
