import { useState } from "react";

interface Option {
  label: string;
  correct: boolean;
}

interface Props {
  number: number;
  question: string;
  options: Option[];
  multiCorrect?: boolean;
  explanation?: string;
  onScore: (points: number) => void;
}

const MultipleChoiceExercise = ({ number, question, options, multiCorrect, explanation, onScore }: Props) => {
  const [selected, setSelected] = useState<number[]>([]);
  const [validated, setValidated] = useState(false);

  const handleSelect = (idx: number) => {
    if (validated) return;
    if (multiCorrect) {
      setSelected(prev => prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]);
    } else {
      setSelected([idx]);
    }
  };

  const handleValidate = () => {
    if (selected.length === 0 || validated) return;
    setValidated(true);
    const correctIndices = options.map((o, i) => o.correct ? i : -1).filter(i => i !== -1);
    const isCorrect = correctIndices.length === selected.length && correctIndices.every(i => selected.includes(i));
    onScore(isCorrect ? 1 : 0);
  };

  const correctIndices = options.map((o, i) => o.correct ? i : -1).filter(i => i !== -1);

  return (
    <div className="rounded-lg border border-border bg-card p-4 mb-4">
      <p className="font-semibold mb-3 text-card-foreground">
        <span className="text-primary font-bold mr-2">{number}.</span>
        {question}
      </p>
      {multiCorrect && <p className="text-sm text-muted-foreground mb-2">⚠️ Plusieurs réponses possibles</p>}
      <div className="space-y-2">
        {options.map((opt, idx) => {
          let cls = "border rounded-md px-4 py-2 cursor-pointer transition-all text-sm font-medium ";
          if (validated) {
            if (opt.correct) cls += "border-success bg-success/10 text-success";
            else if (selected.includes(idx)) cls += "border-destructive bg-destructive/10 text-destructive";
            else cls += "border-border text-muted-foreground";
          } else {
            cls += selected.includes(idx)
              ? "border-primary bg-primary/10 text-primary"
              : "border-border hover:border-primary/50 text-card-foreground";
          }
          return (
            <button key={idx} className={cls} onClick={() => handleSelect(idx)} disabled={validated}>
              {opt.label}
            </button>
          );
        })}
      </div>
      {!validated && (
        <button
          onClick={handleValidate}
          disabled={selected.length === 0}
          className="mt-3 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-40 hover:opacity-90 transition"
        >
          Valider
        </button>
      )}
      {validated && explanation && (
        <p className="mt-3 text-sm text-muted-foreground italic">💡 {explanation}</p>
      )}
      {validated && (
        <p className={`mt-2 text-sm font-semibold ${correctIndices.every(i => selected.includes(i)) && correctIndices.length === selected.length ? "text-success" : "text-destructive"}`}>
          {correctIndices.every(i => selected.includes(i)) && correctIndices.length === selected.length ? "✅ Bonne réponse !" : `❌ Réponse correcte : ${correctIndices.map(i => options[i].label).join(", ")}`}
        </p>
      )}
    </div>
  );
};

export default MultipleChoiceExercise;
