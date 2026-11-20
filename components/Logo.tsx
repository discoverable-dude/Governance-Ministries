export function RainbowBar({ className = "h-1" }: { className?: string }) {
  const segs: [number, string][] = [
    [15, "#ff8f24"], [20, "#f34957"], [18, "#94153e"], [12, "#1b6ea8"], [18, "#2db9e6"], [17, "#6dd1db"],
  ];
  return (
    <span aria-hidden="true" className={`flex ${className}`}>
      {segs.map(([g, c]) => (
        <span key={c} style={{ flexGrow: g, background: c }} />
      ))}
    </span>
  );
}

export function Logo({ small = false }: { small?: boolean }) {
  return (
    <span className={`flex flex-col text-white ${small ? "w-[158px] gap-[5px]" : "w-[158px] gap-[5px] lg:w-[214px] lg:gap-1.5"}`}>
      <span className={`block font-extrabold leading-none ${small ? "text-[20px]" : "text-[20px] lg:text-[27px]"}`}>GOVERNANCE</span>
      <RainbowBar className={small ? "h-[3px]" : "h-[3px] lg:h-1"} />
      <span className={`block font-normal leading-none tracking-[0.47em] ${small ? "text-[11px]" : "text-[11px] lg:text-[15px]"}`}>MINISTRIES</span>
    </span>
  );
}
