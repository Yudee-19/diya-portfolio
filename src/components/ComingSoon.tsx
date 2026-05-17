import Link from "next/link";

interface ComingSoonProps {
  /** Main page title. */
  title: string;
  /** Small label above the title (e.g. the parent section). */
  eyebrow?: string;
  /** Where the back link points. */
  backHref: string;
  /** Text for the back link. */
  backLabel: string;
}

/**
 * Styled placeholder page used by project / sub-topic routes that don't yet
 * have a bespoke design. Keeps the portfolio's look so links never dead-end.
 */
export function ComingSoon({ title, eyebrow, backHref, backLabel }: ComingSoonProps) {
  return (
    <main className="relative flex min-h-[100svh] flex-col items-center justify-center bg-white px-6 text-center text-black">
      <Link
        href={backHref}
        className="absolute left-6 top-6 font-sans text-sm tracking-wide text-gray-500 transition-colors hover:text-black md:left-10 md:top-10"
      >
        ← {backLabel}
      </Link>

      {eyebrow && (
        <p className="mb-3 font-sans text-xs font-semibold uppercase tracking-[0.3em] text-gray-500">
          {eyebrow}
        </p>
      )}

      <h1 className="font-playfair text-4xl font-bold uppercase tracking-tight text-[#222220] sm:text-6xl md:text-7xl">
        {title}
      </h1>

      <p className="mt-5 font-sans text-base italic text-gray-500">
        This page is coming soon.
      </p>
    </main>
  );
}
