import React, { useState, useEffect } from "react";
import { Radar } from "react-chartjs-2";
import tech1 from "../../assets/Image/tech-1.png";
import tech2 from "../../assets/Image/tech-2.png";
import tech3 from "../../assets/Image/tech-3.png";
import tech4 from "../../assets/Image/tech-4.png";
import tech5 from "../../assets/Image/tech-5.png";
import tech6 from "../../assets/Image/tech-6.png";
import tech7 from "../../assets/Image/tech-7.png";
import tech8 from "../../assets/Image/tech-8.png";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const labels = [
  "Classic",
  "Bold",
  "Monotone",
  "Organic",
  "Alternative",
  "Minimalist",
  "Colourful",
  "Refined",
];

const ringDataVectors = [
  [65, 59, 80, 81, 56, 55, 40, 70],
  [45, 68, 75, 60, 50, 40, 80, 66],
  [70, 40, 60, 90, 55, 50, 70, 60],
  [55, 62, 77, 49, 69, 60, 45, 75],
  [80, 58, 65, 70, 60, 45, 55, 72],
  [62, 70, 60, 80, 59, 49, 65, 67],
  [59, 60, 66, 76, 44, 48, 72, 69],
  [75, 50, 78, 64, 62, 55, 60, 71],
];

const ringImages = [tech1, tech2, tech3, tech4, tech5, tech6, tech7, tech8];

const RingStyleAnalyzer = () => {
  const [chartData, setChartData] = useState(ringDataVectors[0]);
  const [activeIndex, setActiveIndex] = useState(0);

  const radarData = {
    labels,

    datasets: [
      {
        label: "Style Profile",
        data: chartData,
        borderWidth: 2,
        pointBackgroundColor: "#fff",
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            return "rgba(185, 245, 81, 0.4)";
          }

          const gradient = ctx.createLinearGradient(
            chartArea.left,
            chartArea.top,
            chartArea.right,
            chartArea.bottom
          );

          gradient.addColorStop(0, "rgba(185, 245, 81, 0.4)");
          gradient.addColorStop(1, "rgba(215, 246, 80, 0.4)");

          return gradient;
        },

        borderColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            return "#B9F551";
          }

          const gradient = ctx.createLinearGradient(
            chartArea.left,
            chartArea.top,
            chartArea.right,
            chartArea.bottom
          );

          gradient.addColorStop(0, "#B9F551");
          gradient.addColorStop(1, "#D7F650");

          return gradient;
        },
      },
    ],
  };
  const [pointLabelFontSize, setPointLabelFontSize] = useState(20);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setPointLabelFontSize(12);
      else if (window.innerWidth < 1024) setPointLabelFontSize(16);
      else setPointLabelFontSize(20);
    };

    handleResize(); // initial size
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);


  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % ringImages.length; // Loop back to first ring
        return nextIndex;
      });
    }, 3000); // Every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [ringImages.length]);

  // Update chart data whenever activeIndex changes
  useEffect(() => {
    setChartData(ringDataVectors[activeIndex]);
  }, [activeIndex, ringDataVectors]);



  const radarOptions = {
    responsive: true,
    animation: { duration: 800 },
    scales: {
      r: {
        suggestedMin: 0,
        suggestedMax: 100,
        ticks: { display: false },
        grid: {
          circular: true,
          color: "transparent",
          backgroundColor: [
            "rgba(255,0,0,0.2)",
            "rgba(255,0,0,0.2)",
            "rgba(255,0,0,0.2)",
            "rgba(255,0,0,0.2)",
            "rgba(255,0,0,0.2)",
          ],
        },
        angleLines: {
          display: true,
          color: "#A9A9B7",
          borderDash: [5, 5],
          borderWidth: 0.2,
        },

        pointLabels: {
          color: "#171719",
          font: {
            size: pointLabelFontSize,
            family: "Figtree, sans-serif",
            weight: "normal",
          },
        },
      },
    },
    plugins: { legend: { display: false } },
  };

  return (
    <div
      style={{
        display: "flex",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            background: "#fff",

            boxShadow: "0px 4px 24px 0px #1617190F, 0px 4px 8px 0px #00000008",
          }}
          className="flex md:rounded-[40px] rounded-[24px] justify-center chart-after md:w-[600px] md:px-[24px] px-[10px] md:py-[30px] w-[327px] h-[300px] md:h-[440px] radar-chart"
        >
          <Radar
            className="md:max-h-[380px] max-h-[325px] z-[9]"
            data={radarData}
            options={radarOptions}
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "6px",
            marginTop: "20px",
            flexWrap: "wrap",
          }}
          className="card-chart"
        >
          {ringImages.map((img, index) => (
            <div
              key={index}
              onClick={() => {
                setActiveIndex(index);
                setChartData(ringDataVectors[index]);
              }}
              style={{
                borderRadius: "12px",
                padding: "2px",
                background:
                  activeIndex === index
                    ? "linear-gradient(76deg, #B9F551 22.87%, #D7F650 74.01%)"
                    : "",
                cursor: "pointer",
                transition: "0.3s",
                height: "69px",
                width: "69.5px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={img?.src}
                alt={`Ring ${index + 1}`}
                width="68"
                height="68"
                className="rounded-[12px]"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RingStyleAnalyzer;
