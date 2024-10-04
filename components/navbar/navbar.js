"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import ModalTruckDataForm from "./../pages/shipping-informations/components/modals/modal-truck-data-form";

export default function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const onSubmitForm = (isSuccess) => {
    if (!isSuccess) {
      // Close the modal after form submission
      setIsModalOpen(false);
      router.push("/shipping-informations");
    }
  };

  return (
    <>
      <nav className="navbar space-x-3 bg-base-100 px-12">
        <div className="flex-1">
          <Link className="btn btn-ghost text-xl" href="/">
            Home Page
          </Link>
        </div>

        {/* Shipping Check-In */}
        <div className="dropdown dropdown-hover">
          <div tabIndex={0} role="button" className="btn w-40">
            Shipping Check-In
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content rounded-t-none bg-base-100 p-2 px-1"
          >
            <li>
              <button onClick={() => openModal()}>Add New</button>
            </li>
            <li>
              <Link href="/shipping-informations">View All</Link>
            </li>

            <li className="bg-base-200">
              <Link href="/container-profile">Container Profil Setup</Link>
            </li>
          </ul>
        </div>

        {/* Pre-Storage */}
        <div className="dropdown dropdown-hover">
          <div tabIndex={0} role="button" className="btn w-40">
            Pre-storage
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content w-full rounded-t-none bg-base-100 p-2"
          >
            <li>
              <Link href="/pre-storage">Capacity & Conditions</Link>
              {/* Shows the current capacity of each storage facility, along with information on the types of waste
              being stored, temperature ... */}
            </li>
            <li>
              <Link href="/">Add Conditions</Link>
            </li>

            <li className="bg-base-200">
              <Link href="/pre-storage/setup">Pre-Storage Setup</Link>
            </li>
          </ul>
        </div>

        {/* Final-Storage */}
        <div className="dropdown dropdown-hover">
          <div tabIndex={0} role="button" className="btn w-40">
            Final-Storage
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content rounded-t-none bg-base-100 p-2"
          >
            <li>
              <button onClick={() => console.log("Add final-storage")}>
                Add New
              </button>
            </li>
            <li>
              <Link href="/">View All</Link>
            </li>
          </ul>
        </div>

        {/* Statistics */}
        <div className="dropdown dropdown-hover">
          <div tabIndex={0} role="button" className="btn w-40">
            Statistics
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content w-full rounded-t-none bg-base-100 p-2"
          >
            <li>
              <button onClick={() => console.log("Add final-storage")}>
                Add New
              </button>
            </li>
            <li>
              <Link href="/">View All</Link>
            </li>
          </ul>
        </div>
      </nav>

      {isModalOpen ? (
        <ModalTruckDataForm
          closeModal={closeModal}
          onSubmitForm={onSubmitForm}
        />
      ) : null}
    </>
  );
}
