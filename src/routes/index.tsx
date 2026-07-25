import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sama Consultation — Vos rendez-vous médicaux confirmés par SMS" },
      {
        name: "description",
        content:
          "Confirmez, annulez ou reprogrammez votre rendez-vous médical par SMS à Pikine et Guédiawaye. Sans smartphone ni connexion internet.",
      },
      { property: "og:title", content: "Sama Consultation — Vos rendez-vous médicaux confirmés par SMS" },
      {
        property: "og:description",
        content:
          "Confirmez, annulez ou reprogrammez votre rendez-vous médical par SMS à Pikine et Guédiawaye. Sans smartphone ni connexion internet.",
      },
    ],
  }),
  component: HomePage,
});

const stats = [
  { value: "500+", label: "patients accompagnés" },
  { value: "80%", label: "de rendez-vous confirmés à temps" },
  { value: "12", label: "centres de santé partenaires" },
];

const trustBadges = [
  "Ministère de la Santé",
  "Centre partenaire vérifié",
  "Données patients protégées",
];

function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-brand/5 to-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 md:py-24 grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">
              <span className="w-2 h-2 rounded-full bg-accent" /> Service SMS · Pikine & Guédiawaye
            </span>
            <h1 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Confirmez votre rendez-vous médical{" "}
              <span className="text-brand">par simple SMS</span>
            </h1>
            <p className="mt-5 text-lg text-slate-600 max-w-xl">
              Sans smartphone, sans internet. Sama Consultation permet aux patients des quartiers
              périphériques de Dakar de gérer leurs rendez-vous en toute simplicité.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href="#confirmer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-6 py-3 text-white font-semibold shadow-sm hover:bg-brand-dark transition-colors"
              >
                Confirmer mon rendez-vous
              </a>
              <Link
                to="/creneaux"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 text-white font-semibold shadow-sm hover:bg-accent-dark transition-colors"
              >
                Voir les créneaux disponibles
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {trustBadges.map((b) => (
                <span
                  key={b}
                  className="inline-flex items-center gap-1 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-full px-3 py-1"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-accent"><polyline points="20 6 9 17 4 12"/></svg>
                  {b}
                </span>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="rounded-3xl bg-white shadow-xl border border-slate-200 p-6 md:p-8">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                <div className="w-10 h-10 rounded-full bg-brand/10 text-brand flex items-center justify-center font-semibold">SC</div>
                <div>
                  <p className="font-semibold text-slate-900">Sama Consultation</p>
                  <p className="text-xs text-slate-500">SMS · à l'instant</p>
                </div>
              </div>
              <div className="mt-4 space-y-3">
                <div className="bg-slate-100 rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-slate-800 max-w-[85%]">
                  Bonjour Aïssatou, votre RDV au Poste de santé Pikine est prévu le 25/07 à 9h00.
                  Répondez OUI pour confirmer, NON pour annuler.
                </div>
                <div className="ml-auto bg-brand text-white rounded-2xl rounded-tr-sm px-4 py-3 text-sm max-w-[60%]">
                  OUI
                </div>
                <div className="bg-slate-100 rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-slate-800 max-w-[85%]">
                  ✅ Merci ! Votre rendez-vous est confirmé. À bientôt.
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-accent text-white rounded-full px-4 py-2 text-xs font-semibold shadow-lg hidden md:block">
              Gratuit pour le patient
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-brand text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 grid gap-6 md:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-4xl md:text-5xl font-extrabold">{s.value}</p>
              <p className="mt-2 text-white/85 text-sm md:text-base">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Comment ça marche */}
      <section id="confirmer" className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900">Comment ça marche</h2>
          <p className="mt-3 text-slate-600">
            Un service simple, pensé pour tous les téléphones — même sans internet.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            { n: "1", t: "Vous recevez un SMS", d: "Rappel automatique de votre rendez-vous 48h avant." },
            { n: "2", t: "Vous répondez", d: "OUI pour confirmer, NON pour annuler, ou choisissez un autre créneau." },
            { n: "3", t: "C'est confirmé", d: "Le centre de santé est notifié et vous accueille sereinement." },
          ].map((step) => (
            <div key={step.n} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-brand text-white flex items-center justify-center font-bold">
                {step.n}
              </div>
              <h3 className="mt-4 font-semibold text-slate-900">{step.t}</h3>
              <p className="mt-2 text-sm text-slate-600">{step.d}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            to="/creneaux"
            className="inline-flex items-center justify-center rounded-lg bg-brand px-6 py-3 text-white font-semibold hover:bg-brand-dark transition-colors"
          >
            Voir les créneaux disponibles
          </Link>
        </div>
      </section>
    </>
  );
}
