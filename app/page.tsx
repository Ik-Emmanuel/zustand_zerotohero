"use client";
import { Button } from "@/components/ui/button";
import { useStore } from "@/store/store";
import { create } from "zustand";

export default function Home() {
  // different way to use store
  // 1. get the whole store
  const store = useStore();

  // 2. destructuring what you need form the store
  const { age, fullName, userName, address } = useStore((state) => ({
    age: state.age,
    fullName: state.fullName,
    userName: state.userName,
    address: state.address,
  }));

  return (
    <main>
      <div className="h-full w-full mx-auto my-auto flex flex-col gap-4 justify-center items-center">
        <p>
          {" "}
          {`User's`} address : {store.address}
        </p>
        <p> Address : {address}</p>

        <p> User : {userName}</p>
        <p> Full Name : {fullName}</p>
        <p> Age : {age}</p>
      </div>
    </main>
  );
}
