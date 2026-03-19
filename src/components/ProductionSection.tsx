import { useState } from "react";

interface Activity {
  title: string;
  icon: string;
  objective: string;
  instructions: string[];
  constraints?: string[];
  timer?: number;
}

const activities: Activity[] = [
  {
    title: "Mini-interview",
    icon: "🎤",
    objective: "Automatiser les questions de base",
    instructions: [
      "Où tu habites ?",
      "Tu fais quoi ce week-end ?",
      "Avec qui ?",
      "Quand ?",
      "Combien ça coûte ?",
    ],
  },
  {
    title: "Jeu « Touriste perdu »",
    icon: "🗼",
    objective: "Tu es à Paris, tu es perdu. Pose au minimum 4 questions avec : où, comment, combien",
    instructions: [
      "Utilise « où » pour trouver un lieu",
      "Utilise « comment » pour demander le chemin",
      "Utilise « combien » pour demander un prix",
      "Invente une 4e question !",
    ],
  },
  {
    title: "Speed questioning",
    icon: "⚡",
    objective: "Pose le maximum de questions en 2 minutes !",
    instructions: ["Pas le droit de répéter la même structure"],
    constraints: ["⚠️ Interdit de répéter la même structure de question"],
    timer: 120,
  },
  {
    title: "Reconstruction d'une situation",
    icon: "🎯",
    objective: "Organiser une sortie — pose les bonnes questions",
    instructions: [
      "1 question de lieu (où ?)",
      "1 question de temps (quand ?)",
      "1 question de prix (combien ?)",
      "1 question de personne (qui ?)",
    ],
  },
  {
    title: "Production guidée",
    icon: "✍️",
    objective: "Écris puis dis : « Tu veux organiser un voyage. Pose 6 questions. »",
    instructions: [
      "Où on va ?",
      "Quand on part ?",
      "Combien ça coûte ?",
      "Qui vient avec nous ?",
      "Comment on y va ?",
      "Quel hôtel on choisit ?",
    ],
  },
];

const ProductionSection = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);

  const startTimer = () => {
    setTimeLeft(120);
    setTimerRunning(true);
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setTimerRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold font-display text-primary mb-2">🗣️ Production / Interaction</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Ces activités sont à faire à l'oral ou à l'écrit. Clique sur une activité pour voir les consignes.
      </p>
      {activities.map((act, i) => (
        <div key={i} className="rounded-lg border border-border bg-card overflow-hidden">
          <button
            onClick={() => setOpenIdx(openIdx === i ? null : i)}
            className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-muted/50 transition"
          >
            <span className="font-semibold text-card-foreground">
              {act.icon} {i + 1}. {act.title}
            </span>
            <span className="text-muted-foreground text-lg">{openIdx === i ? "▲" : "▼"}</span>
          </button>
          {openIdx === i && (
            <div className="px-4 pb-4 border-t border-border pt-3">
              <p className="text-sm font-medium text-primary mb-2">🎯 {act.objective}</p>
              <ul className="space-y-1 mb-2">
                {act.instructions.map((inst, j) => (
                  <li key={j} className="text-sm text-card-foreground">👉 {inst}</li>
                ))}
              </ul>
              {act.constraints && act.constraints.map((c, j) => (
                <p key={j} className="text-sm text-destructive font-medium">{c}</p>
              ))}
              {act.timer && (
                <div className="mt-3">
                  {!timerRunning ? (
                    <button
                      onClick={startTimer}
                      className="rounded-md bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground hover:opacity-90 transition"
                    >
                      ⏱ Lancer le chrono (2 min)
                    </button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-primary">
                        {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
                      </span>
                      {timeLeft === 0 && <span className="text-destructive font-semibold">⏰ Temps écoulé !</span>}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductionSection;
