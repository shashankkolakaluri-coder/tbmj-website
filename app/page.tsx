import Link from "next/link";
import Image from "next/image";
import LinkSection from "@/components/LinkSection";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
);

type Article = {
  id: string;
  title: string;
  author: string;
  author_image: string | null;
  cover_image: string | null;
  read_time: number;
  published_at: string;
  views: number;
  likes: number;
  comments: number;
};

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default async function HomePage() {
  const { data: articles } = await supabase
    .from("articles")
    .select("*")
    .order("published_at", { ascending: false })
    .limit(6);

  return (
    <div className="mx-auto max-w-screen-xl px-6 md:px-10 lg:px-16 py-16">
      {/* Hero */}
      <section className="text-center max-w-4xl mx-auto mb-10">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[var(--dark-green)] mb-6">
          The BioMed Journal
        </h1>
        <p className="text-lg md:text-2xl text-[var(--light-green)] leading-relaxed">
          Workshops, projects, and opportunities in biological sciences.
        </p>
      </section>

      {/* Quick links banner */}
      <LinkSection
        title="Explore The BMJ"
        links={[
          { label: "Events", url: "/events" },
          { label: "About Us", url: "/about" },
          { label: "Medium", url: "https://medium.com/@thebiomedjournal" },
          { label: "Substack", url: "https://substack.com/@thebiomedjournal" },
        ]}
      />

      {/* Latest Events */}
      <section className="mt-16 mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--dark-green)]">
            Latest Events
          </h2>
          <Link
            href="/events"
            className="text-[var(--light-green)] font-medium hover:underline"
          >
            View all programs →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[var(--light-green)]/10 p-8 rounded-2xl border border-[var(--light-green)]/30 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-bold text-[var(--dark-green)]">Middle School Summer Camp</h3>
              <span className="bg-[var(--dark-green)] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">Upcoming</span>
            </div>
            <p className="text-[var(--dark-green)] opacity-90 mb-6">
              Join us this summer for an immersive science camp geared towards middle schoolers, focusing on foundational concepts and fun biological experiments.
            </p>
            <Link href="/events" className="font-semibold text-[var(--light-green)] hover:underline">Learn more & Sign up →</Link>
          </div>

          <div className="bg-[var(--light-green)]/10 p-8 rounded-2xl border border-[var(--light-green)]/30 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-bold text-[var(--dark-green)]">HS Summer Project</h3>
              <span className="bg-[var(--dark-green)] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">Upcoming</span>
            </div>
            <p className="text-[var(--dark-green)] opacity-90 mb-6">
              A comprehensive summer research and project-building opportunity designed to equip high schoolers with tangible computational and laboratory skills.
            </p>
            <Link href="/events" className="font-semibold text-[var(--light-green)] hover:underline">Learn more →</Link>
          </div>
        </div>
      </section>

      {/* Embedded article directory */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--dark-green)]">
            Latest Publishings
          </h2>
          <Link
            href="/articles"
            className="text-[var(--light-green)] font-medium hover:underline"
          >
            View all →
          </Link>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
          {articles?.map((article) => (
            <Link
              key={article.id}
              href={`/articles/${article.id}`}
              className="break-inside-avoid block mb-6 border border-[var(--light-green)]/20 rounded-2xl overflow-hidden hover:shadow-md transition-all duration-200 bg-white"
            >
              {article.cover_image && (
                <div className="w-full aspect-video relative bg-gray-100">
                  <Image
                    src={article.cover_image}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              <div className="p-5">
                <p className="text-sm text-[var(--light-green)] mb-2">
                  {formatDate(article.published_at)} · {article.read_time} min read
                </p>

                <h3 className="text-lg font-bold text-[var(--dark-green)] leading-snug mb-3">
                  {article.title}
                </h3>

                <div className="flex justify-between text-xs text-[var(--light-green)] border-t border-[var(--light-green)]/20 pt-3">
                  <span>{article.views} views</span>
                  <span>{article.comments} comments</span>
                  <span>{article.likes} ♥</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
