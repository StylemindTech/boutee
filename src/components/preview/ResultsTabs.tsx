import React, { useEffect, useMemo, useState } from "react";
import JewellerMatchesTab from "./JewellerMatchesTab";
import MobileOnlyGate from "./MobileOnlyGate";
import StyleProfileTab from "./StyleProfileTab";
import PreviewHeader from "./components/PreviewHeader/PreviewHeader";
import SegmentControl from "./components/SegmentControl/SegmentControl";
import ActionBar from "./components/ActionBar/ActionBar";

type TabKey = "matches" | "profile";

const progressSteps = ["Analysing your swipes", "Searching Boutee jewellers", "Calculating match %"];
const calculatingSeenKey = "previewCalculatingSeen";

const ResultsTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("matches");
  const [showCalculating, setShowCalculating] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return !window.sessionStorage.getItem(calculatingSeenKey);
  });
  const [completionStep, setCompletionStep] = useState(0);

  useEffect(() => {
    if (!showCalculating) return;
    setCompletionStep(0);
    // Mark as seen immediately to avoid re-show if React re-renders in dev/StrictMode
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(calculatingSeenKey, "1");
    }
    const stepTimers = [600, 1500, 2400].map((ms, idx) =>
      window.setTimeout(() => setCompletionStep(idx + 1), ms)
    );
    const hideTimer = window.setTimeout(() => {
      setShowCalculating(false);
    }, 3200);
    return () => {
      stepTimers.forEach((t) => window.clearTimeout(t));
      window.clearTimeout(hideTimer);
    };
  }, [showCalculating]);

  const contentStyle = useMemo(
    () => ({
      transform: showCalculating ? "translateY(12px)" : "translateY(0)",
      opacity: showCalculating ? 0.85 : 1,
      transition: "transform 260ms ease, opacity 260ms ease",
    }),
    [showCalculating]
  );

  return (
    <MobileOnlyGate>
      <div className="relative min-h-screen bg-white text-[#171719] flex flex-col overflow-hidden">
        <div className="w-full max-w-[520px] mx-auto flex-1 pb-24" style={contentStyle}>
          <PreviewHeader title="Your results" />

          <div className="mt-0">
            <div
              className="w-full overflow-hidden rounded-[var(--radius-l)] bg-white shadow-[var(--shadow-panel-top)]"
              style={{
                backgroundColor: "var(--Surface-Primary)",
                boxShadow: "0px -3px 15px #5580c014",
              }}
            >
              <div className="px-3 pt-3 pb-2">
                <SegmentControl
                  items={[
                    { id: "matches", label: "Jeweller Matches" },
                    { id: "profile", label: "Style Profile" },
                  ]}
                  activeItemId={activeTab}
                  onItemClick={(id) => setActiveTab(id as TabKey)}
                />
              </div>
              <div className="px-3 pb-4 pt-1 relative">
                <div
                  aria-hidden={activeTab !== "matches"}
                  style={{
                    position: activeTab === "matches" ? "relative" : "absolute",
                    inset: activeTab === "matches" ? "auto" : 0,
                    opacity: activeTab === "matches" ? 1 : 0,
                    visibility: activeTab === "matches" ? "visible" : "hidden",
                    pointerEvents: activeTab === "matches" ? "auto" : "none",
                    width: "100%",
                  }}
                >
                  <JewellerMatchesTab />
                </div>
                <div
                  aria-hidden={activeTab !== "profile"}
                  style={{
                    position: activeTab === "profile" ? "relative" : "absolute",
                    inset: activeTab === "profile" ? "auto" : 0,
                    opacity: activeTab === "profile" ? 1 : 0,
                    visibility: activeTab === "profile" ? "visible" : "hidden",
                    pointerEvents: activeTab === "profile" ? "auto" : "none",
                    width: "100%",
                  }}
                >
                  <StyleProfileTab isActive={activeTab === "profile"} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <ActionBar
          helperText={
            activeTab === "matches" ? "See all your matches on Boutee" : "Refine your style profile on Boutee"
          }
          label="Continue For Free"
          href="https://app.boutee.co.uk/"
        />

        {showCalculating && (
          <div className="absolute inset-0 bg-white/96 backdrop-blur-sm z-40 flex items-center justify-center px-4">
            <div className="w-full max-w-[360px] text-left flex flex-col gap-5">
              <h3
                className="m-0 text-[1.25rem] font-[700] text-[#171719]"
                style={{ fontFamily: "var(--font-family-primary)" }}
              >
                Calculating your matches
              </h3>
              <div className="flex flex-col gap-5">
                {progressSteps.map((label, idx) => {
                  const done = completionStep > idx;
                  return (
                    <div
                      key={label}
                      className="flex items-center gap-3 p-1 rounded-xl"
                      style={{
                        background: done ? "#f0f1f5" : "#fafafa",
                      }}
                    >
                      <div
                        className="h-7 w-7 p-1 rounded-full flex items-center justify-center border"
                        style={{
                          background: done ? "#b9f551" : "#fafafa",
                          borderColor: done ? "#b9f551" : "#d5d9e1",
                        }}
                      >
                        {done && (
                          <svg viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden="true">
                            <path
                              d="M4 8.5 6.5 11 12 5"
                              stroke="#0f1b03"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </div>
                      <span
                        className={`text-[0.95rem] leading-tight ${
                          done ? "text-[#171719] font-semibold" : "text-[#4b4f58]"
                        }`}
                        style={{ fontFamily: "var(--font-family-primary)" }}
                      >
                        {label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </MobileOnlyGate>
  );
};

export default ResultsTabs;
