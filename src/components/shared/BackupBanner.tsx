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
    <div className="flex items-center gap-3 px-4 py-2.5 bg-[var(--warning)]/10 border-b border-[var(--warning)]/30">
      <AlertTriangle size={16} color="var(--warning)" className="shrink-0" />
      <p className="text-xs text-[var(--warning)] flex-1">
        Last backup was {daysSinceBackup} days ago
      </p>
      <button
        onClick={handleBackup}
        className="flex items-center gap-1 px-3 py-1 bg-[var(--warning)] rounded-md text-xs font-medium text-white hover:opacity-90 transition-opacity shrink-0"
      >
        <Download size={12} />
        Backup
      </button>
      <button onClick={onDismiss} className="p-1 shrink-0">
        <X size={14} color="var(--warning)" />
      </button>
    </div>
  );
}
