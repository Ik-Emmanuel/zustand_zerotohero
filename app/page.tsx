"use client";
import { Button } from "@/components/ui/button";
import { create } from "zustand";

const useStore = create<{
  count: number;
  increment: () => void;
  decrement: () => void;
}>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));

const Counter = () => {
  const store = useStore();
  return <> {store.count}</>;
};

export default function Home() {
  const store = useStore();

  return (
    <main>
      <div className="h-full w-full mx-auto my-auto flex flex-col gap-4 justify-center items-center">
        <div className="mt-4">
          Current set state count = <Counter />
        </div>
        <div className="flex gap-4">
          <Button onClick={store.increment}>+ Increase </Button>
          <Button onClick={store.decrement}>- decrease </Button>
        </div>
      </div>
    </main>
  );
}
