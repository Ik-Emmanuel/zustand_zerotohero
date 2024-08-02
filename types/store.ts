import { CartSlice } from "@/store/cart-slice";
import { UserSlice } from "@/store/user-slice";

// import all your slices here  joing with "&" e.g  export type Store = UserSlice & CartSlisce & OrderSlice ...;
export type Store = UserSlice & CartSlice
