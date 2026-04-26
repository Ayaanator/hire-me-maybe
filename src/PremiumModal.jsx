import { X } from "lucide-react";
import { useState } from "react";
import { usePremium, useCredit } from "./store.js";

function PremiumModal() {
  const premiumState = usePremium((s) => s.premiumState);
  const setPremiumState = usePremium((s) => s.setPremiumState);
  const setCreditState = useCredit((s) => s.setCreditState);

  const [exitStage, setExitStage] = useState(0);

  if (!premiumState) return null;

  const handleYes = () => {
    if (exitStage === 0) {
      setExitStage(1);
    } else if (exitStage === 1) {
      setExitStage(2);
    } else if (exitStage === 2) {
      setExitStage(3);
    } else {
      setPremiumState(false);
      setExitStage(0);
    }
  };

  const handleNo = () => {
    setExitStage(0);
  };

  const getTitle = () => {
    if (exitStage === 1) return "Are you sure?";
    if (exitStage === 2) return "Are you REALLY sure?";
    if (exitStage === 3) return "Are you REALLY REALLY SUPER EXTRA sure?";
    return "Upgrade to Premium 🚀";
  };

  const getDescription = () => {
    if (exitStage === 1) return "You might be missing out on key features.";
    if (exitStage === 2) return "This is your last chance to keep full access.";
    if (exitStage === 3) return "This is your FINAL chance before losing EVERYTHING!!!";
    return "Stop running out of tokens. Get full access.";
  };

  const getYesText = () => {
    if (exitStage === 1) return "Yes";
    if (exitStage === 2) return "I’m sure";
    if (exitStage === 3) return "YES, absolutely certain";
    return "";
  };

  const getNoText = () => {
    if (exitStage === 1) return "No";
    if (exitStage === 2) return "Actually no";
    if (exitStage === 3) return "Wait... no";
    return "";
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-96 text-center relative">

        <button
          onClick={handleYes}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-bold mb-2">
          {getTitle()}
        </h2>

        <p className="text-gray-600 mb-4 text-sm">
          {getDescription()}
        </p>

        {exitStage === 0 && (
          <>
            <div className="mb-4">
              <span className="text-3xl font-bold">$299.99</span>
              <span className="text-gray-500 text-sm"> / month</span>
            </div>

            <ul className="text-left text-sm text-gray-700 mb-5 space-y-1">
              <li>✔ Unlimited comments</li>
              <li>✔ Unlimited likes</li>
              <li>✔ Unlimited reposts</li>
              <li>✔ Unlimited sends</li>
              <li>✔ Infinite scrolling</li>
              <li>✔ Unlimited job applications</li>
            </ul>

            <button
              onClick={() => {
                setPremiumState(false);
                setCreditState(true);
              }}
              className="w-full bg-[#ffd76b] hover:bg-[#f5cc5c] text-black font-semibold py-2 rounded-md"
            >
              Go Premium Now
            </button>
          </>
        )}

        {exitStage > 0 && (
          <div className="flex gap-2 mt-4">
            <button
              onClick={handleNo}
              className="w-1/2 bg-gray-200 hover:bg-gray-300 text-black font-semibold p-2 rounded-md"
            >
              {getNoText()}
            </button>

            <button
              onClick={handleYes}
              className={`w-1/2 font-semibold p-2 rounded-md text-white transition ${
                exitStage === 3
                  ? "bg-red-700 hover:bg-red-800"
                  : "bg-red-500 hover:bg-red-600"
              }`}
            >
              {getYesText()}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default PremiumModal;