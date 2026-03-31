import Link from "next/link";
import Script from "next/script";
import type { Locale } from "@/lib/locales";

type ReservantoBookingProps = {
  locale: Locale;
};

const defaultReservantoFormId = "24877";
const reservantoFormId =
  process.env.NEXT_PUBLIC_RESERVANTO_FORM_ID?.trim() || defaultReservantoFormId;

export function ReservantoBooking({ locale }: ReservantoBookingProps) {
  const sectionCopy =
    locale === "sk"
      ? {
          eyebrow: "Rezervácia",
          title: "Vyber si slot online a otvor rezerváciu priamo na webe.",
          description:
            "Rezervácia je vložená priamo na stránke cez Reservanto. Stačí si vybrať termín, potvrdiť slot a pokračovať podľa flow, ktorý si nastavíš v Reservante.",
          highlights: [
            "Rezervácia bez odchodu z webu",
            "Vhodné pre mobil aj desktop",
            "Všetky hlavné CTA buttony vedú sem",
          ],
          frameTitle: "Reservanto rezervácia Pet Spa Box",
          helperTitle: "Čo je už zapojené",
          helperDescription:
            "Rezervačný formulár je pripravený priamo v sekcii nižšie. Ak neskôr zmeníš Reservanto formulár, stačí vymeniť jeho ID bez prerábky layoutu.",
          helperSteps: [
            "Hero, header aj finálne CTA vedú na túto booking sekciu.",
            "Formulár je vložený priamo cez oficiálny Reservanto embed script.",
            "Neskôr vieš len zmeniť ID formulára v env premennej a deploynúť web.",
          ],
          helperCta: "Aktuálne používame Reservanto formulár s ID 24877.",
          envLabel: "Možnosť neskoršej zmeny",
        }
      : {
          eyebrow: "Booking",
          title: "Choose your slot online and keep the booking flow on the site.",
          description:
            "The booking form is embedded directly on the page through Reservanto. Visitors can choose a time without leaving the website.",
          highlights: [
            "Booking without leaving the website",
            "Works well on mobile and desktop",
            "All main booking CTAs lead here",
          ],
          frameTitle: "Reservanto booking form for Pet Spa Box",
          helperTitle: "What is already connected",
          helperDescription:
            "The live booking form is rendered below. If you switch to another Reservanto form later, you only need to replace the form ID.",
          helperSteps: [
            "Hero, header and final CTAs all point to this booking section.",
            "The form is loaded through the official Reservanto embed script.",
            "You can swap the form ID later through an env variable and redeploy.",
          ],
          helperCta: "The current Reservanto form ID is 24877.",
          envLabel: "Optional future override",
        };

  return (
    <section id="booking" className="grid gap-8">
      <div className="grid gap-4 lg:grid-cols-[0.42fr_0.58fr] lg:items-end">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
            {sectionCopy.eyebrow}
          </p>
          <div className="h-px w-24 bg-slate-900/10" />
        </div>
        <div className="space-y-4">
          <h2 className="max-w-4xl text-4xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-5xl">
            {sectionCopy.title}
          </h2>
          <p className="max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
            {sectionCopy.description}
          </p>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[0.78fr_1.22fr]">
        <div className="rounded-[1.9rem] border border-slate-900/8 bg-white/78 p-6 shadow-[0_18px_56px_rgba(15,23,42,0.04)]">
          <div className="space-y-4">
            {sectionCopy.highlights.map((item) => (
              <div
                key={item}
                className="rounded-[1.2rem] border border-slate-900/8 bg-slate-50 px-4 py-4"
              >
                <p className="text-sm font-semibold leading-6 text-slate-900">
                  {item}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-[1.4rem] border border-dashed border-slate-900/14 bg-slate-50 px-5 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              {sectionCopy.envLabel}
            </p>
            <code className="mt-3 block text-sm font-semibold text-slate-950">
              NEXT_PUBLIC_RESERVANTO_FORM_ID
            </code>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              {sectionCopy.helperCta}
            </p>
          </div>
        </div>

        <div className="overflow-hidden rounded-[1.9rem] border border-slate-900/8 bg-white/78 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
          <div className="grid h-full min-h-[42rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.88),rgba(244,247,250,0.96))] p-4 sm:p-5">
            <div className="rounded-[1.6rem] border border-slate-900/8 bg-white/82 p-3 shadow-[0_16px_48px_rgba(15,23,42,0.06)] sm:p-4">
              <div
                className="reservanto-iframe mx-auto w-full"
                data-id={reservantoFormId}
                style={{ maxWidth: "100%", height: "700px" }}
                aria-label={sectionCopy.frameTitle}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-[1.8rem] border border-slate-900/8 bg-white/76 p-6 shadow-[0_18px_56px_rgba(15,23,42,0.04)]">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
          {sectionCopy.helperTitle}
        </p>
        <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
          {sectionCopy.helperDescription}
        </p>
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {sectionCopy.helperSteps.map((step, index) => (
            <div
              key={step}
              className="rounded-[1rem] border border-slate-900/8 bg-slate-50 px-4 py-4"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                {locale === "sk" ? "Krok" : "Step"} 0{index + 1}
              </p>
              <p className="mt-2 text-sm font-medium leading-6 text-slate-900">
                {step}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm leading-7 text-slate-600">
            {sectionCopy.helperCta}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="https://www.reservanto.sk/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5 hover:bg-slate-800"
            >
              {locale === "sk" ? "Otvoriť Reservanto" : "Open Reservanto"}
            </Link>
            <Link
              href="#contact"
              className="inline-flex items-center justify-center rounded-full border border-slate-900/10 bg-white/70 px-6 py-3.5 text-sm font-semibold text-slate-900 transition-transform duration-300 hover:-translate-y-0.5 hover:border-slate-900/20 hover:bg-white"
            >
              {locale === "sk" ? "Ozvať sa" : "Contact us"}
            </Link>
          </div>
        </div>
      </div>

      <Script
        src="https://booking.reservanto.cz/Script/reservanto-iframe.js"
        strategy="afterInteractive"
      />
    </section>
  );
}
