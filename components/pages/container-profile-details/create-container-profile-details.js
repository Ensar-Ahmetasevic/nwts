"use client";

import { useState } from "react";

import ContainerTypeDropdown from "./container-type/container-type-dropdown";
import DynamicFormDisplay from "./dynamic-form-display";
import WasteProfileOptions from "./waste-profile/waste-profile-options";
import LocationOriginOptions from "./location-origin/location-origin-options";

export default function CreateContainerProfileDetails() {
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (buttonsData) => {
    setActiveButton(buttonsData);
  };

  return (
    <section id="shippingInformations">
      <div className="container mx-auto flex-col items-center pt-10">
        <div className="flex flex-col items-center justify-center space-y-4">
          <h2>Informations on how to crate container profile details:</h2>
          <h3>
            Each Container Profile is composed of{" "}
            <b>Location origin, Waste profile and Container type.</b> <br />{" "}
            Create new data for each of them, and then those data will be
            available when create Container Profiles.
          </h3>
        </div>

        {/* Dropdown Buttons */}

        <div className="m-6 flex flex-row justify-center space-x-3">
          {/* Location Origin Options*/}
          <LocationOriginOptions
            activeButton={activeButton}
            OnActiveButton={handleButtonClick}
          />

          {/* Waste profile Options*/}
          <WasteProfileOptions
            activeButton={activeButton}
            OnActiveButton={handleButtonClick}
          />

          {/* Container type Options*/}
          <ContainerTypeDropdown
            activeButton={activeButton}
            OnActiveButton={handleButtonClick}
          />
        </div>

        {/* Dynamic Form Display */}
        <DynamicFormDisplay
          activeButton={activeButton}
          setActiveButton={setActiveButton}
        />
      </div>
    </section>
  );
}
