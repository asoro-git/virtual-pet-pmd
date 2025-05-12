"use client";
//
// import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import Link from "next/link";
//

export default function HabitTrackerPage() {
    return (
        <motion.h1
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="flex flex-col gap-4 min-h-screen justify-center items-center text-3xl h-full"
        >
            Development in progress
            <motion.p
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 3, ease: "easeOut" }}
            >
                <Button asChild>
                    <Link href="/">back to main page</Link>
                </Button>
            </motion.p>
        </motion.h1>
    );
}
//     interface habits {
//         name: string;
//         done: boolean;
//         streak: number;
//         lastMarked: string | null;
//         markedDates: string[];
//     }
//     const [habits, setHabits] = useState<habits[]>([]);
//     useEffect(() => {
//         const stored = localStorage.getItem("habits");
//         if (stored) {
//             setHabits(JSON.parse(stored));
//         }
//     }, []);
//     const [newHabit, setNewHabit] = useState("");
//     const [reflections, setReflections] = useState(() => {
//         const stored = localStorage.getItem("reflections");
//         return stored ? JSON.parse(stored) : [];
//     });
//     const [newReflection, setNewReflection] = useState("");
//     const [editingReflectionIndex, setEditingReflectionIndex] = useState<number | null>(null);
//     const [editingReflectionValue, setEditingReflectionValue] = useState("");
//
//     const [vaultItems, setVaultItems] = useState(() => {
//         const stored = localStorage.getItem("vaultItems");
//         return stored ? JSON.parse(stored) : [];
//     });
//     const [newVaultItem, setNewVaultItem] = useState("");
//     const [editingVaultIndex, setEditingVaultIndex] = useState<number | null>(null);
//     const [editingVaultValue, setEditingVaultValue] = useState("");
//
//     useEffect(() => {
//         localStorage.setItem("reflections", JSON.stringify(reflections));
//     }, [reflections]);
//
//     useEffect(() => {
//         localStorage.setItem("vaultItems", JSON.stringify(vaultItems));
//     }, [vaultItems]);
//     const [goals, setGoals] = useState(() => {
//         const stored = localStorage.getItem("goals");
//         return stored ? JSON.parse(stored) : [];
//     });
//     const [newGoal, setNewGoal] = useState("");
//     const [books, setBooks] = useState(() => {
//         const stored = localStorage.getItem("books");
//         return stored ? JSON.parse(stored) : [];
//     });
//     const [newBook, setNewBook] = useState("");
//
//     useEffect(() => {
//         localStorage.setItem("habits", JSON.stringify(habits));
//     }, [habits]);
//
//     // Reset all habit checkboxes daily
//     useEffect(() => {
//         const today = new Date().toLocaleDateString();
//         const lastReset = localStorage.getItem("lastHabitReset");
//         if (lastReset !== today) {
//             setHabits(
//                 (
//                     prev: [
//                         {
//                             name: string;
//                             done: boolean;
//                             streak: number;
//                             lastMarked: string | null;
//                             markedDates: string[];
//                         },
//                     ],
//                 ) =>
//                     prev.map(
//                         (h: {
//                             name: string;
//                             done: boolean;
//                             streak: number;
//                             lastMarked: string | null;
//                             markedDates: string[];
//                         }) => ({ ...h, done: false }),
//                     ),
//             );
//             localStorage.setItem("lastHabitReset", today);
//         }
//     }, []);
//
//     useEffect(() => {
//         localStorage.setItem("goals", JSON.stringify(goals));
//     }, [goals]);
//
//     useEffect(() => {
//         localStorage.setItem("books", JSON.stringify(books));
//     }, [books]);
//
//     const handleAddHabit = () => {
//         const trimmed = newHabit.trim();
//         if (trimmed) {
//             setHabits((prev: []) => [
//                 ...prev,
//                 { name: trimmed, done: false, streak: 0, lastMarked: null, markedDates: [] },
//             ]);
//             setNewHabit("");
//         }
//     };
//
//     const toggleHabit = (index: number) => {
//         const today = new Date().toLocaleDateString();
//         setHabits(
//             (
//                 prev: [
//                     {
//                         name: string;
//                         done: boolean;
//                         streak: number;
//                         lastMarked: string | null;
//                         markedDates: string[];
//                     },
//                 ],
//             ) => {
//                 return prev.map((habit, i) => {
//                     if (i !== index) return habit;
//                     const wasMarkedToday = habit.lastMarked === today;
//                     const nowMarked = !habit.done && !wasMarkedToday;
//                     return {
//                         ...habit,
//                         done: !habit.done,
//                         streak: nowMarked ? (habit.streak || 0) + 1 : habit.done ? habit.streak : 0,
//                         lastMarked: nowMarked ? today : habit.lastMarked,
//                     };
//                 });
//             },
//         );
//     };
//
//     const removeHabit = (index: number) => {
//         setHabits(
//
//                 prev: [
//                     {
//                         name: string;
//                         done: boolean;
//                         streak: number;
//                         lastMarked: string | null;
//                         markedDates: string[];
//                     },
//                 ],
//             ) => prev.filter((_, i) => i !== index),
//         );
//     };
//
//     const handleAddGoal = () => {
//         const trimmed = newGoal.trim();
//         if (trimmed) {
//             setGoals((prev: []) => [...prev, trimmed]);
//             setNewGoal("");
//         }
//     };
//
//     const handleRemoveGoal = (index: number) => {
//         setGoals((prev: []) => prev.filter((_, i) => i !== index));
//     };
//
//     const handleAddBook = () => {
//         const trimmed = newBook.trim();
//         if (trimmed) {
//             setBooks((prev: []) => [...prev, trimmed]);
//             setNewBook("");
//         }
//     };
//
//     const handleRemoveBook = (index: number) => {
//         setBooks((prev: []) => prev.filter((_, i) => i !== index));
//     };
//
//     const habitProgress = habits.length
//         ? (habits.filter(
//               (h: {
//                   name: string;
//                   done: boolean;
//                   streak: number;
//                   lastMarked: string | null;
//                   markedDates: string[];
//               }) => h.done,
//           ).length /
//               habits.length) *
//           100
//         : 0;
//
//     return (
//         <main className="flex flex-col min-h-screen bg-white text-zinc-800">
//             <header className="w-full border-b border-zinc-200 bg-white px-6 py-4 flex items-center justify-evenly shadow-sm">
//                 <h1 className="text-lg font-semibold">📋 Habit Tracker</h1>
//                 <Button
//                     asChild
//                     className="hover:cursor-pointer hover:bg-gray-100 shadow-sm hover:inset-ring-gray-100"
//                 >
//                     <Link
//                         href="/"
//                         className="text-zinc-600 hover:text-black border-b-2 border-transparent  transition-all"
//                     >
//                         Home
//                     </Link>
//                 </Button>
//                 <div className="text-sm text-zinc-500">Build discipline daily</div>
//             </header>
//
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 max-w-6xl mx-auto">
//                 {/* Streaks */}
//                 <motion.section
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ duration: 0.3 }}
//                     className="border border-zinc-200 bg-white p-4 rounded-xl md:col-span-2"
//                 >
//                     <h2 className="text-lg font-medium mb-2">📆 Habit Streaks</h2>
//                     <p className="text-sm text-zinc-500 mb-4">
//                         Track how long you have been consistent with each habit.
//                     </p>
//                     <ul className="text-sm space-y-2">
//                         {habits.map(
//                             (
//                                 habit: {
//                                     name: string;
//                                     done: boolean;
//                                     streak: number;
//                                     lastMarked: string | null;
//                                     markedDates: string[];
//                                 },
//                                 index: number,
//                             ) => (
//                                 <li
//                                     key={index}
//                                     className="flex justify-between items-center bg-zinc-100 px-4 py-2 rounded border border-zinc-200"
//                                 >
//                                     <span>{habit.name}</span>
//                                     <span className="text-xs text-zinc-500">
//                                         🔥 {habit.streak || 0} days
//                                     </span>
//                                 </li>
//                             ),
//                         )}
//                     </ul>
//                 </motion.section>
//
//                 {/* Habits */}
//                 <motion.section
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ duration: 0.3 }}
//                     className="border border-zinc-200 bg-white p-4 rounded-xl"
//                 >
//                     <h2 className="text-lg font-medium mb-2">🔁 Daily Habits</h2>
//                     <Progress value={habitProgress} className="mb-2 h-2" />
//                     <div className="flex mb-4 gap-2">
//                         <Input
//                             placeholder="Add new habit..."
//                             value={newHabit}
//                             onChange={(e) => setNewHabit(e.target.value)}
//                             className="bg-zinc-100 border border-zinc-300"
//                         />
//                         <Button onClick={handleAddHabit}>Add</Button>
//                     </div>
//                     <ul className="space-y-2">
//                         {habits.map(
//                             (
//                                 habit: {
//                                     name: string;
//                                     done: boolean;
//                                     streak: number;
//                                     lastMarked: string | null;
//                                     markedDates: string[];
//                                 },
//                                 index: number,
//                             ) => (
//                                 <motion.li
//                                     key={index}
//                                     className="flex justify-between items-center bg-zinc-100 px-4 py-2 rounded border border-zinc-200"
//                                     whileHover={{ scale: 1.01 }}
//                                 >
//                                     <div className="flex items-center gap-2">
//                                         <input
//                                             type="checkbox"
//                                             checked={habit.done}
//                                             onChange={() => toggleHabit(index)}
//                                             className="h-4 w-4 cursor-pointer"
//                                         />
//                                         <span
//                                             className={`cursor-pointer ${habit.done ? "line-through text-zinc-400" : ""}`}
//                                         >
//                                             {habit.name}
//                                         </span>
//                                     </div>
//                                     <Button
//                                         size="sm"
//                                         variant="ghost"
//                                         className="text-red-500"
//                                         onClick={() => removeHabit(index)}
//                                     >
//                                         ✖
//                                     </Button>
//                                 </motion.li>
//                             ),
//                         )}
//                     </ul>
//                 </motion.section>
//
//                 {/* Goals */}
//                 <motion.section
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ duration: 0.3 }}
//                     className="border border-zinc-200 bg-white p-4 rounded-xl "
//                 >
//                     <h2 className="text-lg font-medium mb-2">🎯 Goals</h2>
//                     <div className="flex mb-4 gap-2">
//                         <Input
//                             placeholder="Add new goal..."
//                             value={newGoal}
//                             onChange={(e) => setNewGoal(e.target.value)}
//                             className="bg-zinc-100 border border-zinc-300"
//                         />
//                         <Button onClick={handleAddGoal}>Add</Button>
//                     </div>
//                     <ul className="text-sm list-disc pl-5 text-zinc-700 space-y-1">
//                         {goals.map((goal: string, index: number) => (
//                             <li key={index} className="flex justify-between items-center">
//                                 <span>{goal}</span>
//                                 <Button
//                                     variant="ghost"
//                                     size="sm"
//                                     onClick={() => handleRemoveGoal(index)}
//                                 >
//                                     ✖
//                                 </Button>
//                             </li>
//                         ))}
//                     </ul>
//                 </motion.section>
//                 {/* Books */}
//                 <motion.section
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ duration: 0.3 }}
//                     className="border border-zinc-200 bg-white p-4 col-span-2 rounded-xl"
//                 >
//                     <h2 className="text-lg font-medium mb-2">📚 Reading List</h2>
//                     <div className="flex mb-4 gap-2">
//                         <Input
//                             placeholder="Add new book..."
//                             value={newBook}
//                             onChange={(e) => setNewBook(e.target.value)}
//                             className="bg-zinc-100 border border-zinc-300"
//                         />
//                         <Button onClick={handleAddBook}>Add</Button>
//                     </div>
//                     <ul className="text-sm list-disc pl-5 text-zinc-700 space-y-1">
//                         {books.map((book: string, index: number) => (
//                             <li key={index} className="flex justify-between items-center">
//                                 <span>{book}</span>
//                                 <Button
//                                     variant="ghost"
//                                     size="sm"
//                                     onClick={() => handleRemoveBook(index)}
//                                 >
//                                     ✖
//                                 </Button>
//                             </li>
//                         ))}
//                     </ul>
//                 </motion.section>
//
//                 {/* Reflections */}
//                 {/* (See previous response for full block code) */}
//                 {/** INSERT FIXED REFLECTIONS SECTION HERE **/}
//                 <motion.section
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ duration: 0.3 }}
//                     className="border border-zinc-200 bg-white p-4 rounded-xl md:col-span-2"
//                 >
//                     <h2 className="text-lg font-medium mb-2">🧘‍♂️ Meditation & Reflection</h2>
//                     <div className="flex mb-4 gap-2">
//                         <Textarea
//                             value={newReflection}
//                             onChange={(e) => setNewReflection(e.target.value)}
//                             placeholder="Write a reflection..."
//                             className="w-full max-w-3xl bg-zinc-100 border border-zinc-300 rounded p-2 text-sm"
//                         />
//                         <Button
//                             onClick={() => {
//                                 const trimmed = newReflection.trim();
//                                 if (trimmed) {
//                                     setReflections((prev: []) => [...prev, trimmed]);
//                                     setNewReflection("");
//                                 }
//                             }}
//                         >
//                             Add
//                         </Button>
//                     </div>
//                     <div className="max-h-64 overflow-y-auto space-y-2 pr-1">
//                         {reflections.map((entry: string, index: number) => (
//                             <li
//                                 key={index}
//                                 className="flex justify-between items-start bg-zinc-100 px-4 py-2 rounded border border-zinc-200 text-sm gap-2"
//                             >
//                                 {editingReflectionIndex === index ? (
//                                     <div className="flex flex-col w-full gap-1">
//                                         <Textarea
//                                             value={editingReflectionValue}
//                                             onChange={(e) =>
//                                                 setEditingReflectionValue(e.target.value)
//                                             }
//                                             className="w-full bg-white border border-zinc-300 rounded text-sm"
//                                             rows={3}
//                                         />
//                                         <div className="flex gap-2">
//                                             <Button
//                                                 size="sm"
//                                                 onClick={() => {
//                                                     const updated = [...reflections];
//                                                     updated[index] = editingReflectionValue.trim();
//                                                     setReflections(updated);
//                                                     setEditingReflectionIndex(null);
//                                                     setEditingReflectionValue("");
//                                                 }}
//                                             >
//                                                 Save
//                                             </Button>
//                                             <Button
//                                                 size="sm"
//                                                 variant="ghost"
//                                                 onClick={() => {
//                                                     setEditingReflectionIndex(null);
//                                                     setEditingReflectionValue("");
//                                                 }}
//                                             >
//                                                 Cancel
//                                             </Button>
//                                         </div>
//                                     </div>
//                                 ) : (
//                                     <>
//                                         <span className="flex-1">{entry}</span>
//                                         <div className="flex gap-2">
//                                             <Button
//                                                 variant="ghost"
//                                                 size="sm"
//                                                 onClick={() => {
//                                                     setEditingReflectionIndex(index);
//                                                     setEditingReflectionValue(entry);
//                                                 }}
//                                             >
//                                                 ✎
//                                             </Button>
//                                             <Button
//                                                 variant="ghost"
//                                                 size="sm"
//                                                 className="text-red-500"
//                                                 onClick={() => {
//                                                     setReflections((prev: []) =>
//                                                         prev.filter((_, i) => i !== index),
//                                                     );
//                                                 }}
//                                             >
//                                                 ✖
//                                             </Button>
//                                         </div>
//                                     </>
//                                 )}
//                             </li>
//                         ))}
//                     </div>
//                 </motion.section>
//
//                 {/* Vault */}
//                 {/* (See previous response for full block code) */}
//                 {/** INSERT FIXED VAULT SECTION HERE **/}
//                 <motion.section
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ duration: 0.3 }}
//                     className="border border-zinc-200 bg-white p-4 rounded-xl md:col-span-2"
//                 >
//                     <h2 className="text-lg font-medium mb-2">🧠 Knowledge Vault</h2>
//                     <div className="flex mb-4 gap-2">
//                         <Textarea
//                             value={newVaultItem}
//                             onChange={(e) => setNewVaultItem(e.target.value)}
//                             placeholder="Quick note or model..."
//                             className="w-full max-w-3xl bg-zinc-100 border border-zinc-300 rounded p-2 text-sm"
//                         />
//                         <Button
//                             onClick={() => {
//                                 const trimmed = newVaultItem.trim();
//                                 if (trimmed) {
//                                     setVaultItems((prev: []) => [...prev, trimmed]);
//                                     setNewVaultItem("");
//                                 }
//                             }}
//                         >
//                             Add
//                         </Button>
//                     </div>
//                     <div className="max-h-64 overflow-y-auto space-y-2 pr-1">
//                         {vaultItems.map((entry: string, index: number) => (
//                             <li
//                                 key={index}
//                                 className="flex justify-between items-start bg-zinc-100 px-4 py-2 rounded border border-zinc-200 text-sm gap-2"
//                             >
//                                 {editingVaultIndex === index ? (
//                                     <div className="flex flex-col w-full gap-1">
//                                         <Textarea
//                                             value={editingVaultValue}
//                                             onChange={(e) => setEditingVaultValue(e.target.value)}
//                                             className="w-full bg-white border border-zinc-300 rounded text-sm"
//                                             rows={3}
//                                         />
//                                         <div className="flex gap-2">
//                                             <Button
//                                                 size="sm"
//                                                 onClick={() => {
//                                                     const updated = [...vaultItems];
//                                                     updated[index] = editingVaultValue.trim();
//                                                     setVaultItems(updated);
//                                                     setEditingVaultIndex(null);
//                                                     setEditingVaultValue("");
//                                                 }}
//                                             >
//                                                 Save
//                                             </Button>
//                                             <Button
//                                                 size="sm"
//                                                 variant="ghost"
//                                                 onClick={() => {
//                                                     setEditingVaultIndex(null);
//                                                     setEditingVaultValue("");
//                                                 }}
//                                             >
//                                                 Cancel
//                                             </Button>
//                                         </div>
//                                     </div>
//                                 ) : (
//                                     <>
//                                         <span className="flex-1">{entry}</span>
//                                         <div className="flex gap-2">
//                                             <Button
//                                                 variant="ghost"
//                                                 size="sm"
//                                                 onClick={() => {
//                                                     setEditingVaultIndex(index);
//                                                     setEditingVaultValue(entry);
//                                                 }}
//                                             >
//                                                 ✎
//                                             </Button>
//                                             <Button
//                                                 variant="ghost"
//                                                 size="sm"
//                                                 className="text-red-500"
//                                                 onClick={() => {
//                                                     setVaultItems((prev: []) =>
//                                                         prev.filter((_, i) => i !== index),
//                                                     );
//                                                 }}
//                                             >
//                                                 ✖
//                                             </Button>
//                                         </div>
//                                     </>
//                                 )}
//                             </li>
//                         ))}
//                     </div>
//                 </motion.section>
//
//                 {/* Heatmap */}
//                 <motion.section
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ duration: 0.3 }}
//                     className="border border-zinc-200 bg-white p-4 rounded-xl md:col-span-2 mb-6"
//                 >
//                     <h2 className="text-lg font-medium mb-2">📊 Habit Heatmap</h2>
//                     <p className="text-sm text-zinc-500 mb-4">
//                         See how consistently you have completed habits this week.
//                     </p>
//                     <div className="grid grid-cols-7 gap-2 text-center">
//                         {[...Array(30)].map((_, i) => {
//                             const date = new Date(Date.now() - (29 - i) * 86400000);
//                             const dateStr = date.toLocaleDateString();
//                             const completed = habits.filter(
//                                 (h: {
//                                     name: string;
//                                     done: boolean;
//                                     streak: number;
//                                     lastMarked: string | null;
//                                     markedDates: string[];
//                                 }) => (h.markedDates || []).includes(dateStr),
//                             ).length;
//                             const intensity = completed / habits.length;
//                             const bg =
//                                 intensity > 0.66
//                                     ? "bg-green-500"
//                                     : intensity > 0.33
//                                       ? "bg-yellow-400"
//                                       : intensity > 0
//                                         ? "bg-red-400"
//                                         : "bg-zinc-200";
//                             const label = date.toLocaleDateString("en-US", { day: "numeric" });
//                             return (
//                                 <div
//                                     key={i}
//                                     onClick={() => {
//                                         setHabits(
//                                             (
//                                                 prev: [
//                                                     {
//                                                         name: string;
//                                                         done: boolean;
//                                                         streak: number;
//                                                         lastMarked: string | null;
//                                                         markedDates: string[];
//                                                     },
//                                                 ],
//                                             ) =>
//                                                 prev.map(
//                                                     (h: {
//                                                         name: string;
//                                                         done: boolean;
//                                                         streak: number;
//                                                         lastMarked: string | null;
//                                                         markedDates: string[];
//                                                     }) => {
//                                                         const markedDates = h.markedDates || [];
//                                                         const hasDate =
//                                                             markedDates.includes(dateStr);
//                                                         return {
//                                                             ...h,
//                                                             markedDates: hasDate
//                                                                 ? markedDates.filter(
//                                                                       (d) => d !== dateStr,
//                                                                   )
//                                                                 : [...markedDates, dateStr],
//                                                         };
//                                                     },
//                                                 ),
//                                         );
//                                     }}
//                                     className={`h-10 w-10 rounded ${bg} flex items-center justify-center text-xs text-white cursor-pointer`}
//                                     title={`${dateStr}: ${completed}/${habits.length} completed`}
//                                 >
//                                     {label}
//                                 </div>
//                             );
//                         })}
//                     </div>
//                 </motion.section>
//             </div>
//         </main>
//     );
// }
