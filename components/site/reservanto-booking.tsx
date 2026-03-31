import Script from "next/script";
import type { BookingSection } from "@/lib/landing-page";
import type { Locale } from "@/lib/locales";

type ReservantoBookingProps = {
  locale: Locale;
  content: BookingSection;
};

const defaultReservantoFormId = "24877";
const reservantoFormId =
  process.env.NEXT_PUBLIC_RESERVANTO_FORM_ID?.trim() || defaultReservantoFormId;

export function ReservantoBooking({
  locale,
  content,
}: ReservantoBookingProps) {
  const frameTitle =
    locale === "sk"
      ? "Reservanto rezervácia Pet Spa Box"
      : "Reservanto booking form for Pet Spa Box";

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
            {content.highlights.map((item) => (
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
