export default function HomePage() {
  return (
    <main className="min-h-screen bg-base-300">
      {/* Hero Section */}
      <section className="hero min-h-[30vh] bg-base-300 pb-0">
        <div className="hero-content text-center">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold">
              Nuclear Waste Tracking System
            </h1>
            <p className="py-6">
              Comprehensive solution for managing and monitoring nuclear waste
              throughout its lifecycle - from origin to final storage.
            </p>
          </div>
        </div>
      </section>

      {/* Safety Stats Section */}
      <section className="flex justify-center bg-base-300 pb-8 pt-0">
        <div className="stats w-full max-w-4xl shadow">
          <div className="stat place-items-center">
            <div className="stat-title">Active Containers</div>
            <div className="stat-value">31K</div>
            <div className="stat-desc">From January 1st to February 1st</div>
          </div>

          <div className="stat place-items-center">
            <div className="stat-title">Storage Capacity</div>
            <div className="stat-value text-success">86%</div>
            <div className="stat-desc text-success">
              ↗︎ 2% more than last month
            </div>
          </div>

          <div className="stat place-items-center">
            <div className="stat-title">Safety Rating</div>
            <div className="stat-value">98%</div>
            <div className="stat-desc">↗︎ Exceeds standards</div>
          </div>
        </div>
      </section>

      {/* Key Features Grid */}
      <section className="flex justify-center p-8">
        <div className="grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Waste Management */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Waste Management</h2>
              <p>
                Track different waste profiles, container types, and storage
                requirements
              </p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Manage Waste</button>
              </div>
            </div>
          </div>

          {/* Storage Monitoring */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Storage Monitoring</h2>
              <p>
                Monitor temperature, radiation, humidity and pressure in storage
                facilities
              </p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">View Storage</button>
              </div>
            </div>
          </div>

          {/* Transportation */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Transportation</h2>
              <p>Track shipping information and container movements</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Track Shipments</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
