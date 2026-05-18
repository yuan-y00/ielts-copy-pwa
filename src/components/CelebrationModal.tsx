import { useEffect } from 'react';
import confetti from 'canvas-confetti';

interface CelebrationModalProps {
  milestone: number;
  onClose: () => void;
}

export default function CelebrationModal({
  milestone,
  onClose,
}: CelebrationModalProps) {
  useEffect(() => {
    const duration = 2000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors: ['#4f46e5', '#818cf8', '#c7d2fe'],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors: ['#4f46e5', '#818cf8', '#c7d2fe'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();

    const timer = setTimeout(onClose, 2500);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="celebration-overlay" onClick={onClose}>
      <div className="celebration-modal" onClick={(e) => e.stopPropagation()}>
        <div className="celebration-modal__emoji">🎉</div>
        <h2 className="celebration-modal__title">太棒了！</h2>
        <p className="celebration-modal__text">
          你已经完成了 <strong>{milestone}</strong> 个单词！
        </p>
        <button className="btn btn--primary" onClick={onClose}>
          继续加油
        </button>
      </div>
    </div>
  );
}
