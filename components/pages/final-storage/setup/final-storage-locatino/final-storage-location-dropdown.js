"use client";

import { useState } from "react";

import { PiCursorClickBold } from "react-icons/pi";
import { IoMdAddCircleOutline } from "react-icons/io";
import { CiEdit } from "react-icons/ci";

export default function FinalStorageLocationDropdown({
  OnActiveButton,
  activeButton,
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="dropdown dropdown-content">
        <div
          tabIndex={0}
          role="button"
          className={`btn m-1 ${["Final-Storage_Location_Form", "Final-Storage_Location_Table"].includes(activeButton) ? "border-2 border-solid border-red-600" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          Final-Storage Location <PiCursorClickBold />
        </div>

        {isOpen ? (
          <ul
            tabIndex={0}
            className="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow"
          >
            <li>
              <button
                onClick={() => {
                  OnActiveButton("Final-Storage_Location_Form");
                  setIsOpen(false);
                }}
              >
                Add <IoMdAddCircleOutline />
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  OnActiveButton("Final-Storage_Location_Table");
                  setIsOpen(false);
                }}
              >
                Edit / Delete <CiEdit />
              </button>
            </li>
          </ul>
        ) : null}
      </div>
      <div></div>
    </>
  );
}
