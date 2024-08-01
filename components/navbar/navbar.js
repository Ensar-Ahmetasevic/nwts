"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar bg-base-100 px-12">
      <div className="flex-1">
        <Link className="btn btn-ghost text-xl" href="/">
          Nuclear Waste Tracking System
        </Link>
      </div>

      <div className="dropdown dropdown-hover">
        <div tabIndex={0} role="button" className="btn">
          Shipping Data
        </div>
        <ul
          tabIndex={0}
          className="menu dropdown-content rounded-t-none bg-base-100 p-2"
          onMouseLeave={() => handleClose}
        >
          <li>
            <Link href="/shipping-informations" onClick={() => handleClose}>
              Add New
            </Link>
          </li>
          <li>
            <Link href="/" onClick={() => handleClose}>
              See All
            </Link>
          </li>
        </ul>
      </div>

      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/container-profile" onClick={() => handleClose}>
              Container Details
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
