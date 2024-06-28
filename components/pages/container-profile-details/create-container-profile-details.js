"use client";

import { useState } from "react";

import FormLocationOrigin from "./location-origin/form-location-origin";
import FormContainerType from "./container-type/form-container-type";
import FormWasteProfile from "./waste-profile/form-waste-profile";
import ShowContainerType from "./container-type/show-container-type";
import useContainerTypeQuery from "./../../../requests/request-container-profile/request-container-type/use-fetch-container-type";

import { IoMdAddCircleOutline } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import { PiCursorClickBold } from "react-icons/pi";

export default function CreateContainerProfileDetails() {
  const [activeButton, setActiveButton] = useState(null);
  const [dropdownContent, setDropdownContent] = useState(true);

  const { data: containerTypeData } = useContainerTypeQuery();

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  return (
    <section id="shippingInformations">
      <div className="container mx-auto flex-col items-center rounded-md border-2 pt-20">
        <div className="flex flex-col rounded-md border-2  p-3 text-center">
          {/*  */}
          <div className="flex flex-col items-center justify-center space-y-4">
            <h2>Informations on how to crate container profile details:</h2>
            <h3>
              Each Container Profile is composed of{" "}
              <b>Location origin, Waste profile and Container type.</b> <br />{" "}
              Create new data for each of them, and then those data will be
              available when create Container Profiles.
            </h3>
          </div>
        </div>

        <div className="m-6 flex flex-row justify-center space-x-3">
          {/*  */}
          {/* Location Origin */}
          <div className="dropdown dropdown-content">
            <div
              tabIndex={0}
              role="button"
              className={`btn m-1 ${activeButton === "Location origin Form" ? "border-2 border-solid border-red-600" : null}`}
            >
              Location Origin <PiCursorClickBold />
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow"
            >
              <li>
                <button
                  onClick={() => handleButtonClick("Location origin Form")}
                >
                  Add <IoMdAddCircleOutline />
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleButtonClick("Location origin Form")}
                >
                  Edit/Delete <CiEdit />
                </button>
              </li>
            </ul>
          </div>

          {/* Waste profile */}
          <div className="dropdown dropdown-content">
            <div
              tabIndex={0}
              role="button"
              className={`btn m-1 ${activeButton === "Waste profile Form" ? "border-2 border-solid border-red-600" : null}`}
            >
              Waste profile <PiCursorClickBold />
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow"
            >
              <li>
                <button onClick={() => handleButtonClick("Waste profile Form")}>
                  Add <IoMdAddCircleOutline />
                </button>
              </li>
              <li>
                <button onClick={() => handleButtonClick("Waste profile Form")}>
                  Edit/Delite <CiEdit />
                </button>
              </li>
            </ul>
          </div>

          {/* Container type*/}
          <div className="dropdown dropdown-content">
            <div
              tabIndex={0}
              role="button"
              className={`btn m-1 ${activeButton === "Container type Form" || activeButton === "Show Container Type" ? "border-2 border-solid border-red-600" : null}`}
              onClick={() => setDropdownContent(!dropdownContent)}
            >
              Container type <PiCursorClickBold />
            </div>

            {dropdownContent ? (
              <ul
                tabIndex={0}
                className="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow"
              >
                <li>
                  <button
                    onClick={() => {
                      handleButtonClick("Container type Form");
                      setDropdownContent(!dropdownContent);
                    }}
                  >
                    Add <IoMdAddCircleOutline />
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      handleButtonClick("Show Container Type");
                      setDropdownContent(!dropdownContent);
                    }}
                  >
                    Edit/Delete <CiEdit />
                  </button>
                </li>
              </ul>
            ) : null}
          </div>
        </div>

        <div>
          {activeButton === "Location origin Form" ? (
            <FormLocationOrigin cancelLocationOriginForm={setActiveButton} />
          ) : null}

          {activeButton === "Container type Form" ? (
            <FormContainerType cancelContainerTypeForm={setActiveButton} />
          ) : null}

          {activeButton === "Waste profile Form" ? (
            <FormWasteProfile cancelWasteProfileForm={setActiveButton} />
          ) : null}

          {activeButton === "Show Container Type" ? (
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Details</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {containerTypeData?.map((containerData) => (
                    <ShowContainerType
                      key={containerData.id}
                      isCancel={() => setActiveButton(null)}
                      containerData={containerData}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
