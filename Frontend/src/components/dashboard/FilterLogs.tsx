import { LOG_CATEGORIES } from "../../api/logs";
import type { LogCategory } from "../../api/logs";

export type FocusFilter = "all" | LogCategory;

type FilterLogsProps = {
  value: FocusFilter;
  onChange: (value: FocusFilter) => void;
};

export default function FilterLogs({ value, onChange }: FilterLogsProps) {
  const options: FocusFilter[] = ["all", ...LOG_CATEGORIES];

  return (
    <div className="filter-logs">
      <label htmlFor="filter-logs">Filter by focus area:</label>
      <select
        id="filter-logs"
        value={value}
        onChange={(e) => onChange(e.target.value as FocusFilter)}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option === "all" ? "All" : option}
          </option>
        ))}
      </select>
    </div>
  );
}
