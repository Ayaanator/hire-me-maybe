import { X } from "lucide-react";
import { usePremium, useInteract } from "./store.js";

function PremiumModal() {
  const interactState = useInteract((s) => s.interactState);
  const setInteractState = useInteract((s) => s.setInteractState);
  const setPremiumState = usePremium((state) => state.setPremiumState);

  if (!interactState) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-100 text-center relative">
        <button
          onClick={() => setInteractState("")}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>
        <h2 className="text-lg font-semibold mb-4">
          Whoops! You've run out of <b>{interactState}</b> tokens!
        </h2>

        <div className="flex flex-row gap-3">
          <button
            onClick={() => setInteractState("")}
            className="bg-blue-500 text-white rounded-md
            text-sm p-2"
          >
            Buy 100 extra {interactState} tokens for $12.99
          </button>

          <button
            onClick={() => {setInteractState(""); setPremiumState("true");}}
            className="bg-[#ffd76b] text-black rounded-md
            text-sm p-2"
          >
            HireMeMaybe Premium
          </button>
        </div>
      </div>
  </div>
  );
}

export default PremiumModal;