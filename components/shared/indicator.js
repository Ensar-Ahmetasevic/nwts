export default function Indicator() {
  return (
    <div className="relative inline-flex h-4 w-4">
      <span className="absolute inline-flex h-3 w-3 animate-ping rounded-full bg-sky-400 opacity-75"></span>
      <span className="relative inline-flex h-3 w-3 rounded-full bg-sky-500"></span>
    </div>
  );
}
