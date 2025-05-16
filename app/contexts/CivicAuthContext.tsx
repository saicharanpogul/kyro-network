/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useUser } from "@civic/auth/react";
import { useWallet } from "@civic/auth-web3/react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { User } from "@civic/auth";

interface CivicContextProps {
  isLoggedIn: boolean;
  isAuthenticated: boolean;
  user: {
    address: string;
    user: User;
  } | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  authenticateUser: () => Promise<void>;
  getUserInfo: () => Promise<void>;
  getAccounts: () => void;
  getBalance: () => void;
  sendTransaction: () => Promise<void>;
  sendVersionTransaction: () => Promise<void>;
  signVersionedTransaction: () => Promise<void>;
  signAllVersionedTransaction: () => Promise<void>;
  signAllTransaction: () => Promise<void>;
  signMessage: () => Promise<void>;
  getPrivateKey: () => Promise<void>;
}

export const CivicAuthContext = createContext<CivicContextProps | null>(null);

export const CivicAuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user: civicUser, signIn, signOut, idToken, isLoading } = useUser();
  const { wallet } = useWallet({ type: "solana" });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{
    address: string;
    user: any;
  } | null>(null);

  const createUserMutation = useMutation(api.users.createUser);

  useEffect(() => {
    // if (!isLoading && civicUser && wallet?.connected) {
    if (!isLoading && civicUser) {
      const address = wallet?.publicKey?.toBase58() || "";
      const userData = {
        address,
        user: civicUser,
      };
      setUser(userData);
      setIsAuthenticated(true);
      setIsLoggedIn(true);
      createUserMutation({
        address,
        email: civicUser.email,
        name: civicUser.name,
        profile: civicUser.picture,
      });
    }
  }, [civicUser, isLoading]);

  const login = useCallback(async () => {
    signIn()
      .then(async () => {
        await wallet?.connect();
        console.log("Sign-in completed successfully");
      })
      .catch((error) => {
        console.error("Sign-in failed:", error);
      });
  }, [signIn]);

  const logout = async () => {
    await signOut();
    setIsLoggedIn(false);
    setIsAuthenticated(false);
    setUser(null);
  };

  const authenticateUser = async () => {
    if (idToken) {
      setIsAuthenticated(true);
    }
  };

  const getUserInfo = async () => {
    uiConsole(civicUser);
  };

  const getAccounts = () => {
    uiConsole(wallet);
  };

  const getBalance = async () => {
    // Not supported by Civic
    // Placeholder
    uiConsole("getBalance not supported by Civic");
  };

  const sendTransaction = async () => {
    // Not supported by Civic
    uiConsole("sendTransaction not supported by Civic");
  };

  const sendVersionTransaction = async () => {
    // Not supported by Civic
    uiConsole("sendVersionTransaction not supported by Civic");
  };

  const signVersionedTransaction = async () => {
    // Not supported by Civic
    uiConsole("signVersionedTransaction not supported by Civic");
  };

  const signAllVersionedTransaction = async () => {
    // Not supported by Civic
    uiConsole("signAllVersionedTransaction not supported by Civic");
  };

  const signAllTransaction = async () => {
    // Not supported by Civic
    uiConsole("signAllTransaction not supported by Civic");
  };

  const signMessage = async () => {
    // Not supported by Civic
    uiConsole("signMessage not supported by Civic");
  };

  const getPrivateKey = async () => {
    // Not supported by Civic
    uiConsole("getPrivateKey not supported by Civic");
  };

  function uiConsole(...args: any[]): void {
    const el = document.querySelector("#console>p");
    if (el) {
      el.innerHTML = JSON.stringify(args || {}, null, 2);
    }
  }

  return (
    <CivicAuthContext.Provider
      value={{
        isLoggedIn,
        isAuthenticated,
        user,
        login,
        logout,
        authenticateUser,
        getUserInfo,
        getAccounts,
        getBalance,
        sendTransaction,
        sendVersionTransaction,
        signVersionedTransaction,
        signAllVersionedTransaction,
        signAllTransaction,
        signMessage,
        getPrivateKey,
      }}
    >
      {children}
    </CivicAuthContext.Provider>
  );
};

export const useCivicAuth = () => {
  const ctx = useContext(CivicAuthContext);
  if (!ctx)
    throw new Error("useCivicAuth must be used within CivicAuthProvider");
  return ctx;
};
