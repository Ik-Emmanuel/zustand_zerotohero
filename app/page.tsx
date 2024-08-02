"use client";
import { Button } from "@/components/ui/button";
import { useStore } from "@/store/store";
import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";

export default function Home() {
  // different way to use store
  // 1. get the whole store
  const store = useStore();

  // // 2. destructuring what you need form the store
  // const { age, fullName, userName, address } = useStore((state) => ({
  //   age: state.age,
  //   fullName: state.fullName,
  //   userName: state.userName,
  //   address: state.address,
  // }));

  // 3. most optimised version
  //  allows you quickly get what you need from the store
  const { age, fullName, userName, address } = useStore(
    useShallow((state) => ({
      age: state.age,
      fullName: state.fullName,
      userName: state.userName,
      address: state.address,
    }))
  );

  // another way to pick what is needed from the store causing less component rerendering (for just single item selection from store)
  const userAddress = useStore((state) => state.address);

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
