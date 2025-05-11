"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { LifeOSPanel } from "@/app/components/LifeOS";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { motion } from "framer-motion";

const bestiary = [
    { emoji: "👾", hp: 100 },
    { emoji: "👹", hp: 120 },
    { emoji: "💀", hp: 150 },
    { emoji: "🦇", hp: 80 },
    { emoji: "🕷️", hp: 90 },
];

const getStorage = (key: string, fallback: any) => {
    if (typeof window === "undefined") return fallback;
    try {
        const val = localStorage.getItem(key);
        return val ? JSON.parse(val) : fallback;
    } catch {
        return fallback;
    }
};

export default function HomePage() {
    // Core state
    const [petLastFed, setPetLastFed] = useState(() => getStorage("petLastFed", Date.now()));
    const [workStreak, setWorkStreak] = useState(() => getStorage("workStreak", 0));
    const [pomodoroProgress, setPomodoroProgress] = useState(getStorage("pomodoroProgress", 0));
    const [pomodorosToday, setPomodorosToday] = useState(() => getStorage("pomodorosToday", 0));
    const [petStatus, setPetStatus] = useState("Idle");
    const [petStats, setPetStats] = useState(() =>
        getStorage("petStats", { level: 1, experience: 0, health: 100, avatar: "🐉" }),
    );
    const [startTime, setStartTime] = useState<number | null>(null);
    const [elapsedSeconds, setElapsedSeconds] = useState(0);
    const [monsterIndex, setMonsterIndex] = useState(0);
    const [monster, setMonster] = useState(() => ({ ...bestiary[0] }));
    const [battleLog, setBattleLog] = useState<string[]>([]);
    const [spotifyUrl, setSpotifyUrl] = useState(
        () =>
            localStorage.getItem("spotifyUrl") ||
            "https://open.spotify.com/show/383SYFKEios7ARBxCCUY8L?si=fb0a996e4ea14aac",
    );
    const [spotifyInput, setSpotifyInput] = useState("");
    const [showWarning, setShowWarning] = useState(false);

    // Reset daily pomodoros
    useEffect(() => {
        const today = new Date().toLocaleDateString();
        if (localStorage.getItem("lastPomodoroDate") !== today) {
            setPomodorosToday(0);
            localStorage.setItem("lastPomodoroDate", today);
        }
    }, []);

    // Pet health status
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

    // Pomodoro timer & battle
    useEffect(() => {
        const timer = setInterval(() => {
            if (startTime) {
                setElapsedSeconds(Math.floor((Date.now() - startTime) / 1000));
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
                        setPetStats({
                            ...petStats,
                            experience: totalExp % 100,
                            level: petStats.level + lvlUp,
                        });
                        const next = (monsterIndex + 1) % bestiary.length;
                        setMonsterIndex(next);
                        return { ...bestiary[next] };
                    }
                    return { ...prev, hp: newHp };
                });
            } else {
                setElapsedSeconds(0);
            }
        }, 1000);
        return () => clearInterval(timer);
    }, [startTime, petStats, monsterIndex]);

    // Persist everything
    useEffect(() => {
        localStorage.setItem("spotifyUrl", spotifyUrl);
        localStorage.setItem("petLastFed", JSON.stringify(petLastFed));
        localStorage.setItem("workStreak", JSON.stringify(workStreak));
        localStorage.setItem("pomodorosToday", JSON.stringify(pomodorosToday));
        localStorage.setItem("petStats", JSON.stringify(petStats));
        localStorage.setItem("pomodoroProgress", JSON.stringify(pomodoroProgress));
    }, [spotifyUrl, petLastFed, workStreak, pomodorosToday, petStats, pomodoroProgress]);

    // Handlers
    const handleFeedPet = () => {
        setPetLastFed(Date.now());
        setShowWarning(false);
    };
    const formatTime = (sec: number) => {
        const m = Math.floor(sec / 60)
            .toString()
            .padStart(2, "0");
        const s = (sec % 60).toString().padStart(2, "0");
        return `${m}:${s}`;
    };
    const handleSetSpotify = () => {
        if (spotifyInput.trim()) {
            setSpotifyUrl(spotifyInput);
            setSpotifyInput("");
        }
    };
    /* visions */
    const [lifeVisions, setLifeVisions] = useState<string[]>(() => {
        if (typeof window === "undefined") return [];
        const saved = localStorage.getItem("lifeVisions");
        return saved ? JSON.parse(saved) : [];
    });
    const [newVision, setNewVision] = useState("");

    useEffect(() => {
        localStorage.setItem("lifeVisions", JSON.stringify(lifeVisions));
    }, [lifeVisions]);

    const handleAddVision = () => {
        const trimmed = newVision.trim();
        if (trimmed) {
            setLifeVisions((prev) => [...prev, trimmed]);
            setNewVision("");
        }
    };

    const handleRemoveVision = (index: number) => {
        setLifeVisions((prev) => prev.filter((_, i) => i !== index));
    };

    /*pomodoros*/
    // Pomodoro timer logic

    useEffect(() => {
        const stored = localStorage.getItem("pomodoroStart");
        if (stored) {
            setStartTime(parseInt(stored));
        }
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            const stored = localStorage.getItem("pomodoroStart");
            const time = stored ? parseInt(stored) : null;
            if (time && localStorage.getItem("pomodoroStart")) {
                const seconds = Math.floor((Date.now() - time) / 1000);
                setElapsedSeconds(seconds);

                // Every 5 minutes: +1 stat
                if (seconds % 300 === 0 && seconds >= 300) {
                    if (!localStorage.getItem("pomodoroStart")) return;
                    const stats = JSON.parse(
                        localStorage.getItem("petStats") || '{"str":0,"def":0}',
                    );
                    const randomStat = Math.random() < 0.5 ? "str" : "def";
                    stats[randomStat] += 1;
                    localStorage.setItem("petStats", JSON.stringify(stats));
                }

                // Every 10 minutes: +1 level
                if (seconds % 600 === 0 && seconds >= 600) {
                    if (!localStorage.getItem("pomodoroStart")) return;
                    const level = parseInt(localStorage.getItem("petLevel") || "1") + 1;
                    localStorage.setItem("petLevel", level.toString());
                }

                // Every 25 minutes: count as a pomodoro session
                if (seconds % 1500 === 0 && seconds >= 1500) {
                    if (!localStorage.getItem("pomodoroStart")) return;
                    const streak = parseInt(localStorage.getItem("workStreak") || "0") + 1;
                    setWorkStreak(streak);
                    localStorage.setItem("workStreak", workStreak.toString());
                    setElapsedSeconds(0);
                    localStorage.removeItem("pomodoroProgress");
                    localStorage.removeItem("pomodoroStart");
                    setStartTime(Date.now());
                    localStorage.setItem("pomodoroStart", Date.now().toString());
                }
                setPomodoroProgress((seconds / 1500) * 100);
                localStorage.setItem("pomodoroProgress", (seconds / 1500).toString());
            } else {
                setElapsedSeconds(0);
                setPomodoroProgress(0);
                localStorage.removeItem("pomodoroProgress");
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [workStreak, pomodoroProgress]);

    const handleStartPomodoro = () => {
        const now = Date.now();
        setStartTime(now);
        localStorage.setItem("pomodoroStart", now.toString());
    };

    const handleResetPomodoro = () => {
        localStorage.removeItem("pomodoroStart");
        setStartTime(null);
    };

    return (
        <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col min-h-screen bg-white text-zinc-800 antialiased"
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
                {/* Spotify Panel */}
                <motion.section className="md:col-span-4 border border-zinc-200 bg-white p-6 rounded-xl">
                    <h2 className="text-lg font-medium mb-2">🎧 Spotify</h2>
                    <Input
                        placeholder="Paste Spotify URL..."
                        className="bg-zinc-100 border-zinc-300 mb-2"
                        value={spotifyInput}
                        onChange={(e) => setSpotifyInput(e.target.value)}
                    />
                    <Button onClick={handleSetSpotify}>Set URL</Button>
                    <div className="overflow-hidden rounded mt-4">
                        <iframe
                            className="w-full h-24"
                            src={`https://open.spotify.com/embed/show/${spotifyUrl.split("/").pop()?.split("?")[0]}`}
                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                            allowFullScreen
                            loading="lazy"
                        ></iframe>
                    </div>
                </motion.section>
            </div>
        </motion.main>
    );
}
