"use client";
import {
  MotionHighlight,
  MotionHighlightItem,
} from "@/components/animate-ui/effects/motion-highlight";
import SiteHeader from "@/components/site-header";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import SiteFooter from "@/components/site-footer";

const ChangeLog = () => {
  const { data } = useQuery({
    queryKey: ["github-commits"],
    queryFn: () =>
      axios.get(
        "https://api.github.com/repos/LordPramod/Behind-the-Text/commits?per_page=16"
      ),
    select: (data) => data.data,
  });
  type ApiResponse = typeof data;

  return (
    <div className="max-w-screen overflow-x-hidden bg-[#0e0024]">
      <SiteHeader />
      <div className="mx-4 md:mx-20">
        <MotionHighlight hover>
          <div className="w-full flex flex-wrap gap-4 px-4 py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
              {data
                ? data?.map((item: ApiResponse) => (
                    <MotionHighlightItem
                      asChild
                      key={item.sha}
                      className="border border-white/20 rounded-md min-h-50"
                    >
                      <div className="rounded-md p-4 backdrop-blur-sm hover:border-white/40 transition-all">
                        <div className="flex items-center gap-3 mb-3 ">
                          {item.author && (
                            <Image
                              src={item.author.avatar_url}
                              alt={item.commit.author.name}
                              width={60}
                              height={60}
                              className="rounded-full"
                            />
                          )}
                          <div>
                            <p className="font-medium text-white">
                              {item.commit.author.name}
                            </p>
                            <p className="text-xs text-white/60">
                              {formatDistanceToNow(
                                new Date(item.commit.author.date),
                                {
                                  addSuffix: true,
                                }
                              )}
                            </p>
                          </div>
                        </div>
                        <p className="text-sm text-white/80 mb-2">
                          {item.commit.message}
                        </p>
                        <div className="flex items-center justify-between text-xs text-white/50">
                          <span>Commit: {item.sha.substring(0, 7)}</span>
                          {item.committer && (
                            <a
                              href={item.committer.html_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-white/80 transition-colors"
                            >
                              View on GitHub
                            </a>
                          )}
                        </div>
                      </div>
                    </MotionHighlightItem>
                  ))
                : Array.from({ length: 12 }).map((_, index) => (
                    <MotionHighlightItem
                      asChild
                      key={`shimmer-${index}`}
                      className="border border-white/20 rounded-md min-h-50"
                    >
                      <div className="rounded-md p-4 backdrop-blur-sm">
                        {/* Author shimmer */}
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-[60px] h-[60px] rounded-full bg-white/10 shimmer" />
                          <div className="space-y-2 flex-1">
                            <div className="h-4 w-3/4 rounded bg-white/10 shimmer" />
                            <div className="h-3 w-1/2 rounded bg-white/10 shimmer" />
                          </div>
                        </div>

                        {/* Message shimmer - random widths for more natural effect */}
                        <div className="space-y-2 mb-4">
                          <div className="h-3 w-full rounded bg-white/10 shimmer" />
                          <div className="h-3 w-5/6 rounded bg-white/10 shimmer" />
                          <div className="h-3 w-3/4 rounded bg-white/10 shimmer" />
                        </div>

                        {/* Footer shimmer */}
                        <div className="flex items-center justify-between text-xs">
                          <div className="h-3 w-1/4 rounded bg-white/10 shimmer" />
                          <div className="h-3 w-1/4 rounded bg-white/10 shimmer" />
                        </div>
                      </div>
                    </MotionHighlightItem>
                  ))}
            </div>
          </div>
        </MotionHighlight>
      </div>
      <SiteFooter />
    </div>
  );
};

export default ChangeLog;
