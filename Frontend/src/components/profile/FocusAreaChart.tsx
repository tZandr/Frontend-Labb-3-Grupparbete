import { Doughnut } from "react-chartjs-2";
import { LOG_CATEGORIES } from "../../api/logs";
import type { LogEntry } from "../../api/logs";
import "./chartSetup";

type FocusAreaChartProps = {
  logs: LogEntry[];
};

const CATEGORY_COLORS = ["#354024", "#c97b3f", "#4a7fb5"];

export default function FocusAreaChart({ logs }: FocusAreaChartProps) {
  const counts = LOG_CATEGORIES.map(
    (category) => logs.filter((log) => log.focusAreas.includes(category)).length
  );
  const hasData = counts.some((count) => count > 0);

  const data = {
    labels: [...LOG_CATEGORIES],
    datasets: [
      {
        data: counts,
        backgroundColor: CATEGORY_COLORS,
        borderColor: "#fffdf9",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" as const },
    },
  };

  if (!hasData) {
    return <p className="profile-stats__empty">Log an entry to see your focus areas here.</p>;
  }

  return <Doughnut data={data} options={options} />;
}
