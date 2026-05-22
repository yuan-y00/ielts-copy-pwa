import { useRef, useState } from 'react';
import { speak, speakSequence } from '../utils/speech';

export interface WordData {
  id: number | string;
  word: string;
  theme: string;
  translation: string;
  shortMeaningInSentence: string;
  exampleEn: string;
  exampleZh: string;
  fullForm?: string;
}

interface WordCardProps {
  word: WordData;
  completed: boolean;
  onComplete: (id: number | string) => void;
  inputRef?: React.RefObject<HTMLInputElement>;
  onEnterCorrect?: () => void;
}

export default function WordCard({
  word,
  completed,
  onComplete,
  inputRef,
  onEnterCorrect,
}: WordCardProps) {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const [shaking, setShaking] = useState(false);
  const localRef = useRef<HTMLInputElement>(null);
  const ref = inputRef || localRef;

  const isMatch = (v: string) =>
    v.trim().toLowerCase() === word.word.toLowerCase();

  const doComplete = () => {
    setError(false);
    onComplete(word.id);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setValue(v);
    if (error) setError(false);
    if (isMatch(v)) {
      doComplete();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (e.nativeEvent.isComposing) return;
      if (completed) {
        if (onEnterCorrect) onEnterCorrect();
        return;
      }
      const trimmed = value.trim();
      if (trimmed.toLowerCase() === word.word.toLowerCase()) {
        doComplete();
        if (onEnterCorrect) onEnterCorrect();
      } else {
        setError(true);
        setShaking(true);
        setTimeout(() => setShaking(false), 400);
      }
    }
  };

  const handleCopyAction = () => {
    speakSequence([
      { text: word.word, lang: 'en' },
      { text: word.translation, lang: 'zh' },
      { text: word.exampleEn, lang: 'en' },
    ]);
    setTimeout(() => {
      ref.current?.focus();
    }, 100);
  };

  const handlePlayWord = () => {
    speakSequence([
      { text: word.word, lang: 'en' },
      { text: word.translation, lang: 'zh' },
    ]);
  };

  return (
    <div className={`word-card${completed ? ' word-card--completed' : ''}`}>
      <div className="word-card__header">
        <div className="word-card__word-row">
          <button
            className="word-card__play-btn"
            onClick={handlePlayWord}
            aria-label={`Play ${word.word}`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
          <span className="word-card__word">{word.word}</span>
          <span className="word-card__translation">{word.translation}</span>
        </div>
        {word.fullForm && <p className="word-card__full-form">{word.fullForm}</p>}
        <p className="word-card__meaning">{word.shortMeaningInSentence}</p>
      </div>

      <div className="word-card__example">
        <div className="word-card__example-row">
          <button
            className="word-card__play-btn word-card__play-btn--small"
            onClick={() => speak(word.exampleEn, 'en')}
            aria-label="Play example"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
          <span className="word-card__example-en">{word.exampleEn}</span>
        </div>
        <p className="word-card__example-zh">{word.exampleZh}</p>
      </div>

      <div className="word-card__copy-area">
        <button
          className={`btn btn--copy${completed ? ' btn--copy-done' : ''}`}
          onClick={handleCopyAction}
        >
          {completed ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                <rect x="8" y="2" width="8" height="4" rx="1" />
              </svg>
              抄写
            </>
          )}
        </button>
        <input
          ref={ref}
          type="text"
          className={`word-card__input${shaking ? ' word-card__input--shake' : ''}${error ? ' word-card__input--error' : ''}`}
          value={completed ? '' : value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={completed ? '已完成' : '输入单词抄写...'}
          readOnly={completed}
          enterKeyHint="next"
          inputMode="text"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="none"
          spellCheck={false}
        />
      </div>

      {error && <p className="word-card__error">请检查拼写</p>}
    </div>
  );
}
