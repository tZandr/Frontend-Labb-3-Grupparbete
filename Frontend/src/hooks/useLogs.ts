import { useEffect, useState } from "react";
import { fetchLogs } from "../api/logs";
import type { LogEntry } from "../api/logs";

export function useLogs() {
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchLogs()
            .then((data) => setLogs(data))
            .catch((caughtError) => {
                setError(
                    caughtError instanceof Error
                        ? caughtError.message
                        : "Unable to load logs"
                );
            })
            .finally(() => setIsLoading(false));
    }, []);

    return { logs, isLoading, error };
}