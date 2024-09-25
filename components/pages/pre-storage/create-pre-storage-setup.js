"use client";

import { useState } from "react";
import PreStorageSetupDynamicFormDisplay from "./pre-storage-setup-dynamic-form-display";
import PreStorageEmployeeDropdown from "./pre-storage-employee/pre-storage-employee-dropdown";
import PreStorageLocationDropdown from "./pre-storage-locatino/pre-storage-location-dropdown";

export default function CreatePreStorageSetup() {
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (buttonsData) => {
    setActiveButton(buttonsData);
  };

  return (
    <section id="preStorageSetup">
      <div className="container mx-auto flex flex-col items-center pt-10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2>Informations on how to create Pre-Storage Setup:</h2>
          <h3>
            Each Pre-Storage have{" "}
            <b>Pre-Storage Location and Responsible Employee.</b> <br />
            Create new data for each of them, and then those data will be
            available when creating Pre-Strage Profile.
          </h3>
        </div>

        {/* Dropdown Buttons */}

        <div className="m-6 flex flex-row justify-center space-x-3">
          {/* Pre-Storage Location Menu*/}
          <PreStorageLocationDropdown
            activeButton={activeButton}
            OnActiveButton={handleButtonClick}
          />

          {/* Pre-Storage Location Menu*/}
          <PreStorageEmployeeDropdown
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
