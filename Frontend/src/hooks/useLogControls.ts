import { useState, useMemo } from 'react'
import type { SortOption } from '../components/dashboard/SortLogs'
import type { FocusFilter } from '../components/dashboard/FilterLogs'
import type { LogEntry } from '../api/logs'

export function useLogControls(logs: LogEntry[]) {
    const [searchQuery, setSearchQuery] = useState('')
    const [focusFilter, setFocusFilter] = useState<FocusFilter>('all')
    const [sortOption, setSortOption] = useState<SortOption>('newest')

    const visibleLogs = useMemo(() => {
        const query = searchQuery.trim().toLowerCase()
        const filteredLogs = logs.filter((log) => {
            const matchesFocus =
                focusFilter === 'all' || log.focusAreas.includes(focusFilter)
            const matchesSearch =
                !query ||
                (log.note ?? '').toLowerCase().includes(query) ||
                log.focusAreas.some((area) =>
                    area.toLowerCase().includes(query)
                )
            return matchesFocus && matchesSearch
        })
        return [...filteredLogs].sort((a, b) => {
            const timeA = new Date(a.created_at).getTime()
            const timeB = new Date(b.created_at).getTime()
            if (sortOption === 'newest') {
                return timeB - timeA
            }
            return timeA - timeB
        })
    }, [logs, searchQuery, focusFilter, sortOption])

    return {
        searchQuery,
        setSearchQuery,
        focusFilter,
        setFocusFilter,
        sortOption,
        setSortOption,
        visibleLogs
    }
}
