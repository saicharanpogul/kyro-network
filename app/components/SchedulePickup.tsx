"use client";
import { Button } from "@/components/ui/button";
import useWeb3Auth from "../hooks/useWeb3Auth";

export default function SchedulePickup() {
  const { isLoggedIn, login } = useWeb3Auth();

  const unloggedInView = (
    <Button
      className="w-full bg-primary-foreground text-black hover:bg-black hover:text-primary-foreground"
      onClick={login}
    >
      Login
    </Button>
  );
  const loggedInView = (
    <Button
      size={"sm"}
      className="w-full py-4 rounded-sm bg-primary-foreground text-black hover:bg-black hover:text-primary-foreground"
    >
      Schedule Pickup
    </Button>
  );
  return (
    <div>
      <div>{isLoggedIn ? loggedInView : unloggedInView}</div>
    </div>
  );
}
