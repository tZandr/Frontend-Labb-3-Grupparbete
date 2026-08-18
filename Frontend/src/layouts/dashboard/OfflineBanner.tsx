import { useOnlineStatus } from "../../hooks/useOnlineStatus";

export default function OfflineBanner() {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="offline-banner" role="status">
      You're offline, showing your saved logs.
    </div>
  );
}
