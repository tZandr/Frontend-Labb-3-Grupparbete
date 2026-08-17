import { Link } from "react-router-dom";
import type { LogEntry } from "../../api/logs";
import { isSameDay, formatLogDay } from "../../utils/date";
import "./LogsList.scss";

type LogsListProps = {
  logs: LogEntry[];
  isLoading: boolean;
  limit?: number;
};

export default function LogsList({ logs, isLoading, limit }: LogsListProps) {
  const loggedToday = logs.some((log) => isSameDay(new Date(log.created_at), new Date()));
  const visibleLogs = typeof limit === "number" ? logs.slice(0, limit) : logs;

  return (
    <section className="logs-list">
      <div className="logs-list__header">
        <Link className="logs-list__title" to="/dashboard/logs">
          Your recent logs
        </Link>
        {loggedToday ? (
          <button type="button" className="logs-list__link logs-list__link--disabled" disabled>
            Day logged
          </button>
        ) : (
          <Link className="logs-list__link" to="/dashboard/new-log">
            + Add log
          </Link>
        )}
      </div>

      {isLoading ? (
        <p className="logs-list__empty">Loading…</p>
      ) : logs.length === 0 ? (
        <p className="logs-list__empty">
          No logs yet. <Link to="/dashboard/new-log">Add your first entry</Link>.
        </p>
      ) : (
        <ul className="logs-list__list">
          {visibleLogs.map((log) => (
            <li className="logs-list__item" key={log._id}>
              <Link className="logs-list__item-link" to="/dashboard/logs">
                <p className="logs-list__day">{formatLogDay(log.created_at)}</p>
                <p className="logs-list__scores">
                  Energy {log.energyLevel} - Mood {log.moodLevel} - Sleep {log.sleepLevel}
                </p>
                {log.note && <p className="logs-list__note">{log.note}</p>}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
