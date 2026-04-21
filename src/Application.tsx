import { useState } from 'react';
import Home from './Home';
import Jobs from './Jobs';
import PremiumModal from './PremiumModal'
import { usePremium } from './store.js'

function Application() {
  const [tab, setTab] = useState<"home" | "jobs">("home");

  const premiumState = usePremium((state) => state.premiumState);
  const setPremiumState = usePremium((state) => state.setPremiumState);

  const tabs = [
    {
      id: "home" as const,
      label: "Home",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </svg>
      ),
    },
    {
      id: "jobs" as const,
      label: "Jobs",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
          <path d="M20 6h-2.18c.07-.44.18-.88.18-1.36C18 2.54 15.5 0 12.36 0c-1.73 0-3.24.98-4.1 2.44L12 6H8.6L6.37 3.05A4.39 4.39 0 0 0 4 6H2C.9 6 0 6.9 0 8v12c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-8-4c1.29 0 2.36 1.07 2.36 2.36 0 .48-.11.92-.3 1.32L12 8.45 9.94 5.68A2.365 2.365 0 0 1 12 2z" />
        </svg>
      ),
    },
  ];

  const baseTab =
    "flex flex-col items-center justify-center gap-1 px-4 py-2 transition-colors duration-200 cursor-pointer";

  const activeTab = "text-black";
  const inactiveTab = "text-gray-400 hover:text-gray-500";

  return (
    <div className="bg-[#fff9ed]">
      <nav className="border-b border-gray-200 bg-[#ffffff]">
        <div className="px-6 py-3">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="bg-[#ff7c6b] p-2 rounded-md">
              <h1 className="font-bold text-2xl text-white">
                HireMeMaybe
              </h1>
            </div>

            <div className="flex items-center gap-2">

              {tabs.map((t) => {
                const isSelected = tab === t.id;

                return (
                  <button
                    key={t.id}
                    onClick={() => setTab(t.id)}
                    className={`${baseTab} ${
                      isSelected ? activeTab : inactiveTab
                    }`}
                  >
                    {t.icon}
                    <span className="text-xs font-medium tracking-wide">
                      {t.label}
                    </span>
                  </button>
                );
              })}

              <button onClick={() => setPremiumState("true")}
              className="ml-2 px-4 py-2 text-xs font-semibold bg-[#ffd76b] text-black rounded-full hover:bg-[#daa000] transition cursor-pointer">
                Premium
              </button>

            </div>
          </div>
        </div>
      </nav>

      {tab === "home" && <Home />}
      {tab === "jobs" && <Jobs />}

      <PremiumModal/>
    </div>
  );
}

export default Application;