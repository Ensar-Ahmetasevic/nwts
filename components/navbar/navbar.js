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
        <ul className="menu menu-horizontal px-1">
          <li>
            <details>
              <summary>Shipping Data</summary>
              <ul className="rounded-t-none bg-base-100 p-2">
                <li>
                  <Link href="/shipping-informations">Add New</Link>
                </li>
                <li>
                  <Link href="/">See All</Link>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <Link href="/container-profile">Container Details</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
