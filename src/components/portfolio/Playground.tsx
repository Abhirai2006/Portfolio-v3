import { useState } from "react";
import { MnistDemo } from "./playground/Mnist";
import { SortingDemo } from "./playground/Sorting";
import { BinarySearchDemo } from "./playground/BinarySearch";
import { KMeansDemo } from "./playground/KMeans";

const TABS = [
  { id: "mnist", label: "MNIST · Draw a digit", el: <MnistDemo /> },
  { id: "sort", label: "Sorting · Bubble", el: <SortingDemo /> },
  { id: "bs", label: "Binary Search", el: <BinarySearchDemo /> },
  { id: "km", label: "K-Means (2D)", el: <KMeansDemo /> },
];

export function Playground() {
  const [tab, setTab] = useState("mnist");
  const active = TABS.find((t) => t.id === tab)!;
  return (
    <div className="rounded-2xl border border-border bg-card/50 backdrop-blur overflow-hidden">
      <div className="flex flex-wrap border-b border-border">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-3 text-xs font-mono uppercase tracking-widest transition-colors border-r border-border ${
              t.id === tab
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-primary"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="p-6">{active.el}</div>
    </div>
  );
}