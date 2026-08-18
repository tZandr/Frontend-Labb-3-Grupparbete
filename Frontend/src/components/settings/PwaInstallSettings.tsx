import { useInstallPrompt } from "../../hooks/useInstallPrompt";
import "./PwaInstallSettings.scss";

const isIos = /iphone|ipad|ipod/i.test(navigator.userAgent);

export default function PwaInstallSettings() {
  const { canInstall, isInstalled, promptInstall } = useInstallPrompt();

  return (
    <section className="pwa-install">
      <h2 className="pwa-install__label">Get the app</h2>

      {isInstalled ? (
        <p className="pwa-install__hint">Bloom is installed on this device.</p>
      ) : canInstall ? (
        <>
          <p className="pwa-install__hint">
            Install Bloom for quicker access and offline support.
          </p>
          <button
            type="button"
            className="pwa-install__btn"
            onClick={promptInstall}
          >
            Install Bloom on this device
          </button>
        </>
      ) : isIos ? (
        <p className="pwa-install__hint">
          Bloom works offline. To install it, tap the Share icon in Safari,
          then choose "Add to Home Screen".
        </p>
      ) : (
        <p className="pwa-install__hint">
          Bloom works offline. To install it, open your browser's menu and
          look for "Install app" or "Add to Home Screen". In Chrome or
          Edge you can also use the install icon in the address bar.
        </p>
      )}
    </section>
  );
}
