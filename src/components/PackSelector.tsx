import type { WordPackId, WordPackMeta } from '../types/wordPack';

interface PackSelectorProps {
  packs: WordPackMeta[];
  currentPackId: WordPackId;
  onChange: (packId: WordPackId) => void;
}

export default function PackSelector({
  packs,
  currentPackId,
  onChange,
}: PackSelectorProps) {
  return (
    <div className="pack-selector">
      <select
        className="pack-selector__select"
        value={currentPackId}
        onChange={(e) => onChange(e.target.value as WordPackId)}
      >
        {packs.map((p) => (
          <option key={p.id} value={p.id}>
            {p.shortTitle}
          </option>
        ))}
      </select>
    </div>
  );
}
