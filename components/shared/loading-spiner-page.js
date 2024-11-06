export default function LoadingSpinnerPage() {
  return (
    <div className="flex flex-col items-center space-y-3">
      <p>Loading ...</p>
      <span className="loading loading-bars loading-lg text-primary"></span>
    </div>
  );
}
