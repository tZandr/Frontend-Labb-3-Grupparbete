import { useMemo } from 'react'
import StatCard from '../components/dashboard/StatCard'
import LogsList from '../components/dashboard/LogsList'
import CategoryList from '../components/dashboard/CategoryList'
import { computeStreak } from '../api/logs'
import { useLogs } from '../hooks/useLogs'
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

export default function DashboardPage() {
    const user = getStoredUser()
    const { logs, isLoading, error } = useLogs()

    const energyAvg = useMemo(
        () => average(logs.map((log) => log.energyLevel)),
        [logs]
    )
    const moodAvg = useMemo(
        () => average(logs.map((log) => log.moodLevel)),
        [logs]
    )
    const sleepAvg = useMemo(
        () => average(logs.map((log) => log.sleepLevel)),
        [logs]
    )
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
                {today} - you've logged {streak} day{streak === 1 ? '' : 's'} in
                a row
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
                    trend={
                        latest
                            ? trendLabel(latest.energyLevel, energyAvg)
                            : 'No entries yet'
                    }
                />
                <StatCard
                    label="Sleep (avg)"
                    value={logs.length ? sleepAvg.toFixed(1) : '–'}
                    trend={
                        latest
                            ? trendLabel(latest.sleepLevel, sleepAvg)
                            : 'No entries yet'
                    }
                />
                <StatCard
                    label="Mood (avg)"
                    value={logs.length ? moodAvg.toFixed(1) : '–'}
                    trend={
                        latest
                            ? trendLabel(latest.moodLevel, moodAvg)
                            : 'No entries yet'
                    }
                />
                <StatCard
                    label="Streak"
                    value={String(streak)}
                    trend={streak > 0 ? 'days in a row' : 'log today to start'}
                />
            </div>

            <div className="dashboard-page__bottom">
                <LogsList logs={logs} isLoading={isLoading} />
                <CategoryList logs={logs} />
            </div>
        </section>
    )
}
