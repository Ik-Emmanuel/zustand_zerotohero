// will be used to store user information

import { StateCreator } from "zustand";

type User = {
    userName: string;
    fullName: string;
    age: number;
    address: string;
}

type UserActions = {
    setAddress: (address: string) => void;
    fetchUser: () => Promise<void>;
}

export type UserSlice = User & UserActions;


export const createUserSlice: StateCreator<UserSlice, [["zustand/immer", never]], [], UserSlice> = (set) => ({
    address: '',
    age: 0,
    fullName: '',
    userName: '',
    //  update store in an immuatable way
    // setAddress: (address) => set((state) => ({...state, address})),

    // or better typed, to do same thing above, because set() does state immutable update
    // for simple state
    // setAddress: (address) => set(() => ({ address })),

    //becasue  using immer middleware (handling complex nested states)
    setAddress: (address) => set((state) => {
        state.address = address
        // update other states here as well when address changes if needed

    }),
    fetchUser: async () => {
        // perform async operation to fetch data and then set data 
        await new Promise((resolve) => setTimeout(resolve, 1000));
        set({
            address: '',
            fullName: 'Joh Doe',
            userName: 'JohDoe@test.com',
            age: 32,
        });
    },
})