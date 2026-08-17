import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchLogs } from "../api/logs";
import type { LogEntry } from "../api/logs";
import { formatLogDay } from "../utils/date";
import "./LogsHistory.scss";

export default function LogsHistory() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    fetchLogs()
      .then((data) => {
        if (!cancelled) setLogs(data);
      })
      .catch((caughtError) => {
        if (!cancelled) {
          setError(caughtError instanceof Error ? caughtError.message : "Unable to load your logs.");
        }
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="logs-history">
      <div className="logs-history__header">
        <div>
          <h1 className="logs-history__title">Your logs</h1>
          <p className="logs-history__subtitle">Everything you've logged, most recent first</p>
        </div>
        <Link className="logs-history__back" to="/dashboard">
          ← Back to dashboard
        </Link>
      </div>

      {error && (
        <p className="logs-history__error" role="alert">
          {error}
        </p>
      )}

      {isLoading ? (
        <p className="logs-history__empty">Loading…</p>
      ) : logs.length === 0 ? (
        <p className="logs-history__empty">
          No logs yet. <Link to="/dashboard/new-log">Add your first entry</Link>.
        </p>
      ) : (
        <ul className="logs-history__list">
          {logs.map((log) => (
            <li className="logs-history__item" key={log._id}>
              <Link className="logs-history__item-link" to={`/dashboard/logs/${log._id}/edit`}>
                <p className="logs-history__day">{formatLogDay(log.created_at)}</p>
                <p className="logs-history__scores">
                  Energy {log.energyLevel} - Mood {log.moodLevel} - Sleep {log.sleepLevel}
                </p>
                <div className="logs-history__tags">
                  {log.focusAreas.map((area) => (
                    <span className="logs-history__tag" key={area}>
                      {area}
                    </span>
                  ))}
                </div>
                {log.note && <p className="logs-history__note">{log.note}</p>}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
