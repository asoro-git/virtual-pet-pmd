// layout.tsx
import "./globals.css";
import { JetBrains_Mono } from "next/font/google";
import { Inter } from "next/font/google";
import { Lora } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import { SpotifyPlayer } from "@/app/components/SpotifyPlayer";

const jetbrains = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-mono",
});

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-sans",
});

const playfair = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-playfair",
    weight: ["400"],
});

const lora = Lora({
    subsets: ["latin"],
    variable: "--font-lora",
    weight: ["400", "700"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html
            lang="en"
            className={`${jetbrains.variable} ${inter.variable} ${lora.variable} ${playfair.variable} antialiased`}
        >
            <body className="flex flex-col bg-white text-zinc-800 antialiased">
                {children}
                <div className="grid md:grid-cols-4 ps-4 pe-4 pt-0 pb-0">
                    <SpotifyPlayer />
                </div>
            </body>
        </html>
    );
}
