"use client";
import { Button } from "@/components/ui/button";
import useWeb3Auth from "../hooks/useWeb3Auth";

export default function Logout() {
  const { isLoggedIn, logout } = useWeb3Auth();

  const loggedInView = (
    <Button onClick={logout} size={"sm"} className="w-full py-4">
      Log Out
    </Button>
  );
  return (
    <div>
      <div>{isLoggedIn ? loggedInView : null}</div>
    </div>
  );
}
