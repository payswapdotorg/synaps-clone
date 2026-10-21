"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { activeTeam, loadSession, updateSession, uid, type SimSession, type SimTeam } from "@/lib/session";
import { AppPage, SimNote } from "@/components/app/AppPage";

/**
 * /billing — the observed billing surface: stripe.listProducts /
 * createCheckout / createPortalSession / getSubscription / cancelSubscription /
 * listInvoices / validatePromo. Upgrades are simulated locally (plan flips,
 * entitlements change, a mock invoice is recorded).
 */
export default function BillingPage() {
  const [session, setSession] = useState<SimSession | null>(null);
  const [promo, setPromo] = useState("");
  const [promoMsg, setPromoMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => setSession(loadSession()), []);

  if (!session) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-surface-base">
        <Link href="/login" className="text-sm underline underline-offset-2">Sign in to view billing</Link>
      </main>
    );
  }

  const team: SimTeam = activeTeam(session);

  function upgrade() {
    setBusy(true);
    setTimeout(() => {
      updateSession((s) => ({
        ...s,
        teams: s.teams.map((t) =>
          t.id === team.id
            ? {
                ...t,
                plan: "Pro",
                credits: t.credits + 300,
                entitlements: { maxModels: Number.POSITIVE_INFINITY, maxPages: Number.POSITIVE_INFINITY, dwgImport: true, dxfImport: true, dwgExport: true, watermarked: false },
                invoices: [
                  {
                    id: uid("in"),
                    number: `INV-${new Date().getFullYear()}-${String(t.invoices.length + 1).padStart(4, "0")}`,
                    amount: 24,
                    currency: "usd",
                    status: "paid",
                    date: new Date().toISOString(),
                    description: "Synaps Pro (simulated)",
                  },
                  ...t.invoices,
                ],
              }
            : t,
        ),
        notifications: [
          { id: uid("n"), kind: "credits" as const, title: "Upgraded to Pro (simulated)", body: "Unlimited models and pages, +300 credits. No payment occurred.", at: new Date().toISOString(), read: false },
          ...s.notifications,
        ],
      }));
      setSession(loadSession());
      setBusy(false);
    }, 700);
  }

  function cancel() {
    setBusy(true);
    setTimeout(() => {
      updateSession((s) => ({
        ...s,
        teams: s.teams.map((t) =>
          t.id === team.id
            ? { ...t, plan: "Free", entitlements: { maxModels: 3, maxPages: 3, dwgImport: false, dxfImport: true, dwgExport: false, watermarked: true } }
            : t,
        ),
      }));
      setSession(loadSession());
      setBusy(false);
    }, 500);
  }

  function validatePromo() {
    const ok = promo.trim().toUpperCase() === "SYNAPS-CLONE";
    setPromoMsg(ok ? "Promo applied: 10% off (simulated)" : "Invalid code — try SYNAPS-CLONE");
  }

  return (
    <AppPage
      section="billing"
      title="Billing"
      subtitle={`${team.name} · ${team.plan} plan · ${team.credits} credits`}
      wide
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div className={`rounded-surface border p-5 ${team.plan === "Free" ? "border-border-solid/40" : "border-border-solid/15"}`}>
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-content-primary">Free</h2>
            {team.plan === "Free" && <span className="rounded-pill bg-surface-raised px-2 py-0.5 text-[10px] font-semibold text-content-primary">Current</span>}
          </div>
          <p className="mt-1 text-2xl font-semibold text-content-primary">$0</p>
          <ul className="mt-4 space-y-1.5 text-sm text-content-secondary">
            <li>· 3 models</li>
            <li>· 3 pages per model</li>
            <li>· 300 rolling credits</li>
            <li>· Watermarked exports</li>
          </ul>
        </div>
        <div className={`rounded-surface border p-5 ${team.plan === "Pro" ? "border-border-solid/40" : "border-border-solid/15"}`}>
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-content-primary">Pro</h2>
            {team.plan === "Pro" && <span className="rounded-pill bg-surface-raised px-2 py-0.5 text-[10px] font-semibold text-content-primary">Current</span>}
          </div>
          <p className="mt-1 text-2xl font-semibold text-content-primary">$24 <span className="text-sm font-normal text-content-secondary">/ month</span></p>
          <ul className="mt-4 space-y-1.5 text-sm text-content-secondary">
            <li>· Unlimited models</li>
            <li>· Unlimited pages</li>
            <li>· Rolling credits</li>
            <li>· No watermarks</li>
            <li>· DWG import / export</li>
          </ul>
          <div className="mt-5">
            {team.plan === "Free" ? (
              <button
                type="button"
                disabled={busy}
                onClick={upgrade}
                className="w-full rounded-control px-4 py-2 text-sm font-medium text-accent-solid-foreground disabled:opacity-60"
                style={{ background: "var(--accent--solid)" }}
              >
                {busy ? "Processing…" : "Upgrade to Pro"}
              </button>
            ) : (
              <button
                type="button"
                disabled={busy}
                onClick={cancel}
                className="w-full rounded-control border border-border-solid/20 px-4 py-2 text-sm text-content-secondary hover:text-content-primary disabled:opacity-60"
              >
                {busy ? "Processing…" : "Cancel subscription"}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-end gap-2">
        <div>
          <label htmlFor="promo" className="block text-xs text-content-secondary">Promo code</label>
          <input
            id="promo"
            value={promo}
            onChange={(e) => setPromo(e.target.value)}
            placeholder="SYNAPS-CLONE"
            className="mt-1 w-48 rounded-control border border-border-solid/20 bg-surface-base px-3 py-2 text-sm text-content-primary"
          />
        </div>
        <button
          type="button"
          onClick={validatePromo}
          className="rounded-control border border-border-solid/20 px-4 py-2 text-sm text-content-secondary hover:text-content-primary"
        >
          Validate
        </button>
        {promoMsg && <p className="text-xs text-content-secondary">{promoMsg}</p>}
      </div>

      <section className="mt-10" aria-label="Invoices">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-content-secondary">Invoices</h2>
        {team.invoices.length === 0 ? (
          <p className="mt-3 text-sm text-content-secondary">No invoices yet (Free plan).</p>
        ) : (
          <ul className="mt-3 divide-y divide-border-solid/10 rounded-surface border border-border-solid/15">
            {team.invoices.map((i) => (
              <li key={i.id} className="flex items-center justify-between px-4 py-3 text-sm">
                <span>
                  <span className="font-medium text-content-primary">{i.number}</span>
                  <span className="block text-xs text-content-secondary">{i.description} · {new Date(i.date).toLocaleDateString()}</span>
                </span>
                <span className="flex items-center gap-3">
                  <span className="text-content-primary">${i.amount}.00</span>
                  <span className="rounded-pill bg-surface-raised px-2 py-0.5 text-[10px] text-content-secondary">{i.status}</span>
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <SimNote>
        Educational clone — the billing surface mirrors stripe.listProducts / createCheckout /
        createPortalSession / getSubscription / cancelSubscription / listInvoices / validatePromo
        observed in the production bundle. No payment processor is connected; upgrades flip the
        local plan and entitlements only.
      </SimNote>
    </AppPage>
  );
}
