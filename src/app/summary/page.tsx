"use client";
import { useState } from "react";
import quizData from "@/app/data/quizData.json";
import Head from "next/head";

// 🔁 Scalable question set (can load from external .json later)
export default function EntrepreneurshipQuiz() {
    const [selected, setSelected] = useState<number[]>(new Array(quizData.length).fill(-1));
    const [feedback, setFeedback] = useState<(string | null)[]>(
        new Array(quizData.length).fill(null),
    );

    const handleAnswer = (qIndex: number, optionIndex: number) => {
        const updated = [...selected];
        updated[qIndex] = optionIndex;
        setSelected(updated);

        const isCorrect = quizData[qIndex].answer === optionIndex;
        const feedbackText = isCorrect
            ? "✅ Correct!"
            : `❌ Oops! Correct answer: ${quizData[qIndex].options[quizData[qIndex].answer]}`;

        const updatedFeedback = [...feedback];
        updatedFeedback[qIndex] = feedbackText;
        setFeedback(updatedFeedback);
    };

    return (
        <>
            <Head>
                <title>Entrepreneurship Quiz – Instant Feedback</title>
            </Head>
            <main className="max-w-4xl mx-auto px-6 py-12 font-sans">
                <h1 className="text-3xl font-bold mb-4">🧠 Daniel Priestley Quiz</h1>
                <p className="text-gray-500 mb-8">Instant feedback, scalable via JSON.</p>

                <div className="space-y-12">
                    {quizData.map((q, i) => (
                        <div key={i} className="space-y-4 border-b pb-6">
                            <h2 className="text-lg font-medium">
                                {i + 1}. {q.question}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {q.options.map((opt, j) => (
                                    <button
                                        key={j}
                                        onClick={() => handleAnswer(i, j)}
                                        disabled={selected[i] !== -1}
                                        className={`border rounded-md p-3 text-left transition ${
                                            selected[i] === j
                                                ? quizData[i].answer === j
                                                    ? "bg-green-100 border-green-500"
                                                    : "bg-red-100 border-red-400"
                                                : "border-gray-300 hover:border-gray-400"
                                        }`}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                            {feedback[i] && <p className="text-sm mt-2">{feedback[i]}</p>}
                        </div>
                    ))}
                </div>
            </main>
        </>
    );
}
