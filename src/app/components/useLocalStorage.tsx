"use client";
import { useEffect, useState } from "react";

export default function useLocalStorage<T>(key: string, initialValue: T) {
    const [state, setState] = useState<T>(initialValue);

    useEffect(() => {
        if (typeof window === "undefined") return;

        try {
            const stored = window.localStorage.getItem(key);
            if (stored !== null) {
                setState(JSON.parse(stored));
            }
        } catch {
            // ignore
        }
    }, [key]);

    useEffect(() => {
        if (typeof window === "undefined") return;

        try {
            window.localStorage.setItem(key, JSON.stringify(state));
        } catch {
            // ignore
        }
    }, [key, state]);

    return [state, setState] as const;
}
