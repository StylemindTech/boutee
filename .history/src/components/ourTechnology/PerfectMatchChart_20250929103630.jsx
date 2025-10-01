import { useState, useEffect } from "react";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import user1 from "../../assets/Image/img-user1.jpg";
import user2 from "../../assets/Image/img-user2.jpg";
import user3 from "../../assets/Image/img-user3.jpg";
import user4 from "../../assets/Image/img-user4.png";
import user5 from "../../assets/Image/img-user5.png";
import user6 from "../../assets/Image/img-user6.png";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

// Sample data
const customers = [
  {
    id: 1,
    name: "James Martin",
    need: "needs modern ring",
    img: user1,
    profile: [8, 6, 4, 7, 5, 3, 6, 4], // radar data
  },
  {
    id: 2,
    name: "Mei Parker",
    need: "needs colourful ring",
    img: user2,
    profile: [5, 3, 9, 4, 6, 8, 5, 7],
  },
  {
    id: 3,
    name: "Daniel Harris",
    need: "needs minimalist ring",
    img: user3,
    profile: [3, 8, 4, 6, 7, 2, 8, 4],
  },
];

const jewellers = [
  {
    id: 1,
    name: "Sophia Roberts",
    brand: "Sophia Roberts",
    img: user4,
    profile: [7, 6, 5, 6, 4, 4, 6, 5],
    match: { 1: "85%", 2: "72%", 3: "50%" },
  },
  {
    id: 2,
    name: "William Taylor",
    brand: "WT Jewellery",
    img: user5,
    profile: [6, 7, 5, 3, 8, 4, 7, 6],
    match: { 1: "61%", 2: "68%", 3: "45%" },
  },
  {
    id: 3,
    name: "Amelia Davis",
    brand: "AmDa Jewellery",
    img: user6,
    profile: [4, 5, 6, 7, 5, 7, 6, 5],
    match: { 1: "36%", 2: "55%", 3: "40%" },
  },
];

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

export default function CustomerJewellerMatch() {
  const [selectedCustomer, setSelectedCustomer] = useState(customers[0]);
  const [selectedJeweller, setSelectedJeweller] = useState(jewellers[0]);

  const data = {
    labels,
    datasets: [
      {
        label: selectedCustomer.name,
        data: selectedCustomer.profile,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 0,
        backgroundColor: "rgba(132, 204, 22, 0.2)",
        borderColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            return "rgba(132, 204, 22, 1)";
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
      {
        label: selectedJeweller.name,
        data: selectedJeweller.profile,
        backgroundColor: "rgba(156, 163, 175, 0.2)",
        borderColor: "#A9A9B7",
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 0,
      },
    ],
  };

  const [pointLabelFontSize, setPointLabelFontSize] = useState(20);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setPointLabelFontSize(12);
      else if (window.innerWidth < 1279) setPointLabelFontSize(14);
      else setPointLabelFontSize(20);
    };

    handleResize(); // initial size
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        suggestedMin: 0,
        suggestedMax: 10,
        ticks: { display: false },
        pointLabels: {
          color: "#171719",
          font: {
            size: pointLabelFontSize,
            family: "Figtree, sans-serif",
            weight: "normal",
          },
        },
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
      },
    },
    plugins: {
      legend: { display: false },
    },
  };

  return (
    <div className="flex flex-col xl:flex-row items-center justify-center gap-[32px] xl:mt-[80px] mt-[24px]">
      <div className="order-1 xl:order-1 w-full xl:w-1/4">
        <div
          className="grid xl:gap-[20px] gap-[8px] 
                          
                  grid-cols-3        
                  xl:grid-cols-1"
        >
          {customers.map((c) => (
            <div
              key={c.id}
              onClick={() => setSelectedCustomer(c)}
              className={`flex flex-col xl:flex-row items-center xl:gap-[20px] gap-[12px] xl:rounded-[24px] rounded-[16px] cursor-pointer transition ${
                selectedCustomer.id === c.id
                  ? "border-[#2C2C30] border"
                  : "border border-[#F0F1F5]"
              }`}
            >
              <img
                src={c.img.src}
                alt={c.name}
                className="xl:w-[124px]  w-full xl:h-[124px] h-[100px] xl:rounded-tl-[24px] xl:rounded-bl-[24px] rounded-tl-[16px] rounded-tr-[16px] xl:rounded-tr-[0px]  object-cover"
              />
              <div className="flex flex-col gap-[4px] px-[4px] xl:px-0 pb-[8px] xl:pb-[0px]">
                <h4 className="font-figtree font-bold xl:text-[20px] text-[12px] text-center xl:text-start xl:leading-[24px] leading-[16px] text-textPrimary">
                  {c.name}
                </h4>
                <p className="font-figtree font-normal xl:text-[16px] text-[12px] text-center xl:text-start xl:leading-[20px] leading-[14px] text-textSecondary">
                  {c.need}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="order-3 chart-match relative xl:order-2 w-full xl:w-2/4 bg-white shadow-[0_4px_24px_0_#1617190F,0_4px_8px_0_#00000008] xl:rounded-[40px] rounded-[24px] py-[16px] px-[8px] xl:h-[412px] md:h-[350px] h-[257px]">
        <Radar className="z-[9] relative" data={data} options={options} />
      </div>

      <div className="order-2 xl:order-3 w-full xl:w-1/4">
        <div
          className="grid xl:gap-[20px] gap-[12px] 
                  grid-cols-3     
                  xl:grid-cols-1"
        >
          {jewellers.map((j) => (
            <div
              key={j.id}
              onClick={() => setSelectedJeweller(j)}
              className={`flex flex-col xl:flex-row items-center xl:gap-[20px] gap-[12px] xl:rounded-[24px] rounded-[16px] cursor-pointer transition ${
                selectedJeweller.id === j.id
                  ? "border-[#2C2C30] border"
                  : "border border-[#F0F1F5]"
              }`}
            >
              <img
                src={j.img.src}
                alt={j.name}
                className="xl:w-[124px]  w-full xl:h-[124px] h-[100px] xl:rounded-tl-[24px] xl:rounded-bl-[24px] rounded-tl-[16px] rounded-tr-[16px] xl:rounded-tr-[0px]  object-cover"
              />
              <div className="flex-1 w-full xl:py-[12px] flex flex-col justify-between px-[4px] xl:px-0 pb-[4px] h-full">
                <div className="mb-[4px]">
                  <h4 className="font-figtree font-bold xl:text-[20px] text-[12px] text-center xl:text-start xl:leading-[24px] leading-[16px] text-textPrimary">
                    {j.name}
                  </h4>
                  <p className="font-figtree hidden xl:block font-normal text-[16px] leading-[20px] text-textSecondary">
                    {j.brand}
                  </p>
                </div>
                <div
                  className={`xl:text-[16px] text-center text-[12px] xl:leading-[20px] leading-[14px] w-full xl:max-w-max font-figtree px-[8px] py-[4px] rounded-full ${
                    parseInt(j.match[selectedCustomer.id]) > 70
                      ? "bg-[linear-gradient(76deg,#B9F551_22.87%,#D7F650_74.01%)]"
                      : parseInt(j.match[selectedCustomer.id]) > 50
                        ? "bg-[linear-gradient(72.92deg,#F8BEA5_29.07%,#F8D2A5_78.07%)]"
                        : "bg-[linear-gradient(25.08deg,#C8C1F2_-0.01%,#F0D9F0_93.81%)]"
                  }`}
                >
                  {j.match[selectedCustomer.id]} match
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
