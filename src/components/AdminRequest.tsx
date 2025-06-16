"use client";
import React, { useEffect, useMemo, useState } from "react";
import DrawerResponsive from "./ui/drawer-responsive";
import { Button } from "./ui/button";
import { LoaderCircleIcon, RotateCcw, ShieldUserIcon } from "lucide-react";
import { Progress, ProgressTrack } from "@/components/animate-ui/base/progress";
import { useQuery } from "@tanstack/react-query";
import { useQuestion } from "@/lib/iq/store";
import { useShallow } from "zustand/shallow";
import { getCurrentQuestion, submitAnswer } from "@/lib/iq";
import { toast } from "sonner";
import Image from "next/image";
import { cn, scrambleText } from "@/lib/utils";
import clsx from "clsx";
import { Separator } from "./ui/separator";
import { useSound } from "@/hooks/useSound";
import FadeinImage from "./FadeinImage";

type TestType = "brainrot" | "math" | "literacy";

export default function AdminRequest() {
  const [isOpen, setIsOpen] = useState(false);

  const [currentTest, setCurrentTest] = useState<TestType>("brainrot");
  const [testProgress, setTestProgress] = useState<number>(10);
  const [remainingAttempts, setRemainingAttempts] = useState<number>(3);
  const [iqScore, setIqScore] = useState<number>(20);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const playThudSound = useSound("/instagram-thud.mp3");
  const playWowSound = useSound("/anime-wow-sound-effect.mp3");

  const { question, setQuestion, session, setSession, reset } = useQuestion(
    useShallow((x) => ({
      session: x.session,
      setSession: x.setSession,
      question: x.question,
      setQuestion: x.setQuestion,
      reset: x.reset,
    })),
  );

  const { data, isLoading } = useQuery({
    queryKey: ["iq-test"],
    queryFn: async () => {
      if (remainingAttempts === 0) {
        await new Promise((resolve) => setTimeout(resolve, 3000));
      }

      const res = await fetch(`/api/iq`);
      if (!res.ok) throw new Error("Failed to fetch data");

      const x = await res.json();
      return x;
    },
    staleTime: Infinity,
    enabled: isOpen && (!session || remainingAttempts === 0 || !isCompleted),
  });

  const handleReset = () => {
    setTestProgress(10);
    setCurrentTest("brainrot");
    setRemainingAttempts(3);
  };

  async function loadNextQuestion() {
    if (!session) {
      return;
    }

    const data: any = await getCurrentQuestion(session);

    if (data.error) {
      toast.error(data.error);
      return;
    }

    setQuestion(data.question);
  }

  async function handleAnswer(answerIndex: number) {
    if (!session) {
      toast.error("Sori kek nya error");
      return;
    }

    const data = (await submitAnswer(session, answerIndex)) as any;

    if (data.error === "Invalid Answer") {
      playThudSound();

      setRemainingAttempts((prev) => prev - 1);

      const decRe = remainingAttempts - 1;
      setTimeout(() => {
        toast.error(
          decRe === 0
            ? "Salah! YAHAHAHA"
            : `Salah! yahahaha, ${decRe} kesempatan lagi! 😉`,
          {
            closeButton: false,
            duration: 1000,
          },
        );
      }, 200);

      return;
    }

    playWowSound();

    if (data.completed) {
      setIsCompleted(true);
      setIqScore(data.score ?? 0);
    } else {
      setCurrentTest(data.nextSection || "brainrot");
      setTestProgress(
        question ? (Math.min(data?.questionIndex ?? 0, 4) + 1) * 20 : 0,
      );

      await loadNextQuestion();
    }
  }

  const handleComplete = () => {
    setIsOpen(false);
    sessionStorage.clear();
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  //   store data to session storage
  useEffect(() => {
    if (isOpen && data) {
      setSession(data);
    }
  }, [data, isOpen]);

  //   initialize question
  useEffect(() => {
    if (isOpen) {
      loadNextQuestion();
    }
  }, [session, isOpen]);

  useEffect(() => {
    if (remainingAttempts === 0) {
      toast.dismiss();

      setTimeout(() => {
        toast.warning("Kamu udah 3 kali salah, kita ulang dari awal! 😘", {
          closeButton: false,
          duration: 2000,
        });
      }, 1000);

      setTimeout(() => {
        reset();
        handleReset();
      }, 3000);
    }
  }, [remainingAttempts]);

  const headerContent = React.useMemo(() => {
    return (
      <div className="space-y-2 md:-mt-4">
        <p className="text-muted-foreground text-sm font-medium capitalize">
          {`${currentTest} Test`}
        </p>

        <div className="flex items-center gap-1">
          <Progress
            value={
              currentTest === "brainrot"
                ? testProgress
                : currentTest === "literacy" || currentTest === "math"
                  ? 100
                  : 0
            }
            className="h-2 w-full"
          >
            <ProgressTrack />
          </Progress>
          <Progress
            value={
              currentTest === "literacy"
                ? testProgress
                : currentTest === "math"
                  ? 100
                  : 0
            }
            className="h-2 w-full"
          >
            <ProgressTrack />
          </Progress>
          <Progress
            value={currentTest === "math" ? testProgress : 0}
            className="h-2 w-full"
          >
            <ProgressTrack />
          </Progress>
        </div>
      </div>
    );
  }, [currentTest, testProgress, isCompleted]);

  return (
    <DrawerResponsive
      dismissible={false}
      open={isOpen}
      onOpenChange={setIsOpen}
      disableClickOutside
      title="IQ Test"
      trigger={
        <Button size={"sm"} className="shadow-primary shadow-lg">
          <ShieldUserIcon />
          Jadikan Admin
        </Button>
      }
      headerContent={headerContent}
    >
      <div className="animate-slide-up md:animate-fade-in space-y-4 max-sm:mt-4">
        {!isCompleted && !isLoading && question && (
          <div
            className="font-medium select-none"
            dangerouslySetInnerHTML={{
              __html: scrambleText(question?.question ?? ""),
            }}
          />
        )}

        <div
          className="relative grid grid-cols-2 gap-3 focus:outline-none sm:p-2"

          //   tabIndex={0}
        >
          {isCompleted ? (
            <div className="col-span-full grid h-60 place-content-center gap-2 p-4 text-center">
              <h4>Gila, Pinter banget 😱</h4>
              <p className="text-lg">
                Skor IQ mu{" "}
                <span className="text-primary font-bold">{iqScore}</span>
              </p>
              <Separator className="mt-6" />
              <p className="mt-4">Tapi sayang, ini cuma PRANK! AKOAWKOAWKO</p>
              <Button onClick={handleComplete}>Hmmm 😑</Button>
            </div>
          ) : isLoading ? (
            <div className="col-span-full grid h-60 place-content-center">
              <LoaderCircleIcon className="text-primary animate-spin" />
            </div>
          ) : (
            <>
              {question &&
                (question.imageUrls
                  ? question.imageUrls.map((img, i) => (
                      <div
                        key={img}
                        className={cn(
                          "ring-primary group size-full cursor-pointer overflow-hidden rounded-md transition-all ease-in-out hover:ring-4",
                          remainingAttempts === 0 &&
                            "pointer-events-none opacity-50",
                        )}
                        onClick={() => handleAnswer(i)}
                      >
                        <FadeinImage
                          draggable={false}
                          src={img}
                          width={100}
                          height={100}
                          alt="question-image"
                          className="size-full origin-center object-cover transition-transform ease-in-out select-none group-hover:scale-105"
                        />
                      </div>
                    ))
                  : question.options.map((option, i) => (
                      <div
                        key={option + i}
                        className={cn(
                          "ring-primary group grid size-full h-40 cursor-pointer place-content-center overflow-hidden rounded-md border text-center transition-all ease-in-out hover:ring-4",
                          remainingAttempts === 0 &&
                            "pointer-events-none opacity-50",
                        )}
                        onClick={() => handleAnswer(i)}
                      >
                        <p
                          className={clsx(
                            currentTest === "math"
                              ? "text-3xl font-bold"
                              : "p-4 text-sm",
                          )}
                        >
                          {option}
                        </p>
                      </div>
                    )))}

              <div className="absolute inset-0 m-auto h-max w-max">
                <Button
                  size={"icon"}
                  variant={"secondary"}
                  className="dark size-10 backdrop-blur md:size-12"
                  onClick={() => {
                    handleReset();
                    reset();
                  }}
                >
                  <RotateCcw className="text-primary size-5 md:size-6" />
                </Button>
              </div>
            </>
          )}
        </div>

        <Button
          variant={"secondary"}
          onClick={handleClose}
          className="block w-full sm:hidden"
        >
          Tutup
        </Button>
      </div>
    </DrawerResponsive>
  );
}
