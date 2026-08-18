export type SortOption = 'newest' | 'oldest'

type SortLogsProps = {
    value: SortOption
    onChange: (value: SortOption) => void
}

export default function SortLogs({ value, onChange }: SortLogsProps) {
    return (
        <div className="sort-logs">
            <label htmlFor="sort-logs">Sort logs by:</label>
            <select
                id="sort-logs"
                value={value}
                onChange={(e) => onChange(e.target.value as SortOption)}
            >
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
            </select>
        </div>
    )
}
