"use client";
import { Button } from "@/components/ui/button";
// import useWeb3Auth from "../hooks/useWeb3Auth";
import { useCivicAuth } from "../contexts/CivicAuthContext";

export default function Logout() {
  // const { isLoggedIn, logout } = useWeb3Auth();
  const { isLoggedIn, logout } = useCivicAuth();

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
