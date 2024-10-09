import { LuAlertTriangle } from "react-icons/lu";

export default function WarningMessage({ warningColor, warningMessage }) {
  return (
    <div
      className={`alert ${warningColor} mb-6 flex w-full justify-center text-xl font-bold text-white`}
    >
      <div className="flex items-center space-x-6">
        <LuAlertTriangle className="h-8 w-8" />
        {/* Warning Message */}
        <span>{warningMessage}</span>
      </div>
    </div>
  );
}
