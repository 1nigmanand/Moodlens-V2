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
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Emotion Analysis",
        font: {
          size: 24,
          weight: "bold",
        },
        color: "hsl(var(--foreground))",
        padding: 20,
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
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(156, 163, 175, 0.2)",
          drawBorder: false,
        },
        ticks: {
          color: "hsl(var(--muted-foreground))",
          font: {
            size: 12,
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "hsl(var(--muted-foreground))",
          font: {
            size: 14,
            weight: 500,
          },
        },
      },
    },
    animation: {
      duration: 2000,
      easing: "easeInOutQuart",
    },
  };

  return (
    <div className="w-full h-96 p-6 bg-card rounded-xl border shadow-lg">
      <Bar data={chartData} options={options} />
    </div>
  );
}
