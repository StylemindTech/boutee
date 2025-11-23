import React, { useEffect, useState } from "react";

type MobileOnlyGateProps = {
  children: React.ReactNode;
  message?: string;
};

const MobileOnlyGate: React.FC<MobileOnlyGateProps> = ({
  children,
  message = "This is only available on Mobile.",
}) => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkViewport = () => {
      const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
      const matchesUA = /iPhone|iPad|iPod|Android/i.test(ua);
      const smallScreen = typeof window !== "undefined" ? window.innerWidth <= 820 : false;
      setIsMobile(matchesUA || smallScreen);
    };

    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  if (isMobile === null) {
    return (
      <div style={gateStyle}>
        <p className="text-sm text-[#73737d]">Loading...</p>
      </div>
    );
  }

  if (!isMobile) {
    return (
      <div style={gateStyle}>
        <p className="text-base font-semibold text-[#171719]">{message}</p>
      </div>
    );
  }

  return <>{children}</>;
};

const gateStyle: React.CSSProperties = {
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "2.5rem 1.5rem",
  background: "#f8f8f8",
  color: "#171719",
  textAlign: "center",
};

export default MobileOnlyGate;
