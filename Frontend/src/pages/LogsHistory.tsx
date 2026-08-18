import { Link } from 'react-router-dom'
import { useLogs } from '../hooks/useLogs'
import { formatLogDay } from '../utils/date'
import { useLogControls } from '../hooks/useLogControls'
import SearchLogs from '../components/dashboard/SearchLogs'
import FilterLogs from '../components/dashboard/FilterLogs'
import SortLogs from '../components/dashboard/SortLogs'
import './LogsHistory.scss'

export default function LogsHistory() {
    const { logs, isLoading, error } = useLogs()

    const {
        searchQuery,
        setSearchQuery,
        focusFilter,
        setFocusFilter,
        sortOption,
        setSortOption,
        visibleLogs
    } = useLogControls(logs)

    return (
        <section className="logs-history">
            <div className="logs-history__header">
                <div>
                    <h1 className="logs-history__title">Your logs</h1>
                    <p className="logs-history__subtitle">
                        Everything you've logged so far, in one place.
                    </p>
                </div>
                <Link className="logs-history__back" to="/dashboard">
                    ← Back to dashboard
                </Link>
            </div>

            <div className="logs-history__controls">
                <SearchLogs value={searchQuery} onChange={setSearchQuery} />
                <FilterLogs value={focusFilter} onChange={setFocusFilter} />
                <SortLogs value={sortOption} onChange={setSortOption} />
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
                    No logs yet.{' '}
                    <Link to="/dashboard/new-log">Add your first entry</Link>.
                </p>
            ) : visibleLogs.length === 0 ? (
                <p className="logs-history__empty">
                    No logs match your search or filter criteria.
                </p>
            ) : (
                <ul className="logs-history__list">
                    {visibleLogs.map((log) => (
                        <li className="logs-history__item" key={log._id}>
                            <Link
                                className="logs-history__item-link"
                                to={`/dashboard/logs/${log._id}/edit`}
                            >
                                <p className="logs-history__day">
                                    {formatLogDay(log.created_at)}
                                </p>
                                <p className="logs-history__scores">
                                    Energy {log.energyLevel} - Mood{' '}
                                    {log.moodLevel} - Sleep {log.sleepLevel}
                                </p>
                                <div className="logs-history__tags">
                                    {log.focusAreas.map((area) => (
                                        <span
                                            className="logs-history__tag"
                                            key={area}
                                        >
                                            {area}
                                        </span>
                                    ))}
                                </div>
                                {log.note && (
                                    <p className="logs-history__note">
                                        {log.note}
                                    </p>
                                )}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    )
}
