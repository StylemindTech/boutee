import React, { useState } from "react";
import JewellerMatchesTab from "./JewellerMatchesTab";
import MobileOnlyGate from "./MobileOnlyGate";
import StyleProfileTab from "./StyleProfileTab";
import PreviewHeader from "./components/PreviewHeader/PreviewHeader";
import SegmentControl from "./components/SegmentControl/SegmentControl";
import ActionBar from "./components/ActionBar/ActionBar";

type TabKey = "matches" | "profile";

const ResultsTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("matches");

  return (
    <MobileOnlyGate>
      <div className="relative min-h-screen bg-white text-[#171719] flex flex-col overflow-hidden">
        <div className="w-full max-w-[520px] mx-auto flex-1 pb-24">
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
      </div>
    </MobileOnlyGate>
  );
};

export default ResultsTabs;
