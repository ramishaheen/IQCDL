"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Lock,
  Send,
  LinkIcon,
  Newspaper,
  Boxes,
  BookOpen,
  Presentation,
  MessageSquarePlus,
  LogIn,
} from "lucide-react";
import { useLocale } from "@/components/providers/LocaleProvider";
import { useAuth } from "@/components/providers/AuthProvider";
import { useMembership } from "@/components/providers/MembershipProvider";
import { openEnroll } from "@/components/membership/MemberButton";
import { PageHero } from "@/components/ui/PageHero";
import { EXPERTS, PUBLICATIONS, type Publication } from "@/lib/community";
import { cn } from "@/lib/cn";

const CAT_ICON: Record<string, typeof Newspaper> = {
  news: Newspaper,
  framework: Boxes,
  book: BookOpen,
  talk: Presentation,
  member: MessageSquarePlus,
};

interface ThreadMsg {
  role: "member" | "expert";
  name: string;
  title?: string;
  flag?: string;
  content: string;
}

const POSTS_KEY = "iqcdl_community_posts";
const THREAD_KEY = "iqcdl_community_thread";

export default function CommunityPage() {
  const { dict, t } = useLocale();
  const c = dict.community;
  const { user } = useAuth();
  const { isMember, membership } = useMembership();
  const allowed = !!user || isMember;

  const memberName = membership?.name || user?.name || "You";

  if (!allowed) {
    return (
      <>
        <PageHero eyebrow={c.eyebrow} title={c.title} subtitle={c.subtitle} />
        <section className="section pt-0">
          <div className="container-x">
            <div className="mx-auto max-w-md">
              <div className="card p-8 text-center">
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-surface/10 text-accent">
                  <Lock className="h-7 w-7" />
                </span>
                <h2 className="mt-5 text-xl font-bold text-fg">{c.gateTitle}</h2>
                <p className="mt-2 text-muted">{c.gateBody}</p>
                <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                  <button onClick={openEnroll} className="btn-primary text-white">
                    {dict.membership.cta}
                  </button>
                  <Link href="/login" className="btn-ghost">
                    <LogIn className="h-4 w-4" />
                    {t("common.login")}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHero eyebrow={c.eyebrow} title={c.title} subtitle={c.subtitle} />
      <CommunityBoard dict={dict} memberName={memberName} />
    </>
  );
}

function CommunityBoard({
  dict,
  memberName,
}: {
  dict: ReturnType<typeof useLocale>["dict"];
  memberName: string;
}) {
  const c = dict.community;
  const [tab, setTab] = useState<"pubs" | "ask">("pubs");

  return (
    <section className="section pt-0">
      <div className="container-x max-w-4xl">
        <div className="mb-6 flex justify-center gap-1.5 rounded-2xl border border-line/10 bg-surface/5 p-1.5">
          {(["pubs", "ask"] as const).map((id) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={cn(
                "rounded-xl px-4 py-2 text-sm font-medium transition",
                tab === id ? "bg-brand-500 text-white" : "text-muted hover:bg-surface/10",
              )}
            >
              {id === "pubs" ? c.tabPubs : c.tabAsk}
            </button>
          ))}
        </div>
        {tab === "pubs" ? (
          <Publications dict={dict} memberName={memberName} />
        ) : (
          <AskExperts dict={dict} memberName={memberName} />
        )}
      </div>
    </section>
  );
}

function Publications({
  dict,
  memberName,
}: {
  dict: ReturnType<typeof useLocale>["dict"];
  memberName: string;
}) {
  const c = dict.community;
  const [posts, setPosts] = useState<Publication[]>([]);
  const [form, setForm] = useState({ headline: "", description: "", link: "" });

  useEffect(() => {
    try {
      const raw = localStorage.getItem(POSTS_KEY);
      if (raw) setPosts(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  const all = useMemo(() => [...posts, ...PUBLICATIONS], [posts]);

  function publish() {
    if (!form.headline.trim()) return;
    const post: Publication = {
      id: `m-${Date.now()}`,
      author: memberName,
      title: "Member",
      flag: "🧑‍🚀",
      category: "member",
      headline: form.headline,
      description: form.description,
      link: form.link || undefined,
      date: new Date().toISOString().slice(0, 10),
    };
    const next = [post, ...posts];
    setPosts(next);
    try {
      localStorage.setItem(POSTS_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
    setForm({ headline: "", description: "", link: "" });
  }

  return (
    <div>
      {/* compose */}
      <div className="card mb-6 p-5">
        <p className="mb-3 text-sm font-semibold text-fg">{c.compose}</p>
        <input
          value={form.headline}
          onChange={(e) => setForm({ ...form, headline: e.target.value })}
          placeholder={c.composeTitlePh}
          className="mb-2 w-full rounded-xl border border-line/10 bg-surface/5 px-3.5 py-2.5 text-sm text-fg placeholder:text-faint focus:border-brand-400 focus:outline-none"
        />
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder={c.composeDescPh}
          rows={2}
          className="mb-2 w-full rounded-xl border border-line/10 bg-surface/5 px-3.5 py-2.5 text-sm text-fg placeholder:text-faint focus:border-brand-400 focus:outline-none"
        />
        <div className="flex gap-2">
          <input
            value={form.link}
            onChange={(e) => setForm({ ...form, link: e.target.value })}
            placeholder={c.composeLinkPh}
            className="flex-1 rounded-xl border border-line/10 bg-surface/5 px-3.5 py-2.5 text-sm text-fg placeholder:text-faint focus:border-brand-400 focus:outline-none"
          />
          <button onClick={publish} className="btn-primary text-white">
            {c.post}
          </button>
        </div>
      </div>

      <p className="mb-4 text-sm text-faint">{c.pubsNote}</p>

      <div className="space-y-4">
        {all.map((p) => {
          const Icon = CAT_ICON[p.category] ?? Newspaper;
          const catLabel =
            p.category === "member"
              ? c.memberPost
              : (c.categories as Record<string, string>)[p.category] ?? p.category;
          return (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              className="card p-5"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-quantum-indigo to-quantum-cyan text-sm font-bold text-white">
                  {p.author.replace(/^(Dr\.|Prof\.)\s*/, "").charAt(0)}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-fg">
                    {p.flag} {p.author}
                  </p>
                  <p className="text-xs text-faint">
                    {p.title} · {p.date}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">
                  <Icon className="h-3.5 w-3.5" />
                  {catLabel}
                </span>
              </div>
              <h3 className="mt-3 font-semibold text-fg">{p.headline}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{p.description}</p>
              {p.link && (
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline"
                >
                  <LinkIcon className="h-4 w-4" />
                  {p.link.replace(/^https?:\/\//, "").split("/")[0]}
                </a>
              )}
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}

function AskExperts({
  dict,
  memberName,
}: {
  dict: ReturnType<typeof useLocale>["dict"];
  memberName: string;
}) {
  const c = dict.community;
  const [thread, setThread] = useState<ThreadMsg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const replies = useRef(0);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(THREAD_KEY);
      if (raw) {
        const t = JSON.parse(raw) as ThreadMsg[];
        setThread(t);
        replies.current = t.filter((m) => m.role === "expert").length;
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [thread, loading]);

  function persist(next: ThreadMsg[]) {
    setThread(next);
    try {
      localStorage.setItem(THREAD_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  }

  async function send() {
    const content = input.trim();
    if (!content || loading) return;
    const next: ThreadMsg[] = [...thread, { role: "member", name: memberName, content }];
    persist(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next.map((m) => ({
            role: m.role === "member" ? "user" : "assistant",
            content: m.content,
          })),
        }),
      });
      const data = await res.json();
      const expert = EXPERTS[replies.current % EXPERTS.length];
      replies.current += 1;
      persist([
        ...next,
        {
          role: "expert",
          name: expert.name,
          title: expert.title,
          flag: expert.flag,
          content: data.reply ?? "—",
        },
      ]);
    } catch {
      /* ignore */
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card flex h-[60vh] min-h-[420px] flex-col overflow-hidden">
      <div className="border-b border-line/10 p-4">
        <p className="font-semibold text-fg">{c.askTitle}</p>
        <p className="text-sm text-muted">{c.askIntro}</p>
      </div>
      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-4">
        {thread.length === 0 && (
          <div className="flex flex-wrap gap-2">
            {EXPERTS.slice(0, 4).map((e) => (
              <span key={e.name} className="rounded-full border border-line/10 bg-surface/5 px-3 py-1.5 text-xs text-muted">
                {e.flag} {e.name} · {e.title}
              </span>
            ))}
          </div>
        )}
        {thread.map((m, i) => (
          <div key={i} className={cn("flex", m.role === "member" ? "justify-end" : "justify-start")}>
            <div className="max-w-[88%]">
              {m.role === "expert" && (
                <p className="mb-1 ms-1 text-xs font-semibold text-accent">
                  {m.flag} {m.name} · {m.title}
                </p>
              )}
              <div
                className={cn(
                  "whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                  m.role === "member" ? "bg-brand-500 text-white" : "bg-surface/10 text-fg",
                )}
              >
                {m.content}
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="rounded-2xl bg-surface/10 px-3.5 py-3">
              <div className="flex gap-1.5">
                {[0, 1, 2].map((d) => (
                  <motion.span
                    key={d}
                    className="h-1.5 w-1.5 rounded-full bg-accent"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1, repeat: Infinity, delay: d * 0.2 }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
        className="flex items-center gap-2 border-t border-line/10 p-3"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={c.askPlaceholder}
          className="flex-1 rounded-full border border-line/10 bg-surface/5 px-4 py-2.5 text-sm text-fg placeholder:text-faint focus:border-brand-400 focus:outline-none"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-quantum-indigo to-quantum-cyan text-white disabled:opacity-40"
          aria-label={c.send}
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
