import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { Block } from "@/lib/types";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="font-serif text-[17px] leading-[1.7] text-body md:text-[18px]">{children}</p>,
    h2: ({ children }) => <h2 className="h-display mt-4 text-[28px] text-ink md:text-[34px]">{children}</h2>,
    h3: ({ children }) => <h3 className="mt-2 text-[20px] font-bold text-ink">{children}</h3>,
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc space-y-2 pl-6 font-serif text-[18px] leading-[1.7] text-body">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal space-y-2 pl-6 font-serif text-[18px] leading-[1.7] text-body">{children}</ol>,
  },
  marks: {
    link: ({ value, children }) => (
      <a href={(value as { href?: string })?.href} className="font-semibold underline underline-offset-2">
        {children}
      </a>
    ),
  },
};

export function Prose({ body }: { body: Block[] }) {
  return (
    <div className="flex flex-col gap-5">
      <PortableText value={body as never} components={components} />
    </div>
  );
}

/** Plain-text first paragraph, for metadata fallbacks. */
export function firstParagraph(body: Block[] = []): string {
  const b = body.find((x) => x._type === "block") as { children?: { text?: string }[] } | undefined;
  return (b?.children ?? []).map((c) => c.text ?? "").join("").trim();
}
