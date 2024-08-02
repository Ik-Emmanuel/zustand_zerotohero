"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { PRODUCTS_DATA } from "@/data/mockData";
import { useStore } from "@/store/store";
import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";
import { ShoppingCart } from "lucide-react";
import ChangeQtyBtns from "@/components/ChangeQtyBtns";
import Cart from "@/components/Cart";
import Profile from "@/components/Profile";

export default function Home() {
  const addProduct = useStore((state) => state.addProduct);
  const cartProducts = useStore((state) => state.products);

  return (
    <main className="space-y-2  mx-auto mt-8 max-w-[80%] text-white">
      <div>
        <div>
          <h1 className="text-2xl font-semibold text-cyan-300">
            Venex Store Products
          </h1>
          <p className="text-slate-400 text-xs">
            Showing the full power of global state management for an Ecommerce
            application
          </p>
        </div>

        <div className="flex justify-between items-center mt-6 mb-0">
          <Profile />
          <Cart />
        </div>

        <div
          className="
          grid grid-cols-1 lg:grid-cols-3 gap-4 mt-2"
        >
          {PRODUCTS_DATA.map((product) => (
            <Card key={product.id}>
              <CardHeader className="text-cyan-500">
                {" "}
                {product.title}
              </CardHeader>
              <CardContent>
                <p className="text-slate-400 text-sm">{product.description}</p>
                <p className="text-cyan-300 font-semibold">£ {product.price}</p>
              </CardContent>
              <CardFooter>
                {cartProducts.find((p) => p.id === product.id) ? (
                  <ChangeQtyBtns productId={product.id} />
                ) : (
                  <Button
                    onClick={() => addProduct(product)}
                    variant={"default"}
                    className=" group px-2 py-2 flex gap-2 items-center bg-slate-800 text-white hover:bg-cyan-500 hover:text-slate-900"
                  >
                    <ShoppingCart className="h-4 w-4 text-cyan-400 group-hover:text-white" />{" "}
                    <span>Add item to cart</span>
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
