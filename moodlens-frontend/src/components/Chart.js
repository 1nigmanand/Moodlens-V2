import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale);

export default function Chart({ data }) {
  const emotions = Object.keys(data);
  const counts = emotions.map((emotion) => data[emotion].count);

  const chartData = {
    labels: emotions,
    datasets: [
      {
        label: "Emotion Count",
        data: counts,
        backgroundColor: "rgba(59, 130, 246, 0.5)",
      },
    ],
  };

  return <Bar data={chartData} />;
}
