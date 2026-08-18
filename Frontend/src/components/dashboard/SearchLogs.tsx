type SearchLogsProps = {
    value: string
    onChange: (value: string) => void
}

export default function SearchLogs({ value, onChange }: SearchLogsProps) {
    return (
        <div className="search-logs">
            <label htmlFor="search-logs">Search Logs:</label>
            <input
                type="search"
                id="search-logs"
                placeholder="Search..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    )
}
