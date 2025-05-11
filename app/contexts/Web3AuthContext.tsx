/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Web3Auth } from "@web3auth/modal";
import { SolanaPrivateKeyProvider } from "@web3auth/solana-provider";
import {
  getSolanaChainConfig,
  IProvider,
  WEB3AUTH_NETWORK,
  WALLET_ADAPTERS,
  ADAPTER_STATUS,
  IAdapter,
  UserInfo,
} from "@web3auth/base";
import { getDefaultExternalAdapters } from "@web3auth/default-solana-adapter";
import RPC from "@/lib/solanaRPC";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

const clientId = process.env.NEXT_PUBLIC_CLIENT_ID || "";

interface Web3AuthContextProps {
  isLoggedIn: boolean;
  isAuthenticated: boolean;
  user: {
    address: string;
    user: Partial<UserInfo>;
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

export const Web3AuthContext = createContext<Web3AuthContextProps | null>(null);

export const Web3AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{
    address: string;
    user: Partial<UserInfo>;
  } | null>(null);

  // Get custom chain configs for your chain from https://web3auth.io/docs/connect-blockchain
  const chainConfig = getSolanaChainConfig(0x3)!;

  const createUserMutation = useMutation(api.users.createUser);

  useEffect(() => {
    const init = async () => {
      try {
        const solanaPrivateKeyPrvoider = new SolanaPrivateKeyProvider({
          config: { chainConfig: chainConfig },
        });

        const web3auth = new Web3Auth({
          clientId,
          // uiConfig refers to the whitelabeling options, which is available only on Growth Plan and above
          // Please remove this parameter if you're on the Base Plan
          uiConfig: {
            appName: "Kyro",
            mode: "light",
            loginMethodsOrder: ["google", "twitter", "apple"],
            logoLight: "https://web3auth.io/images/web3authlog.png",
            logoDark: "https://web3auth.io/images/web3authlogodark.png",
            defaultLanguage: "en", // en, de, ja, ko, zh, es, fr, pt, nl
            loginGridCol: 3,
            primaryButton: "socialLogin", // "externalLogin" | "socialLogin" | "emailLogin"
            uxMode: "redirect",
          },
          web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
          privateKeyProvider: solanaPrivateKeyPrvoider,
          // enableLogging: true,
        });

        // Setup external adapters
        const adapters = getDefaultExternalAdapters({
          options: {
            clientId,
            chainConfig,
          },
        });
        adapters.forEach((adapter: IAdapter<any>) => {
          web3auth.configureAdapter(adapter);
        });

        setWeb3auth(web3auth);

        await web3auth.initModal({
          modalConfig: {
            [WALLET_ADAPTERS.AUTH]: {
              label: "auth",
              loginMethods: {
                facebook: {
                  name: "facebook",
                  showOnModal: false,
                },
                reddit: {
                  name: "reddit",
                  showOnModal: false,
                },
                twitch: {
                  name: "twitch",
                  showOnModal: false,
                },
                line: {
                  name: "line",
                  showOnModal: false,
                },
                github: {
                  name: "github",
                  showOnModal: false,
                },
                linkedin: {
                  name: "linkedin",
                  showOnModal: false,
                },
                kakao: {
                  name: "kakao",
                  showOnModal: false,
                },
                wechat: {
                  name: "wechat",
                  showOnModal: false,
                },
                weibo: {
                  name: "weibo",
                  showOnModal: false,
                },
                farcaster: {
                  name: "farcaster",
                  showOnModal: false,
                },
                google: {
                  name: "google",
                  showOnModal: true,
                },
                twitter: {
                  name: "twitter",
                  showOnModal: true,
                },
                apple: {
                  name: "apple",
                  showOnModal: true,
                },
                discord: {
                  name: "discord",
                  showOnModal: true,
                },
                email_passwordless: {
                  name: "email-passwordless",
                  showOnModal: false,
                },
                sms_passwordless: {
                  name: "sms-passwordless",
                  showOnModal: false,
                },
              },
              showOnModal: true,
            },
          },
        });
        setProvider(web3auth.provider);

        if (web3auth.connected && web3auth.provider) {
          setIsLoggedIn(true);
          const rpc = new RPC(web3auth.provider);
          const address = await rpc.getAccounts();
          const user = await web3auth.getUserInfo();
          setUser({
            address: address[0],
            user,
          });
          if (user.idToken) {
            setIsAuthenticated(true);
            createUserMutation({
              address: address[0],
              email: user.email,
              name: user.name,
              profile: user.profileImage,
            });
          }
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        // console.error(error);
      }
    };

    if (isInitialized) return;
    setIsInitialized(true);
    init();
  }, [isInitialized]);

  const login = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    if (web3auth.status !== ADAPTER_STATUS.READY) {
      console.log("web3auth status not ready");
      return;
    }
    const web3authProvider = await web3auth.connect();
    if (web3auth.connected) {
      setIsLoggedIn(true);
    }
    setProvider(web3authProvider);
  };

  const authenticateUser = async () => {
    if (!web3auth) {
      uiConsole("web3auth not initialized yet");
      return;
    }
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const idToken = await web3auth.authenticateUser();
    uiConsole(idToken);
    if (idToken) {
      setIsAuthenticated(true);
      const rpc = new RPC(provider);
      const address = await rpc.getAccounts();
      const user = await web3auth.getUserInfo();
      setUser({
        address: address[0],
        user,
      });
      createUserMutation({
        address: address[0],
        email: user.email,
        name: user.name,
        profile: user.profileImage,
      });
    }
  };

  const getUserInfo = async () => {
    if (!web3auth) {
      uiConsole("web3auth not initialized yet");
      return;
    }
    const user = await web3auth.getUserInfo();
    uiConsole(user);
  };

  const logout = async () => {
    if (!web3auth) {
      uiConsole("web3auth not initialized yet");
      return;
    }
    await web3auth.logout();
    web3auth.clearCache();
    setProvider(null);
    setIsLoggedIn(false);
    setIsAuthenticated(false);
  };

  const getAccounts = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const address = await rpc.getAccounts();
    uiConsole(address);
  };

  const getBalance = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const balance = await rpc.getBalance();
    uiConsole(balance);
  };

  const sendTransaction = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const receipt = await rpc.sendTransaction();
    uiConsole(receipt);
  };

  const sendVersionTransaction = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const receipt = await rpc.sendVersionTransaction();
    uiConsole(receipt);
  };

  const signVersionedTransaction = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const receipt = await rpc.signVersionedTransaction();
    uiConsole(receipt);
  };

  const signAllVersionedTransaction = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const receipt = await rpc.signAllVersionedTransaction();
    uiConsole(receipt);
  };

  const signAllTransaction = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const receipt = await rpc.signAllTransaction();
    uiConsole(receipt);
  };

  const signMessage = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const signedMessage = await rpc.signMessage();
    uiConsole(signedMessage);
  };

  const getPrivateKey = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const privateKey = await rpc.getPrivateKey();
    uiConsole(privateKey);
  };

  function uiConsole(...args: any[]): void {
    const el = document.querySelector("#console>p");
    if (el) {
      el.innerHTML = JSON.stringify(args || {}, null, 2);
    }
  }

  return (
    <Web3AuthContext.Provider
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
    </Web3AuthContext.Provider>
  );
};

export const useWeb3Auth = () => {
  const ctx = useContext(Web3AuthContext);
  if (!ctx) throw new Error("useWeb3Auth must be used within Web3AuthProvider");
  return ctx;
};
