//Main application store 
// here  we merge all the slices we will create in our application and use them in your application. essentially creating a singluar store for all slices rather than using the slices directly themselves

import { Store } from "@/types/store";
import { create } from "zustand";
import { createUserSlice } from "@/store/user-slice";
import { immer } from "zustand/middleware/immer";
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware';
import { createCartSlice } from "./cart-slice";

//...a = setter and getter utility that zustand create function provides 
// immer is a middle ware from zustand that is used for handling complex nested state
//@ts-ignore
export const useStore = create<Store>()(
    // persist is use to cache the data in session
    // @ts-ignore
    persist(subscribeWithSelector(
        // @ts-ignore
        immer((...a) => ({
            ...createUserSlice(...a),
            ...createCartSlice(...a),
        }))
    )
        ,
        { name: 'local-store' }
    )
)