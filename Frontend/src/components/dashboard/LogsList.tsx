import { Link } from 'react-router-dom'
import type { LogEntry } from '../../api/logs'
import './LogsList.scss'

type LogsListProps = {
    logs: LogEntry[]
    isLoading: boolean
    activeSearch?: boolean
}

function isSameDay(a: Date, b: Date): boolean {
    return (
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate()
    )
}

function formatDay(dateString: string): string {
    const date = new Date(dateString)
    const today = new Date()
    const yesterday = new Date()
    yesterday.setDate(today.getDate() - 1)

    if (isSameDay(date, today)) return 'Today'
    if (isSameDay(date, yesterday)) return 'Yesterday'
    return date.toLocaleDateString(undefined, {
        weekday: 'long',
        month: 'short',
        day: 'numeric'
    })
}

export default function LogsList({
    logs,
    isLoading,
    activeSearch = false
}: LogsListProps) {
    const loggedToday = logs.some((log) =>
        isSameDay(new Date(log.created_at), new Date())
    )

    return (
        <section className="logs-list">
            <div className="logs-list__header">
                <h2 className="logs-list__title">Your recent logs</h2>
                {loggedToday ? (
                    <button
                        type="button"
                        className="logs-list__link logs-list__link--disabled"
                        disabled
                    >
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
                    {activeSearch ? (
                        'No logs match your search.'
                    ) : (
                        <>
                            No logs yet.{' '}
                            <Link to="/dashboard/new-log">
                                Add your first entry
                            </Link>
                            .
                        </>
                    )}
                </p>
            ) : (
                <ul className="logs-list__list">
                    {logs.slice(0, 5).map((log) => (
                        <li className="logs-list__item" key={log._id}>
                            <Link
                                className="logs-list__item-link"
                                to={`/dashboard/logs/${log._id}/edit`}
                            >
                                <p className="logs-list__day">
                                    {formatDay(log.created_at)}
                                </p>
                                <p className="logs-list__scores">
                                    Energy {log.energyLevel} - Mood{' '}
                                    {log.moodLevel} - Sleep {log.sleepLevel}
                                </p>
                                {log.note && (
                                    <p className="logs-list__note">
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
