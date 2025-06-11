import { Badge } from "@/components/ui/badge";
import React from "react";
import { usePublicUserTop3Query } from "@/hooks/query/public/usePublic";
import UserLeaderBoard from "../stuff/UserLeaderBoard";
import { LoaderCircleIcon } from "lucide-react";

export default function LeaderBoardSection() {
  const { data, isLoading } = usePublicUserTop3Query();

  const [second, first, third] = [
    data?.[1] || null,
    data?.[0] || null,
    data?.[2] || null,
  ];

  return (
    <section className="container space-y-20 text-center">
      <div className="space-y-4">
        <Badge>Leaderboard</Badge>
        <h1>Sipaling Rajin</h1>
      </div>

      {isLoading ? (
        <div className="grid h-60 place-content-center">
          <LoaderCircleIcon className="animate-spin" />
        </div>
      ) : (
        <>
          <div className="flex flex-wrap items-end justify-center gap-6 max-sm:gap-y-14 md:gap-20">
            {second ? (
              <UserLeaderBoard data={second} placement="second" />
            ) : (
              <div></div>
            )}
            <UserLeaderBoard data={first} placement="first" />

            {third ? (
              <UserLeaderBoard data={third} placement="third" />
            ) : (
              <div></div>
            )}
          </div>

          <div className="mx-auto max-w-lg space-y-4">
            <h4>Kamu gak masuk leaderboard?</h4>
            <p className="text-muted-foreground">
              Jangan mau kalah, yuk mulai bikin project 🙂, kerjain semuanya
              jangan cuma bikin doang. 🗿
            </p>
          </div>
        </>
      )}
    </section>
  );
}
