"use client";
import { useState } from "react";
import FormLocationOrigin from "./../location-origin/form-location-origin";
import FormContainerType from "./../container-type/form-container-type";

function CreateContainerProfile() {
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  return (
    <section id="shippingInformations">
      <div className="container mx-auto flex-col items-center rounded-md border-2 pt-20">
        <div className="flex flex-col rounded-md border-2  p-3 text-center">
          {/*  */}
          <div className="flex flex-col items-center justify-center space-y-4">
            <h2>Informations on how to crate container profile:</h2>
            <h3>
              Each Container Profile is composed of Location origin, Waste
              profile and Container type. You add new data for each of the
              above, and then this data will be available to you when you create
              your Container Profile.
            </h3>
          </div>
        </div>

        <div className="i m-6 flex flex-row justify-center space-x-3">
          <button
            className="btnAdd"
            disabled={activeButton === "Location origin"}
            onClick={() => handleButtonClick("Location origin")}
          >
            Add Location origin
          </button>
          <button
            className="btnAdd"
            disabled={activeButton === "Waste profile"}
            onClick={() => handleButtonClick("Waste profile")}
          >
            Add Waste profile
          </button>
          <button
            className="btnAdd"
            disabled={activeButton === "Container type"}
            onClick={() => handleButtonClick("Container type")}
          >
            Add Container type
          </button>
        </div>

        <div>
          {activeButton === "Location origin" ? (
            <FormLocationOrigin cancelLocationOriginForm={setActiveButton} />
          ) : null}

          {activeButton === "Container type" ? (
            <FormContainerType cancelContainerTypeForm={setActiveButton} />
          ) : null}
        </div>
      </div>
    </section>
  );
}

export default CreateContainerProfile;
