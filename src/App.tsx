import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import wordsData from './data/ielts_words.json';
import type { WordData } from './components/WordCard';
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
} from './utils/storage';
import { saveCertificateImage } from './utils/certificate';
import { speakSequence } from './utils/speech';

const words = wordsData as WordData[];

function getSorted(words: WordData[]): WordData[] {
  return [...words].sort((a, b) => a.id - b.id);
}

export default function App() {
  const [completedIds, setCompletedIds] = useState<Set<number>>(() => {
    return new Set(getCompletedIds());
  });
  const [activeTheme, setActiveTheme] = useState('__all__');
  const [celebrationMilestone, setCelebrationMilestone] = useState<number | null>(null);
  const [showCertificate, setShowCertificate] = useState(false);
  const [certName, setCertName] = useState(getUserName);
  const [nameInputOpen, setNameInputOpen] = useState(false);

  const certRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const copyTriggers = useRef<Map<number, () => void>>(new Map());
  const inputRefs = useRef<Map<number, HTMLInputElement>>(new Map());

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

  const sortedWords = useMemo(() => getSorted(words), []);
  const total = sortedWords.length;
  const completed = completedIds.size;
  const allDone = completed === total && total > 0;

  const themes = useMemo(() => {
    const set = new Set<string>();
    words.forEach((w) => set.add(w.theme));
    return [...set].sort();
  }, []);

  const filteredWords = useMemo(() => {
    if (activeTheme === '__all__') return sortedWords;
    return sortedWords.filter((w) => w.theme === activeTheme);
  }, [activeTheme, sortedWords]);

  // Celebration check
  useEffect(() => {
    const milestone = Math.floor(completed / 50) * 50;
    if (milestone > 0 && milestone > getLastCelebratedMilestone()) {
      setLastCelebratedMilestone(milestone);
      setCelebrationMilestone(milestone);
    }
  }, [completed]);

  const handleComplete = useCallback((id: number) => {
    markCompleted(id);
    setCompletedIds((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }, []);

  const findNextUncompleted = useCallback(
    (): WordData | null => {
      for (const w of filteredWords) {
        if (!completedIds.has(w.id)) return w;
      }
      return null;
    },
    [filteredWords, completedIds]
  );

  const scrollToWord = useCallback((id: number) => {
    const el = cardRefs.current.get(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, []);

  const triggerCopy = useCallback((id: number) => {
    const fn = copyTriggers.current.get(id);
    if (fn) fn();
  }, []);

  const focusInput = useCallback((id: number) => {
    const input = inputRefs.current.get(id);
    if (input) {
      setTimeout(() => input.focus(), 150);
    }
  }, []);

  const handleContinue = useCallback(() => {
    const next = findNextUncompleted();
    if (next) {
      scrollToWord(next.id);
      setTimeout(() => {
        triggerCopy(next.id);
        focusInput(next.id);
      }, 200);
    }
  }, [findNextUncompleted, scrollToWord, triggerCopy, focusInput]);

  const handleEnterCorrect = useCallback(
    (currentId: number) => {
      let next: WordData | null = null;
      for (const w of filteredWords) {
        if (w.id === currentId) continue;
        if (!completedIds.has(w.id)) {
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
    [filteredWords, completedIds, scrollToWord, triggerCopy, focusInput]
  );

  const handleSaveCertificate = useCallback(async () => {
    const savedName = getUserName();
    if (!savedName) {
      setNameInputOpen(true);
      return;
    }
    setCertName(savedName);
    setShowCertificate(true);
  }, []);

  const handleNameSubmit = useCallback(() => {
    setUserName(certName);
    setNameInputOpen(false);
    setShowCertificate(true);
  }, [certName]);

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

  const registerCardRef = useCallback((id: number, el: HTMLDivElement | null) => {
    if (el) {
      cardRefs.current.set(id, el);
    } else {
      cardRefs.current.delete(id);
    }
  }, []);

  const registerCopyTrigger = useCallback((id: number, fn: () => void) => {
    copyTriggers.current.set(id, fn);
  }, []);

  const registerInputRef = useCallback((id: number, el: HTMLInputElement | null) => {
    if (el) {
      inputRefs.current.set(id, el);
    } else {
      inputRefs.current.delete(id);
    }
  }, []);

  const today = new Date().toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="app">
      <div className="app__header" ref={headerRef}>
        <div className="app__header-inner">
          <ProgressHeader
            completed={completed}
            total={total}
            allDone={allDone}
            onContinue={handleContinue}
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
        {filteredWords.map((word) => (
          <WordCardWrapper
            key={word.id}
            word={word}
            completed={completedIds.has(word.id)}
            onComplete={handleComplete}
            onEnterCorrect={handleEnterCorrect}
            registerCardRef={registerCardRef}
            registerCopyTrigger={registerCopyTrigger}
            registerInputRef={registerInputRef}
          />
        ))}
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

      {showCertificate && (
        <div style={{ position: 'absolute', left: '-9999px', top: 0 }}>
          <Certificate ref={certRef} name={certName} date={today} />
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
  word: WordData;
  completed: boolean;
  onComplete: (id: number) => void;
  onEnterCorrect: (id: number) => void;
  registerCardRef: (id: number, el: HTMLDivElement | null) => void;
  registerCopyTrigger: (id: number, fn: () => void) => void;
  registerInputRef: (id: number, el: HTMLInputElement | null) => void;
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
