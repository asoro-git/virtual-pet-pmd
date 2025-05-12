"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
export function SpotifyPlayer() {
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
    const [spotifyUrl, setSpotifyUrl] = useLocalStorage<string>(
        "spotifyUrl",
        "https://open.spotify.com/playlist/37i9dQZF1DX1uaml3UXYLk?si=7a6fb5b5aea642c1",
    );

    const [spotifyInput, setSpotifyInput] = useState<string>("");

    const handleSetSpotify = (): void => {
        if (spotifyInput.trim()) {
            setSpotifyUrl(spotifyInput.trim());
            setSpotifyInput("");
        }
    };
    /* Spotify Panel */
    return (
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
                    src={`https://open.spotify.com/embed/playlist/${spotifyUrl.split("/").pop()?.split("?")[0]}?theme=0`}
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                ></iframe>
            </div>
        </motion.section>
    );
}
