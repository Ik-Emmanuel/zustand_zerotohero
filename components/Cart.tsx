import { CircleX, ShoppingCart, Trash } from "lucide-react";
import { Button } from "./ui/button";
import { Popover, PopoverTrigger } from "./ui/popover";
import { PopoverContent } from "@radix-ui/react-popover";
import { useStore } from "@/store/store";
import { useShallow } from "zustand/react/shallow";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import ChangeQtyBtns from "./ChangeQtyBtns";

const Cart = () => {
  const { reset, cartProducts, removeProduct, total, address } = useStore(
    useShallow((state) => ({
      reset: state.reset,
      cartProducts: state.products,
      removeProduct: state.removeProduct,
      total: state.total,
      address: state.address,
    }))
  );

  return (
    <Popover>
      <PopoverTrigger asChild className="relative">
        <Button variant={"secondary"}>
          <ShoppingCart className="h-5 w-5" size={"icon"} />
        </Button>
      </PopoverTrigger>

      <PopoverContent className=" absolute top-0 right-[10px] overflow-y-auto space-y-2 w-96  bg-slate-800 px-6 py-6 rounded-md ring-2 ring-cyan-200">
        <div className="flex gap-4 text-lg items-center">
          <h1>Cart</h1>

          {cartProducts.length > 0 ? (
            <Button
              onClick={reset}
              variant={"destructive"}
              className="flex gap-2 px-4 py-2"
            >
              {" "}
              <span> Delete all items </span>{" "}
              <CircleX className="h-5 w-5" size={"icon"} />{" "}
            </Button>
          ) : (
            <span className="text-slate-400 text-sm">Your cart is empty</span>
          )}
        </div>

        <div className="space-y-2">
          {cartProducts.map((product) => (
            <Card className="flex flex-col" key={product.id}>
              <CardHeader className="text-cyan-500 flex flex-row  justify-between items-center gap-2">
                <CardTitle className="text-[16px]">{product.title}</CardTitle>
                <Button
                  variant={"destructive"}
                  onClick={() => removeProduct(product.id)}
                  size={"icon"}
                  className="px-1 py-2"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </CardHeader>

              <CardContent>
                <p className="text-slate-400 text-sm">
                  Item Price: {product.price}
                </p>
              </CardContent>

              <CardFooter>
                <ChangeQtyBtns productId={product.id} />
              </CardFooter>
            </Card>
          ))}
        </div>
        <hr />

        {cartProducts.length > 0 ? (
          <>
            <p>
              Total:{" "}
              <span className="font-bold text-cyan-300"> £ {total} </span>
            </p>
            <p className=" text-slate-400 text-sm">
              Shipping Address: {address}
            </p>
          </>
        ) : (
          <></>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default Cart;
