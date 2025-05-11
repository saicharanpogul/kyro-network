import { useContext } from "react";
import { Web3AuthContext } from "../contexts/Web3AuthContext";

const useWeb3Auth = () => {
  const ctx = useContext(Web3AuthContext);
  if (!ctx) throw new Error("useWeb3Auth must be used within Web3AuthProvider");
  return ctx;
};

export default useWeb3Auth;
