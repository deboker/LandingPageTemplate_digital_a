import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl items-center justify-center px-6 py-16 sm:px-8">
      <div className="w-full rounded-[2rem] border border-slate-900/8 bg-white/78 p-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
          404
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-slate-950">
          Page not found
        </h1>
        <p className="mt-4 max-w-xl text-base leading-8 text-slate-600">
          The requested locale or page does not exist in this template.
        </p>
        <Link
          href="/sk"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5 hover:bg-slate-800"
        >
          Back to homepage
        </Link>
      </div>
    </main>
  );
}
