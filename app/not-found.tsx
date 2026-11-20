import Link from "next/link";

export default function NotFound() {
  return (
    <div className="wrap flex flex-col items-start gap-6 py-24">
      <h1 className="h-display text-[40px] text-ink md:text-[56px]">Page not found</h1>
      <p className="font-serif text-[18px] text-body">We could not find that page.</p>
      <Link href="/" className="btn btn-dark">Back to the homepage</Link>
    </div>
  );
}
