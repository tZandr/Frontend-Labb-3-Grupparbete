type SearchBarProps = {
    value: string
    onChange: (value: string) => void
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
    return (
        <div className="search-bar">
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
