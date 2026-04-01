import Link from "next/link";
import Script from "next/script";
import type { BookingSection, LocationItem } from "@/lib/landing-page";
import type { Locale } from "@/lib/locales";

type ReservantoBookingProps = {
  locale: Locale;
  content: BookingSection;
  locations: LocationItem[];
};

const defaultReservantoFormId = "24877";
const reservantoFormId =
  process.env.NEXT_PUBLIC_RESERVANTO_FORM_ID?.trim() || defaultReservantoFormId;

export function ReservantoBooking({
  locale,
  content,
  locations,
}: ReservantoBookingProps) {
  const frameTitle =
    locale === "sk"
      ? "Reservanto rezervácia Pet Spa Box"
      : "Reservanto booking form for Pet Spa Box";
  const copy =
    locale === "sk"
      ? {
          branchesEyebrow: "Bratislava",
          branchesTitle: "Máme dve umyvárne v Bratislave",
          branchesDescription:
            "Vyber si Petržalku alebo Ružinov. Rezerváciu spravíš tu a mapy aj presné umiestnenie nájdeš nižšie na stránke.",
          mapsLinkLabel: "Pozrieť mapy nižšie",
        }
      : {
          branchesEyebrow: "Bratislava",
          branchesTitle: "We have two wash stations in Bratislava",
          branchesDescription:
            "Choose Petrzalka or Ruzinov. Complete the booking here and check the maps and exact locations further down the page.",
          mapsLinkLabel: "View maps below",
        };

  return (
    <section id="booking" className="grid gap-8">
      <div className="grid gap-4 lg:grid-cols-[0.42fr_0.58fr] lg:items-end">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
            {content.eyebrow}
          </p>
          <div className="h-px w-24 bg-slate-900/10" />
        </div>
        <div className="space-y-4">
          <h2 className="max-w-4xl text-4xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-5xl">
            {content.title}
          </h2>
          <p className="max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
            {content.description}
          </p>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[0.78fr_1.22fr]">
        <div className="rounded-[1.9rem] border border-slate-900/8 bg-white/78 p-6 shadow-[0_18px_56px_rgba(15,23,42,0.04)]">
          <div className="space-y-4">
            <div className="rounded-[1.2rem] border border-slate-900/8 bg-slate-50 px-4 py-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
                {copy.branchesEyebrow}
              </p>
              <p className="mt-3 text-lg font-semibold leading-7 text-slate-950">
                {copy.branchesTitle}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {copy.branchesDescription}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {content.highlights.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-slate-900/8 bg-white px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-700"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {locations.map((location) => (
              <Link
                key={location.title}
                href="#locations"
                className="block rounded-[1.2rem] border border-slate-900/8 bg-slate-50 px-4 py-4 transition-transform duration-300 hover:-translate-y-0.5 hover:border-slate-900/18 hover:bg-white"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
                  {location.badge}
                </p>
                <p className="mt-3 text-base font-semibold leading-6 text-slate-950">
                  {location.title}
                </p>
                <p className="mt-1 text-sm font-medium leading-6 text-slate-600">
                  {location.address}
                </p>
                <span className="mt-3 inline-flex rounded-full border border-slate-900/10 bg-white px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-700">
                  {copy.mapsLinkLabel}
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-[1.9rem] border border-slate-900/8 bg-white/78 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
          <div className="grid h-full min-h-[42rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.88),rgba(244,247,250,0.96))] p-4 sm:p-5">
            <div className="rounded-[1.6rem] border border-slate-900/8 bg-white/82 p-3 shadow-[0_16px_48px_rgba(15,23,42,0.06)] sm:p-4">
              <div
                className="reservanto-iframe mx-auto w-full"
                data-id={reservantoFormId}
                style={{ maxWidth: "100%", height: "700px" }}
                aria-label={frameTitle}
              />
            </div>
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
