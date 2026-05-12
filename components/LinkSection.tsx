import Link from "next/link";

interface LinkItem {
  label: string;
  url: string;
}

interface LinkSectionProps {
  title?: string;
  links: LinkItem[];
}

export default function LinkSection({ title, links }: LinkSectionProps) {
  return (
    <section className="w-full flex flex-col md:flex-row items-center justify-center py-4 px-6 gap-4 md:gap-8 bg-[var(--light-green)] my-8">
      {title && (
        <h2 className="text-xl md:text-2xl font-bold text-[var(--soft-white)] whitespace-nowrap">
          {title}
        </h2>
      )}
      <div className="flex flex-wrap justify-center gap-3">
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.url}
            className="px-5 py-2 rounded-full border border-[var(--dark-green)] bg-[var(--dark-green)] font-medium text-sm text-[var(--soft-white)] hover:bg-[var(--soft-white)] hover:text-[var(--dark-green)] transition-colors duration-200"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
