"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";

import useCreateShippingInformationsMutation from "../../requests/requests-for-shipping-information/use-create-shipping-informations-mutation";
import useShippingInformationQuery from "../../requests/requests-for-shipping-information/use-shipping-informations-query";

function ShippingInformations() {
  const [showContainerProfile, setshowContainerProfile] = useState(false);

  // const { data } = useShippingInformationQuery();

  // console.log("I am comming from frontend page:", data);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const createShippingInformationsMutation =
    useCreateShippingInformationsMutation();

  function isShippingFormSubmit(data) {
    const name = data.name.trim(); // Remove leading and trailing whitespace

    if (name === "") {
      reset();
      return;
    }

    createShippingInformationsMutation.mutateAsync({ name });

    reset();
  }

  function toggleContainerProfileHandler() {
    setshowContainerProfile(!showContainerProfile);
  }

  function isFormSubmit(data) {
    // console.log(data.quantity);
    // console.log(data.locationOrigin);
    // console.log(data.wasteProfile);
    // console.log(data.containerType);

    setshowContainerProfile(false);
    reset();
  }

  return (
    <>
      <section id="shippingInformations">
        <div className="container mx-auto flex flex-row justify-center  rounded-md border-2 pt-20 text-center">
          <div className="mx-1/2 container flex flex-col space-y-8 rounded-md border-2 text-center">
            <div className="flex flex-row items-center justify-center space-x-6">
              <h2>Crate New Shipping Informations</h2>
              <form onSubmit={handleSubmit(isShippingFormSubmit)}>
                <input
                  className="input input-bordered input-md px-2"
                  type="text"
                  placeholder="Name"
                  {...register("name", {
                    required: true,
                  })}
                />
                <button
                  className="btnCancel"
                  type="submit"
                  disabled={showContainerProfile}
                >
                  Create
                </button>
              </form>
            </div>

            <div>
              <h3>Shiping name: 001 29.01.2024</h3>
            </div>

            {/* {data ? (
              <div>
                <h3>Name:</h3> <h3>Created: Time and Date</h3>
              </div>
            ) : null} */}

            {/* Add Container Profiles Data  */}
            {showContainerProfile ? (
              <form
                className="flex flex-col items-start space-y-4"
                onSubmit={handleSubmit(isFormSubmit)}
              >
                <div className="flex flex-col space-y-2">
                  <label className="text-left text-sm">Quantity:</label>
                  <input
                    className="input input-bordered input-md px-2"
                    type="number"
                    placeholder="Type here"
                    {...register("quantity", {
                      required: true,
                      min: 1,
                    })}
                  />
                  {errors.example && <p>This is required</p>}
                </div>

                {/* Location origin */}
                <div className="flex w-64 flex-col space-y-2">
                  <label
                    className="text-left text-sm"
                    htmlFor="location-origin"
                  >
                    Please select location origin
                  </label>

                  <select
                    className="select select-bordered select-md px-2"
                    id="location-origin"
                    {...register("locationOrigin")}
                  >
                    <option>---</option>
                    <option value="Zwischenlager Brokdorf">
                      Zwischenlager Brokdorf
                    </option>
                    <option value="Zwischenlager Ahaus">
                      Zwischenlager Ahaus
                    </option>
                  </select>
                </div>

                {/* Waste profile */}
                <div className="flex w-64 flex-col space-y-2">
                  <label className="text-left text-sm" htmlFor="waste-profile">
                    Please select waste profile
                  </label>

                  <select
                    className="select select-bordered select-md px-2"
                    id="waste-profile"
                    {...register("wasteProfile")}
                  >
                    <option>---</option>
                    <option value="M001">M001</option>
                    <option value="M002">M002</option>
                  </select>
                </div>

                {/* Container type */}
                <div className="flex w-64 flex-col space-y-2">
                  <label className="text-left text-sm" htmlFor="container-type">
                    Please select container type
                  </label>

                  <select
                    className="select select-bordered select-md px-2"
                    id="container-type"
                    {...register("containerType")}
                  >
                    <option>---</option>
                    <option value="Concrete container">
                      Concrete container
                    </option>
                    <option value="Strengthened steel container">
                      Strengthened steel container
                    </option>
                  </select>
                </div>

                <div>
                  <button className="btnSave" type="submit">
                    Save
                  </button>
                </div>
              </form>
            ) : null}
          </div>

          {/* Container Profiles Data Details*/}
          <div className="mx-1/2 container flex flex-col space-y-8 rounded-md border-2 text-left">
            <h1 className="mb-4 text-lg font-medium">
              Shipping informations data:
            </h1>
            <ul>
              <li>Container Profile: ID 00203</li>
              <li>Quantity: 10</li>
              <li>Location origin: Zwischenlager Brokdorf</li>
              <li>Waste profile: M002</li>
              <li>Container type: Strengthened steel containerContainer</li>
            </ul>

            <ul>
              <li>Container Profile: ID 00202</li>
              <li>Quantity: 15</li>
              <li>Location origin: Zwischenlager Brokdorf</li>
              <li>Waste profile: M001</li>
              <li>Container type: Strengthened steel containerContainer</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

export default ShippingInformations;
