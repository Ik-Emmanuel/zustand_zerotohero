"use client";

import { useStore } from "@/store/store";
import { useShallow } from "zustand/react/shallow";
import { Button } from "./ui/button";
import { Minus, Plus } from "lucide-react";
import { useEffect } from "react";
import { CartProduct } from "@/types/cart";
import { Product } from "@/types/products";

type ChangeQtyBtnsProps = {
  productId: string;
};

const ChangeQtyBtns = ({ productId }: ChangeQtyBtnsProps) => {
  const { getProductById, decQty, incQty, setTotal } = useStore(
    useShallow((state) => ({
      getProductById: state.getProductById,
      decQty: state.decreaseQuantity,
      incQty: state.increaseQuantity,
      setTotal: state.setTotal,
    }))
  );
  const product = getProductById(productId);

  useEffect(() => {
    // run side effects if state of product changes
    const unSub = useStore.subscribe(
      (state) => state.products,
      //@ts-ignore
      (products) => {
        const newTotal = products.reduce(
          // add types
          (acc: number, item: CartProduct) => acc + item.price * item.quantity,
          0
        );

        setTotal(newTotal);
      },
      // ensure that the effect runs immediately change is observed
      { fireImmediately: true }
    );
    // unsubscribe from the react lifecycle when component unmounts
    return unSub;
  }, [setTotal]);

  return (
    <div>
      {product && (
        <div className="flex gap-2 items-center">
          <Button
            onClick={() => decQty(product.id)}
            className=" bg-slate-800 text-white hover:bg-cyan-500 hover:text-slate-900"
            size={"sm"}
          >
            <Minus className="h-4 w-4 font-bold" />
          </Button>
          <p>{product.quantity}</p>
          <Button
            onClick={() => incQty(product.id)}
            className=" bg-slate-800 text-white hover:bg-cyan-500 hover:text-slate-900"
            size={"sm"}
          >
            <Plus className="h-4 w-4 font-bold" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default ChangeQtyBtns;
