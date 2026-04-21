import { X } from "lucide-react";
import { usePremium, useCredit } from "./store.js";

function PremiumModal() {
  const premiumState = usePremium((s) => s.premiumState);
  const setPremiumState = usePremium((s) => s.setPremiumState);

  const setCreditState = useCredit((s) => s.setCreditState);

  if (!premiumState) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-96 text-center relative">

        <button
          onClick={() => setPremiumState(false)}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-bold mb-2">
          Upgrade to Premium 🚀
        </h2>

        <p className="text-gray-600 mb-4 text-sm">
          Stop running out of tokens. Get full access.
        </p>

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

      </div>
    </div>
  );
}

export default PremiumModal;