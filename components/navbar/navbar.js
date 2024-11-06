"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

import Link from "next/link";

import ModalTruckDataForm from "./../pages/shipping-informations/components/modals/modal-truck-data-form";
import LoadingSpinnerPage from "./../shared/loading-spiner-page";

export default function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setIsNavigating(false);
  }, [pathname]);

  const handleClick = (destinationPath) => {
    // Only set navigating to true if we're not already on the destination path
    if (pathname !== destinationPath) {
      setIsNavigating(true);
    }
  };

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
      {/* Add Loading Overlay */}
      {isNavigating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="rounded-lg bg-base-100 p-8">
            <LoadingSpinnerPage />
          </div>
        </div>
      )}

      <nav className="navbar space-x-3 bg-base-100 px-12">
        <div className="flex-1">
          <Link
            className="btn btn-ghost text-xl"
            href="/"
            onClick={() => handleClick("/")}
          >
            Home Page
          </Link>
        </div>

        {/* Shipping Check-In */}
        <div className="dropdown dropdown-hover">
          <div tabIndex={0} role="button" className="btn w-40">
            Shipping Check-In
          </div>
          <ul className="menu dropdown-content rounded-t-none bg-base-100 p-2 px-1">
            <li>
              <button onClick={() => openModal()}>Add New</button>
            </li>
            <li>
              <Link
                href="/shipping-informations"
                onClick={() => handleClick("/shipping-informations")}
              >
                View All
              </Link>
            </li>
            <li className="bg-base-200">
              <Link
                href="/container-profile"
                onClick={() => handleClick("/container-profile")}
              >
                Container Profil Setup
              </Link>
            </li>
          </ul>
        </div>

        {/* Pre-Storage */}
        <div className="dropdown dropdown-hover">
          <div tabIndex={0} role="button" className="btn w-40">
            Pre-storage
          </div>
          <ul className="menu dropdown-content w-full rounded-t-none bg-base-100 p-2">
            <li>
              <Link
                href="/pre-storage"
                onClick={() => handleClick("/pre-storage")}
              >
                Capacity & Conditions
              </Link>
            </li>
            <li className="bg-base-200">
              <Link
                href="/pre-storage/setup"
                onClick={() => handleClick("/pre-storage/setup")}
              >
                Pre-Storage Setup
              </Link>
            </li>
          </ul>
        </div>

        {/* Final-Storage */}
        <div className="dropdown dropdown-hover">
          <div tabIndex={0} role="button" className="btn w-40">
            Final-Storage
          </div>
          <ul className="menu dropdown-content rounded-t-none bg-base-100 p-2">
            <li>
              <button onClick={() => console.log("Add final-storage")}>
                Add New
              </button>
            </li>
            <li>
              <Link
                href="/final-storage"
                onClick={() => handleClick("/final-storage")}
              >
                View All
              </Link>
            </li>
          </ul>
        </div>

        {/* Statistics */}
        <div className="dropdown dropdown-hover">
          <div tabIndex={0} role="button" className="btn w-40">
            Statistics
          </div>
          <ul className="menu dropdown-content rounded-t-none bg-base-100 p-2">
            <li>
              <button onClick={() => console.log("Add final-storage")}>
                Add New
              </button>
            </li>
            <li>
              <Link
                href="/statistics"
                onClick={() => handleClick("/statistics")}
              >
                View All
              </Link>
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
