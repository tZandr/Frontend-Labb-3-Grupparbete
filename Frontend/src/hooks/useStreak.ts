import { useEffect, useState } from 'react'
import { computeStreak, fetchLogs } from '../api/logs'

export function useStreak(): number {
    const [streak, setStreak] = useState(0)

    useEffect(() => {
        let cancelled = false

        fetchLogs()
            .then((logs) => {
                if (!cancelled) setStreak(computeStreak(logs))
            })
            .catch(() => {
                if (!cancelled) setStreak(0)
            })

        return () => {
            cancelled = true
        }
    }, [])

    return streak
}
