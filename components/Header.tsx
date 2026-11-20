import Link from "next/link";
import { Logo } from "./Logo";
import { getDivisions, getSettings } from "@/lib/content";

const linkCls = "nav-link text-[15px] font-semibold text-white hover:text-white hover:underline underline-offset-4";

/** No client JS: desktop dropdown is CSS (hover / focus-within), mobile menu is a native <details>. */
export async function Header() {
  const [settings, divisions] = await Promise.all([getSettings(), getDivisions()]);
  return (
    <header className="on-dark relative bg-navy">
      <div className="wrap flex h-[76px] items-center justify-between xl:h-24">
        <Link href="/" aria-label="Governance Ministries home" className="logo py-2">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-[34px] xl:flex">
          {settings.nav.map((item) =>
            item.href === "/about/" ? (
              <div key={item.href} className="group relative">
                <Link href={item.href} className={`${linkCls} inline-block py-4`}>{item.label}</Link>
                <ul className="invisible absolute left-0 top-full z-20 min-w-[260px] rounded-b bg-navy-deep py-2 shadow-lg group-focus-within:visible group-hover:visible">
                  {divisions.map((d) => (
                    <li key={d.slug}>
                      <Link href={`/about/${d.slug}/`} className="block px-5 py-3 text-[15px] font-semibold text-white hover:bg-navy hover:text-white">
                        {d.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <Link key={item.href} href={item.href} className={`${linkCls} py-4`}>{item.label}</Link>
            ),
          )}
          <Link href={settings.headerCta.href} className="btn btn-light !px-[22px] !py-3 !text-[15px]">
            {settings.headerCta.label}
          </Link>
        </nav>

        <details className="group xl:hidden">
          <summary
            aria-label="Menu"
            className="flex h-12 w-12 cursor-pointer list-none items-center justify-center [&::-webkit-details-marker]:hidden"
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <g className="group-open:hidden"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></g>
              <g className="hidden group-open:block"><line x1="5" y1="5" x2="19" y2="19" /><line x1="19" y1="5" x2="5" y2="19" /></g>
            </svg>
          </summary>
          <nav aria-label="Mobile" className="absolute inset-x-0 top-full z-30 bg-navy-deep px-5 pb-6 pt-2 shadow-lg">
            <ul className="flex flex-col">
              {settings.nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="block py-3 text-[17px] font-bold text-white hover:text-white">{item.label}</Link>
                  {item.href === "/about/" && (
                    <ul className="mb-2 flex flex-col border-l-2 border-white/25 pl-4">
                      {divisions.map((d) => (
                        <li key={d.slug}>
                          <Link href={`/about/${d.slug}/`} className="block py-3 text-[16px] font-semibold text-[#c4d3de] hover:text-white">{d.name}</Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
            <Link href={settings.headerCta.href} className="btn btn-light mt-3 w-full">{settings.headerCta.label}</Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
