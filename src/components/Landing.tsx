import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

import castle from "../../images/edo_castle.png";

export function Landing() {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      <Image src={castle} alt="Castle" quality={100} style={{ maxWidth: "100%", height: "auto" }} placeholder="blur" />
      <h1 className="display fixed bottom-32 text-white">WELCOME TO THE GAME!</h1>
      <Link href="/attack" className="fixed bottom-4 mb-4">
        <Button className="bg-indigo-500 hover:bg-gray-500 focus-visible:outline-indigo-600 w-32 p-8">
          <p className="play-txt">PLAY</p>
        </Button>
      </Link>
    </div>
  );
}
