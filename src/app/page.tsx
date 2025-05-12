"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { LifeOSPanel } from "@/app/components/LifeOS";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { motion } from "framer-motion";

// Types
interface Monster {
    emoji: string;
    hp: number;
}

interface PetStats {
    level: number;
    experience: number;
    health: number;
    avatar: string;
}

// Bestiary data
const bestiary: Monster[] = [
    { emoji: "👾", hp: 100 },
    { emoji: "👹", hp: 120 },
    { emoji: "💀", hp: 150 },
    { emoji: "🦇", hp: 80 },
    { emoji: "🕷️", hp: 90 },
];

// Reusable localStorage hook
function useLocalStorage<T>(key: string, initialValue: T) {
    const isSSR = typeof window === "undefined";
    const [state, setState] = useState<T>(() => {
        if (isSSR) return initialValue;
        try {
            const stored = window.localStorage.getItem(key);
            return stored ? (JSON.parse(stored) as T) : initialValue;
        } catch {
            return initialValue;
        }
    });

    useEffect(() => {
        if (isSSR) return;
        try {
            window.localStorage.setItem(key, JSON.stringify(state));
        } catch {
            // ignore write errors
        }
    }, [key, state, isSSR]);

    return [state, setState] as const;
}

export default function HomePage() {
    // Core state with persistence
    const [petLastFed, setPetLastFed] = useLocalStorage<number>("petLastFed", Date.now());
    const [workStreak, setWorkStreak] = useLocalStorage<number>("workStreak", 0);
    const [pomodoroProgress, setPomodoroProgress] = useLocalStorage<number>("pomodoroProgress", 0);
    const [petStats, setPetStats] = useLocalStorage<PetStats>("petStats", {
        level: 1,
        experience: 0,
        health: 100,
        avatar: "🐉",
    });

    const [lifeVisions, setLifeVisions] = useLocalStorage<string[]>("lifeVisions", []);

    // Non-persistent UI state
    const [petStatus, setPetStatus] = useState<string>("Idle");
    const [startTime, setStartTime] = useLocalStorage<number | null>("pomodoroStart", null);
    const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
    const [monsterIndex, setMonsterIndex] = useState<number>(0);
    const [monster, setMonster] = useState<Monster>({ ...bestiary[0] });
    const [battleLog, setBattleLog] = useState<string[]>([]);
    const [showWarning, setShowWarning] = useState<boolean>(false);
    const [newVision, setNewVision] = useState<string>("");

    // Reset daily pomodoros

    // Pet health status checker
    useEffect(() => {
        const iv = setInterval(() => {
            const hrs = (Date.now() - petLastFed) / 3600000;
            if (hrs > 48) {
                setPetStatus("💀 Dead - You forgot your pet for over 2 days!");
                setShowWarning(true);
            } else if (hrs > 24) {
                setPetStatus("😿 Hungry - It's been over a day since feeding.");
                setShowWarning(true);
            } else {
                setPetStatus("😺 Happy - Your pet is well taken care of.");
                setShowWarning(false);
            }
        }, 2000);
        return () => clearInterval(iv);
    }, [petLastFed]);

    // Pomodoro timer & battle loop
    useEffect(() => {
        const timer = setInterval(() => {
            if (!startTime) {
                setElapsedSeconds(0);
                return;
            }
            const seconds = Math.floor((Date.now() - startTime) / 1000);
            setElapsedSeconds(seconds);

            // Attack monster
            setMonster((prev) => {
                const dmg = Math.floor(Math.random() * 5);
                const newHp = Math.max(0, prev.hp - dmg);
                setBattleLog((logs) => [
                    `⚔️ ${petStats.avatar} hits ${prev.emoji} for ${dmg} HP`,
                    ...logs.slice(0, 4),
                ]);
                if (newHp === 0) {
                    const gain = 10;
                    const totalExp = petStats.experience + gain;
                    const lvlUp = Math.floor(totalExp / 100);
                    setPetStats((stats) => ({
                        ...stats,
                        experience: totalExp % 100,
                        level: stats.level + lvlUp,
                    }));
                    const nextIndex = (monsterIndex + 1) % bestiary.length;
                    setMonsterIndex(nextIndex);
                    return { ...bestiary[nextIndex] };
                }
                return { ...prev, hp: newHp };
            });

            // Progress updates
            setPomodoroProgress((seconds / 1500) * 100);
            if (seconds >= 1500) {
                setWorkStreak((s) => s + 1);
                setStartTime(Date.now());
            }
        }, 1000);
        return () => clearInterval(timer);
    }, [
        startTime,
        petStats,
        monsterIndex,
        setStartTime,
        setPetStats,
        setPomodoroProgress,
        setWorkStreak,
    ]);

    // Handlers
    const handleFeedPet = (): void => setPetLastFed(Date.now());

    const formatTime = (sec: number): string => {
        const m = String(Math.floor(sec / 60)).padStart(2, "0");
        const s = String(sec % 60).padStart(2, "0");
        return `${m}:${s}`;
    };

    const handleAddVision = (): void => {
        const text = newVision.trim();
        if (text) {
            setLifeVisions((v) => [...v, text]);
            setNewVision("");
        }
    };

    const handleRemoveVision = (idx: number): void => {
        setLifeVisions((v) => v.filter((_, i) => i !== idx));
    };

    const handleStartPomodoro = (): void => setStartTime(Date.now());
    const handleResetPomodoro = (): void => setStartTime(null);
    return (
        <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            {" "}
            {/* Notion-style NavBar */}
            <header className="w-full border-b border-zinc-200 bg-white px-6 py-2 flex items-center justify-evenly flex-wrap shadow-sm">
                <div className="gap-4">
                    <h1 className="text-lg font-semibold">🧠 Focus Pet</h1>
                </div>
                <Button
                    asChild
                    className="hover:cursor-pointer hover:bg-gray-100 shadow-sm hover:inset-ring-gray-100"
                >
                    <Link
                        href="/habit"
                        className="text-zinc-600 hover:text-black border-b-2 border-transparent  transition-all"
                    >
                        Habit
                    </Link>
                </Button>
                <span className="text-sm text-zinc-500 hidden sm:block">Link days into line</span>
                {showWarning ? "" : ""}
            </header>{" "}
            {/* App Grid Layout */}
            <div className="grid md:grid-cols-4 gap-4 p-4">
                {/* Pet Status Panel */}
                <section className="flex flex-col justify-start items-start md:col-span-1 border border-zinc-200 bg-white p-6 rounded-xl">
                    <h2 className="text-lg font-medium mb-2">🐾 Pet Status</h2>
                    <p className="text-sm text-zinc-500 mb-2">
                        Your buddy lives or dies by your focus.
                    </p>
                    <div className="text-4xl mb-2">{petStats.avatar}</div>
                    <div className="font-semibold mb-1">{petStatus}</div>
                    <div className="text-sm">
                        Lv {petStats.level} | XP: {petStats.experience}/100 | ❤️ {petStats.health}
                    </div>
                    <Progress
                        value={(petStats.experience / 100) * 100}
                        max={100}
                        className="h-2 mt-2"
                    />
                    <Button onClick={handleFeedPet} className="mt-4 w-full">
                        Feed Pet 🍖
                    </Button>
                    <p className="mt-2 text-sm">
                        Pet last fed:{" "}
                        {(() => {
                            const fed = petLastFed;
                            const diffMs = Date.now() - fed;
                            const mins = Math.floor(diffMs / 60000);
                            const hours = Math.floor(diffMs / 3600000);
                            const days = Math.floor(diffMs / (3600000 * 24));
                            if (days >= 1) return `${days} day${days > 1 ? "s" : ""} ago`;
                            if (hours >= 1) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
                            if (mins >= 1) return `${mins} min${mins > 1 ? "s" : ""} ago`;
                            return `${Math.floor(diffMs / 1000)} second${Math.floor(diffMs / 1000) > 1 ? "s" : ""} ago`;
                        })()}
                    </p>
                    <p className="mt-2 text-sm">Pomodoros today: {workStreak}</p>
                </section>
                {/* Pomodoro Panel */}
                <section className="justify-start items-center  md:col-span-1 border border-zinc-200 bg-white p-6 rounded-xl flex flex-col">
                    <h2 className="text-lg font-medium mb-2">⏱️ Pomodoro Work</h2>
                    <p className="text-sm text-zinc-500 mb-2">
                        Each 25-min session powers up your pet.
                    </p>
                    <div className="flex gap-2 mb-4">
                        <Button
                            onClick={handleStartPomodoro}
                            className="rounded-xl shadow-sm px-4 py-2 bg-white border border-zinc-300 hover:bg-zinc-100 text-zinc-800 transition-colors"
                        >
                            Start
                        </Button>
                        <Button
                            onClick={handleResetPomodoro}
                            className="rounded-xl shadow-sm px-4 py-2 bg-white border border-zinc-300 hover:bg-zinc-100 text-zinc-800 transition-colors"
                        >
                            Reset
                        </Button>
                    </div>
                    <div className="flex flex-col items-center w-full text-3xl tracking-widest mb-4">
                        <span className="flex flex-col justify-center items-center">
                            {formatTime(elapsedSeconds)}
                        </span>
                        <Progress value={pomodoroProgress} />
                    </div>
                    <div className="text-sm text-zinc-500">
                        Start time is saved even if you reload. Keep going!
                    </div>{" "}
                    {/* battleLog */}
                    <p className="mt-2">
                        ⚔️ {monster.emoji} | HP: {monster.hp}
                    </p>
                    <div className="mt-2 w-full text-sm bg-zinc-100 p-2 rounded border border-zinc-200 h-35 flex flex-col justify-center items-center overflow-y-auto">
                        {battleLog.map((log, i) => (
                            <div key={i}>{log}</div>
                        ))}
                    </div>
                    {/* <label className="mt-4 text-sm"> */}
                    {/*     Daily goal: */}
                    {/*     <Input */}
                    {/*         type="number" */}
                    {/*         value={workGoal} */}
                    {/*         onChange={(e) => setWorkGoal(Number(e.target.value))} */}
                    {/*         className="bg-zinc-100 border-zinc-300 mt-1" */}
                    {/*     /> */}
                    {/* </label> */}
                    <p className="mt-2 font-medium">🔥 Streak: {workStreak}</p>
                </section>
                {/* Life Goals & Vision Panel */}
                <section className="md:col-span-2 border border-zinc-200 bg-white p-6 rounded-xl flex flex-col">
                    <h2 className="text-lg font-medium mb-2">✅ Life Vision To-Dos</h2>
                    <p className="text-sm text-zinc-500 mb-2">
                        Add items that reflect your goals and long-term vision.
                    </p>
                    <div className="flex mb-2 gap-2">
                        <Input
                            className="flex-1 bg-zinc-100 border border-zinc-300"
                            placeholder="Add a life goal..."
                            value={newVision}
                            onChange={(e) => setNewVision(e.target.value)}
                        />
                        <Button onClick={handleAddVision}>Add</Button>
                    </div>
                    <ul className="text-sm space-y-1">
                        {lifeVisions.map((vision, index) => (
                            <li
                                key={index}
                                className="flex justify-between items-center bg-zinc-100 px-3 py-1 rounded border border-zinc-200"
                            >
                                <span>{vision}</span>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleRemoveVision(index)}
                                >
                                    ✖
                                </Button>
                            </li>
                        ))}
                    </ul>
                    <Separator />
                    <LifeOSPanel />
                </section>{" "}
            </div>
        </motion.main>
    );
}
