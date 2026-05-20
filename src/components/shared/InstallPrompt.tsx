interface InstallPromptProps {
  onInstall: () => void;
  onDismiss: () => void;
}

export function InstallPrompt({ onInstall, onDismiss }: InstallPromptProps) {
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-6 animate-fade-in">
      <div className="bg-[var(--bg-secondary)] rounded-2xl p-6 max-w-sm w-full text-center space-y-4">
        <div className="text-5xl">🧠</div>
        <h2 className="text-xl font-semibold text-[var(--text-primary)]">Second Brain</h2>
        <p className="text-sm text-[var(--text-secondary)]">
          Your AI second brain that remembers everything. Install for the best experience.
        </p>
        <button
          onClick={onInstall}
          className="w-full py-3 bg-[var(--accent)] rounded-xl text-sm font-semibold text-white hover:bg-[var(--accent-hover)] transition-colors"
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
