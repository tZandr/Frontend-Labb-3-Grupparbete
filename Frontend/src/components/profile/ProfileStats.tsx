import { useLogs } from "../../hooks/useLogs";
import TrendChart from "./TrendChart";
import FocusAreaChart from "./FocusAreaChart";
import "./ProfileStats.scss";

export default function ProfileStats() {
  const { logs, isLoading } = useLogs();

  return (
    <section className="profile-stats">
      <h2 className="profile-stats__title">Your stats</h2>

      {isLoading ? (
        <p className="profile-stats__empty">Loading…</p>
      ) : (
        <div className="profile-stats__grid">
          <div className="profile-stats__chart">
            <h3 className="profile-stats__chart-title">Energy, mood &amp; sleep</h3>
            <TrendChart logs={logs} />
          </div>
          <div className="profile-stats__chart">
            <h3 className="profile-stats__chart-title">Focus areas</h3>
            <FocusAreaChart logs={logs} />
          </div>
        </div>
      )}
    </section>
  );
}
