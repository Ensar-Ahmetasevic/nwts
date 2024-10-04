export default function LoadingSpinnerPage() {
  return (
    <div className="flex flex-col items-center space-y-3">
      {/* <span className="loading loading-infinity loading-lg text-primary"></span> */}
      <p>Loading page...</p>
      <progress className="progress progress-primary w-56"></progress>
    </div>
  );
}
