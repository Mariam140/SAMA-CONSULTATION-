import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page introuvable</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Cette page n'existe pas ou a été déplacée.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Le chargement a échoué
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Une erreur est survenue. Essayez de rafraîchir ou revenez à l'accueil.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Réessayer
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Accueil
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
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
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Sama Consultation — Vos rendez-vous médicaux confirmés par SMS" },
      { name: "twitter:description", content: "Confirmez, annulez ou reprogrammez votre rendez-vous médical par SMS à Pikine et Guédiawaye. Sans smartphone ni connexion internet." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/389860bf-4186-4daa-bd9b-61bfc9baaa9f/id-preview-63f6f45a--a2686ce0-2a82-4f52-9c03-23aeeb4a68ad.lovable.app-1784667314930.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/389860bf-4186-4daa-bd9b-61bfc9baaa9f/id-preview-63f6f45a--a2686ce0-2a82-4f52-9c03-23aeeb4a68ad.lovable.app-1784667314930.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

const navLinks = [
  { to: "/", label: "Accueil" },
  { to: "/creneaux", label: "Créneaux disponibles" },
  { to: "/saisie-terrain", label: "Saisie Données RDV" },
  { to: "/contact", label: "Contact" },
] as const;

function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-brand text-lg">
          <img src="/favicon.png" alt="Logo Sama Consultation" className="h-10 w-10 object-contain" />
          <span>Sama Consultation</span>
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: true }}
              className="px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:text-brand hover:bg-brand/5 transition-colors"
              activeProps={{ className: "px-3 py-2 rounded-md text-sm font-semibold text-brand bg-brand/10" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <button
          className="md:hidden p-2 rounded-md text-slate-700 hover:bg-slate-100"
          aria-label="Ouvrir le menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>
      </div>
      {open && (
        <nav className="md:hidden border-t border-slate-200 bg-white px-4 py-2 flex flex-col">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              activeOptions={{ exact: true }}
              className="px-3 py-3 rounded-md text-sm font-medium text-slate-700 hover:bg-brand/5"
              activeProps={{ className: "px-3 py-3 rounded-md text-sm font-semibold text-brand bg-brand/10" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 grid gap-8 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 font-bold text-brand">
            <img src="/favicon.png" alt="Logo Sama Consultation" className="h-6 w-6 object-contain" />
            <span className="text-sm">Sama Consultation</span>
          </div>
          <p className="mt-2 text-sm text-slate-600 max-w-xs">
            Confirmez vos rendez-vous médicaux par SMS, sans smartphone ni internet.
          </p>
        </div>
        <div className="text-sm text-slate-600">
          <h3 className="font-semibold text-slate-900 mb-2">Contact</h3>
          <p>Poste de santé de Pikine</p>
          <p>Route de Rufisque, Dakar, Sénégal</p>
          <p className="mt-1">contact@sama-consultation.sn</p>
        </div>
        <div className="text-sm text-slate-600">
          <h3 className="font-semibold text-slate-900 mb-2">Mentions légales</h3>
          <p>© {new Date().getFullYear()} Sama Consultation. Tous droits réservés.</p>
          <p className="mt-1">Service en partenariat avec les centres de santé publics.</p>
        </div>
      </div>
    </footer>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans">
        <SiteHeader />
        <main className="flex-1 pt-16">
          <Outlet />
        </main>
        <SiteFooter />
      </div>
    </QueryClientProvider>
  );
}