import { useForm } from "react-hook-form";

import useCreateShippingInformationsMutation from "./../../../../requests/request-shipping-information/use-create-shipping-informations-mutation";

function FormShippingInformations() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const createShippingInformationsMutation =
    useCreateShippingInformationsMutation();

  function isFormSubmit({ companyName, driverName, registrationPlates }) {
    // Trim whitespace from each field
    const trimmedData = {
      companyName: companyName.trim(),
      driverName: driverName.trim(),
      registrationPlates: registrationPlates.trim(),
    };

    createShippingInformationsMutation.mutateAsync({ formData: trimmedData });

    reset();
  }

  return (
    <>
      <form
        className="flex flex-col space-y-8 rounded-md border-2 text-center"
        onSubmit={handleSubmit(isFormSubmit)}
      >
        <div className="flex flex-row items-center justify-center space-x-6">
          <h2>Crate New Shipping Informations</h2>

          <div className="flex w-64 flex-col space-y-2">
            <label className="text-left text-sm">Company Name:</label>
            <input
              className="input input-md input-bordered px-2"
              type="text"
              placeholder="Type here"
              {...register("companyName", {
                required: true,
              })}
            />
          </div>

          <div className="flex w-64 flex-col space-y-2">
            <label className="text-left text-sm">Driver Name:</label>
            <input
              className="input input-md input-bordered px-2"
              type="text"
              placeholder="Type here"
              {...register("driverName", {
                required: true,
              })}
            />
          </div>

          <div className="flex w-64 flex-col space-y-2">
            <label className="text-left text-sm">Registration Plates:</label>
            <input
              className="input input-md input-bordered px-2"
              type="text"
              placeholder="Type here"
              {...register("registrationPlates", {
                required: true,
              })}
            />
          </div>

          <button className="btnAdd" type="submit">
            Create
          </button>
        </div>
        <h1>Filter data by date or company name:</h1>
      </form>
    </>
  );
}

export default FormShippingInformations;
