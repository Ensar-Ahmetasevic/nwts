"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";

function ShippingInformations() {
  const [showContainerProfile, setshowContainerProfile] = useState(null);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  function toggleContainerProfileHandler() {
    setshowContainerProfile(!showContainerProfile);
  }

  return (
    <>
      <section id="shippingInformations">
        <div className="container mx-auto flex flex-row justify-center  rounded-md border-4 pt-20 text-center">
          <div className="mx-1/2 container flex flex-col space-y-8 rounded-md border-4 text-center">
            <div className="flex flex-row items-center justify-center space-x-6">
              <h2>Crate New Shipping Informations</h2>
              <button
                className="btnCancel"
                onClick={() => toggleContainerProfileHandler()}
                disabled={showContainerProfile}
              >
                Create
              </button>
            </div>

            <div>
              <h3>Name: ID Numer + Date</h3> <h3>Created: Time and Date</h3>
            </div>

            {/* {data ? (
              <div>
                <h3>Name:</h3> <h3>Created: Time and Date</h3>
              </div>
            ) : null} */}

            {/* Add Container Profiles Data  */}
            {showContainerProfile ? (
              <form className="flex flex-col items-center space-y-3">
                <div className="flex flex-col items-center space-y-1 ">
                  <label htmlFor="quantity">
                    Enter the number of containers:
                  </label>
                  <input
                    className="flex-1 rounded-md border-2 px-1 py-1"
                    id="quantity"
                    type="number"
                    placeholder="Enter container quantity"
                  />
                </div>

                <div>
                  <button className="button-add" type="submit">
                    Save
                  </button>
                </div>
              </form>
            ) : null}
          </div>

          {/* Container Profiles Data Details*/}
          <div className="mx-1/2 container flex flex-col space-y-8 rounded-md border-4 text-left">
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
