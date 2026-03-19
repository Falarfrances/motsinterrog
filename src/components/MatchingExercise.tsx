import { useState } from "react";

interface Pair {
  left: string;
  rightLabel: string;
  correctRight: number;
}

interface Props {
  number: number;
  pairs: Pair[];
  rightOptions: string[];
  onScore: (points: number) => void;
}

const MatchingExercise = ({ number, pairs, rightOptions, onScore }: Props) => {
  const [answers, setAnswers] = useState<Record<number, number | null>>(
    Object.fromEntries(pairs.map((_, i) => [i, null]))
  );
  const [validated, setValidated] = useState(false);

  const handleChange = (pairIdx: number, val: string) => {
    if (validated) return;
    setAnswers(prev => ({ ...prev, [pairIdx]: val === "" ? null : parseInt(val) }));
  };

  const handleValidate = () => {
    if (validated) return;
    setValidated(true);
    const allCorrect = pairs.every((p, i) => answers[i] === p.correctRight);
    onScore(allCorrect ? 1 : 0);
  };

  const allFilled = pairs.every((_, i) => answers[i] !== null);
  const allCorrect = pairs.every((p, i) => answers[i] === p.correctRight);

  return (
    <div className="rounded-lg border border-border bg-card p-4 mb-4">
      <p className="font-semibold mb-3 text-card-foreground">
        <span className="text-primary font-bold mr-2">{number}.</span>
        Associe chaque mot à sa catégorie :
      </p>
      <div className="space-y-2">
        {pairs.map((p, i) => (
          <div key={i} className="flex items-center gap-3 flex-wrap">
            <span className="font-semibold min-w-[80px] text-card-foreground">{p.left}</span>
            <span className="text-muted-foreground">→</span>
            <select
              value={answers[i] ?? ""}
              onChange={e => handleChange(i, e.target.value)}
              disabled={validated}
              className="border border-input rounded-md px-3 py-1.5 text-sm bg-background text-foreground"
            >
              <option value="">Choisir...</option>
              {rightOptions.map((opt, oi) => (
                <option key={oi} value={oi}>{opt}</option>
              ))}
            </select>
            {validated && (
              <span className={`text-sm font-semibold ${answers[i] === p.correctRight ? "text-success" : "text-destructive"}`}>
                {answers[i] === p.correctRight ? "✅" : `❌ → ${rightOptions[p.correctRight]}`}
              </span>
            )}
          </div>
        ))}
      </div>
      {!validated && (
        <button
          onClick={handleValidate}
          disabled={!allFilled}
          className="mt-3 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-40 hover:opacity-90 transition"
        >
          Valider
        </button>
      )}
      {validated && (
        <p className={`mt-2 text-sm font-semibold ${allCorrect ? "text-success" : "text-destructive"}`}>
          {allCorrect ? "✅ Toutes les associations sont correctes !" : "❌ Vérifie les corrections ci-dessus."}
        </p>
      )}
    </div>
  );
};

export default MatchingExercise;
