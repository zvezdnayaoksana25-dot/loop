import { AlertTriangle, X, Download } from 'lucide-react';
import { exportDatabase, setLastBackupDate } from '../../db/export';

interface BackupBannerProps {
  daysSinceBackup: number;
  onDismiss: () => void;
}

export function BackupBanner({ daysSinceBackup, onDismiss }: BackupBannerProps) {
  const handleBackup = async () => {
    await exportDatabase();
    await setLastBackupDate(new Date().toISOString());
    onDismiss();
  };

  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-[var(--warning)]/10 border-b border-[var(--warning)]/30 shrink-0">
      <AlertTriangle size={14} color="var(--warning)" className="shrink-0" />
      <p className="text-xs text-[var(--warning)] flex-1 truncate">
        Backup {daysSinceBackup}d ago
      </p>
      <button
        onClick={handleBackup}
        className="flex items-center gap-1 px-2 py-1 bg-[var(--warning)] rounded text-xs font-medium text-white shrink-0"
      >
        <Download size={10} />
        Now
      </button>
      <button onClick={onDismiss} className="p-1 shrink-0">
        <X size={12} color="var(--warning)" />
      </button>
    </div>
  );
}
