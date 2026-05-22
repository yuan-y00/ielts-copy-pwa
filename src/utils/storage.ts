import type { WordPackId } from '../types/wordPack';

export function progressKey(packId: WordPackId): string {
  return `copybook:${packId}:progress`;
}

function milestoneKey(packId: WordPackId): string {
  return `copybook:${packId}:last_milestone`;
}

function nameKey(packId: WordPackId): string {
  return `copybook:${packId}:name`;
}

export function getCompletedIds(
  packId: WordPackId = 'ielts-exam-context-2000',
): string[] {
  try {
    const raw = localStorage.getItem(progressKey(packId));
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.map((v: unknown) => String(v));
  } catch {
    return [];
  }
}

export function markCompleted(
  id: number | string,
  packId: WordPackId = 'ielts-exam-context-2000',
): void {
  const sid = String(id);
  const ids = getCompletedIds(packId);
  if (!ids.includes(sid)) {
    ids.push(sid);
    localStorage.setItem(progressKey(packId), JSON.stringify(ids));
  }
}

export function isCompleted(
  id: number | string,
  packId: WordPackId = 'ielts-exam-context-2000',
): boolean {
  return getCompletedIds(packId).includes(String(id));
}

export function getLastCelebratedMilestone(
  packId: WordPackId = 'ielts-exam-context-2000',
): number {
  try {
    const raw = localStorage.getItem(milestoneKey(packId));
    return raw ? parseInt(raw, 10) : 0;
  } catch {
    return 0;
  }
}

export function setLastCelebratedMilestone(
  milestone: number,
  packId: WordPackId = 'ielts-exam-context-2000',
): void {
  localStorage.setItem(milestoneKey(packId), String(milestone));
}

export function getUserName(
  packId: WordPackId = 'ielts-exam-context-2000',
): string {
  return localStorage.getItem(nameKey(packId)) || '';
}

export function setUserName(
  name: string,
  packId: WordPackId = 'ielts-exam-context-2000',
): void {
  localStorage.setItem(nameKey(packId), name);
}

export function resetProgress(
  packId: WordPackId = 'ielts-exam-context-2000',
): void {
  localStorage.removeItem(progressKey(packId));
  localStorage.removeItem(milestoneKey(packId));
}

// ===== Export / Import =====

export interface ProgressSnapshot {
  app: 'ielts-copy-pwa';
  version: 1;
  exportedAt: string;
  progressByPack: Record<string, {
    completedIds: string[];
    lastMilestone: number;
    name: string;
  } | null>;
}

export function exportAllProgress(packIds: WordPackId[]): void {
  const progressByPack: ProgressSnapshot['progressByPack'] = {};

  for (const packId of packIds) {
    const completedIds = getCompletedIds(packId);
    const lastMilestone = getLastCelebratedMilestone(packId);
    const name = getUserName(packId);

    if (completedIds.length > 0 || name) {
      progressByPack[packId] = { completedIds, lastMilestone, name };
    }
  }

  const snapshot: ProgressSnapshot = {
    app: 'ielts-copy-pwa',
    version: 1,
    exportedAt: new Date().toISOString(),
    progressByPack,
  };

  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, '0');
  const ts = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
  const filename = `ielts-copy-pwa-progress-${ts}.json`;

  const blob = new Blob([JSON.stringify(snapshot, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function importAllProgress(
  json: unknown,
  validPackIds: Set<string>,
): { ok: true; imported: string[] } | { ok: false; error: string } {
  if (!json || typeof json !== 'object') {
    return { ok: false, error: 'Invalid file: not a JSON object.' };
  }

  const data = json as Record<string, unknown>;

  if (data.app !== 'ielts-copy-pwa') {
    return { ok: false, error: `Unknown app "${String(data.app)}". Expected "ielts-copy-pwa".` };
  }

  if (typeof data.version !== 'number') {
    return { ok: false, error: 'Missing or invalid version field.' };
  }

  const byPack = data.progressByPack;
  if (!byPack || typeof byPack !== 'object' || Array.isArray(byPack)) {
    return { ok: false, error: 'Missing or invalid progressByPack.' };
  }

  const imported: string[] = [];

  for (const [packId, packData] of Object.entries(byPack as Record<string, unknown>)) {
    if (!validPackIds.has(packId)) continue;
    if (!packData || typeof packData !== 'object') continue;

    const pd = packData as Record<string, unknown>;

    const completedIds = pd.completedIds;
    if (Array.isArray(completedIds)) {
      const ids = completedIds.map((v) => String(v));
      localStorage.setItem(progressKey(packId as WordPackId), JSON.stringify(ids));
    }

    if (typeof pd.lastMilestone === 'number') {
      localStorage.setItem(`copybook:${packId}:last_milestone`, String(pd.lastMilestone));
    }

    if (typeof pd.name === 'string' && pd.name.length > 0) {
      localStorage.setItem(`copybook:${packId}:name`, pd.name);
    }

    imported.push(packId);
  }

  return { ok: true, imported };
}
