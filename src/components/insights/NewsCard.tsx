import Image from "next/image";
import type { NewsArticle } from "@/data/insights";

export default function NewsCard({ article }: { article: NewsArticle }) {
  return (
    <div className="flex flex-col h-full gap-2">
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group block"
      >
        {/* Title */}
        <h3 className="text-4xl text-brand font-normal leading-snug underline group-hover:text-yellow-500">
          {article.title}
        </h3>
      </a>

      {/* Thumbnail — image first */}
      <div className="relative aspect-video overflow-hidden rounded-sm mb-4">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-contain"
          sizes="(max-width: 640px) 100vw, 50vw"
        />
      </div>
    </div>
  );
}
