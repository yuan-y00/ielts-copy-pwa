const PROGRESS_KEY = 'ielts_copy_progress';
const MILESTONE_KEY = 'ielts_copy_last_milestone';
const NAME_KEY = 'ielts_copy_name';

export function getCompletedIds(): number[] {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as number[];
  } catch {
    return [];
  }
}

export function markCompleted(id: number): void {
  const ids = getCompletedIds();
  if (!ids.includes(id)) {
    ids.push(id);
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(ids));
  }
}

export function isCompleted(id: number): boolean {
  return getCompletedIds().includes(id);
}

export function getLastCelebratedMilestone(): number {
  try {
    const raw = localStorage.getItem(MILESTONE_KEY);
    return raw ? parseInt(raw, 10) : 0;
  } catch {
    return 0;
  }
}

export function setLastCelebratedMilestone(milestone: number): void {
  localStorage.setItem(MILESTONE_KEY, String(milestone));
}

export function getUserName(): string {
  return localStorage.getItem(NAME_KEY) || '';
}

export function setUserName(name: string): void {
  localStorage.setItem(NAME_KEY, name);
}

export function resetProgress(): void {
  localStorage.removeItem(PROGRESS_KEY);
  localStorage.removeItem(MILESTONE_KEY);
}
