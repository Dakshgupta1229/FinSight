import { useQuery } from "@tanstack/react-query";
import { ArrowUpRight, Newspaper } from "lucide-react";

import { getNews } from "../../services/news.service";
import Card from "../ui/Card";

export default function News() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["news"],
    queryFn: getNews,
  });

  if (isLoading) {
    return (
      <Card title="📰 Market News">
        <p>Loading latest market news...</p>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card title="📰 Market News">
        <p className="text-red-500">
          Failed to load market news.
        </p>
      </Card>
    );
  }

  return (
    <Card title="📰 Market News">
      <div className="space-y-6">
        {data?.data.map((article, index) => (
          <a
            key={index}
            href={article.url}
            target="_blank"
            rel="noreferrer"
            className="group block overflow-hidden rounded-2xl border border-slate-200 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
          >
            <div className="md:flex">
              <img
                src={article.image}
                alt={article.headline}
                className="h-56 w-full object-cover md:h-48 md:w-72"
              />

              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                    <Newspaper size={14} />
                    {article.source}
                  </span>

                  <h3 className="mt-4 text-xl font-bold text-slate-800 transition-colors group-hover:text-blue-600">
                    {article.headline}
                  </h3>

                  <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-600">
                    {article.summary}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <span className="text-sm text-slate-400">
                    Financial News
                  </span>

                  <span className="flex items-center gap-2 font-semibold text-blue-600 transition group-hover:gap-3">
                    Read Article
                    <ArrowUpRight size={18} />
                  </span>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </Card>
  );
}