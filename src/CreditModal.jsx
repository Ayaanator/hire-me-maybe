import { X } from "lucide-react";
import { useCredit } from "./store.js";

function CreditModal() {
  const creditState = useCredit((s) => s.creditState);
  const setCreditState = useCredit((s) => s.setCreditState);

  if (!creditState) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-96 relative">

        <button
          onClick={() => setCreditState(false)}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-bold mb-4 text-center">
          Payment Details 💳
        </h2>

        <input placeholder="Card Number" className="w-full p-2 border mb-3 rounded-md" />
        <div className="flex gap-3 mb-3">
          <input placeholder="MM/YY" className="w-1/2 p-2 border rounded-md" />
          <input placeholder="CVV" className="w-1/2 p-2 border rounded-md" />
        </div>
        <input placeholder="Name" className="w-full p-2 border mb-4 rounded-md" />

        <button
          onClick={() => {
            setCreditState(false);
            alert("fake payment");
          }}
          className="w-full bg-[#ffd76b] py-2 rounded-md font-semibold"
        >
          Pay $299.99
        </button>

        <div className="text-xs mt-3 text-gray-300">
          + $89.99 one time purchase fee <br></br>+ 40% ($119.99) sales tax
        </div>

      </div>
    </div>
  );
}

export default CreditModal;