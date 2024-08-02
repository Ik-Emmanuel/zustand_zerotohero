import { CircleX, Trash, User } from "lucide-react";
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
import { useEffect } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

const Profile = () => {
  const { setAddress, address, fullName, userName, fetchUser } = useStore(
    useShallow((state) => ({
      fullName: state.fullName,
      userName: state.userName,
      address: state.address,
      setAddress: state.setAddress,
      fetchUser: state.fetchUser,
    }))
  );

  useEffect(() => {
    // use this to fetch data from db to be set to state. fetch function is from store
    async function fetchData() {
      await fetchUser();
    }

    fetchData();
  }, [fetchUser]);

  return (
    <Popover>
      <PopoverTrigger asChild className="relative">
        <Button variant={"secondary"}>
          <User className="h-5 w-5" size={"icon"} />
        </Button>
      </PopoverTrigger>

      <PopoverContent className=" absolute top-0 left-[10px] overflow-y-auto space-y-2 w-96  bg-slate-800 px-6 py-6 rounded-md ring-2 ring-cyan-200">
        <div className="flex items-center gap-2">
          <p>{fullName}</p>
          <p className="text-sm">{userName}</p>
        </div>
        <Label htmlFor="address">Your Address:</Label>
        <Input
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </PopoverContent>
    </Popover>
  );
};

export default Profile;
