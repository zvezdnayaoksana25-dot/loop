interface InstallPromptProps {
  onInstall: () => void;
  onDismiss: () => void;
}

export function InstallPrompt({ onInstall, onDismiss }: InstallPromptProps) {
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-6 animate-fade-in">
      <div className="bg-[var(--bg-secondary)] rounded-2xl p-5 max-w-xs w-full text-center space-y-3">
        <div className="text-4xl">🧠</div>
        <h2 className="text-lg font-semibold text-[var(--text-primary)]">Second Brain</h2>
        <p className="text-sm text-[var(--text-secondary)]">
          Install for the best experience on your device.
        </p>
        <button
          onClick={onInstall}
          className="w-full py-2.5 bg-[var(--accent)] rounded-xl text-sm font-semibold text-white hover:bg-[var(--accent-hover)] transition-colors"
        >
          Add to Home Screen
        </button>
        <button
          onClick={onDismiss}
          className="text-sm text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors"
        >
          Not now
        </button>
      </div>
    </div>
  );
}
