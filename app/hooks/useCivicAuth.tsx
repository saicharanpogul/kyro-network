import { useContext } from "react";
import { CivicAuthContext } from "../contexts/CivicAuthContext";

const useCivicAuth = () => {
  const ctx = useContext(CivicAuthContext);
  if (!ctx)
    throw new Error("useCivicAuth must be used within CivicAuthProvider");
  return ctx;
};

export default useCivicAuth;
