"use client";
import { Button } from "@/components/ui/button";
import { useStore } from "@/store/store";
import { create } from "zustand";

export default function Home() {
  const store = useStore();
  return (
    <main>
      <div className="h-full w-full mx-auto my-auto flex flex-col gap-4 justify-center items-center">
        <p> {JSON.stringify(store)}</p>
      </div>
    </main>
  );
}
