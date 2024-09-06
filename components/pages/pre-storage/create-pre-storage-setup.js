"use client";

import { useState } from "react";
import PreStorageTypeDropdown from "./pre-storage-type/pre-storage-type-dropdown";
import PreStorageSetupDynamicFormDisplay from "./pre-storage-setup-dynamic-form-display";

export default function CreatePreStorageSetup() {
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (buttonsData) => {
    setActiveButton(buttonsData);
  };

  return (
    <section id="shippingInformations">
      <div className="container mx-auto flex-col items-center pt-10">
        <div className="flex flex-col items-center justify-center space-y-4">
          <h2>Informations on how to create Pre-Storage Setup:</h2>
          <h3>
            Each Pre-Storage have{" "}
            <b>Pre-Storage Type, Storage Loaction and Responsible Employee.</b>{" "}
            <br />
            Create new data for each of them, and then those data will be
            available when creating Pre-Strage Profile.
          </h3>
        </div>

        {/* Dropdown Buttons */}

        <div className="m-6 flex flex-row justify-center space-x-3">
          {/* Pre-Storage Type Menu*/}
          <PreStorageTypeDropdown
            activeButton={activeButton}
            OnActiveButton={handleButtonClick}
          />
        </div>

        <div>
          {/* Dynamic Form Display */}
          <PreStorageSetupDynamicFormDisplay
            activeButton={activeButton}
            setActiveButton={setActiveButton}
          />
        </div>
      </div>
    </section>
  );
}
