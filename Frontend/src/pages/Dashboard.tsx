import { useCallback, useMemo } from 'react'
import StatCard from '../components/dashboard/StatCard'
import LogsList from '../components/dashboard/LogsList'
import CategoryList from '../components/dashboard/CategoryList'
import SearchLogs from '../components/dashboard/SearchLogs'
import FilterLogs from '../components/dashboard/FilterLogs'
import SortLogs from '../components/dashboard/SortLogs'
import { computeStreak } from '../api/logs'
import { useLogs } from '../hooks/useLogs'
import { useLogControls } from '../hooks/useLogControls'
import { getStoredUser } from '../auth'
import './Dashboard.scss'

function average(values: number[]): number {
    if (values.length === 0) return 0
    return values.reduce((sum, value) => sum + value, 0) / values.length
}

function trendLabel(latest: number, avg: number): string {
    if (latest > avg) return '↑ above average'
    if (latest < avg) return '↓ below average'
    return '→ steady'
}

function computeStreak(logs: LogEntry[]): number {
    if (logs.length === 0) return 0

    const days = new Set(
        logs.map((log) => new Date(log.created_at).toDateString())
    )
    const cursor = new Date()
    if (!days.has(cursor.toDateString())) cursor.setDate(cursor.getDate() - 1)

    let streak = 0
    while (days.has(cursor.toDateString())) {
        streak += 1
        cursor.setDate(cursor.getDate() - 1)
    }
    return streak
}

export default function DashboardPage() {
    const user = getStoredUser()
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

    const handleSearchChange = useCallback((value: string) => {
        setSearchQuery(value)
    }, [setSearchQuery])

    const energyAvg = useMemo(() => average(logs.map((log) => log.energyLevel)), [logs])
    const moodAvg = useMemo(() => average(logs.map((log) => log.moodLevel)), [logs])
    const sleepAvg = useMemo(() => average(logs.map((log) => log.sleepLevel)), [logs])
    const streak = useMemo(() => computeStreak(logs), [logs])
    const latest = logs[0]

    const firstName = user?.name.split(' ')[0] ?? 'there'
    const today = new Date().toLocaleDateString(undefined, {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    })

    return (
        <section className="dashboard-page">
            <h1 className="dashboard-page__title">Hello {firstName} 🌿</h1>
            <p className="dashboard-page__subtitle">
                {today} - you've logged {streak} day{streak === 1 ? '' : 's'} in a row
            </p>

            {error && (
                <p className="dashboard-page__error" role="alert">
                    {error}
                </p>
            )}

            <div className="dashboard-page__stats-grid">
                <StatCard
                    label="Energy (avg)"
                    value={logs.length ? energyAvg.toFixed(1) : '–'}
                    trend={latest ? trendLabel(latest.energyLevel, energyAvg) : 'No entries yet'}
                />
                <StatCard
                    label="Sleep (avg)"
                    value={logs.length ? sleepAvg.toFixed(1) : '–'}
                    trend={latest ? trendLabel(latest.sleepLevel, sleepAvg) : 'No entries yet'}
                />
                <StatCard
                    label="Mood (avg)"
                    value={logs.length ? moodAvg.toFixed(1) : '–'}
                    trend={latest ? trendLabel(latest.moodLevel, moodAvg) : 'No entries yet'}
                />
                <StatCard
                    label="Streak"
                    value={String(streak)}
                    trend={streak > 0 ? 'days in a row' : 'log today to start'}
                />
            </div>

            <SearchLogs value={searchQuery} onChange={handleSearchChange} />
            <FilterLogs value={focusFilter} onChange={setFocusFilter} />
            <SortLogs value={sortOption} onChange={setSortOption} />

            <div className="dashboard-page__bottom">
                <LogsList
                    logs={visibleLogs}
                    isLoading={isLoading}
                    activeSearch={
                        searchQuery.length > 0 || focusFilter !== 'all'
                    }
                />
                <CategoryList logs={logs} />
            </div>
        </section>
    )
}