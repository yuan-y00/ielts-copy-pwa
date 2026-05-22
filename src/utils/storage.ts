import type { WordPackId } from '../types/wordPack';

function progressKey(packId: WordPackId): string {
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
