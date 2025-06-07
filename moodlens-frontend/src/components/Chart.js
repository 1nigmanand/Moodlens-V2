import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

export default function Chart({ data }) {
  const emotions = Object.keys(data);
  const counts = emotions.map((emotion) => data[emotion].count);
  const colors = emotions.map((emotion) => data[emotion].color);
  const borderColors = colors.map((color) => color.replace("0.7", "1"));

  const chartData = {
    labels: emotions,
    datasets: [
      {
        label: "Emotion Intensity",
        data: counts,
        backgroundColor: colors,
        borderColor: borderColors,
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 2, // Width to height ratio
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Emotion Analysis",
        font: {
          size: 20,
          weight: "bold",
        },
        color: "#374151",
        padding: {
          top: 10,
          bottom: 20
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "white",
        bodyColor: "white",
        borderColor: "rgba(255, 255, 255, 0.2)",
        borderWidth: 1,
        cornerRadius: 12,
        displayColors: false,
      },
    },    scales: {
      y: {
        beginAtZero: true,
        max: Math.max(...counts) + 2, // Set a reasonable max value
        grid: {
          color: "rgba(156, 163, 175, 0.2)",
          drawBorder: false,
        },
        ticks: {
          color: "#6b7280",
          font: {
            size: 12,
          },
          stepSize: 1, // Ensure integer steps
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#6b7280",
          font: {
            size: 12,
            weight: 500,
          },
          maxRotation: 0, // Keep labels horizontal
        },
      },
    },
    animation: {
      duration: 2000,
      easing: "easeInOutQuart",
    },
  };
  return (
    <div className="chart-container">
      <div className="chart-wrapper">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}
