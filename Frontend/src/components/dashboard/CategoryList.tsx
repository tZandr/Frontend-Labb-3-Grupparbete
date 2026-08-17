import { LOG_CATEGORIES } from "../../api/logs";
import type { LogEntry } from "../../api/logs";
import "./CategoryList.scss";

type CategoryListProps = {
  logs: LogEntry[];
};

export default function CategoryList({ logs }: CategoryListProps) {
  const now = new Date();
  const thisMonthLogs = logs.filter((log) => {
    const date = new Date(log.created_at);
    return (
      date.getFullYear() === now.getFullYear() &&
      date.getMonth() === now.getMonth()
    );
  });

  const counts = LOG_CATEGORIES.map((name) => ({
    name,
    count: thisMonthLogs.filter((log) => log.focusAreas.includes(name)).length,
  }));
  const maxCount = Math.max(1, ...counts.map((entry) => entry.count));

  return (
    <section className="category-list">
      <h2 className="category-list__title">Focus areas</h2>
      <p className="category-list__subtitle">Times logged this month</p>

      {thisMonthLogs.length === 0 ? (
        <p className="category-list__empty">No entries yet this month.</p>
      ) : (
        <ul className="category-list__items">
          {counts.map(({ name, count }) => (
            <li className="category-list__row" key={name}>
              <span className="category-list__name">{name}</span>
              <div className="category-list__bar">
                <div
                  className="category-list__fill"
                  style={{ width: `${(count / maxCount) * 100}%` }}
                />
              </div>
              <span className="category-list__count">{count}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
