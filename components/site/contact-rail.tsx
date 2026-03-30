import Link from "next/link";
import type { Cta, FooterContent } from "@/lib/landing-page";
import type { Locale } from "@/lib/locales";

type ContactRailProps = {
  locale: Locale;
  footer: FooterContent;
  primaryCta: Cta;
};

export function ContactRail({
  locale,
  footer,
  primaryCta,
}: ContactRailProps) {
  const phoneHref = `tel:${footer.phone.replace(/\s+/g, "")}`;
  const leadLabel = locale === "sk" ? "Rezervovať" : "Book now";

  return (
    <div className="pointer-events-none fixed right-1 top-1/2 z-40 -translate-y-1/2 sm:right-2 lg:right-3">
      <div className="pointer-events-auto flex flex-col gap-2">
        <RailItem
          href={phoneHref}
          label={locale === "sk" ? "Zavolať" : "Call us"}
          tone="light"
          icon={<PhoneIcon />}
        />
        <RailItem
          href={`mailto:${footer.email}`}
          label={locale === "sk" ? "Napísať mail" : "Send email"}
          tone="light"
          icon={<MailIcon />}
        />
        <RailItem
          href={primaryCta.href}
          label={primaryCta.label || leadLabel}
          tone="accent"
          icon={<LeadIcon />}
        />
      </div>
    </div>
  );
}

type RailItemProps = {
  href: string;
  label: string;
  tone: "light" | "accent";
  icon: React.ReactNode;
};

function RailItem({ href, label, tone, icon }: RailItemProps) {
  const shellClass =
    tone === "accent"
      ? "border border-lime-300/70 bg-[var(--brand)] text-slate-950 shadow-[0_18px_46px_rgba(148,196,69,0.25)]"
      : "border border-slate-900/8 bg-white/88 text-slate-900 shadow-[0_18px_46px_rgba(15,23,42,0.08)] backdrop-blur";

  const iconClass =
    tone === "accent"
      ? "bg-slate-950 text-white"
      : "bg-slate-950 text-white";

  return (
    <Link href={href} className="group flex justify-end" aria-label={label}>
      <span
        className={`flex h-10 w-10 items-center justify-end overflow-hidden rounded-full transition-[width,transform,box-shadow] duration-300 ease-out group-hover:w-[11rem] group-hover:-translate-x-1 ${shellClass}`}
      >
        <span className="max-w-0 overflow-hidden whitespace-nowrap pr-0 text-xs font-semibold opacity-0 transition-all duration-300 group-hover:max-w-[7.5rem] group-hover:pr-2.5 group-hover:opacity-100">
          {label}
        </span>
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${iconClass}`}
        >
          {icon}
        </span>
      </span>
    </Link>
  );
}

function PhoneIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className="h-3.5 w-3.5"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M6.8 4.5h2.1c.4 0 .8.3.9.7l.9 4c.1.4-.1.8-.4 1.1l-1.5 1.3a14.2 14.2 0 0 0 3.6 3.6l1.3-1.5c.2-.3.7-.5 1.1-.4l4 .9c.4.1.7.5.7.9v2.1c0 .9-.7 1.6-1.6 1.6A13.2 13.2 0 0 1 5.2 6.1c0-.9.7-1.6 1.6-1.6Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className="h-3.5 w-3.5"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M4 7.5A1.5 1.5 0 0 1 5.5 6h13A1.5 1.5 0 0 1 20 7.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 16.5v-9Z" />
      <path d="m5 7 7 5 7-5" />
    </svg>
  );
}

function LeadIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className="h-3.5 w-3.5"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M12 3v8" />
      <path d="m8.5 7.5 3.5-4 3.5 4" />
      <path d="M5 14.5h14" />
      <path d="M7 14.5v3a2.5 2.5 0 0 0 2.5 2.5h5A2.5 2.5 0 0 0 17 17.5v-3" />
    </svg>
  );
}
