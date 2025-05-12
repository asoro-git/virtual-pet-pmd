"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useLocalStorage from "@/app/components/useLocalStorage";

export function SpotifyPlayer() {
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
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="md:col-span-4 shadow-3xl border border-zinc-200 bg-white p-6 rounded-xl"
        >
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
