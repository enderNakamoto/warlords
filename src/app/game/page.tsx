"use client";

// import { AccountInfo } from "@/components/AccountInfo";
// import { Header } from "@/components/Header";
// import { Footer } from "@/components/Footer";

// game stuff
// import { JoinGame } from "@/components/JoinGame";
// import { MobilizeArmy } from "@/components/MobilizeArmy";
// import { AttackCastle } from "@/components/Attack";
// import { CastleInfo } from "@/components/CastleInfo";
// import { PlayerStateDisplay } from "@/components/PlayerState";

// import { NetworkInfo } from "@/components/NetworkInfo";
// import { WalletDetails } from "@/components/WalletDetails";

// // Internal Components
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { useWallet } from "@aptos-labs/wallet-adapter-react";

export default function Game() {
  // const { connected } = useWallet();

  return (
    <>
      {/* <Header />
      <div className="flex items-center justify-center flex-col">
        {connected ? (
          <Card>
            <CardContent className="flex flex-col gap-10 pt-6">
              <WalletDetails />
              <NetworkInfo />
              <AccountInfo />
              <CastleInfo />
              <PlayerStateDisplay />
              <JoinGame />
              <MobilizeArmy />
              <AttackCastle />
            </CardContent>
          </Card>
        ) : (
          <CardHeader>
            <CardTitle>To get started Connect a wallet</CardTitle>
          </CardHeader>
        )}
      </div>
      <Footer /> */}
    </>
  );
}
