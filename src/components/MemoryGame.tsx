import { useState, useEffect, useCallback } from "react";

const PAIRS = [
  { fr: "Qui", pt: "Quem" },
  { fr: "Où", pt: "Onde" },
  { fr: "Quand", pt: "Quando" },
  { fr: "Quoi", pt: "O quê" },
  { fr: "Comment", pt: "Como" },
  { fr: "Combien", pt: "Quanto" },
  { fr: "Pourquoi", pt: "Por quê" },
  { fr: "Quel(le)", pt: "Qual" },
];

const CARD_COLORS = [
  "from-blue-500 to-indigo-600",
  "from-rose-400 to-pink-600",
  "from-emerald-400 to-teal-600",
  "from-amber-400 to-orange-500",
  "from-violet-400 to-purple-600",
  "from-cyan-400 to-sky-600",
  "from-fuchsia-400 to-pink-500",
  "from-lime-400 to-green-600",
];

interface Card {
  id: number;
  text: string;
  lang: "fr" | "pt";
  pairIndex: number;
  colorClass: string;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildCards(): Card[] {
  const cards: Card[] = [];
  PAIRS.forEach((p, i) => {
    cards.push({ id: i * 2, text: p.fr, lang: "fr", pairIndex: i, colorClass: CARD_COLORS[i] });
    cards.push({ id: i * 2 + 1, text: p.pt, lang: "pt", pairIndex: i, colorClass: CARD_COLORS[i] });
  });
  return shuffle(cards);
}

const MemoryGame = () => {
  const [cards, setCards] = useState<Card[]>(buildCards);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<Set<number>>(new Set());
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);

  const handleFlip = useCallback((id: number) => {
    if (flipped.length === 2) return;
    if (flipped.includes(id) || matched.has(id)) return;
    setFlipped(prev => [...prev, id]);
  }, [flipped, matched]);

  useEffect(() => {
    if (flipped.length !== 2) return;
    setMoves(m => m + 1);
    const [a, b] = flipped;
    const cardA = cards.find(c => c.id === a)!;
    const cardB = cards.find(c => c.id === b)!;

    if (cardA.pairIndex === cardB.pairIndex) {
      setTimeout(() => {
        setMatched(prev => new Set([...prev, a, b]));
        setFlipped([]);
      }, 600);
    } else {
      setTimeout(() => setFlipped([]), 900);
    }
  }, [flipped, cards]);

  useEffect(() => {
    if (matched.size === cards.length && cards.length > 0) setWon(true);
  }, [matched, cards]);

  const restart = () => {
    setCards(buildCards());
    setFlipped([]);
    setMatched(new Set());
    setMoves(0);
    setWon(false);
  };

  return (
    <div>
      <h2 className="text-lg font-display text-foreground mb-2">🃏 Jeu de Mémoire — Mots Interrogatifs</h2>
      <p className="text-sm text-muted-foreground mb-4">
        Trouve les paires : mot en français 🇫🇷 ↔ traduction en portugais 🇧🇷
      </p>

      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <span className="text-sm font-semibold text-foreground">Coups : <span className="text-primary">{moves}</span></span>
        <span className="text-sm text-muted-foreground">{matched.size / 2} / {PAIRS.length} paires trouvées</span>
        <button onClick={restart} className="text-sm rounded-md bg-muted px-3 py-1.5 font-semibold text-muted-foreground hover:bg-muted/80 transition">
          🔄 Rejouer
        </button>
      </div>

      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {cards.map(card => {
          const isFlipped = flipped.includes(card.id);
          const isMatched = matched.has(card.id);
          const showFace = isFlipped || isMatched;

          return (
            <button
              key={card.id}
              onClick={() => handleFlip(card.id)}
              disabled={showFace}
              className="relative w-full aspect-[3/4] rounded-xl perspective-500"
              style={{ perspective: "600px" }}
            >
              <div
                className="absolute inset-0 transition-transform duration-500 rounded-xl"
                style={{
                  transformStyle: "preserve-3d",
                  transform: showFace ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
              >
                {/* Back */}
                <div
                  className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/80 to-primary border-2 border-primary/30 flex items-center justify-center shadow-md hover:shadow-lg hover:scale-[1.03] transition-all cursor-pointer"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <span className="text-2xl sm:text-3xl text-primary-foreground select-none">❓</span>
                </div>
                {/* Front */}
                <div
                  className={`absolute inset-0 rounded-xl bg-gradient-to-br ${card.colorClass} border-2 border-white/20 flex flex-col items-center justify-center shadow-lg p-1 ${isMatched ? "ring-2 ring-success ring-offset-2 ring-offset-background" : ""}`}
                  style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white/70 mb-0.5">
                    {card.lang === "fr" ? "🇫🇷 FR" : "🇧🇷 PT"}
                  </span>
                  <span className="text-sm sm:text-lg font-bold text-white text-center leading-tight drop-shadow">
                    {card.text}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {won && (
        <div className="mt-6 rounded-lg border-2 border-success bg-card p-5 text-center animate-in fade-in zoom-in-95 duration-500">
          <p className="text-2xl mb-1">🎉</p>
          <h3 className="text-xl font-display text-foreground mb-1">Bravo !</h3>
          <p className="text-muted-foreground text-sm mb-3">Tu as trouvé toutes les paires en <strong className="text-primary">{moves}</strong> coups !</p>
          <button onClick={restart} className="rounded-md bg-primary px-5 py-2.5 font-semibold text-primary-foreground hover:opacity-90 transition">
            🔄 Rejouer
          </button>
        </div>
      )}
    </div>
  );
};

export default MemoryGame;
