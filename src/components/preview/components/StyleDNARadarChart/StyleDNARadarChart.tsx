import React, { useEffect, useMemo, useRef } from "react";
import { Radar } from "react-chartjs-2";
import { Chart as ChartJS, Filler, LineElement, PointElement, RadialLinearScale, Tooltip } from "chart.js";
import type { ChartData, ChartOptions } from "chart.js";
import styles from "./StyleDNARadarChart.module.css";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip);

const LABELS = ["Classic", "Bold", "Monotone", "Organic", "Alternative", "Minimalist", "Colourful", "Refined"];
const FIELDS = ["classic", "bold", "monotone", "organic", "alternative", "minimal", "colourful", "refined"] as const;

type StyleProfile = Partial<Record<(typeof FIELDS)[number], number>>;

type StyleDNARadarChartProps = {
  userData: StyleProfile;
  compareData?: StyleProfile | null;
  noBackground?: boolean;
};

const StyleDNARadarChart: React.FC<StyleDNARadarChartProps> = ({ userData, compareData = null, noBackground = false }) => {
  const chartRef = useRef<ChartJS<"radar"> | null>(null);

  const { data, options } = useMemo(() => {
    const userValues = FIELDS.map((field) => (typeof userData?.[field] === "number" ? userData[field]! : 0));
    const compareValues = compareData
      ? FIELDS.map((field) => (typeof compareData?.[field] === "number" ? compareData[field]! : 0))
      : [];

    const allValues = [...userValues, ...compareValues].filter((v) => v > 0);
    const maxValue = allValues.length ? Math.max(...allValues) : 100;
    const scaleMax = Math.min(Math.ceil(maxValue / 10) * 10 + 10, 100);

    const datasets = [
      {
        label: "Your style DNA",
        data: userValues,
        backgroundColor: "rgba(215, 246, 80, 0.7)", // will be overridden by gradient
        borderColor: "transparent",
        borderWidth: 0,
        pointRadius: 0,
      },
    ];

    if (compareData) {
      datasets.push({
        label: "Jeweller style",
        data: compareValues,
        backgroundColor: "rgba(23, 23, 25, 0.5)",
        borderColor: "transparent",
        borderWidth: 0,
        pointRadius: 0,
      });
    }

    const chartData: ChartData<"radar"> = { labels: LABELS, datasets };

    const chartOptions: ChartOptions<"radar"> = {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 1,
      scales: {
        r: {
          grid: {
            circular: true,
            color: "rgba(169, 169, 183, 1)",
            lineWidth: (ctx) => (ctx.index === 2 ? 1.5 : 1),
          },
          angleLines: { display: false },
          pointLabels: {
            font: { family: "Figtree, -apple-system, sans-serif", size: 13, weight: "400" },
            color: "#000",
            padding: 10,
          },
          ticks: { display: false, stepSize: scaleMax / 3, maxTicksLimit: 3, count: 4 },
          min: 0,
          max: scaleMax,
          beginAtZero: true,
        },
      },
      plugins: {
        tooltip: { enabled: false },
        legend: { display: false },
      },
    };

    return { data: chartData, options: chartOptions };
  }, [userData, compareData]);

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart?.ctx || !chart.chartArea) return;

    const { ctx, chartArea } = chart;
    const centerX = (chartArea.left + chartArea.right) / 2;
    const centerY = (chartArea.top + chartArea.bottom) / 2;
    const radius = Math.min(chartArea.right - chartArea.left, chartArea.bottom - chartArea.top) / 2;
    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
    gradient.addColorStop(0, "rgba(215, 246, 80, 0.85)");
    gradient.addColorStop(1, "rgba(185, 245, 81, 0.6)");
    chart.data.datasets[0].backgroundColor = gradient;
    chart.update("none");
  }, [data]);

  return (
    <div className={styles.wrapper}>
      <div className={noBackground ? styles.chartContainerNoBackground : styles.chartContainer}>
        <Radar ref={chartRef} data={data} options={options} />
      </div>

      {compareData && (
        <div className={noBackground ? styles.legendNoBackground : styles.legend}>
          <div className={styles.legendItem}>
            <span className={styles.dot} style={{ backgroundColor: "#D7F650" }} />
            Your style
          </div>
          <div className={styles.legendItem}>
            <span className={styles.dot} style={{ backgroundColor: "rgba(23, 23, 25, 0.5)" }} />
            Jeweller style
          </div>
        </div>
      )}
    </div>
  );
};

export default StyleDNARadarChart;
