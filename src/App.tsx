import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import type { DisplayWordData, WordPackId, WordPackMeta } from './types/wordPack';
import { loadWordPack, getWordPackMeta, DEFAULT_PACK_ID } from './data/packs';
import PackSelector from './components/PackSelector';
import ProgressHeader from './components/ProgressHeader';
import ThemeTabs from './components/ThemeTabs';
import WordCard from './components/WordCard';
import CelebrationModal from './components/CelebrationModal';
import Certificate from './components/Certificate';
import {
  getCompletedIds,
  markCompleted,
  getLastCelebratedMilestone,
  setLastCelebratedMilestone,
  getUserName,
  setUserName,
  exportAllProgress,
  importAllProgress,
} from './utils/storage';
import { saveCertificateImage } from './utils/certificate';
import { speakSequence } from './utils/speech';

function getSorted(words: DisplayWordData[]): DisplayWordData[] {
  return [...words].sort((a, b) => Number(a.id) - Number(b.id));
}

const ALL_PACK_IDS: WordPackId[] = [
  'ielts-exam-context-2000',
  'robotics-maintenance-troubleshooting-1000',
  'foreign-trade-crowdfunding-dtc-operations-1000',
  'robotics-rd-engineering-research-1000',
  'ai-product-management-llm-products-1000',
  'smart-hardware-overseas-channel-sales-core',
];

export default function App() {
  const [currentPackId, setCurrentPackId] =
    useState<WordPackId>(DEFAULT_PACK_ID);
  const [words, setWords] = useState<DisplayWordData[]>([]);
  const [isLoadingPack, setIsLoadingPack] = useState(true);
  const [completedIds, setCompletedIds] = useState<Set<string>>(() => {
    return new Set(getCompletedIds(DEFAULT_PACK_ID));
  });
  const [activeTheme, setActiveTheme] = useState('__all__');
  const [celebrationMilestone, setCelebrationMilestone] =
    useState<number | null>(null);
  const [showCertificate, setShowCertificate] = useState(false);
  const [certName, setCertName] = useState(() =>
    getUserName(DEFAULT_PACK_ID),
  );
  const [nameInputOpen, setNameInputOpen] = useState(false);
  const [importConfirmData, setImportConfirmData] =
    useState<Record<string, unknown> | null>(null);
  const [importStatus, setImportStatus] =
    useState<{ type: 'ok' | 'err'; msg: string } | null>(null);

  const certRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const copyTriggers = useRef<Map<string, () => void>>(new Map());
  const inputRefs = useRef<Map<string, HTMLInputElement>>(new Map());

  // Load word pack when packId changes
  useEffect(() => {
    let cancelled = false;
    async function load() {
      setIsLoadingPack(true);
      cardRefs.current.clear();
      copyTriggers.current.clear();
      inputRefs.current.clear();

      const data = await loadWordPack(currentPackId);
      if (cancelled) return;

      setWords(data);
      setActiveTheme('__all__');
      setCompletedIds(new Set(getCompletedIds(currentPackId)));
      setIsLoadingPack(false);
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [currentPackId]);

  // Measure header height for scroll-margin and padding-top
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const h = entry.contentRect.height;
        document.documentElement.style.setProperty('--header-height', `${h}px`);
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const sortedWords = useMemo(() => getSorted(words), [words]);
  const total = sortedWords.length;
  const completed = completedIds.size;
  const allDone = completed === total && total > 0;

  const themes = useMemo(() => {
    const set = new Set<string>();
    words.forEach((w) => set.add(w.theme));
    return [...set].sort();
  }, [words]);

  const filteredWords = useMemo(() => {
    if (activeTheme === '__all__') return sortedWords;
    return sortedWords.filter((w) => w.theme === activeTheme);
  }, [activeTheme, sortedWords]);

  // Celebration check
  useEffect(() => {
    const milestone = Math.floor(completed / 50) * 50;
    if (
      milestone > 0 &&
      milestone > getLastCelebratedMilestone(currentPackId)
    ) {
      setLastCelebratedMilestone(milestone, currentPackId);
      setCelebrationMilestone(milestone);
    }
  }, [completed, currentPackId]);

  const handleComplete = useCallback(
    (id: number | string) => {
      markCompleted(id, currentPackId);
      setCompletedIds((prev) => {
        const next = new Set(prev);
        next.add(String(id));
        return next;
      });
    },
    [currentPackId],
  );

  const findNextUncompleted = useCallback((): DisplayWordData | null => {
    for (const w of filteredWords) {
      if (!completedIds.has(String(w.id))) return w;
    }
    return null;
  }, [filteredWords, completedIds]);

  const scrollToWord = useCallback((id: number | string) => {
    const el = cardRefs.current.get(String(id));
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, []);

  const triggerCopy = useCallback((id: number | string) => {
    const fn = copyTriggers.current.get(String(id));
    if (fn) fn();
  }, []);

  const focusInput = useCallback((id: number | string) => {
    const input = inputRefs.current.get(String(id));
    if (input) {
      setTimeout(() => input.focus(), 150);
    }
  }, []);

  const goToFirstUncompletedInCurrentPack = useCallback(() => {
    const next = findNextUncompleted();
    if (next) {
      scrollToWord(next.id);
      setTimeout(() => {
        triggerCopy(next.id);
        focusInput(next.id);
      }, 200);
    }
  }, [findNextUncompleted, scrollToWord, triggerCopy, focusInput]);

  const goToNextUncompletedInCurrentTheme = useCallback(
    (currentId: number | string) => {
      let next: DisplayWordData | null = null;
      for (const w of filteredWords) {
        if (String(w.id) === String(currentId)) continue;
        if (!completedIds.has(String(w.id))) {
          next = w;
          break;
        }
      }
      if (next) {
        scrollToWord(next.id);
        setTimeout(() => {
          triggerCopy(next.id);
          focusInput(next.id);
        }, 200);
      }
    },
    [filteredWords, completedIds, scrollToWord, triggerCopy, focusInput],
  );

  const handleSaveCertificate = useCallback(async () => {
    const savedName = getUserName(currentPackId);
    if (!savedName) {
      setNameInputOpen(true);
      return;
    }
    setCertName(savedName);
    setShowCertificate(true);
  }, [currentPackId]);

  const handleNameSubmit = useCallback(() => {
    setUserName(certName, currentPackId);
    setNameInputOpen(false);
    setShowCertificate(true);
  }, [certName, currentPackId]);

  const validPackIdSet = useMemo(
    () => new Set(ALL_PACK_IDS),
    [],
  );

  const handleExport = useCallback(() => {
    exportAllProgress(ALL_PACK_IDS);
  }, []);

  const handleImportFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setImportStatus(null);
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const json = JSON.parse(reader.result as string);
        setImportConfirmData(json);
      } catch {
        setImportStatus({ type: 'err', msg: 'Invalid JSON file.' });
      }
    };
    reader.onerror = () => {
      setImportStatus({ type: 'err', msg: 'Failed to read file.' });
    };
    reader.readAsText(file);

    // Reset input so same file can be re-selected
    e.target.value = '';
  }, []);

  const handleImportConfirm = useCallback(() => {
    if (!importConfirmData) return;
    const result = importAllProgress(importConfirmData, validPackIdSet);
    setImportConfirmData(null);
    if (result.ok) {
      if (result.imported.length === 0) {
        setImportStatus({ type: 'err', msg: 'No matching word packs found in file.' });
      } else {
        setImportStatus({ type: 'ok', msg: `Imported progress for ${result.imported.length} pack(s). Refresh the page to apply.` });
      }
    } else {
      setImportStatus({ type: 'err', msg: result.error });
    }
  }, [importConfirmData, validPackIdSet]);

  const handleImportCancel = useCallback(() => {
    setImportConfirmData(null);
  }, []);

  useEffect(() => {
    if (showCertificate && certRef.current) {
      setTimeout(async () => {
        if (certRef.current) {
          await saveCertificateImage(certRef.current);
          setShowCertificate(false);
        }
      }, 300);
    }
  }, [showCertificate]);

  const registerCardRef = useCallback(
    (id: number | string, el: HTMLDivElement | null) => {
      if (el) {
        cardRefs.current.set(String(id), el);
      } else {
        cardRefs.current.delete(String(id));
      }
    },
    [],
  );

  const registerCopyTrigger = useCallback(
    (id: number | string, fn: () => void) => {
      copyTriggers.current.set(String(id), fn);
    },
    [],
  );

  const registerInputRef = useCallback(
    (id: number | string, el: HTMLInputElement | null) => {
      if (el) {
        inputRefs.current.set(String(id), el);
      } else {
        inputRefs.current.delete(String(id));
      }
    },
    [],
  );

  const allPacks: WordPackMeta[] = useMemo(
    () => ALL_PACK_IDS.map((id) => getWordPackMeta(id)),
    [],
  );

  const packMeta = getWordPackMeta(currentPackId);

  const today = new Date().toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="app">
      <div className="app__header" ref={headerRef}>
        <div className="app__header-inner">
          <PackSelector
            packs={allPacks}
            currentPackId={currentPackId}
            onChange={setCurrentPackId}
          />
          <div className="progress-sync">
            <button
              className="btn btn--sync"
              onClick={handleExport}
              title="Export progress"
            >
              Export
            </button>
            <button
              className="btn btn--sync"
              onClick={() => fileInputRef.current?.click()}
              title="Import progress"
            >
              Import
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              style={{ display: 'none' }}
              onChange={handleImportFile}
            />
          </div>
          {importStatus && (
            <div
              className={`progress-sync-msg ${
                importStatus.type === 'ok'
                  ? 'progress-sync-msg--ok'
                  : 'progress-sync-msg--err'
              }`}
            >
              {importStatus.msg}
            </div>
          )}
          <ProgressHeader
            completed={completed}
            total={total}
            allDone={allDone}
            onContinue={goToFirstUncompletedInCurrentPack}
            onSaveCertificate={handleSaveCertificate}
          />
          <ThemeTabs
            themes={themes}
            active={activeTheme}
            onChange={setActiveTheme}
          />
        </div>
      </div>

      <div className="app__list">
        {isLoadingPack ? (
          <div className="app__loading">Loading...</div>
        ) : (
          filteredWords.map((word) => (
            <WordCardWrapper
              key={String(word.id)}
              word={word}
              completed={completedIds.has(String(word.id))}
              onComplete={handleComplete}
              onEnterCorrect={goToNextUncompletedInCurrentTheme}
              registerCardRef={registerCardRef}
              registerCopyTrigger={registerCopyTrigger}
              registerInputRef={registerInputRef}
            />
          ))
        )}
      </div>

      {celebrationMilestone !== null && (
        <CelebrationModal
          milestone={celebrationMilestone}
          onClose={() => setCelebrationMilestone(null)}
        />
      )}

      {nameInputOpen && (
        <div className="name-overlay" onClick={() => setNameInputOpen(false)}>
          <div className="name-modal" onClick={(e) => e.stopPropagation()}>
            <h3>输入你的名字</h3>
            <input
              type="text"
              className="name-modal__input"
              value={certName}
              onChange={(e) => setCertName(e.target.value)}
              placeholder="Learner"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleNameSubmit();
              }}
            />
            <button className="btn btn--primary" onClick={handleNameSubmit}>
              生成证书
            </button>
          </div>
        </div>
      )}

      {importConfirmData && (
        <div className="name-overlay" onClick={handleImportCancel}>
          <div className="name-modal" onClick={(e) => e.stopPropagation()}>
            <h3>确认导入</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: 16 }}>
              导入会覆盖当前本地学习进度，确定继续吗？
            </p>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
              <button className="btn btn--primary" onClick={handleImportConfirm}>
                确定导入
              </button>
              <button
                className="btn"
                onClick={handleImportCancel}
                style={{ background: 'var(--border)', color: 'var(--text)' }}
              >
                取消
              </button>
            </div>
          </div>
        </div>
      )}

      {showCertificate && (
        <div style={{ position: 'absolute', left: '-9999px', top: 0 }}>
          <Certificate
            ref={certRef}
            name={certName}
            date={today}
            packTitle={packMeta.title}
          />
        </div>
      )}
    </div>
  );
}

// Wrapper to bridge WordCard with the ref registration pattern
function WordCardWrapper({
  word,
  completed,
  onComplete,
  onEnterCorrect,
  registerCardRef,
  registerCopyTrigger,
  registerInputRef,
}: {
  word: DisplayWordData;
  completed: boolean;
  onComplete: (id: number | string) => void;
  onEnterCorrect: (id: number | string) => void;
  registerCardRef: (id: number | string, el: HTMLDivElement | null) => void;
  registerCopyTrigger: (id: number | string, fn: () => void) => void;
  registerInputRef: (id: number | string, el: HTMLInputElement | null) => void;
}) {
  const cardElRef = useRef<HTMLDivElement>(null);
  const inputElRef = useRef<HTMLInputElement>(null);
  const copyFnRef = useRef<() => void>(() => {});

  useEffect(() => {
    registerCardRef(word.id, cardElRef.current);
    return () => registerCardRef(word.id, null);
  }, [word.id, registerCardRef]);

  const handleCopyAction = useCallback(() => {
    speakSequence([
      { text: word.word, lang: 'en' },
      { text: word.translation, lang: 'zh' },
      { text: word.exampleEn, lang: 'en' },
    ]);
    setTimeout(() => {
      inputElRef.current?.focus();
    }, 100);
  }, [word.word, word.translation, word.exampleEn]);

  useEffect(() => {
    copyFnRef.current = handleCopyAction;
    registerCopyTrigger(word.id, handleCopyAction);
  }, [word.id, handleCopyAction, registerCopyTrigger]);

  useEffect(() => {
    registerInputRef(word.id, inputElRef.current);
    return () => registerInputRef(word.id, null);
  }, [word.id, registerInputRef]);

  return (
    <div ref={cardElRef}>
      <WordCard
        word={word}
        completed={completed}
        onComplete={onComplete}
        inputRef={inputElRef}
        onEnterCorrect={() => onEnterCorrect(word.id)}
      />
    </div>
  );
}
