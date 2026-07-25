import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

function AssistantIA() {
  const [question, setQuestion] = useState("");
  const [reponse, setReponse] = useState<string | null>(null);
  const [erreur, setErreur] = useState<string | null>(null);
  const [chargement, setChargement] = useState(false);

  async function demander(e: React.FormEvent) {
    e.preventDefault();
    if (!question.trim() || chargement) return;
    setChargement(true);
    setErreur(null);
    setReponse(null);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort("timeout"), 10000);

    try {
      const res = await fetch("https://api.dify.ai/v1/workflows/run", {
        method: "POST",
        headers: {
          Authorization: "Bearer app-XIEgbj96iTkwsvLljczkCwn2",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: { query: question },
          response_mode: "blocking",
          user: "SamaConsultation-" + Date.now(),
        }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      if (!res.ok) throw new Error("http");
      const data = await res.json();
      const outputs = data?.data?.outputs;
      let texte = "";
      if (typeof outputs === "string") texte = outputs;
      else if (outputs && typeof outputs === "object") {
        texte = (outputs.text || outputs.answer || outputs.output || JSON.stringify(outputs, null, 2)) as string;
      }
      setReponse(texte || "Aucune réponse.");
    } catch (err: unknown) {
      clearTimeout(timeoutId);
      const isAbort = (err instanceof DOMException && err.name === "AbortError") || controller.signal.aborted;
      setErreur(isAbort ? "La réponse prend trop de temps — réessayez" : "Service temporairement indisponible");
    } finally {
      setChargement(false);
    }
  }

  return (
    <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0" aria-hidden>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-900">Assistant IA</h2>
          <p className="text-sm text-slate-600">Posez une question sur vos rendez-vous, l'assistant vous répond.</p>
        </div>
      </div>

      <form onSubmit={demander} className="mt-4 flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Posez votre question sur un rendez-vous..."
          className="flex-1 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          disabled={chargement}
        />
        <button
          type="submit"
          disabled={chargement || !question.trim()}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-dark disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
        >
          {chargement && (
            <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" strokeWidth="4" />
              <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            </svg>
          )}
          {chargement ? "En cours..." : "Demander à l'assistant"}
        </button>
      </form>

      {(reponse || erreur || chargement) && (
        <div className="mt-4 rounded-xl bg-slate-50 border border-slate-200 p-4 min-h-[3rem] text-sm">
          {chargement && (
            <div className="flex items-center gap-2 text-slate-500">
              <svg className="animate-spin text-brand" width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" strokeWidth="4" />
                <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              </svg>
              <span>L'assistant réfléchit...</span>
            </div>
          )}
          {!chargement && erreur && (
            <p className="text-rose-700 font-medium" role="alert">{erreur}</p>
          )}
          {!chargement && reponse && (
            <p className="text-slate-800 whitespace-pre-wrap">{reponse}</p>
          )}
        </div>
      )}
    </div>
  );
}

export const Route = createFileRoute("/creneaux")({
  head: () => ({
    meta: [
      { title: "Créneaux disponibles — Sama Consultation" },
      {
        name: "description",
        content:
          "Consultez les créneaux de rendez-vous médicaux dans les centres de santé partenaires de Pikine, Guédiawaye et environs.",
      },
      { property: "og:title", content: "Créneaux disponibles — Sama Consultation" },
      {
        property: "og:description",
        content: "Créneaux confirmés, en attente ou annulés dans nos centres de santé partenaires.",
      },
    ],
  }),
  component: CreneauxPage,
});

type Statut = "Confirmé" | "En attente" | "Annulé";
type Disponibilite = "Disponible" | "Indisponible";

type Creneau = {
  id: number;
  patient: string;
  centre: string;
  date: string;
  disponibilite: Disponibilite;
  statut: Statut;
};

const creneaux: Creneau[] = [
  { id: 1, patient: "Aïssatou Diop", centre: "Poste de santé Pikine", date: "25 juillet 2026, 9h00", disponibilite: "Disponible", statut: "Confirmé" },
  { id: 2, patient: "Mamadou Faye", centre: "Centre de santé Guédiawaye", date: "26 juillet 2026, 10h30", disponibilite: "Disponible", statut: "Confirmé" },
  { id: 3, patient: "Fatou Ndiaye", centre: "Poste de santé Thiaroye", date: "24 juillet 2026, 14h00", disponibilite: "Indisponible", statut: "Annulé" },
  { id: 4, patient: "Ousmane Sarr", centre: "Centre de santé Pikine Icotaf", date: "27 juillet 2026, 8h30", disponibilite: "Disponible", statut: "En attente" },
  { id: 5, patient: "Awa Diallo", centre: "Poste de santé Guédiawaye Nord", date: "28 juillet 2026, 11h00", disponibilite: "Disponible", statut: "Confirmé" },
  { id: 6, patient: "Ibrahima Sy", centre: "Centre de santé Yeumbeul", date: "29 juillet 2026, 9h30", disponibilite: "Disponible", statut: "En attente" },
];

const filtres = ["Tous", "Confirmés", "En attente", "Annulés"] as const;
type Filtre = (typeof filtres)[number];

function statutStyles(statut: Statut) {
  switch (statut) {
    case "Confirmé":
      return "bg-emerald-50 text-emerald-700 border border-emerald-200";
    case "En attente":
      return "bg-amber-50 text-amber-700 border border-amber-200";
    case "Annulé":
      return "bg-rose-50 text-rose-700 border border-rose-200";
  }
}

function CreneauxPage() {
  const [filtre, setFiltre] = useState<Filtre>("Tous");

  const filtres_map: Record<Filtre, (c: Creneau) => boolean> = {
    Tous: () => true,
    Confirmés: (c) => c.statut === "Confirmé",
    "En attente": (c) => c.statut === "En attente",
    Annulés: (c) => c.statut === "Annulé",
  };

  const liste = useMemo(() => creneaux.filter(filtres_map[filtre]), [filtre]);

  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 py-12 md:py-16">
      <div className="max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
          Créneaux disponibles
        </h1>
        <p className="mt-3 text-slate-600">
          Rendez-vous à venir dans nos centres de santé partenaires à Pikine, Guédiawaye et Thiaroye.
        </p>
      </div>

      {/* Filtres */}
      <div className="mt-8 flex flex-wrap gap-2">
        {filtres.map((f) => {
          const actif = f === filtre;
          return (
            <button
              key={f}
              onClick={() => setFiltre(f)}
              className={
                actif
                  ? "px-4 py-2 rounded-full text-sm font-semibold bg-brand text-white shadow-sm"
                  : "px-4 py-2 rounded-full text-sm font-medium bg-white text-slate-700 border border-slate-200 hover:border-brand hover:text-brand transition-colors"
              }
              aria-pressed={actif}
            >
              {f}
            </button>
          );
        })}
      </div>

      {/* Grille */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {liste.map((c) => (
          <article
            key={c.id}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="font-semibold text-slate-900">{c.patient}</h2>
                <p className="mt-1 text-sm text-slate-600">{c.centre}</p>
              </div>
              <span
                className={
                  "inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full " +
                  (c.disponibilite === "Disponible"
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-rose-100 text-rose-800")
                }
              >
                <span
                  className={
                    "w-2 h-2 rounded-full " +
                    (c.disponibilite === "Disponible" ? "bg-emerald-500" : "bg-rose-500")
                  }
                />
                {c.disponibilite}
              </span>
            </div>

            <div className="mt-4 flex items-center gap-2 text-sm text-slate-700">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              <span>{c.date}</span>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className={"text-xs font-semibold px-2.5 py-1 rounded-full " + statutStyles(c.statut)}>
                {c.statut}
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-brand">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                Centre partenaire vérifié
              </span>
            </div>
          </article>
        ))}
      </div>

      {liste.length === 0 && (
        <p className="mt-10 text-center text-slate-500">Aucun créneau ne correspond à ce filtre.</p>
      )}

      <AssistantIA />
    </section>
  );
}
