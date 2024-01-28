"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";

function ShippingInformations() {
  const [showContainerProfile, setshowContainerProfile] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);

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

  function isFormSubmit(data) {
    console.log(data.example);
    console.log(errors.example);

    setshowContainerProfile(false);
    reset();
  }

  const handleMouseDown = () => {
    setIsMouseDown(true);
    console.log("isMouseDown - true");
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
    console.log("isMouseDown - false");
  };

  return (
    <>
      <section id="shippingInformations">
        <div className="container mx-auto flex flex-row justify-center  rounded-md border-2 pt-20 text-center">
          <div className="mx-1/2 container flex flex-col space-y-8 rounded-md border-2 text-center">
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
              <form
                className="flex flex-col items-center space-y-3"
                onSubmit={handleSubmit(isFormSubmit)}
              >
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Quantity:</span>
                  </div>
                  <input
                    className="input input-bordered w-full max-w-xs"
                    type="number"
                    placeholder="Type here"
                    {...register("example", {
                      required: true,
                      min: 1,
                    })}
                  />
                  {errors.example && <p>This is required</p>}
                </label>

                <label htmlFor="location-origin">
                  Please select location origin
                  <select
                    className="select select-bordered w-full max-w-xs"
                    id="location-origin"
                    label="Favorite Animal"
                    {...register("gender")}
                  >
                    <option value="Zwischenlager Brokdorf">
                      Zwischenlager Brokdorf
                    </option>
                    <option value="Zwischenlager Ahaus">
                      Zwischenlager Ahaus
                    </option>
                  </select>
                </label>

                <div>
                  <button
                    className={`border-2 border-red-500 p-2 ${isMouseDown ? "scale-95 rounded-md shadow-lg transition duration-200 ease-in-out" : ""}`}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    type="submit"
                  >
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
