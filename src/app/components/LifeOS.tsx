"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function LifeOSPanel() {
    const [quests, setQuests] = useState<string[]>(() => {
        const stored = localStorage.getItem("quarterlyQuests");
        return stored ? JSON.parse(stored) : [];
    });
    const [newQuest, setNewQuest] = useState<string>("");

    useEffect(() => {
        localStorage.setItem("quarterlyQuests", JSON.stringify(quests));
    }, [quests]);

    const handleAddQuest = () => {
        const trimmed = newQuest.trim();
        if (trimmed) {
            setQuests((prev) => [...prev, trimmed]);
            setNewQuest("");
        }
    };

    const handleRemoveQuest = (index: number) => {
        setQuests((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <div className="gap-4 mt-6 ">
            {/* Quarterly Quests Panel */}
            <section className=" bg-white ">
                <h2 className="text-lg font-medium mb-2">🏹 Quarterly Quests</h2>
                <p className="text-sm text-zinc-500 mb-2">
                    Set 1–3 big goals to complete this quarter that align with your values.
                </p>
                <div className="flex mb-2 gap-2">
                    <Input
                        className="flex-1 bg-zinc-100 border border-zinc-300"
                        placeholder="Add a quarterly goal..."
                        value={newQuest}
                        onChange={(e) => setNewQuest(e.target.value)}
                    />
                    <Button onClick={handleAddQuest}>Add</Button>
                </div>
                <ul className="text-sm space-y-1">
                    {quests.map((quest, index) => (
                        <li
                            key={index}
                            className="flex justify-between items-center bg-zinc-100 px-3 py-1 rounded border border-zinc-200"
                        >
                            <span>{quest}</span>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRemoveQuest(index)}
                            >
                                ✖
                            </Button>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
}
