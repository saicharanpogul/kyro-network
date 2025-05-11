"use client";

import Image from "next/image";
import Link from "next/link";
import ActivityList from "../components/ActivityList";
import ReGenCard from "../components/ReGenCard";
import RewardList from "../components/RewardList";
import SchedulePickup from "../components/SchedulePickup";
// import useWeb3Auth from "../hooks/useWeb3Auth";
import Logout from "../components/Logout";

export default function Page() {
  // const {
  //   getUserInfo,
  //   authenticateUser,
  //   getAccounts,
  //   getBalance,
  //   sendTransaction,
  //   sendVersionTransaction,
  //   signVersionedTransaction,
  //   signAllVersionedTransaction,
  //   signAllTransaction,
  //   signMessage,
  //   getPrivateKey,
  //   logout,
  // } = useWeb3Auth();

  // const loggedInView = (
  //   <>
  //     <div className="flex-container">
  //       <div>
  //         <button onClick={getUserInfo} className="card">
  //           Get User Info
  //         </button>
  //       </div>
  //       <div>
  //         <button onClick={authenticateUser} className="card">
  //           Get ID Token
  //         </button>
  //       </div>
  //       <div>
  //         <button onClick={getAccounts} className="card">
  //           Get Account
  //         </button>
  //       </div>
  //       <div>
  //         <button onClick={getBalance} className="card">
  //           Get Balance
  //         </button>
  //       </div>
  //       <div>
  //         <button onClick={sendTransaction} className="card">
  //           Send Transaction
  //         </button>
  //       </div>
  //       <div>
  //         <button onClick={sendVersionTransaction} className="card">
  //           Send Version Transaction
  //         </button>
  //       </div>
  //       <div>
  //         <button onClick={signVersionedTransaction} className="card">
  //           Sign Versioned Transaction
  //         </button>
  //       </div>
  //       <div>
  //         <button onClick={signAllVersionedTransaction} className="card">
  //           Sign All Versioned Transaction
  //         </button>
  //       </div>
  //       <div>
  //         <button onClick={signAllTransaction} className="card">
  //           Sign All Transaction
  //         </button>
  //       </div>
  //       <div>
  //         <button onClick={signMessage} className="card">
  //           Sign Message
  //         </button>
  //       </div>
  //       <div>
  //         <button onClick={getPrivateKey} className="card">
  //           Get Private Key
  //         </button>
  //       </div>
  //       <div>
  //         <button onClick={logout} className="card">
  //           Log Out
  //         </button>
  //       </div>
  //     </div>
  //     <div id="console" style={{ whiteSpace: "pre-line" }}>
  //       <p style={{ whiteSpace: "pre-line" }}>Logged in Successfully!</p>
  //     </div>
  //   </>
  // );

  return (
    <div className="bg-background justify-items-center min-h-screen !p-8 pb-20 gap-16 sm:p-20 font-primary">
      <nav className="w-full flex flex-row items-center justify-between h-10">
        <Link href="/" className="flex flex-row items-center">
          <Image
            src="/images/logo.svg"
            width={772}
            height={448}
            alt="logo"
            className="w-[60px] h-[200px] mr-2"
          />
          <p className="text-primary-foreground font-primary font-bold text-4xl">
            KYRO
          </p>
        </Link>
        <div className="flex flex-row items-center">
          <Link
            href="https://x.com/kyrodotgreen"
            target="_blank"
            className="text-primary-foreground font-primary font-bold text-xl hover:text-primary mr-8"
          >
            𝕏
          </Link>
        </div>
      </nav>
      <div className="px-4 pt-6 pb-24 space-y-10">
        <div className="text-center space-y-2">
          <h1 className="text-xl font-bold">
            Recycle your e-waste. Get rewarded.
          </h1>
          <p className="text-sm text-popover-foreground">
            Join thousands making a difference
          </p>
        </div>

        <SchedulePickup />
        <ReGenCard points={0} wasteSaved={`0kg`} />
        <ActivityList />
        <RewardList />
      </div>

      {/* <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start"> */}

      <div className="flex w-full"></div>
      {/* </main> */}
      <Logout />
      {/* <p className="w-full h-px bg-primary-foreground my-4">{loggedInView}</p> */}
    </div>
  );
}
