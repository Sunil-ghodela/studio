"use client";

import { useMemo, useState } from "react";
import {
  Bell,
  ChevronRight,
  Droplets,
  Flame,
  Leaf,
  Moon,
  Search,
  Sparkles,
  Sun,
  Utensils,
} from "lucide-react";
import { cn } from "@/lib/utils";

type ScreenKey = "home" | "explore" | "journey";

const tabs: { key: ScreenKey; label: string }[] = [
  { key: "home", label: "Screen 1 · Home" },
  { key: "explore", label: "Screen 2 · Explore" },
  { key: "journey", label: "Screen 3 · Journey" },
];

const quickCards = [
  { title: "Cooling Foods", value: "20%", icon: Flame, color: "from-emerald-300 to-green-500" },
  { title: "Hydrating Drinks", value: "20%", icon: Droplets, color: "from-cyan-300 to-sky-500" },
  { title: "Light Dinner", value: "See all", icon: Leaf, color: "from-lime-300 to-emerald-500" },
];

const categoryCards = [
  "Cooling Foods",
  "Energy Boost",
  "Morning Picks",
  "Digestion Aid",
  "Healthy Skin",
  "Weight Loss",
  "Proteins",
  "Immunity",
  "Superfoods",
];

export default function Home() {
  const [activeScreen, setActiveScreen] = useState<ScreenKey>("home");

  const title = useMemo(() => {
    if (activeScreen === "home") return "Heat Wellness App · Home";
    if (activeScreen === "explore") return "Heat Wellness App · Explore";
    return "Heat Wellness App · Daily Journey";
  }, [activeScreen]);

  return (
    <main className="min-h-screen bg-neutral-950 px-4 py-10 text-neutral-900 sm:px-8">
      <div className="mx-auto mb-6 max-w-3xl text-white">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p className="mt-2 text-sm text-neutral-300">
          Prototype of your 3 requested mobile screens using one interactive preview.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveScreen(tab.key)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition",
                activeScreen === tab.key
                  ? "bg-white text-neutral-950"
                  : "bg-neutral-800 text-neutral-200 hover:bg-neutral-700"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <section className="mx-auto max-w-md rounded-[2.5rem] border border-white/10 bg-white p-4 shadow-2xl">
        {activeScreen === "home" && <HomeScreen />}
        {activeScreen === "explore" && <ExploreScreen />}
        {activeScreen === "journey" && <JourneyScreen />}
      </section>
    </main>
  );
}

function HomeScreen() {
  return (
    <div className="space-y-4">
      <article className="overflow-hidden rounded-3xl bg-gradient-to-br from-orange-200 via-amber-100 to-blue-100 p-5">
        <p className="text-2xl">🌤️</p>
        <p className="mt-10 text-2xl font-semibold">Hi, Ankit.</p>
        <h2 className="text-3xl font-bold leading-tight">Hot Day: 28°C in Rishikesh, Uttarakhand</h2>
        <button className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-medium">
          <Droplets className="h-4 w-4 text-sky-500" /> Cooling Tips
        </button>
      </article>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-3xl font-semibold tracking-tight">For You Today</h3>
          <button className="inline-flex items-center text-sm font-medium text-neutral-500">
            See All <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {quickCards.map(({ title, value, icon: Icon, color }) => (
            <article key={title} className="overflow-hidden rounded-2xl border">
              <div className={cn("h-20 bg-gradient-to-br", color)} />
              <div className="space-y-1 p-2">
                <p className="text-xs font-semibold leading-tight">{title}</p>
                <p className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-2 py-0.5 text-xs">
                  <Icon className="h-3 w-3" /> {value}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <article className="rounded-2xl border bg-gradient-to-r from-lime-50 to-amber-50 p-4">
        <p className="text-lg font-semibold">Daily Food Journey</p>
        <div className="mt-2 grid grid-cols-3 overflow-hidden rounded-full bg-white text-center text-xs font-medium">
          <span className="bg-lime-100 py-1">Morning</span>
          <span className="bg-amber-100 py-1">Afternoon</span>
          <span className="bg-indigo-100 py-1">Night</span>
        </div>
        <p className="mt-3 text-lg font-semibold">Cooling maintained ✅</p>
        <p className="text-sm text-neutral-600">Keep hydrated! How about some coconut water?</p>
      </article>

      <div className="rounded-2xl bg-gradient-to-r from-green-100 to-lime-50 p-4">
        <p className="inline-flex items-center gap-2 text-lg font-semibold">
          <Sparkles className="h-4 w-4 text-green-700" /> Ask your body
        </p>
        <p className="text-sm text-neutral-700">Aaj kya khana chahiye?</p>
      </div>
    </div>
  );
}

function ExploreScreen() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 rounded-full border bg-neutral-50 px-4 py-3">
        <Search className="h-5 w-5 text-neutral-500" />
        <input
          className="w-full bg-transparent text-sm outline-none"
          placeholder="Search any food..."
          readOnly
        />
      </div>

      <div className="flex gap-2 overflow-auto pb-1 text-sm">
        {[
          ["Recommended", "bg-emerald-100 text-emerald-900"],
          ["Cooling", "bg-sky-100 text-sky-900"],
          ["Energy", "bg-amber-100 text-amber-900"],
          ["Light", "bg-orange-100 text-orange-900"],
        ].map(([label, style]) => (
          <span key={label} className={cn("whitespace-nowrap rounded-full px-3 py-1.5 font-medium", style)}>
            {label}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-2">
        {categoryCards.map((card, i) => (
          <article key={card} className="overflow-hidden rounded-2xl border bg-white">
            <div className={cn("h-20", i % 3 === 0 ? "bg-lime-200" : i % 3 === 1 ? "bg-amber-200" : "bg-green-200")} />
            <div className="p-2">
              <p className="text-sm font-semibold leading-tight">{card}</p>
              <p className="text-xs text-neutral-500">Healthy suggestions</p>
            </div>
          </article>
        ))}
      </div>

      <h3 className="text-2xl font-semibold">Browse by Type</h3>
      <div className="grid grid-cols-2 gap-2">
        {[
          ["Foods", Utensils],
          ["Herbs", Leaf],
          ["Spices", Sparkles],
          ["Superfoods", Bell],
        ].map(([label, Icon]) => (
          <div key={label as string} className="rounded-2xl border bg-neutral-50 p-4">
            <Icon className="mb-2 h-5 w-5 text-neutral-600" />
            <p className="font-medium">{label as string}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function JourneyScreen() {
  return (
    <div className="space-y-4">
      <article className="rounded-3xl bg-gradient-to-br from-emerald-100 via-lime-50 to-amber-50 p-5">
        <p className="text-sm font-medium text-neutral-500">Today&apos;s Thermo Balance</p>
        <p className="mt-2 text-4xl font-bold">82%</p>
        <p className="text-sm text-neutral-600">You are doing great. Keep your body cool and light.</p>
      </article>

      <article className="rounded-2xl border p-4">
        <h3 className="text-xl font-semibold">Meal Checkpoints</h3>
        <div className="mt-3 space-y-3 text-sm">
          <div className="flex items-center justify-between rounded-xl bg-lime-50 p-3"><span className="inline-flex items-center gap-2"><Sun className="h-4 w-4" /> Morning</span><span>Completed</span></div>
          <div className="flex items-center justify-between rounded-xl bg-amber-50 p-3"><span className="inline-flex items-center gap-2"><Sparkles className="h-4 w-4" /> Afternoon</span><span>In progress</span></div>
          <div className="flex items-center justify-between rounded-xl bg-indigo-50 p-3"><span className="inline-flex items-center gap-2"><Moon className="h-4 w-4" /> Night</span><span>Pending</span></div>
        </div>
      </article>

      <article className="rounded-2xl border bg-neutral-50 p-4">
        <h3 className="text-lg font-semibold">Smart Suggestion</h3>
        <p className="mt-2 text-sm text-neutral-700">
          Dinner idea: veggie khichdi + cucumber raita to improve digestion and reduce internal heat.
        </p>
      </article>
    </div>
  );
}
