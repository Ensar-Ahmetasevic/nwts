import Link from "next/link";

export default function Navbar() {
  return (
    <div className="navbar bg-base-100 px-12">
      <div className="flex-1">
        <Link className="btn btn-ghost text-xl" href="/">
          Nuclear Waste Tracking System
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal space-x-3 px-1">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/shipping-informations">Shipping Informations</Link>
          </li>
          <li>
            <Link href="/container-profile">Container Details</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
