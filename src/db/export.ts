import { exportDB, importInto } from 'dexie-export-import';
import { db } from './database';

export async function exportDatabase(): Promise<void> {
  const blob = await exportDB(db);
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const date = new Date().toISOString().split('T')[0];
  a.download = `second-brain-backup-${date}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export async function importDatabase(file: File): Promise<void> {
  await importInto(db, file, {
    overwriteValues: true,
    clearTablesBeforeImport: true,
  });
}

export async function exportAsMarkdown(): Promise<void> {
  const memories = await db.memories.orderBy('updatedAt').reverse().toArray();
  let markdown = '# Second Brain Export\n\n';
  markdown += `Exported: ${new Date().toISOString()}\n\n---\n\n`;

  for (const memory of memories) {
    markdown += `## ${memory.title}\n\n`;
    markdown += `- **Type:** ${memory.type}\n`;
    markdown += `- **Domain:** ${memory.domain}\n`;
    markdown += `- **Importance:** ${memory.importance}/10\n`;
    markdown += `- **Created:** ${memory.createdAt.toISOString()}\n`;
    markdown += `- **Updated:** ${memory.updatedAt.toISOString()}\n`;
    if (memory.tags.length > 0) {
      markdown += `- **Tags:** ${memory.tags.map((t) => `#${t}`).join(' ')}\n`;
    }
    markdown += `\n${memory.content}\n\n---\n\n`;
  }

  const blob = new Blob([markdown], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const date = new Date().toISOString().split('T')[0];
  a.download = `second-brain-${date}.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export async function getLastBackupDate(): Promise<string | null> {
  const setting = await db.settings.get('lastBackupDate');
  return setting ? (setting.value as string) : null;
}

export async function setLastBackupDate(date: string): Promise<void> {
  await db.settings.put({ key: 'lastBackupDate', value: date, updatedAt: new Date() });
}

export async function getDaysSinceLastBackup(): Promise<number | null> {
  const lastDate = await getLastBackupDate();
  if (!lastDate) return null;
  const last = new Date(lastDate);
  const now = new Date();
  const diff = now.getTime() - last.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}
