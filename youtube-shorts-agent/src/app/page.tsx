"use client";

import { ReactNode, useMemo, useState } from "react";

type GenerationResponse = {
  topic: string;
  research: {
    headline: string;
    angle: string;
    context: string;
    source: string;
    summary: string;
  };
  script: {
    hook: string;
    body: string;
    endingTwist: string;
  };
  soraPrompt: string;
};

const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      onClick={async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className="rounded-md border border-zinc-700/30 bg-zinc-900/80 px-3 py-1 text-xs font-medium uppercase tracking-wide text-zinc-100 transition hover:bg-zinc-800"
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
};

const SectionCard = ({
  title,
  action,
  children,
}: {
  title: string;
  action?: ReactNode;
  children: ReactNode;
}) => (
  <section className="relative flex flex-col gap-3 rounded-xl border border-white/10 bg-black/40 p-6 shadow-[0_0_60px_rgba(0,0,0,0.45)] backdrop-blur">
    <div className="flex items-center justify-between">
      <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-zinc-300">
        {title}
      </h2>
      {action}
    </div>
    <div className="space-y-3 text-sm leading-relaxed text-zinc-100">
      {children}
    </div>
  </section>
);

export default function Home() {
  const [topic, setTopic] = useState("");
  const [result, setResult] = useState<GenerationResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const ariaStatus = useMemo(() => {
    if (isLoading) return "Generating content";
    if (error) return `Error: ${error}`;
    if (result) return "Generation complete";
    return "Idle";
  }, [isLoading, error, result]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-zinc-100">
      <main className="mx-auto flex max-w-5xl flex-col gap-10 px-6 pb-24 pt-16">
        <header className="space-y-3">
          <p className="text-xs uppercase tracking-[0.6em] text-zinc-500">
            Shorts Automation Engine
          </p>
          <h1 className="text-4xl font-semibold text-white md:text-5xl">
            Cinematic Viral Script Architect
          </h1>
          <p className="max-w-2xl text-sm text-zinc-400 md:text-base">
            Drop any topic. Get a shocking true angle, a suspense-packed
            60-second script, and a scene-by-scene Sora 2 prompt—optimized for
            faceless YouTube Shorts that hook a global audience.
          </p>
        </header>

        <form
          className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
          onSubmit={async (event) => {
            event.preventDefault();
            if (!topic.trim()) {
              setError("Drop in a topic first.");
              return;
            }
            setIsLoading(true);
            setError(null);
            setResult(null);
            try {
              const response = await fetch("/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ topic }),
              });
              if (!response.ok) {
                throw new Error("Generation failed. Try again.");
              }
              const payload = (await response.json()) as GenerationResponse;
              setResult(payload);
            } catch (err) {
              setError(
                err instanceof Error
                  ? err.message
                  : "Unexpected error. Please retry."
              );
            } finally {
              setIsLoading(false);
            }
          }}
        >
          <label className="flex flex-col gap-2 text-sm uppercase tracking-[0.4em] text-zinc-400">
            Input Topic
            <textarea
              value={topic}
              onChange={(event) => setTopic(event.target.value)}
              placeholder="Example: Lost cities of the Amazon rainforest"
              rows={3}
              className="w-full rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-base font-medium text-white shadow-inner outline-none transition focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/30"
            />
          </label>
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-500 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-black shadow-lg shadow-cyan-500/30 transition hover:shadow-indigo-500/40 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <span className="size-2 animate-ping rounded-full bg-black/70" />
                  Processing
                </>
              ) : (
                "Generate Package"
              )}
            </button>
            <p className="text-xs text-zinc-500">
              Output tuned for 45–60 second faceless shorts, ready for TTS.
            </p>
          </div>
        </form>

        <div role="status" aria-live="polite" className="sr-only">
          {ariaStatus}
        </div>

        {error && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
            {error}
          </div>
        )}

        {result && (
          <div className="grid gap-6 lg:grid-cols-2">
            <SectionCard
              title="Deep Research"
              action={<CopyButton text={result.research.summary} />}
            >
              <p className="text-lg font-semibold text-white">
                {result.research.headline}
              </p>
              <p>{result.research.angle}</p>
              <p className="text-zinc-300">{result.research.context}</p>
              <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
                Source: {result.research.source}
              </p>
            </SectionCard>

            <SectionCard
              title="Viral Script"
              action={
                <CopyButton
                  text={`HOOK: ${result.script.hook}\nSCRIPT: ${result.script.body}\nENDING TWIST: ${result.script.endingTwist}`}
                />
              }
            >
              <article className="space-y-4 text-sm leading-relaxed">
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-cyan-300">
                    Hook
                  </p>
                  <p className="text-lg font-semibold text-white">
                    {result.script.hook}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-cyan-300">
                    Script
                  </p>
                  <p className="whitespace-pre-line">{result.script.body}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-cyan-300">
                    Ending Twist
                  </p>
                  <p>{result.script.endingTwist}</p>
                </div>
              </article>
            </SectionCard>

            <SectionCard
              title="Sora 2 Prompt"
              action={<CopyButton text={result.soraPrompt} />}
            >
              <pre className="whitespace-pre-wrap text-xs text-zinc-200">
                {result.soraPrompt}
              </pre>
            </SectionCard>
          </div>
        )}
      </main>
    </div>
  );
}
