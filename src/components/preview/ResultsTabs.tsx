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
      <div className="min-h-screen bg-[#f5f6f8] text-[#171719] flex flex-col">
        <div className="w-full max-w-[520px] mx-auto flex-1 pb-36">
          <PreviewHeader title="Your results" />

          <div className="px-5 mt-2">
            <SegmentControl
              items={[
                { id: "matches", label: "Your jeweller matches" },
                { id: "profile", label: "Your style profile" },
              ]}
              activeItemId={activeTab}
              onItemClick={(id) => setActiveTab(id as TabKey)}
            />
          </div>

        <main className="px-5 mt-6 flex-1 overflow-y-auto">
            {activeTab === "matches" ? <JewellerMatchesTab /> : <StyleProfileTab />}
          </main>
        </div>
        <ActionBar
          helperText={
            activeTab === "matches" ? "See all your matches on Boutee" : "Refine your style profile on Boutee"
          }
          label="Continue"
          href="/app"
        />
      </div>
    </MobileOnlyGate>
  );
};

export default ResultsTabs;
