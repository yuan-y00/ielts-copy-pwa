import React from 'react';

interface ProgressHeaderProps {
  completed: number;
  total: number;
  allDone: boolean;
  onContinue: () => void;
  onSaveCertificate: () => void;
}

const ProgressHeader: React.FC<ProgressHeaderProps> = ({
  completed,
  total,
  allDone,
  onContinue,
  onSaveCertificate,
}) => {
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="progress-header">
      <div className="progress-header__top">
        <span className="progress-header__count">
          {completed} / {total}
        </span>
        <div className="progress-header__actions">
          <button
            className="btn btn--sm btn--primary"
            onClick={onContinue}
            disabled={allDone}
          >
            继续抄写
          </button>
          {allDone && (
            <button
              className="btn btn--sm btn--cert"
              onClick={onSaveCertificate}
            >
              保存证书
            </button>
          )}
        </div>
      </div>
      <div className="progress-header__bar">
        <div
          className="progress-header__fill"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressHeader;
