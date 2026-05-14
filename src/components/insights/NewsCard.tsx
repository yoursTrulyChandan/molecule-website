import Image from "next/image";
import type { NewsArticle } from "@/data/insights";

export default function NewsCard({ article }: { article: NewsArticle }) {
  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
    >
      {/* Thumbnail — image first */}
      <div className="relative aspect-video overflow-hidden rounded-sm mb-4">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, 50vw"
        />
      </div>

      {/* Title */}
      <h3 className="text-xl text-brand font-semibold leading-snug group-hover:underline">
        {article.title}
      </h3>

      {/* Source badge */}
      <p className="mt-1 text-sm text-gray-400">{article.source}</p>
    </a>
  );
}
