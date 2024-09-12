"use client";

import { useState } from "react";

import ContainerTypeDropdown from "./container-type/container-type-dropdown";
import DynamicFormDisplay from "./dynamic-form-display";
import WasteProfileDropdown from "./waste-profile/waste-profile-dropdown";
import LocationOriginDropdown from "./location-origin/location-origin-dropdown";

export default function CreateContainerProfileDetails() {
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (buttonsData) => {
    setActiveButton(buttonsData);
  };

  return (
    <section id="shippingInformations">
      <div className="container mx-auto flex-col items-center pt-10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2>Informations on how to create container profile details:</h2>
          <h3>
            Each Container Profile is composed of{" "}
            <b>Location origin, Waste profile and Container type.</b> <br />{" "}
            Create new data for each of them, and then those data will be
            available when creating Container Profiles.
          </h3>
        </div>

        {/* Dropdown Buttons */}

        <div className="m-6 flex flex-row justify-center space-x-3">
          {/* Location Origin Options*/}
          <LocationOriginDropdown
            activeButton={activeButton}
            OnActiveButton={handleButtonClick}
          />

          {/* Waste profile Options*/}
          <WasteProfileDropdown
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
