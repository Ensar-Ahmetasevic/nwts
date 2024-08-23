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
      <nav className="navbar bg-base-100 px-12">
        <div className="flex-1">
          <Link className="btn btn-ghost text-xl" href="/">
            Home Page
          </Link>
        </div>

        <div className="dropdown dropdown-hover">
          <div tabIndex={0} role="button" className="btn">
            Shipping Data
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content rounded-t-none bg-base-100 p-2"
          >
            <li>
              <button onClick={() => openModal()}>Add New</button>
            </li>
            <li>
              <Link href="/shipping-informations">See All</Link>
            </li>
          </ul>
        </div>

        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href="/container-profile">Container Details</Link>
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
