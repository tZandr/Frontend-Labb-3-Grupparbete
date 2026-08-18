import { useEffect, useState } from 'react'

type BeforeInstallPromptEvent = Event & {
    prompt: () => Promise<void>
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export function useInstallPrompt() {
    const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(null)
    const [isInstalled, setIsInstalled] = useState(
        () => window.matchMedia('(display-mode: standalone)').matches
    )

    useEffect(() => {
        function handleBeforeInstallPrompt(event: Event) {
            event.preventDefault()
            setInstallEvent(event as BeforeInstallPromptEvent)
        }

        function handleAppInstalled() {
            setIsInstalled(true)
            setInstallEvent(null)
        }

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
        window.addEventListener('appinstalled', handleAppInstalled)

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
            window.removeEventListener('appinstalled', handleAppInstalled)
        }
    }, [])

    async function promptInstall() {
        if (!installEvent) return
        await installEvent.prompt()
        const { outcome } = await installEvent.userChoice
        if (outcome === 'accepted') setIsInstalled(true)
        setInstallEvent(null)
    }

    return {
        canInstall: installEvent !== null,
        isInstalled,
        promptInstall,
    }
}
