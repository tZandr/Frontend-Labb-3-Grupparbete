import { Line } from "react-chartjs-2";
import type { LogEntry } from "../../api/logs";
import "./chartSetup";

type TrendChartProps = {
  logs: LogEntry[];
};

const RECENT_ENTRIES = 14;

export default function TrendChart({ logs }: TrendChartProps) {
  const recentLogs = [...logs]
    .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
    .slice(-RECENT_ENTRIES);

  const labels = recentLogs.map((log) =>
    new Date(log.created_at).toLocaleDateString(undefined, { month: "short", day: "numeric" })
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Energy",
        data: recentLogs.map((log) => log.energyLevel),
        borderColor: "#354024",
        backgroundColor: "#354024",
        tension: 0.3,
      },
      {
        label: "Mood",
        data: recentLogs.map((log) => log.moodLevel),
        borderColor: "#c97b3f",
        backgroundColor: "#c97b3f",
        tension: 0.3,
      },
      {
        label: "Sleep",
        data: recentLogs.map((log) => log.sleepLevel),
        borderColor: "#4a7fb5",
        backgroundColor: "#4a7fb5",
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        min: 1,
        max: 5,
        ticks: { stepSize: 1 },
      },
    },
    plugins: {
      legend: { position: "bottom" as const },
    },
  };

  if (recentLogs.length === 0) {
    return <p className="profile-stats__empty">Log a few days to see your trends here.</p>;
  }

  return (
    <div className="profile-stats__canvas-wrap">
      <Line data={data} options={options} />
    </div>
  );
}
