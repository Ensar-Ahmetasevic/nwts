"use client";

import FormShippingInformations from "./components/forms/form-shipping-informations";

function CreateShippingInformations() {
  return (
    <section id="shippingInformations">
      <div className="container mx-auto flex-col items-center">
        <FormShippingInformations />
      </div>
    </section>
  );
}

export default CreateShippingInformations;
